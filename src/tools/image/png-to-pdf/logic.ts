import { PDFDocument } from "pdf-lib";
import type { PdfPage, PdfResult } from "./types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/png"];
export const MAX_PAGES = 50;

export function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = dataUrl;
  });
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) return "Only PNG files are supported.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 50 MB).";
  return null;
}

export async function addPngPage(
  file: File,
  onError?: (msg: string) => void
): Promise<PdfPage | null> {
  const err = validateFile(file);
  if (err) { onError?.(err); return null; }
  try {
    const dataUrl = await fileToDataUrl(file);
    const img = await loadImage(dataUrl);
    return {
      id: makeId(),
      originalName: file.name,
      originalSize: file.size,
      dataUrl,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to load image");
    return null;
  }
}

export interface PdfBuildOptions {
  pageSize: "auto" | "a4" | "letter";
  orientation: "auto" | "portrait" | "landscape";
  margin: number;
}

/* Composite PNG onto white background → JPEG bytes (PDF-safe) */
async function pngToJpegBytes(
  dataUrl: string,
  width: number,
  height: number
): Promise<ArrayBuffer> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.95)
  );
  if (!blob) throw new Error("JPEG encoding failed");
  return blob.arrayBuffer();
}

export async function buildPdf(
  pages: PdfPage[],
  opts: PdfBuildOptions
): Promise<PdfResult> {
  if (pages.length === 0) throw new Error("No pages");

  const pdf = await PDFDocument.create();
  const mmToPt = 72 / 25.4;

  for (const page of pages) {
    const jpgBytes = await pngToJpegBytes(page.dataUrl, page.width, page.height);
    const embedded = await pdf.embedJpg(jpgBytes);

    let pw: number;
    let ph: number;

    if (opts.pageSize === "auto") {
      pw = embedded.width;
      ph = embedded.height;
    } else {
      const base = opts.pageSize === "a4" ? [210 * mmToPt, 297 * mmToPt] : [216 * mmToPt, 279 * mmToPt];
      const isLandscape =
        opts.orientation === "landscape" ||
        (opts.orientation === "auto" && page.width > page.height);
      pw = isLandscape ? base[1] : base[0];
      ph = isLandscape ? base[0] : base[1];
    }

    const pdfPage = pdf.addPage([pw, ph]);

    const marginPt = opts.margin * mmToPt;
    const availW = pw - marginPt * 2;
    const availH = ph - marginPt * 2;
    const scale = Math.min(availW / page.width, availH / page.height);
    const drawW = page.width * scale;
    const drawH = page.height * scale;
    const x = (pw - drawW) / 2;
    const y = (ph - drawH) / 2;

    pdfPage.drawImage(embedded, { x, y, width: drawW, height: drawH });
  }

  const bytes = await pdf.save();
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    size: blob.size,
    pageCount: pages.length,
  };
}

export function downloadPdf(result: PdfResult, filename = "images.pdf"): void {
  const a = document.createElement("a");
  a.href = result.url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function revokePdf(result: PdfResult): void {
  URL.revokeObjectURL(result.url);
}
