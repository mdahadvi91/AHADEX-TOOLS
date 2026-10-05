import { announceDownload } from "@lib/speech";
import { PDFDocument } from "pdf-lib";
import type { ImagePage, ImageEmbedType, PdfResult, PdfBuildOptions } from "./types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
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
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, and WebP files are supported.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File is too large (max 50 MB).";
  }
  return null;
}

function determineEmbedType(mime: string): ImageEmbedType {
  if (mime === "image/jpeg" || mime === "image/jpg") return "jpg";
  return "png";
}

export async function addImagePage(
  file: File,
  onError?: (msg: string) => void
): Promise<ImagePage | null> {
  const err = validateFile(file);
  if (err) {
    onError?.(err);
    return null;
  }
  try {
    const dataUrl = await fileToDataUrl(file);
    const img = await loadImage(dataUrl);
    return {
      id: makeId(),
      originalName: file.name,
      originalSize: file.size,
      originalType: file.type,
      dataUrl,
      width: img.naturalWidth,
      height: img.naturalHeight,
      embedType: determineEmbedType(file.type),
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to load image");
    return null;
  }
}

async function imageToOpaquePngBytes(
  img: HTMLImageElement
): Promise<Uint8Array> {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
      "image/png"
    );
  });
  const buf = await blob.arrayBuffer();
  return new Uint8Array(buf);
}

export async function buildPdf(
  pages: ImagePage[],
  opts: PdfBuildOptions
): Promise<PdfResult> {
  if (pages.length === 0) throw new Error("No pages");

  const pdf = await PDFDocument.create();
  const mmToPt = 72 / 25.4;

  for (const page of pages) {
    const img = await loadImage(page.dataUrl);

    let embedded;
    if (page.embedType === "jpg") {
      const buf = await fetch(page.dataUrl).then((r) => r.arrayBuffer());
      embedded = await pdf.embedJpg(buf);
    } else {
      const pngBytes = await imageToOpaquePngBytes(img);
      embedded = await pdf.embedPng(pngBytes);
    }

    let pw: number;
    let ph: number;

    if (opts.pageSize === "auto") {
      pw = embedded.width;
      ph = embedded.height;
    } else {
      const base =
        opts.pageSize === "a4"
          ? [210 * mmToPt, 297 * mmToPt]
          : [216 * mmToPt, 279 * mmToPt];
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
    const scale = Math.min(
      availW / img.naturalWidth,
      availH / img.naturalHeight
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
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
  announceDownload();
}

export function revokePdf(result: PdfResult): void {
  URL.revokeObjectURL(result.url);
}
