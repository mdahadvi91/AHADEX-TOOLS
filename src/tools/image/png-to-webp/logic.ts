import type { ConvertedFile } from "./types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/png"];
export const WEBP_QUALITY = 0.85;

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

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not load image")); };
    img.src = url;
  });
}

export function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) return "Please select a PNG file.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 50 MB).";
  return null;
}

export async function convertPngToWebp(
  file: File,
  onError?: (msg: string) => void
): Promise<ConvertedFile | null> {
  const err = validateFile(file);
  if (err) { onError?.(err); return null; }

  try {
    const img = await loadImage(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    // WebP supports transparency, no background fill needed
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
    );
    if (!blob) throw new Error("WebP encoding not supported by this browser");

    const convertedUrl = URL.createObjectURL(blob);
    const originalUrl = URL.createObjectURL(file);

    return {
      id: makeId(),
      originalName: file.name,
      originalSize: file.size,
      originalUrl,
      convertedBlob: blob,
      convertedUrl,
      convertedSize: blob.size,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Conversion failed");
    return null;
  }
}

export function downloadFile(item: ConvertedFile): void {
  const baseName = item.originalName.replace(/\.png$/i, "");
  const a = document.createElement("a");
  a.href = item.convertedUrl;
  a.download = `${baseName}.webp`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadAll(items: ConvertedFile[]): void {
  items.forEach((item, i) => {
    setTimeout(() => downloadFile(item), i * 300);
  });
}

export function revokeUrls(item: ConvertedFile): void {
  URL.revokeObjectURL(item.originalUrl);
  URL.revokeObjectURL(item.convertedUrl);
}
