import { announceDownload } from "@lib/speech";
import * as pdfjsLib from "pdfjs-dist";
// @ts-ignore — Vite ?url import
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { LoadedPdf, ExtractedPage, ExtractResult, ExtractOptions } from "./types";

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

interface PdfTextItem {
  str: string;
  hasEOL?: boolean;
}

function buildPageText(items: PdfTextItem[], preserveLineBreaks: boolean): string {
  if (!preserveLineBreaks) {
    return items.map((it) => it.str).join(" ").replace(/\s+/g, " ").trim();
  }
  let out = "";
  for (const it of items) {
    out += it.str;
    if (it.hasEOL) out += "\n";
    else out += " ";
  }
  return out.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export async function extractText(
  source: LoadedPdf,
  opts: ExtractOptions
): Promise<ExtractResult> {
  const pageIndices = opts.pageRanges.trim()
    ? parsePageRanges(opts.pageRanges, source.pageCount)
    : Array.from({ length: source.pageCount }, (_, i) => i);
  if (pageIndices.length === 0) throw new Error("No pages selected.");

  const doc = await pdfjsLib.getDocument({ data: source.bytes.slice(0) }).promise;
  const pages: ExtractedPage[] = [];
  const blocks: string[] = [];

  for (const idx of pageIndices) {
    const page = await doc.getPage(idx + 1);
    const content = await page.getTextContent();
    const items = content.items as PdfTextItem[];
    const text = buildPageText(items, opts.preserveLineBreaks);
    pages.push({ pageNumber: idx + 1, text, charCount: text.length });
    if (opts.pageSeparator) {
      blocks.push(`--- Page ${idx + 1} ---\n${text}`);
    } else {
      blocks.push(text);
    }
  }
  await doc.destroy();

  const finalText = blocks.join("\n\n");
  const blob = new Blob([finalText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const baseName = source.name.replace(/\.pdf$/i, "");
  const totalChars = finalText.length;
  const totalWords = finalText.trim() ? finalText.trim().split(/\s+/).length : 0;

  return {
    filename: `${baseName}.txt`,
    blob,
    url,
    size: blob.size,
    pages,
    totalChars,
    totalWords,
  };
}

export function downloadTxt(result: ExtractResult): void {
  const a = document.createElement("a");
  a.href = result.url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function revokeTxt(result: ExtractResult): void {
  URL.revokeObjectURL(result.url);
}

export async function copyText(result: ExtractResult): Promise<void> {
  const text = result.pages.map((p) => p.text).join("\n\n");
  await navigator.clipboard.writeText(text);
}
