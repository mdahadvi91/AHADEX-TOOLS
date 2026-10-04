import type { LoadedImage, SketchOptions, SketchResult } from "./types";

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const MAX_DIMENSION = 2000;

export const DEFAULT_OPTIONS: SketchOptions = {
  intensity: 1.0,
  detail: 6,
};

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

export function validateFile(file: File): string | null {
  const ok =
    ACCEPTED_TYPES.includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name);
  if (!ok) return "Only JPG, PNG, and WebP files are supported.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 25 MB).";
  return null;
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

export async function loadImageFile(
  file: File,
  onError?: (msg: string) => void
): Promise<LoadedImage | null> {
  const err = validateFile(file);
  if (err) {
    onError?.(err);
    return null;
  }
  try {
    const dataUrl = await fileToDataUrl(file);
    const element = await loadImage(dataUrl);
    return {
      id: makeId(),
      name: file.name,
      size: file.size,
      dataUrl,
      naturalWidth: element.naturalWidth,
      naturalHeight: element.naturalHeight,
      element,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to load image");
    return null;
  }
}

/* ─────────────────────────────────────────────
 * Box blur — O(n) two-pass approximation of Gaussian.
 * Slides a window across rows then columns.
 * ───────────────────────────────────────────── */
function boxBlur(
  src: Uint8ClampedArray,
  width: number,
  height: number,
  radius: number
): Uint8ClampedArray {
  if (radius <= 0) return src;
  const win = radius * 2 + 1;
  const tmp = new Uint8ClampedArray(src.length);
  const out = new Uint8ClampedArray(src.length);

  // Horizontal
  for (let y = 0; y < height; y++) {
    const row = y * width;
    let sum = 0;
    for (let k = -radius; k <= radius; k++) {
      const xx = Math.max(0, Math.min(width - 1, k));
      sum += src[row + xx];
    }
    for (let x = 0; x < width; x++) {
      tmp[row + x] = sum / win;
      const outX = Math.max(0, Math.min(width - 1, x - radius));
      const inX = Math.max(0, Math.min(width - 1, x + radius + 1));
      sum += src[row + inX] - src[row + outX];
    }
  }

  // Vertical
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let k = -radius; k <= radius; k++) {
      const yy = Math.max(0, Math.min(height - 1, k));
      sum += tmp[yy * width + x];
    }
    for (let y = 0; y < height; y++) {
      out[y * width + x] = sum / win;
      const outY = Math.max(0, Math.min(height - 1, y - radius));
      const inY = Math.max(0, Math.min(height - 1, y + radius + 1));
      sum += tmp[inY * width + x] - tmp[outY * width + x];
    }
  }
  return out;
}

/* ─────────────────────────────────────────────
 * Pencil sketch filter (color-dodge method):
 *   1. Grayscale the source.
 *   2. Invert grayscale.
 *   3. Gaussian-blur the inverted.
 *   4. Color-dodge: result = gray * 255 / (255 - blurred).
 *   5. Scale by intensity to control stroke darkness.
 * ───────────────────────────────────────────── */
export async function renderSketch(
  image: LoadedImage,
  opts: SketchOptions
): Promise<SketchResult> {
  // Downscale large images to keep processing fast
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight)
  );
  const w = Math.max(1, Math.round(image.naturalWidth * scale));
  const h = Math.max(1, Math.round(image.naturalHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(image.element, 0, 0, w, h);

  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // 1) Grayscale
  const gray = new Uint8ClampedArray(w * h);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    gray[j] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  // 2) Invert
  const inverted = new Uint8ClampedArray(w * h);
  for (let i = 0; i < gray.length; i++) {
    inverted[i] = 255 - gray[i];
  }

  // 3) Blur inverted
  const blurred = boxBlur(inverted, w, h, opts.detail);

  // 4) Color dodge + intensity scaling
  const out = new Uint8ClampedArray(w * h);
  const k = opts.intensity;
  for (let i = 0; i < gray.length; i++) {
    const g = gray[i];
    const b = blurred[i];
    // Color dodge
    let v = b >= 255 ? 255 : Math.min(255, (g * 255) / (255 - b));
    // Intensity: 1.0 = normal, >1 = darker strokes, <1 = lighter
    const darkness = (1 - v / 255) * k;
    const dc = darkness < 0 ? 0 : darkness > 1 ? 1 : darkness;
    v = 255 * (1 - dc);
    out[i] = v;
  }

  // Write back
  const result = ctx.createImageData(w, h);
  for (let i = 0, j = 0; i < out.length; i++, j += 4) {
    const v = out[i];
    result.data[j] = v;
    result.data[j + 1] = v;
    result.data[j + 2] = v;
    result.data[j + 3] = 255;
  }
  ctx.putImageData(result, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  const base64 = dataUrl.split(",")[1] ?? "";
  const size = Math.round((base64.length * 3) / 4);

  return { dataUrl, width: w, height: h, size };
}

export function downloadSketch(
  result: SketchResult,
  originalName: string
): void {
  const base = originalName.replace(/\.[^.]+$/, "");
  const a = document.createElement("a");
  a.href = result.dataUrl;
  a.download = `${base}-sketch.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
