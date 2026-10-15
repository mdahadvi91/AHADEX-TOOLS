import { announceDownload } from "@lib/speech";
import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore — Vite ?url import
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { LoadedPdf, PngPageResult, DpiOption } from "./types";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

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
    const doc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
    const pageCount = doc.numPages;
    doc.destroy();
    return { name: file.name, size: file.size, pageCount, bytes };
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

export async function renderPagesToPng(
  source: LoadedPdf,
  pageIndices: number[],
  dpi: DpiOption
): Promise<PngPageResult[]> {
  if (pageIndices.length === 0) throw new Error("No pages selected.");
  const baseName = source.name.replace(/\.pdf$/i, "");
  const scale = dpi / 72;
  const doc = await pdfjsLib.getDocument({ data: source.bytes.slice(0) }).promise;
  const results: PngPageResult[] = [];

  for (const idx of pageIndices) {
    const page = await doc.getPage(idx + 1);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
        "image/png"
      );
    });
    const url = URL.createObjectURL(blob);
    results.push({
      blob,
      url,
      size: blob.size,
      filename: `${baseName}-page-${String(idx + 1).padStart(3, "0")}.png`,
      pageNumber: idx + 1,
      width: canvas.width,
      height: canvas.height,
    });
  }
  await doc.destroy();
  return results;
}

export function downloadPng(result: PngPageResult): void {
  const a = document.createElement("a");
  a.href = result.url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function revokePng(result: PngPageResult): void {
  URL.revokeObjectURL(result.url);
}
