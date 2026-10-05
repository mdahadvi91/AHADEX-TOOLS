import { announceDownload } from "@lib/speech";
import { PDFDocument } from "pdf-lib";
import type { LoadedPdf, ExtractedFile, ExtractMode } from "./types";

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
    const pageCount = doc.getPageCount();
    return { name: file.name, size: file.size, pageCount, bytes };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to read PDF");
    return null;
  }
}

/**
 * Parse a custom page list like "3, 1, 3, 5, 7-9".
 * Duplicates are kept, order is preserved (NOT sorted).
 * Returns 0-based indices.
 */
export function parseCustomPageList(
  input: string,
  totalPages: number,
  onError?: (msg: string) => void
): number[] {
  if (!input.trim()) return [];
  const out: number[] = [];
  const parts = input.split(",");
  for (const raw of parts) {
    const part = raw.trim();
    if (!part) continue;
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      if (lo < 1 || hi > totalPages) {
        onError?.(`Range ${part} is outside 1–${totalPages}.`);
        continue;
      }
      if (lo <= hi) {
        for (let i = lo; i <= hi; i++) out.push(i - 1);
      } else {
        for (let i = lo; i >= hi; i--) out.push(i - 1);
      }
    } else {
      const n = parseInt(part, 10);
      if (isNaN(n) || n < 1 || n > totalPages) {
        onError?.(`Page ${part} is outside 1–${totalPages}.`);
        continue;
      }
      out.push(n - 1);
    }
  }
  return out;
}

async function buildSinglePdf(
  source: LoadedPdf,
  pageIndices: number[]
): Promise<ArrayBuffer> {
  const src = await PDFDocument.load(source.bytes, { ignoreEncryption: true });
  const out = await PDFDocument.create();
  const copied = await out.copyPages(src, pageIndices);
  copied.forEach((p) => out.addPage(p));
  const bytes = await out.save();
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export async function extractPages(
  source: LoadedPdf,
  pageIndices: number[],
  mode: ExtractMode
): Promise<ExtractedFile[]> {
  if (pageIndices.length === 0) throw new Error("No pages selected.");
  const baseName = source.name.replace(/\.pdf$/i, "");

  if (mode === "combined") {
    const buffer = await buildSinglePdf(source, pageIndices);
    const blob = new Blob([buffer], { type: "application/pdf" });
    return [{
      filename: `${baseName}-extracted.pdf`,
      blob,
      url: URL.createObjectURL(blob),
      size: blob.size,
      pageNumbers: pageIndices.map((i) => i + 1),
    }];
  }

  // mode === "separate": each page in its own PDF
  const files: ExtractedFile[] = [];
  const src = await PDFDocument.load(source.bytes, { ignoreEncryption: true });
  for (let i = 0; i < pageIndices.length; i++) {
    const idx = pageIndices[i];
    const out = await PDFDocument.create();
    const [copied] = await out.copyPages(src, [idx]);
    out.addPage(copied);
    const bytes = await out.save();
    const buffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buffer).set(bytes);
    const blob = new Blob([buffer], { type: "application/pdf" });
    files.push({
      filename: `${baseName}-page-${String(idx + 1).padStart(3, "0")}-pos${i + 1}.pdf`,
      blob,
      url: URL.createObjectURL(blob),
      size: blob.size,
      pageNumbers: [idx + 1],
    });
  }
  return files;
}

export function downloadFile(file: ExtractedFile): void {
  const a = document.createElement("a");
  a.href = file.url;
  a.download = file.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function revokeFile(file: ExtractedFile): void {
  URL.revokeObjectURL(file.url);
}
