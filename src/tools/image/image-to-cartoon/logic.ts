import type { LoadedImage, CartoonOptions, CartoonResult } from "./types";

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const MAX_DIMENSION = 1600;

export const DEFAULT_OPTIONS: CartoonOptions = {
  levels: 8,
  edgeStrength: 1.0,
  smoothness: 2,
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
 * Box blur — separable sliding-window average.
 * O(n) per pass; applied to R, G, B channels.
 * ───────────────────────────────────────────── */
function boxBlurRGB(
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
    const row = y * width * 4;
    const sums = [0, 0, 0];
    for (let k = -radius; k <= radius; k++) {
      const xx = Math.max(0, Math.min(width - 1, k));
      const i = row + xx * 4;
      sums[0] += src[i];
      sums[1] += src[i + 1];
      sums[2] += src[i + 2];
    }
    for (let x = 0; x < width; x++) {
      const o = row + x * 4;
      tmp[o] = sums[0] / win;
      tmp[o + 1] = sums[1] / win;
      tmp[o + 2] = sums[2] / win;
      tmp[o + 3] = src[o + 3];

      const outX = Math.max(0, Math.min(width - 1, x - radius));
      const inX = Math.max(0, Math.min(width - 1, x + radius + 1));
      const oi = row + outX * 4;
      const ii = row + inX * 4;
      sums[0] += src[ii] - src[oi];
      sums[1] += src[ii + 1] - src[oi + 1];
      sums[2] += src[ii + 2] - src[oi + 2];
    }
  }

  // Vertical
  for (let x = 0; x < width; x++) {
    const sums = [0, 0, 0];
    for (let k = -radius; k <= radius; k++) {
      const yy = Math.max(0, Math.min(height - 1, k));
      const i = (yy * width + x) * 4;
      sums[0] += tmp[i];
      sums[1] += tmp[i + 1];
      sums[2] += tmp[i + 2];
    }
    for (let y = 0; y < height; y++) {
      const o = (y * width + x) * 4;
      out[o] = sums[0] / win;
      out[o + 1] = sums[1] / win;
      out[o + 2] = sums[2] / win;
      out[o + 3] = tmp[o + 3];

      const outY = Math.max(0, Math.min(height - 1, y - radius));
      const inY = Math.max(0, Math.min(height - 1, y + radius + 1));
      const oi = (outY * width + x) * 4;
      const ii = (inY * width + x) * 4;
      sums[0] += tmp[ii] - tmp[oi];
      sums[1] += tmp[ii + 1] - tmp[oi + 1];
      sums[2] += tmp[ii + 2] - tmp[oi + 2];
    }
  }
  return out;
}

/* ─────────────────────────────────────────────
 * Sobel edge detection on grayscale luminance.
 * Returns a per-pixel magnitude (0-255), normalized.
 * ───────────────────────────────────────────── */
function sobelEdges(
  gray: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(width * height);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const a = gray[i - width - 1];
      const b = gray[i - width];
      const c = gray[i - width + 1];
      const d = gray[i - 1];
      const f = gray[i + 1];
      const g = gray[i + width - 1];
      const h = gray[i + width];
      const k = gray[i + width + 1];

      const gx = -a - 2 * d - g + c + 2 * f + k;
      const gy = -a - 2 * b - c + g + 2 * h + k;
      const mag = Math.sqrt(gx * gx + gy * gy);
      out[i] = mag > 255 ? 255 : mag;
    }
  }
  return out;
}

/* ─────────────────────────────────────────────
 * Cartoon filter:
 *   1. Optional blur (smooths noise so posterize bands cleanly)
 *   2. Posterize each RGB channel to N levels
 *   3. Sobel edge detect on original grayscale
 *   4. Multiply posterized × (1 − edgeStrength × edge)
 * ───────────────────────────────────────────── */
export async function renderCartoon(
  image: LoadedImage,
  opts: CartoonOptions
): Promise<CartoonResult> {
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
  const src = imgData.data;

  // 1) Smooth
  const smooth = boxBlurRGB(src, w, h, opts.smoothness);

  // 2) Posterize + build grayscale for Sobel
  const step = 255 / (opts.levels - 1);
  const posterized = new Uint8ClampedArray(smooth.length);
  const gray = new Uint8ClampedArray(w * h);

  for (let i = 0, j = 0; i < smooth.length; i += 4, j++) {
    const r = Math.round(smooth[i] / step) * step;
    const g = Math.round(smooth[i + 1] / step) * step;
    const b = Math.round(smooth[i + 2] / step) * step;
    posterized[i] = r;
    posterized[i + 1] = g;
    posterized[i + 2] = b;
    posterized[i + 3] = 255;
    // Luminance from original (not posterized) — crisper edges
    gray[j] = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
  }

  // 3) Sobel edges
  const edges = sobelEdges(gray, w, h);

  // 4) Darken posterized where edges are strong
  const out = ctx.createImageData(w, h);
  const outData = out.data;
  const k = opts.edgeStrength;

  for (let i = 0, j = 0; i < posterized.length; i += 4, j++) {
    // Edge weight: 0 = flat area, 1 = strong edge
    const e = (edges[j] / 255) * k;
    const factor = e > 1 ? 0 : 1 - e;
    outData[i] = posterized[i] * factor;
    outData[i + 1] = posterized[i + 1] * factor;
    outData[i + 2] = posterized[i + 2] * factor;
    outData[i + 3] = 255;
  }

  ctx.putImageData(out, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  const base64 = dataUrl.split(",")[1] ?? "";
  const size = Math.round((base64.length * 3) / 4);

  return { dataUrl, width: w, height: h, size };
}

export function downloadCartoon(
  result: CartoonResult,
  originalName: string
): void {
  const base = originalName.replace(/\.[^.]+$/, "");
  const a = document.createElement("a");
  a.href = result.dataUrl;
  a.download = `${base}-cartoon.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
