import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@constants/config";

type SoundName = "hover" | "click" | "success" | "error" | "pop";

interface SoundContextValue {
  // UI sounds (click, hover, etc.)
  soundEnabled: boolean;
  enabled: boolean;
  toggleSound: () => void;
  toggle: () => void;
  play: (sound: SoundName) => void;

  // Ambient background music
  ambientEnabled: boolean;
  toggleAmbient: () => void;
  ambientReady: boolean;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

export const useAppSound = useSound;

const SOUND_CONFIG: Record<
  SoundName,
  { freq: number; type: OscillatorType; duration: number; gain: number }
> = {
  hover: { freq: 720, type: "sine", duration: 0.05, gain: 0.025 },
  click: { freq: 880, type: "sine", duration: 0.08, gain: 0.04 },
  success: { freq: 1046, type: "triangle", duration: 0.18, gain: 0.05 },
  error: { freq: 220, type: "sawtooth", duration: 0.15, gain: 0.04 },
  pop: { freq: 600, type: "sine", duration: 0.04, gain: 0.02 },
};

const AMBIENT_KEY = "ahadex-sound-ambient";
const AMBIENT_VOLUME = 0.12;

function readStoredSound(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.sound);
    if (raw === null) return true;
    return raw === "true";
  } catch { return true; }
}

function readStoredAmbient(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(AMBIENT_KEY);
    return raw === "true";
  } catch { return false; }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [ambientReady, setAmbientReady] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setSoundEnabled(readStoredSound());
    setAmbientEnabled(readStoredAmbient());
  }, []);

  /* ── Init ambient audio element ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = AMBIENT_VOLUME;
    audio.preload = "none";
    audio.addEventListener("canplaythrough", () => setAmbientReady(true));
    audio.addEventListener("error", () => setAmbientReady(false));
    ambientRef.current = audio;
    // Try loading metadata to check existence
    audio.load();
    return () => {
      audio.pause();
      ambientRef.current = null;
    };
  }, []);

  /* ── Sync ambient playback ── */
  useEffect(() => {
    const audio = ambientRef.current;
    if (!audio || !ambientReady) return;
    if (ambientEnabled) {
      audio.play().catch(() => {
        // Browser blocked autoplay — will resume on next user interaction
      });
    } else {
      audio.pause();
    }
  }, [ambientEnabled, ambientReady]);

  /* ── Resume ambient after first user interaction if blocked ── */
  useEffect(() => {
    if (!ambientEnabled || !ambientReady) return;
    const resume = () => {
      const audio = ambientRef.current;
      if (audio && audio.paused) audio.play().catch(() => {});
    };
    window.addEventListener("click", resume, { once: true });
    window.addEventListener("touchstart", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("click", resume);
      window.removeEventListener("touchstart", resume);
      window.removeEventListener("keydown", resume);
    };
  }, [ambientEnabled, ambientReady]);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (audioCtx) return audioCtx;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    setAudioCtx(ctx);
    return ctx;
  }, [audioCtx]);

  const play = useCallback(
    (sound: SoundName) => {
      if (!soundEnabled) return;
      const ctx = ensureContext();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();
      const config = SOUND_CONFIG[sound];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = config.type;
      osc.frequency.setValueAtTime(config.freq, ctx.currentTime);
      gain.gain.setValueAtTime(config.gain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + config.duration
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + config.duration);
    },
    [soundEnabled, ensureContext]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEYS.sound, String(next)); } catch {}
      return next;
    });
  }, []);

  const toggleAmbient = useCallback(() => {
    setAmbientEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(AMBIENT_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const value = useMemo<SoundContextValue>(
    () => ({
      soundEnabled,
      enabled: soundEnabled,
      toggleSound,
      toggle: toggleSound,
      play,
      ambientEnabled,
      toggleAmbient,
      ambientReady,
    }),
    [soundEnabled, toggleSound, play, ambientEnabled, toggleAmbient, ambientReady]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
