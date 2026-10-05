/* ============================================================
 * Speech (Text-to-Speech)
 * ------------------------------------------------------------
 * Thin wrapper around the Web Speech API (speechSynthesis).
 * Auto-detects language from <html lang="...">.
 * Respects the global sound toggle (localStorage: ahadex-sound).
 * ============================================================ */

let voicesCache: SpeechSynthesisVoice[] | null = null;
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem("ahadex-sound");
    if (v === null) return true;
    return v === "true";
  } catch {
    return true;
  }
}

function getLang(): "en" | "bn" {
  if (typeof document === "undefined") return "en";
  const raw = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
  return raw === "bn" ? "bn" : "en";
}

async function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!isSpeechSupported()) return [];
  if (voicesCache) return voicesCache;
  if (voicesPromise) return voicesPromise;

  voicesPromise = new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const synth = window.speechSynthesis;
    const initial = synth.getVoices();
    if (initial.length > 0) {
      voicesCache = initial;
      resolve(initial);
      return;
    }
    const handler = () => {
      const v = synth.getVoices();
      if (v.length > 0) {
        synth.removeEventListener("voiceschanged", handler);
        voicesCache = v;
        resolve(v);
      }
    };
    synth.addEventListener("voiceschanged", handler);
    window.setTimeout(() => {
      const v = synth.getVoices();
      voicesCache = v;
      resolve(v);
    }, 800);
  });
  return voicesPromise;
}

function pickVoice(
  voices: SpeechSynthesisVoice[],
  lang: "en" | "bn"
): SpeechSynthesisVoice | null {
  const target = lang === "bn" ? "bn" : "en";
  const exact = voices.find((v) => v.lang.toLowerCase().startsWith(target));
  return exact ?? null;
}

export interface SpeakOptions {
  lang?: "en" | "bn";
  rate?: number;
  volume?: number;
  pitch?: number;
  interrupt?: boolean;
}

export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  if (!isSpeechSupported()) return;
  if (!isSoundEnabled()) return;
  const clean = text.trim();
  if (!clean) return;

  const lang = opts.lang ?? getLang();
  const synth = window.speechSynthesis;
  if (opts.interrupt !== false) synth.cancel();

  const utter = new SpeechSynthesisUtterance(clean);

  // ভয়েস লোড এবং সিলেক্ট করা (এটি আগে মিসিং ছিল)
  const voices = await loadVoices();
  const voice = pickVoice(voices, lang);
  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang;
  } else {
    utter.lang = lang === "bn" ? "bn-BD" : "en-US";
  }

  utter.rate = opts.rate ?? 1;
  utter.volume = opts.volume ?? 1;
  utter.pitch = opts.pitch ?? 1;

  return new Promise((resolve) => {
    // ভয়েস শেষ হলে বা এরর হলে প্রমিজ রিজলভ হবে
    utter.onend = () => resolve();
    utter.onerror = () => resolve();

    try {
      synth.speak(utter);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

/* ── Convenience helpers ── */

export function announceToolName(name: string): void {
  void speak(name, { rate: 0.95 });
}

export function announceDownload(): void {
  const lang = getLang();
  const text = lang === "bn" ? "ডাউনলোড সম্পন্ন হয়েছে" : "Download complete";
  void speak(text, { rate: 1 });
}

export function announceSuccess(): void {
  const lang = getLang();
  const text = lang === "bn" ? "সম্পন্ন" : "Success";
  void speak(text, { rate: 1 });
}
