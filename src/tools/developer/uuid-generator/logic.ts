import type { UuidVersion, UuidItem, GeneratorOptions } from "./types";

export const MIN_COUNT = 1;
export const MAX_COUNT = 1000;
export const DEFAULT_COUNT = 5;

function fallbackV4(): string {
  // RFC 4122 v4 using crypto.getRandomValues
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function v7(): string {
  // RFC 9562 UUIDv7: 48-bit unix ms timestamp + random
  const now = Date.now();
  const tsHex = now.toString(16).padStart(12, "0"); // 48 bits = 12 hex chars
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  // Set version 7 in the 7th byte (index 6 of full 16 bytes)
  // We build manually: ts(12 hex) + "-" + "7" + 3 random hex + "-" + variant + 3 random hex + "-" + 4 + "-" + 12
  const r = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
  // variant: 10xx → 8, 9, a, b
  const variantNibble = (parseInt(r[3], 16) & 0x3) | 0x8;
  const variantHex = variantNibble.toString(16);
  return `${tsHex.slice(0, 8)}-${tsHex.slice(8, 12)}-7${r.slice(0, 3)}-${variantHex}${r.slice(4, 7)}-${r.slice(7, 19)}`;
}

export function generateUuid(version: UuidVersion): string {
  if (version === "v4") {
    // Prefer native crypto.randomUUID when available
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return fallbackV4();
  }
  return v7();
}

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateBatch(opts: GeneratorOptions): UuidItem[] {
  const count = Math.max(MIN_COUNT, Math.min(MAX_COUNT, opts.count));
  const items: UuidItem[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    items.push({
      id: makeId() + "-" + i,
      value: generateUuid(opts.version),
      createdAt: now + i,
    });
  }
  return items;
}

export function formatUuid(
  value: string,
  opts: Pick<GeneratorOptions, "uppercase" | "hyphens">
): string {
  let v = value;
  if (!opts.hyphens) v = v.replace(/-/g, "");
  if (opts.uppercase) v = v.toUpperCase();
  return v;
}

export function copyAll(
  items: UuidItem[],
  opts: Pick<GeneratorOptions, "uppercase" | "hyphens">
): string {
  return items.map((i) => formatUuid(i.value, opts)).join("\n");
}

export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function downloadTxt(text: string, filename = "uuids.txt"): void {
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
