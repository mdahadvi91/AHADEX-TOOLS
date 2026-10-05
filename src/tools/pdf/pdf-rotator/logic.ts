import { announceDownload } from "@lib/speech";
import { PDFDocument, degrees } from "pdf-lib";
import type { LoadedPdf, RotateResult, RotationDelta } from "./types";

export const MAX_FILE_SIZE = 100 * 1024 * 1024;
export const ACCEPTED_TYPES = ["application/pdf"];

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".pdf")) {
    return "Only PDF files are supported.";
  }
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 100 MB).";
  return null;
}

export async function loadPdfFile(
  file: File,
  onError?: (msg: string) => void
): Promise<LoadedPdf | null> {
  const err = validateFile(file);
  if (err) { onError?.(err); return null; }
  try {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const count = doc.getPageCount();
    const rotations: number[] = [];
    for (let i = 0; i < count; i++) {
      rotations.push(doc.getPage(i).getRotation().angle);
    }
    return { name: file.name, size: file.size, pageCount: count, bytes, pageRotations: rotations };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to read PDF");
    return null;
  }
}

export function parsePageRanges(input: string, totalPages: number): number[] {
  if (!input.trim()) return [];
  const out = new Set<number>();
  for (const raw of input.split(",")) {
    const part = raw.trim();
    if (!part) continue;
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      const lo = Math.max(1, Math.min(a, b));
      const hi = Math.min(totalPages, Math.max(a, b));
      for (let i = lo; i <= hi; i++) out.add(i - 1);
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= totalPages) out.add(n - 1);
    }
  }
  return [...out].sort((a, b) => a - b);
}

function normalizeAngle(a: number): number {
  const m = a % 360;
  return m < 0 ? m + 360 : m;
}

export async function rotatePdf(
  source: LoadedPdf,
  pageIndices: number[],
  delta: RotationDelta
): Promise<RotateResult> {
  if (pageIndices.length === 0) throw new Error("No pages selected.");
  const doc = await PDFDocument.load(source.bytes, { ignoreEncryption: true });
  for (const idx of pageIndices) {
    const page = doc.getPage(idx);
    const current = page.getRotation().angle;
    page.setRotation(degrees(normalizeAngle(current + delta)));
  }
  const bytes = await doc.save();
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const baseName = source.name.replace(/\.pdf$/i, "");
  return { blob, url, size: blob.size, filename: `${baseName}-rotated.pdf` };
}

export function downloadResult(result: RotateResult): void {
  const a = document.createElement("a");
  a.href = result.url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function revokeResult(result: RotateResult): void {
  URL.revokeObjectURL(result.url);
}
