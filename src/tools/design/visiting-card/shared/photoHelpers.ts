import type { PhotoLayout, Palette } from "../types";
import { hexToRgba } from "./canvasHelpers";

/* ============================================================
 * SHAPE PATHS
 * ============================================================ */

function pathCircle(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.closePath();
}

function pathRounded(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function pathSquare(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
}

function pathArch(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const r = w / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 0);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
}

function pathHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) / 2;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function pathBlob(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) / 2;
  ctx.beginPath();
  const points = 20;
  for (let i = 0; i <= points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    const wobble =
      1 + Math.sin(angle * 3) * 0.08 + Math.cos(angle * 5) * 0.04;
    const px = cx + Math.cos(angle) * r * wobble;
    const py = cy + Math.sin(angle) * r * wobble;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function pathPolaroid(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  bottomRatio = 0.18
) {
  const totalH = h + h * bottomRatio;
  ctx.beginPath();
  ctx.rect(x, y, w, totalH);
  ctx.closePath();
}

function pathWave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h * 0.75);
  const steps = 20;
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const px = x + w * t;
    const py = y + h * 0.75 + Math.sin(t * Math.PI * 3) * h * 0.06;
    ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function pathDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w, y + h / 2);
  ctx.lineTo(x + w / 2, y + h);
  ctx.lineTo(x, y + h / 2);
  ctx.closePath();
}

function pathOval(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.closePath();
}

/* ============================================================
 * BUILD PATH
 * ============================================================ */

export function buildPhotoPath(
  ctx: CanvasRenderingContext2D,
  shape: PhotoLayout["shape"],
  x: number, y: number,
  w: number, h: number,
  cornerRadius = 0
): void {
  switch (shape) {
    case "circle":    pathCircle(ctx, x, y, w, h); break;
    case "rounded":   pathRounded(ctx, x, y, w, h, cornerRadius); break;
    case "square":    pathSquare(ctx, x, y, w, h); break;
    case "arch":      pathArch(ctx, x, y, w, h); break;
    case "hexagon":   pathHexagon(ctx, x, y, w, h); break;
    case "blob":      pathBlob(ctx, x, y, w, h); break;
    case "polaroid":  pathPolaroid(ctx, x, y, w, h); break;
    case "wave":      pathWave(ctx, x, y, w, h); break;
    case "diamond":   pathDiamond(ctx, x, y, w, h); break;
    case "oval":      pathOval(ctx, x, y, w, h); break;
    default:          pathRounded(ctx, x, y, w, h, cornerRadius);
  }
}

/* ============================================================
 * DRAW IMAGE COVER
 * ============================================================ */

export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number,
  w: number, h: number
): void {
  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const scale = Math.max(w / imgW, h / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const dx = x + (w - drawW) / 2;
  const dy = y + (h - drawH) / 2;
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

/* ============================================================
 * DRAW PHOTO
 * ============================================================ */

export async function drawPhoto(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  layout: PhotoLayout,
  W: number,
  H: number,
  palette: Palette
): Promise<void> {
  const minSide = Math.min(W, H);
  const aspect = layout.aspect ?? 1;
  const w = layout.size * minSide;
  const h = layout.size * minSide / aspect;
  const x = layout.x * W;
  const y = layout.y * H;
  const cornerRadius = (layout.cornerRadius ?? 0.15) * w;

  ctx.save();

  // Rotation
  if (layout.rotation) {
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate((layout.rotation * Math.PI) / 180);
    ctx.translate(-(x + w / 2), -(y + h / 2));
  }

  // Shadow
  if (layout.shadow) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.28)";
    ctx.shadowBlur = w * 0.09;
    ctx.shadowOffsetY = w * 0.04;
    buildPhotoPath(ctx, layout.shape, x, y, w, h, cornerRadius);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();
  }

  // Clip + image
  ctx.save();
  buildPhotoPath(ctx, layout.shape, x, y, w, h, cornerRadius);
  ctx.clip();

  if (layout.shape === "polaroid") {
    const bottomRatio = layout.polaroidBottom ?? 0.18;
    const totalH = h + h * bottomRatio;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, w, totalH);
    drawImageCover(ctx, img, x + w * 0.06, y + w * 0.06, w * 0.88, w * 0.88);
  } else {
    drawImageCover(ctx, img, x, y, w, h);
  }

  // Overlay
  if (layout.overlay && layout.overlay !== "none") {
    const overlayColor = layout.overlayColor ?? palette.accent;
    const overlayAlpha = layout.overlayOpacity ?? 0.3;

    if (layout.overlay === "gradient") {
      const grad = ctx.createLinearGradient(x, y + h * 0.4, x, y + h);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, hexToRgba(overlayColor, 0.9));
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
    } else if (layout.overlay === "tint") {
      ctx.fillStyle = hexToRgba(overlayColor, overlayAlpha);
      ctx.fillRect(x, y, w, h);
    } else if (layout.overlay === "duotone") {
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = hexToRgba(overlayColor, 0.6);
      ctx.fillRect(x, y, w, h);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  ctx.restore();

  // Border
  if (layout.border && layout.border > 0) {
    const borderWidth = layout.border * w;
    const borderColor = layout.borderColor ?? palette.accent;
    ctx.save();
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    const half = borderWidth / 2;
    buildPhotoPath(
      ctx,
      layout.shape,
      x + half, y + half,
      w - borderWidth, h - borderWidth,
      cornerRadius
    );
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

/* ============================================================
 * PLACEHOLDER SILHOUETTE (preview)
 * ============================================================ */

export function drawPhotoPlaceholder(
  ctx: CanvasRenderingContext2D,
  layout: PhotoLayout,
  W: number,
  H: number,
  palette: Palette
): void {
  const minSide = Math.min(W, H);
  const aspect = layout.aspect ?? 1;
  const w = layout.size * minSide;
  const h = layout.size * minSide / aspect;
  const x = layout.x * W;
  const y = layout.y * H;
  const cornerRadius = (layout.cornerRadius ?? 0.15) * w;

  ctx.save();

  // Light fill
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = palette.accent;
  buildPhotoPath(ctx, layout.shape, x, y, w, h, cornerRadius);
  ctx.fill();

  // Silhouette head + shoulders
  ctx.globalAlpha = 0.28;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const headR = Math.min(w, h) * 0.16;
  ctx.beginPath();
  ctx.arc(cx, cy - h * 0.1, headR, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy + h * 0.32, w * 0.3, h * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
