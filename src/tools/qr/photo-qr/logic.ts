import QRCode from "qrcode";
import type { Platform } from "./platforms";

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface RenderOptions {
  photoFile: File;
  platform: Platform;
  values: Record<string, string>;
  position: Position;
  sizePercent: number; // QR size as % of photo's smaller side (10-35)
  padding: number; // white padding around QR in px (based on output size)
}

/* ============================================================
 * Load image from File
 * ============================================================ */

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

/* ============================================================
 * Build an SVG logo (circle with brand icon)
 * ============================================================ */

function buildLogoDataUrl(platform: Platform, size: number): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="${platform.color}"/>
      <g transform="translate(20, 20) scale(2.5)" color="#FFFFFF">
        ${platform.iconSvg}
      </g>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

function loadSvgImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load SVG"));
    img.src = dataUrl;
  });
}

/* ============================================================
 * Generate QR code with platform logo in center
 * Returns a canvas with the full QR
 * ============================================================ */

export async function generateQrWithLogo(
  payload: string,
  platform: Platform,
  qrPixelSize: number
): Promise<HTMLCanvasElement> {
  const qrCanvas = document.createElement("canvas");
  qrCanvas.width = qrPixelSize;
  qrCanvas.height = qrPixelSize;

  await QRCode.toCanvas(qrCanvas, payload, {
    width: qrPixelSize,
    margin: 0,
    errorCorrectionLevel: "H",
    color: { dark: "#0A0B1E", light: "#FFFFFF" },
  });

  // Draw logo in center (approx 22% of QR size)
  const logoSize = Math.round(qrPixelSize * 0.22);
  const logoDataUrl = buildLogoDataUrl(platform, logoSize);
  const logoImg = await loadSvgImage(logoDataUrl);

  const ctx = qrCanvas.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  // White circle behind logo (safe zone)
  const pad = logoSize * 0.12;
  const circleR = (logoSize + pad * 2) / 2;
  ctx.beginPath();
  ctx.arc(qrPixelSize / 2, qrPixelSize / 2, circleR, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  // Draw logo
  ctx.drawImage(
    logoImg,
    (qrPixelSize - logoSize) / 2,
    (qrPixelSize - logoSize) / 2,
    logoSize,
    logoSize
  );

  return qrCanvas;
}

/* ============================================================
 * Composite: photo + QR badge
 * ============================================================ */

export async function composePhoto(
  options: RenderOptions
): Promise<Blob> {
  const { photoFile, platform, values, position, sizePercent, padding } = options;

  const payload = platform.buildPayload(values);
  if (!payload) throw new Error("Empty payload");

  const img = await loadImageFromFile(photoFile);
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const minSide = Math.min(W, H);

  // QR pixel size based on smaller side of photo
  const qrSize = Math.round((minSide * sizePercent) / 100);
  const qrCanvas = await generateQrWithLogo(payload, platform, qrSize);

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  // Draw photo
  ctx.drawImage(img, 0, 0, W, H);

  // Compute QR position
  const innerPad = Math.round(qrSize * 0.06); // small gap from photo edge
  const totalBox = qrSize + padding * 2;
  let x = 0;
  let y = 0;

  switch (position) {
    case "top-left":
      x = innerPad;
      y = innerPad;
      break;
    case "top-right":
      x = W - totalBox - innerPad;
      y = innerPad;
      break;
    case "bottom-left":
      x = innerPad;
      y = H - totalBox - innerPad;
      break;
    case "bottom-right":
      x = W - totalBox - innerPad;
      y = H - totalBox - innerPad;
      break;
  }

  // Draw white rounded background for padding
  if (padding > 0) {
    const r = Math.round(qrSize * 0.12);
    ctx.save();
    roundRect(ctx, x, y, totalBox, totalBox, r);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();
  }

  // Draw QR on top
  ctx.drawImage(qrCanvas, x + padding, y + padding, qrSize, qrSize);

  return new Promise((resolve, reject) => {
    out.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export"));
      },
      "image/png",
      1.0
    );
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ============================================================
 * Preview (lower resolution for performance)
 * ============================================================ */

export async function generatePreview(
  options: RenderOptions,
  maxPreviewSize = 1200
): Promise<string> {
  const { photoFile, platform, values, position, sizePercent, padding } = options;

  const payload = platform.buildPayload(values);
  if (!payload) throw new Error("Empty payload");

  const img = await loadImageFromFile(photoFile);
  const W = img.naturalWidth;
  const H = img.naturalHeight;

  const scale = Math.min(1, maxPreviewSize / Math.max(W, H));
  const pw = Math.round(W * scale);
  const ph = Math.round(H * scale);
  const minSide = Math.min(pw, ph);

  const qrSize = Math.round((minSide * sizePercent) / 100);
  const qrCanvas = await generateQrWithLogo(payload, platform, qrSize);

  const out = document.createElement("canvas");
  out.width = pw;
  out.height = ph;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  ctx.drawImage(img, 0, 0, pw, ph);

  const innerPad = Math.round(qrSize * 0.06);
  const scaledPadding = Math.round(padding * scale);
  const totalBox = qrSize + scaledPadding * 2;

  let x = 0;
  let y = 0;
  switch (position) {
    case "top-left":
      x = innerPad;
      y = innerPad;
      break;
    case "top-right":
      x = pw - totalBox - innerPad;
      y = innerPad;
      break;
    case "bottom-left":
      x = innerPad;
      y = ph - totalBox - innerPad;
      break;
    case "bottom-right":
      x = pw - totalBox - innerPad;
      y = ph - totalBox - innerPad;
      break;
  }

  if (scaledPadding > 0) {
    const r = Math.round(qrSize * 0.12);
    ctx.save();
    roundRect(ctx, x, y, totalBox, totalBox, r);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();
  }

  ctx.drawImage(qrCanvas, x + scaledPadding, y + scaledPadding, qrSize, qrSize);

  return out.toDataURL("image/png", 0.92);
}
