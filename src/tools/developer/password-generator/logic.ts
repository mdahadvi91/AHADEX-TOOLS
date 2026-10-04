import type { PasswordOptions, PasswordStrength, GeneratedPassword } from "./types";

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 128;
export const MAX_BATCH = 50;

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?/~";
const AMBIGUOUS = "0O1lI|`'\"{}[]()/\\";

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
  requireEach: true,
};

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function filterAmbiguous(s: string, enabled: boolean): string {
  if (!enabled) return s;
  return s.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
}

export function buildCharsets(opts: PasswordOptions): string[] {
  const sets: string[] = [];
  if (opts.lowercase) sets.push(filterAmbiguous(LOWER, opts.excludeAmbiguous));
  if (opts.uppercase) sets.push(filterAmbiguous(UPPER, opts.excludeAmbiguous));
  if (opts.numbers) sets.push(filterAmbiguous(NUMBERS, opts.excludeAmbiguous));
  if (opts.symbols) sets.push(filterAmbiguous(SYMBOLS, opts.excludeAmbiguous));
  return sets.filter((s) => s.length > 0);
}

function secureRandomInt(max: number): number {
  if (max <= 0) return 0;
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let v = 0;
  do {
    crypto.getRandomValues(buf);
    v = buf[0];
  } while (v >= limit);
  return v % max;
}

function randomChar(charset: string): string {
  return charset.charAt(secureRandomInt(charset.length));
}

export function generatePassword(opts: PasswordOptions): string {
  const sets = buildCharsets(opts);
  if (sets.length === 0) return "";

  const all = sets.join("");
  const chars: string[] = [];

  if (opts.requireEach) {
    for (const s of sets) chars.push(randomChar(s));
  }

  while (chars.length < opts.length) {
    chars.push(randomChar(all));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, opts.length).join("");
}

export function generateBatch(opts: PasswordOptions, count: number): GeneratedPassword[] {
  const n = Math.max(1, Math.min(MAX_BATCH, count));
  const out: GeneratedPassword[] = [];
  for (let i = 0; i < n; i++) {
    const value = generatePassword(opts);
    out.push({ id: makeId() + "-" + i, value, strength: estimateStrength(value, opts) });
  }
  return out;
}

export function estimateStrength(pwd: string, opts: PasswordOptions): PasswordStrength {
  const sets = buildCharsets(opts);
  const poolSize = sets.join("").length || 1;
  const entropy = pwd.length * Math.log2(poolSize);

  let score: 0 | 1 | 2 | 3 | 4 = 0;
  if (entropy >= 128) score = 4;
  else if (entropy >= 90) score = 3;
  else if (entropy >= 60) score = 2;
  else if (entropy >= 40) score = 1;

  const labels: { en: string; bn: string; color: string }[] = [
    { en: "Very weak", bn: "অতি দুর্বল", color: "#C75B6E" },
    { en: "Weak", bn: "দুর্বল", color: "#D4A574" },
    { en: "Fair", bn: "মাঝারি", color: "#C99667" },
    { en: "Strong", bn: "শক্তিশালী", color: "#8AB88A" },
    { en: "Very strong", bn: "অতি শক্তিশালী", color: "#5B8F5B" },
  ];
  const l = labels[score];

  const guesses = Math.pow(2, entropy);
  const seconds = guesses / 1e12;
  const { en, bn } = humanTime(seconds);

  return {
    score,
    label: l.en,
    labelBn: l.bn,
    color: l.color,
    entropy: Math.round(entropy),
    crackTime: en,
    crackTimeBn: bn,
  };
}

function humanTime(seconds: number): { en: string; bn: string } {
  if (seconds < 1) return { en: "instantly", bn: "সাথে সাথে" };
  const units = [
    { s: 60, en: "seconds", bn: "সেকেন্ড" },
    { s: 3600, en: "minutes", bn: "মিনিট" },
    { s: 86400, en: "hours", bn: "ঘণ্টা" },
    { s: 2592000, en: "days", bn: "দিন" },
    { s: 31536000, en: "years", bn: "বছর" },
    { s: 31536000 * 1000, en: "thousand years", bn: "হাজার বছর" },
    { s: 31536000 * 1e6, en: "million years", bn: "লক্ষ বছর" },
    { s: 31536000 * 1e9, en: "billion years", bn: "কোটি বছর" },
  ];
  for (let i = 0; i < units.length - 1; i++) {
    if (seconds < units[i + 1].s) {
      const val = seconds / units[i].s;
      if (i === 0 && val < 2) return { en: "instantly", bn: "সাথে সাথে" };
      const v = val < 10 ? val.toFixed(1) : Math.round(val).toLocaleString("en-US");
      return { en: `${v} ${units[i].en}`, bn: `${v} ${units[i].bn}` };
    }
  }
  return { en: "trillions of years", bn: "কোটি কোটি বছর" };
}

export function copyText(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadText(text: string, filename = "passwords.txt"): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
