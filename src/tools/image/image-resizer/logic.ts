import type { ResizedFile } from "./types";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  if (!ACCEPTED_TYPES.includes(file.type)) return "Please select a JPG, PNG, or WebP file.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 50 MB).";
  return null;
}

export interface ResizeOptions {
  width: number;
  height: number;
  lockAspect: boolean;
  quality: number;
}

export async function resizeImage(
  file: File,
  opts: ResizeOptions,
  onError?: (msg: string) => void
): Promise<ResizedFile | null> {
  const err = validateFile(file);
  if (err) { onError?.(err); return null; }

  try {
    const img = await loadImage(file);
    const ow = img.naturalWidth;
    const oh = img.naturalHeight;

    let nw = opts.width;
    let nh = opts.height;
    if (opts.lockAspect) {
      const ratio = ow / oh;
      if (nw / nh > ratio) nw = Math.round(nh * ratio);
      else nh = Math.round(nw / ratio);
    }
    nw = Math.max(1, nw);
    nh = Math.max(1, nh);

    const canvas = document.createElement("canvas");
    canvas.width = nw;
    canvas.height = nh;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    const outputMime = file.type === "image/png" ? "image/png" : file.type;
    if (outputMime === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, nw, nh);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, nw, nh);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputMime, opts.quality / 100)
    );
    if (!blob) throw new Error("Encoding failed");

    const resizedUrl = URL.createObjectURL(blob);
    const originalUrl = URL.createObjectURL(file);

    return {
      id: makeId(),
      originalName: file.name,
      originalSize: file.size,
      originalUrl,
      resizedBlob: blob,
      resizedUrl,
      resizedSize: blob.size,
      originalWidth: ow,
      originalHeight: oh,
      newWidth: nw,
      newHeight: nh,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Resize failed");
    return null;
  }
}

export function downloadFile(item: ResizedFile): void {
  const ext = item.originalName.split(".").pop() || "jpg";
  const baseName = item.originalName.replace(/\.[^.]+$/, "");
  const a = document.createElement("a");
  a.href = item.resizedUrl;
  a.download = `${baseName}-${item.newWidth}x${item.newHeight}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadAll(items: ResizedFile[]): void {
  items.forEach((item, i) => {
    setTimeout(() => downloadFile(item), i * 300);
  });
}

export function revokeUrls(item: ResizedFile): void {
  URL.revokeObjectURL(item.originalUrl);
  URL.revokeObjectURL(item.resizedUrl);
}
