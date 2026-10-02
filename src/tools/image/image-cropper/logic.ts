import type { CroppedFile, CropRect } from "./types";

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

export async function cropImage(
  file: File,
  crop: CropRect,
  onError?: (msg: string) => void
): Promise<CroppedFile | null> {
  const err = validateFile(file);
  if (err) { onError?.(err); return null; }

  try {
    const img = await loadImage(file);
    const ow = img.naturalWidth;
    const oh = img.naturalHeight;

    // Normalize crop rect (allow any x,y,w,h within bounds)
    const cx = Math.max(0, Math.min(ow - 1, Math.round(crop.x)));
    const cy = Math.max(0, Math.min(oh - 1, Math.round(crop.y)));
    const cw = Math.max(1, Math.min(ow - cx, Math.round(crop.w)));
    const ch = Math.max(1, Math.min(oh - cy, Math.round(crop.h)));

    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");

    const outputMime = file.type === "image/png" ? "image/png" : file.type;
    if (outputMime === "image/jpeg") {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, cw, ch);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputMime, 0.95)
    );
    if (!blob) throw new Error("Encoding failed");

    const croppedUrl = URL.createObjectURL(blob);
    const originalUrl = URL.createObjectURL(file);

    return {
      id: makeId(),
      originalName: file.name,
      originalSize: file.size,
      originalUrl,
      croppedBlob: blob,
      croppedUrl,
      croppedSize: blob.size,
      originalWidth: ow,
      originalHeight: oh,
      cropX: cx,
      cropY: cy,
      cropW: cw,
      cropH: ch,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Crop failed");
    return null;
  }
}

export function downloadFile(item: CroppedFile): void {
  const ext = item.originalName.split(".").pop() || "jpg";
  const baseName = item.originalName.replace(/\.[^.]+$/, "");
  const a = document.createElement("a");
  a.href = item.croppedUrl;
  a.download = `${baseName}-cropped.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function revokeUrls(item: CroppedFile): void {
  URL.revokeObjectURL(item.originalUrl);
  URL.revokeObjectURL(item.croppedUrl);
}

/* ---------------- Aspect ratio presets ---------------- */

export const ASPECT_PRESETS: { id: string; labelEn: string; labelBn: string; ratio: number | null }[] = [
  { id: "free", labelEn: "Free", labelBn: "ফ্রি", ratio: null },
  { id: "1:1", labelEn: "1:1 Square", labelBn: "১:১ স্কয়ার", ratio: 1 },
  { id: "4:3", labelEn: "4:3", labelBn: "৪:৩", ratio: 4 / 3 },
  { id: "3:4", labelEn: "3:4", labelBn: "৩:৪", ratio: 3 / 4 },
  { id: "16:9", labelEn: "16:9", labelBn: "১৬:৯", ratio: 16 / 9 },
  { id: "9:16", labelEn: "9:16 Story", labelBn: "৯:১৬ স্টোরি", ratio: 9 / 16 },
  { id: "3:2", labelEn: "3:2", labelBn: "৩:২", ratio: 3 / 2 },
  { id: "2:3", labelEn: "2:3", labelBn: "২:৩", ratio: 2 / 3 },
];

export function fitAspect(
  rect: CropRect,
  ratio: number,
  maxW: number,
  maxH: number
): CropRect {
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  let w = rect.w;
  let h = rect.h;
  if (w / h > ratio) w = h * ratio;
  else h = w / ratio;
  w = Math.min(w, maxW);
  h = Math.min(h, maxH);
  let x = cx - w / 2;
  let y = cy - h / 2;
  x = Math.max(0, Math.min(maxW - w, x));
  y = Math.max(0, Math.min(maxH - h, y));
  return { x, y, w, h };
}
