import type { TransformResult, FileInfo } from "./types";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_TEXT_SIZE = 5 * 1024 * 1024;

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function byteLen(s: string): number {
  return new Blob([s]).size;
}

export function encodeText(input: string, urlSafe: boolean): TransformResult {
  if (!input) return { output: "", byteDelta: 0 };
  try {
    const bytes = new TextEncoder().encode(input);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    let b64 = btoa(bin);
    if (urlSafe) b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return { output: b64, byteDelta: byteLen(b64) - byteLen(input) };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Encode failed", byteDelta: 0 };
  }
}

export function decodeText(input: string, urlSafe: boolean): TransformResult {
  if (!input) return { output: "", byteDelta: 0 };
  try {
    let s = input.trim().replace(/\s+/g, "");
    if (urlSafe) {
      s = s.replace(/-/g, "+").replace(/_/g, "/");
      while (s.length % 4) s += "=";
    }
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const decoded = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    return { output: decoded, byteDelta: byteLen(decoded) - byteLen(input) };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid Base64", byteDelta: 0 };
  }
}

export function fileToBase64(file: File): Promise<FileInfo> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1] ?? "";
      resolve({
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        base64,
        dataUrl,
        isImage: file.type.startsWith("image/"),
      });
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function base64ToDataUrl(base64: string, mime = "application/octet-stream"): string {
  const clean = base64.replace(/\s+/g, "");
  if (clean.startsWith("data:")) return clean;
  return `data:${mime};base64,${clean}`;
}

export function isValidBase64(s: string): boolean {
  const clean = s.trim().replace(/\s+/g, "");
  if (!clean) return false;
  if (!/^[A-Za-z0-9+/=_-]+$/.test(clean)) return false;
  return clean.length % 4 === 0 || /[-_]/.test(clean);
}

export async function copyText(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function downloadText(text: string, filename = "output.txt"): void {
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

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const SAMPLES = {
  en: { text: "Hello, world! 👋 AHADEX Tools 🚀" },
  bn: { text: "হ্যালো, দুনিয়া! 👋 AHADEX Tools 🚀" },
};
