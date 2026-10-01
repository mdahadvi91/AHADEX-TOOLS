import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@constants/config";

type SoundName = "hover" | "click" | "success" | "error" | "pop";

interface SoundContextValue {
  soundEnabled: boolean;
  enabled: boolean;
  toggleSound: () => void;
  toggle: () => void;
  play: (sound: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

export const useAppSound = useSound;

const SOUND_CONFIG: Record<SoundName, { freq: number; type: OscillatorType; duration: number; gain: number }> = {
  hover:   { freq: 720, type: "sine",     duration: 0.05, gain: 0.025 },
  click:   { freq: 880, type: "sine",     duration: 0.08, gain: 0.04 },
  success: { freq: 1046, type: "triangle", duration: 0.18, gain: 0.05 },
  error:   { freq: 220, type: "sawtooth", duration: 0.15, gain: 0.04 },
  pop:     { freq: 600, type: "sine",     duration: 0.04, gain: 0.02 },
};

function readStored(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.sound);
    if (raw === null) return true;
    return raw === "true";
  } catch { return true; }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => { setSoundEnabled(readStored()); }, []);

  const ensureContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (audioCtx) return audioCtx;
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    const ctx = new Ctor();
    setAudioCtx(ctx);
    return ctx;
  }, [audioCtx]);

  const play = useCallback((sound: SoundName) => {
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
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + config.duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + config.duration);
  }, [soundEnabled, ensureContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEYS.sound, String(next)); } catch {}
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
    }),
    [soundEnabled, toggleSound, play]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
