import QRCode from "qrcode";
import { renderToStaticMarkup } from "react-dom/server";
import type { PlatformConfig, RenderOptions } from "./types";

/* ============================================================
 * IMAGE LOADING
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
 * LOGO BUILDER — platform icon inside colored circle
 * ============================================================ */

function buildLogoDataUrl(platform: PlatformConfig, size: number): string {
  const IconComponent = platform.Icon;
  const iconMarkup = renderToStaticMarkup(
    IconComponent({ size: 100, color: "#FFFFFF" })
  );

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="${platform.color}"/>
      <g transform="translate(25, 25)">
        ${iconMarkup
          .replace(/width="[^"]*"/g, 'width="50"')
          .replace(/height="[^"]*"/g, 'height="50"')}
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
 * ROUNDED RECT HELPER
 * ============================================================ */

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
 * QR + LOGO GENERATOR
 * ============================================================ */

export async function generateQrWithLogo(
  payload: string,
  platform: PlatformConfig,
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

  const logoSize = Math.round(qrPixelSize * 0.22);
  const logoDataUrl = buildLogoDataUrl(platform, logoSize);
  const logoImg = await loadSvgImage(logoDataUrl);

  const ctx = qrCanvas.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  const pad = logoSize * 0.12;
  const circleR = (logoSize + pad * 2) / 2;
  ctx.beginPath();
  ctx.arc(qrPixelSize / 2, qrPixelSize / 2, circleR, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

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
 * POSITION CALCULATOR
 * ============================================================ */

function getPositionCoords(
  position: string,
  W: number,
  H: number,
  totalBox: number,
  innerPad: number
): { x: number; y: number } {
  switch (position) {
    case "top-left":
      return { x: innerPad, y: innerPad };
    case "top-right":
      return { x: W - totalBox - innerPad, y: innerPad };
    case "bottom-left":
      return { x: innerPad, y: H - totalBox - innerPad };
    case "bottom-right":
    default:
      return { x: W - totalBox - innerPad, y: H - totalBox - innerPad };
  }
}

/* ============================================================
 * DRAW BACKGROUND BEHIND QR
 * ============================================================ */

function drawQrBackground(
  ctx: CanvasRenderingContext2D,
  bg: string,
  x: number,
  y: number,
  totalBox: number,
  qrSize: number
) {
  if (bg === "none") return;
  ctx.save();
  if (bg === "rounded") {
    const r = Math.round(qrSize * 0.16);
    roundRect(ctx, x, y, totalBox, totalBox, r);
  } else {
    ctx.beginPath();
    ctx.rect(x, y, totalBox, totalBox);
  }
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();
}

/* ============================================================
 * COMPOSE FULL RESOLUTION PHOTO
 * ============================================================ */

export async function composePhoto(options: RenderOptions): Promise<Blob> {
  const {
    photoFile,
    platform,
    values,
    position,
    sizePercent,
    padding,
    qrBackground,
  } = options;

  const payload = platform.buildPayload(values);
  if (!payload) throw new Error("Empty payload");

  const img = await loadImageFromFile(photoFile);
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const minSide = Math.min(W, H);

  const qrSize = Math.round((minSide * sizePercent) / 100);
  const qrCanvas = await generateQrWithLogo(payload, platform, qrSize);

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("No canvas context");

  ctx.drawImage(img, 0, 0, W, H);

  const innerPad = Math.round(qrSize * 0.06);
  const effectivePadding = qrBackground === "none" ? 0 : padding;
  const totalBox = qrSize + effectivePadding * 2;
  const { x, y } = getPositionCoords(
    position,
    W,
    H,
    totalBox,
    innerPad
  );

  drawQrBackground(ctx, qrBackground, x, y, totalBox, qrSize);
  ctx.drawImage(
    qrCanvas,
    x + effectivePadding,
    y + effectivePadding,
    qrSize,
    qrSize
  );

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

/* ============================================================
 * GENERATE LOW-RES PREVIEW
 * ============================================================ */

export async function generatePreview(
  options: RenderOptions,
  maxPreviewSize = 1200
): Promise<string> {
  const {
    photoFile,
    platform,
    values,
    position,
    sizePercent,
    padding,
    qrBackground,
  } = options;

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
  const scaledPadding =
    qrBackground === "none" ? 0 : Math.round(padding * scale);
  const totalBox = qrSize + scaledPadding * 2;
  const { x, y } = getPositionCoords(position, pw, ph, totalBox, innerPad);

  drawQrBackground(ctx, qrBackground, x, y, totalBox, qrSize);
  ctx.drawImage(
    qrCanvas,
    x + scaledPadding,
    y + scaledPadding,
    qrSize,
    qrSize
  );

  return out.toDataURL("image/png", 0.92);
}
