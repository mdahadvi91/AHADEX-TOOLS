/* ============================================================
 * CV Photo helpers — read, crop, resize
 * ------------------------------------------------------------
 * Runs entirely in-browser using the Canvas API.
 * No uploads. No servers.
 * ============================================================ */

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
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

/* ------------------------------------------------------------
 * Crop a square from the center of the image and resize to
 * `outputSize` px. Returns a data URL.
 * ------------------------------------------------------------ */

export async function cropSquare(
  dataUrl: string,
  outputSize = 400
): Promise<string> {
  const img = await loadImage(dataUrl);
  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;
  const side = Math.min(srcW, srcH);
  const sx = (srcW - side) / 2;
  const sy = (srcH - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  // High-quality downscale
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, side, side, 0, 0, outputSize, outputSize);

  return canvas.toDataURL("image/jpeg", 0.92);
}

/* ------------------------------------------------------------
 * Clip a photo into a shape on a transparent canvas.
 * Used by templates that render different photo frames.
 * ------------------------------------------------------------ */

export type PhotoShape = "circle" | "square" | "rounded";

export async function clipPhoto(
  dataUrl: string,
  shape: PhotoShape,
  size = 400,
  radiusRatio = 0.15
): Promise<string> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.save();
  buildPath(ctx, shape, size, radiusRatio);
  ctx.clip();
  ctx.drawImage(img, 0, 0, size, size);
  ctx.restore();

  return canvas.toDataURL("image/png");
}

function buildPath(
  ctx: CanvasRenderingContext2D,
  shape: PhotoShape,
  size: number,
  radiusRatio: number
): void {
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    return;
  }
  if (shape === "rounded") {
    const r = size * radiusRatio;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    return;
  }
  ctx.beginPath();
  ctx.rect(0, 0, size, size);
  ctx.closePath();
}
