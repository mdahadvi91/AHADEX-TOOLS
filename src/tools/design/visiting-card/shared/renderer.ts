import QRCode from "qrcode";
import type {
  Template,
  Side,
  Background,
  TemplateElement,
  TextElement,
  LogoElement,
  QRElement,
  ShapeElement,
  IconElement,
  OrnamentElement,
  UserData,
} from "../types";
import { FONT_STACKS, BASELINE_WIDTH } from "./constants";
import { hexToRgba, loadImageFromDataUrl, roundRect } from "./canvasHelpers";

/* ============================================================
 * MAIN RENDER
 * ============================================================ */

interface RenderOptions {
  ctx: CanvasRenderingContext2D;
  template: Template;
  side: "front" | "back";
  userData: UserData;
  W: number;
  H: number;
}

export async function renderSide(opts: RenderOptions): Promise<void> {
  const { ctx, template, side, userData, W, H } = opts;
  const sd: Side = side === "front" ? template.front : template.back;

  ctx.clearRect(0, 0, W, H);
  drawBackground(ctx, sd.background, W, H);

  for (const el of sd.elements) {
    if (!el.visible) continue;
    await drawElement(ctx, el, userData, W, H);
  }
}

/* ============================================================
 * BACKGROUND
 * ============================================================ */

function drawBackground(
  ctx: CanvasRenderingContext2D,
  bg: Background,
  W: number,
  H: number
): void {
  if (bg.type === "solid") {
    ctx.fillStyle = bg.color1;
    ctx.fillRect(0, 0, W, H);
    return;
  }

  if (bg.type === "gradient" && bg.color2) {
    const angle = ((bg.angle ?? 135) * Math.PI) / 180;
    const cx = W / 2;
    const cy = H / 2;
    const r = Math.max(W, H) / 2;
    const x1 = cx - Math.cos(angle) * r;
    const y1 = cy - Math.sin(angle) * r;
    const x2 = cx + Math.cos(angle) * r;
    const y2 = cy + Math.sin(angle) * r;
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, bg.color1);
    g.addColorStop(1, bg.color2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    return;
  }

  if (bg.type === "pattern") {
    ctx.fillStyle = bg.color1;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = hexToRgba("#000000", 0.06);
    ctx.fillStyle = hexToRgba("#000000", 0.06);
    const step = Math.max(20, Math.round(W / 35));

    if (bg.pattern === "dots") {
      for (let x = step; x < W; x += step) {
        for (let y = step; y < H; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (bg.pattern === "grid") {
      ctx.lineWidth = 1;
      for (let x = step; x < W; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = step; y < H; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    } else if (bg.pattern === "diagonal") {
      ctx.lineWidth = 1.2;
      for (let i = -H; i < W + H; i += step * 1.5) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + H, H);
        ctx.stroke();
      }
    }
    return;
  }

  ctx.fillStyle = bg.color1;
  ctx.fillRect(0, 0, W, H);
}

/* ============================================================
 * ELEMENT DISPATCHER
 * ============================================================ */

async function drawElement(
  ctx: CanvasRenderingContext2D,
  el: TemplateElement,
  userData: UserData,
  W: number,
  H: number
): Promise<void> {
  ctx.save();
  ctx.globalAlpha = el.opacity ?? 1;

  if (el.rotation) {
    const cx = el.x * W;
    const cy = el.y * H;
    ctx.translate(cx, cy);
    ctx.rotate((el.rotation * Math.PI) / 180);
    ctx.translate(-cx, -cy);
  }

  switch (el.type) {
    case "text":    drawText(ctx, el, userData, W, H); break;
    case "logo":    await drawLogo(ctx, el, userData, W, H); break;
    case "qr":      await drawQR(ctx, el, userData, W, H); break;
    case "shape":   drawShape(ctx, el, W, H); break;
    case "icon":    drawIcon(ctx, el, W, H); break;
    case "ornament": drawOrnament(ctx, el, W, H); break;
  }

  ctx.restore();
}

/* ============================================================
 * TEXT
 * ============================================================ */

function resolveText(el: TextElement, userData: UserData): string {
  const key = el.contentKey;
  const v = (userData as unknown as Record<string, string>)[key];
  return v ?? el.defaultValue;
}

function drawText(
  ctx: CanvasRenderingContext2D,
  el: TextElement,
  userData: UserData,
  W: number,
  H: number
): void {
  const raw = resolveText(el, userData);
  if (!raw) return;

  const scale = W / BASELINE_WIDTH;
  const fontSize = el.fontSize * scale;
  const stack = FONT_STACKS[el.fontFamily] ?? FONT_STACKS.sans;

  ctx.save();
  ctx.font = `${el.italic ? "italic " : ""}${el.fontWeight} ${fontSize}px ${stack}`;
  ctx.fillStyle = el.color;
  ctx.textBaseline = "middle";
  ctx.textAlign = el.align;

  const x = el.x * W;
  const y = el.y * H;
  const text = el.uppercase ? raw.toUpperCase() : raw;
  const spacing = (el.letterSpacing ?? 0) * scale;

  if (spacing > 0) {
    drawSpacedText(ctx, text, x, y, spacing, el.align);
  } else {
    ctx.fillText(text, x, y);
  }

  ctx.restore();
}

function drawSpacedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
  align: "left" | "center" | "right"
): void {
  const chars = text.split("");
  const widths = chars.map((c) => ctx.measureText(c).width + spacing);
  const total = widths.reduce((a, b) => a + b, 0) - spacing;

  let cursor = x;
  if (align === "center") cursor = x - total / 2;
  else if (align === "right") cursor = x - total;

  const prev = ctx.textAlign;
  ctx.textAlign = "left";
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], cursor, y);
    cursor += widths[i];
  }
  ctx.textAlign = prev;
}

/* ============================================================
 * LOGO
 * ============================================================ */

async function drawLogo(
  ctx: CanvasRenderingContext2D,
  el: LogoElement,
  userData: UserData,
  W: number,
  H: number
): Promise<void> {
  if (!userData.logoDataUrl) {
    // Placeholder: subtle gold circle with "AH"
    const size = el.size * Math.min(W, H);
    const x = el.x * W;
    const y = el.y * H;
    ctx.save();
    ctx.strokeStyle = hexToRgba("#C99667", 0.4);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = hexToRgba("#C99667", 0.6);
    ctx.font = `${Math.round(size * 0.45)}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("AH", x, y);
    ctx.restore();
    return;
  }

  try {
    const img = await loadImageFromDataUrl(userData.logoDataUrl);
    const size = el.size * Math.min(W, H);
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const ratio = imgH / imgW;
    const w = size;
    const h = size * ratio;
    const x = el.x * W;
    const y = el.y * H;
    ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
  } catch {
    // ignore
  }
}

/* ============================================================
 * QR CODE
 * ============================================================ */

async function drawQR(
  ctx: CanvasRenderingContext2D,
  el: QRElement,
  userData: UserData,
  W: number,
  H: number
): Promise<void> {
  const size = el.size * Math.min(W, H);
  const x = el.x * W;
  const y = el.y * H;
  const pad = (el.padding ?? 0) * size;
  const innerSize = size - pad * 2;

  ctx.save();

  // Background block
  ctx.fillStyle = el.bgColor;
  roundRect(ctx, x - size / 2, y - size / 2, size, size, size * 0.08);
  ctx.fill();

  // Generate QR to off-screen canvas
  const off = document.createElement("canvas");
  off.width = innerSize;
  off.height = innerSize;

  await QRCode.toCanvas(off, userData.qrPayload || "https://ahadex.fun", {
    width: innerSize,
    margin: 0,
    errorCorrectionLevel: "H",
    color: { dark: el.fgColor, light: el.bgColor },
  });

  ctx.drawImage(off, x - innerSize / 2, y - innerSize / 2, innerSize, innerSize);

  ctx.restore();
}

/* ============================================================
 * SHAPES
 * ============================================================ */

function drawShape(
  ctx: CanvasRenderingContext2D,
  el: ShapeElement,
  W: number,
  H: number
): void {
  const w = el.width * W;
  const h = el.height * H;
  const x = el.x * W;
  const y = el.y * H;

  ctx.save();

  if (el.shape === "rect") {
    if (el.cornerRadius) {
      roundRect(ctx, x - w / 2, y - h / 2, w, h, el.cornerRadius * Math.min(w, h));
    } else {
      ctx.beginPath();
      ctx.rect(x - w / 2, y - h / 2, w, h);
    }
    if (el.fill && el.fill !== "transparent") {
      ctx.fillStyle = el.fill;
      ctx.fill();
    }
    if (el.stroke) {
      ctx.strokeStyle = el.stroke;
      ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
      ctx.stroke();
    }
  } else if (el.shape === "circle") {
    ctx.beginPath();
    ctx.arc(x, y, Math.min(w, h) / 2, 0, Math.PI * 2);
    if (el.fill) { ctx.fillStyle = el.fill; ctx.fill(); }
    if (el.stroke) {
      ctx.strokeStyle = el.stroke;
      ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
      ctx.stroke();
    }
  } else if (el.shape === "line") {
    ctx.beginPath();
    if (el.direction === "t-b") {
      ctx.moveTo(x, y - h / 2);
      ctx.lineTo(x, y + h / 2);
    } else {
      ctx.moveTo(x - w / 2, y);
      ctx.lineTo(x + w / 2, y);
    }
    ctx.strokeStyle = el.stroke ?? el.fill ?? "#000";
    ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
    ctx.stroke();
  } else if (el.shape === "triangle") {
    ctx.beginPath();
    ctx.moveTo(x, y - h / 2);
    ctx.lineTo(x + w / 2, y + h / 2);
    ctx.lineTo(x - w / 2, y + h / 2);
    ctx.closePath();
    if (el.fill) { ctx.fillStyle = el.fill; ctx.fill(); }
    if (el.stroke) {
      ctx.strokeStyle = el.stroke;
      ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
      ctx.stroke();
    }
  } else if (el.shape === "diagonal-stripe") {
    // Stripe across the card at given y with given height
    ctx.beginPath();
    if (el.direction === "tr-bl") {
      ctx.moveTo(0, y - h / 2);
      ctx.lineTo(W, y - h / 2 - W * 0.06);
      ctx.lineTo(W, y + h / 2 - W * 0.06);
      ctx.lineTo(0, y + h / 2);
    } else {
      ctx.moveTo(0, y - h / 2);
      ctx.lineTo(W, y - h / 2 + W * 0.06);
      ctx.lineTo(W, y + h / 2 + W * 0.06);
      ctx.lineTo(0, y + h / 2);
    }
    ctx.closePath();
    if (el.fill) { ctx.fillStyle = el.fill; ctx.fill(); }
  } else if (el.shape === "corner") {
    // Right-angled corner: from corner point (x,y) extend left and down
    ctx.beginPath();
    ctx.moveTo(x - w, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.strokeStyle = el.stroke ?? el.fill ?? "#000";
    ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
    ctx.stroke();
  } else if (el.shape === "chevron") {
    ctx.beginPath();
    ctx.moveTo(x - w / 2, y + h / 2);
    ctx.lineTo(x, y - h / 2);
    ctx.lineTo(x + w / 2, y + h / 2);
    ctx.strokeStyle = el.stroke ?? el.fill ?? "#000";
    ctx.lineWidth = (el.strokeWidth ?? 1) * (W / BASELINE_WIDTH);
    ctx.stroke();
  }

  ctx.restore();
}

/* ============================================================
 * ICONS — minimal SVG paths
 * ============================================================ */

function drawIcon(
  ctx: CanvasRenderingContext2D,
  el: IconElement,
  W: number,
  H: number
): void {
  const size = el.size * Math.min(W, H);
  const x = el.x * W;
  const y = el.y * H;

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = el.color;
  ctx.strokeStyle = el.color;
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const s = size / 2;

  switch (el.iconName) {
    case "phone":
      ctx.beginPath();
      ctx.moveTo(-s * 0.6, -s * 0.7);
      ctx.quadraticCurveTo(-s * 0.9, -s * 0.7, -s * 0.7, -s * 0.3);
      ctx.quadraticCurveTo(-s * 0.2, s * 0.6, s * 0.7, s * 0.7);
      ctx.quadraticCurveTo(s * 0.9, s * 0.7, s * 0.7, s * 0.4);
      ctx.lineTo(s * 0.4, s * 0.5);
      ctx.quadraticCurveTo(-s * 0.1, 0, -s * 0.5, -s * 0.4);
      ctx.closePath();
      ctx.fill();
      break;

    case "email":
      ctx.strokeRect(-s * 0.8, -s * 0.5, s * 1.6, s * 1.0);
      ctx.beginPath();
      ctx.moveTo(-s * 0.8, -s * 0.5);
      ctx.lineTo(0, s * 0.1);
      ctx.lineTo(s * 0.8, -s * 0.5);
      ctx.stroke();
      break;

    case "website":
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.75, 0);
      ctx.lineTo(s * 0.75, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.4, s * 0.75, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case "location":
      ctx.beginPath();
      ctx.arc(0, -s * 0.2, s * 0.55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s * 0.4, s * 0.15);
      ctx.lineTo(0, s * 0.85);
      ctx.lineTo(s * 0.4, s * 0.15);
      ctx.stroke();
      break;

    case "instagram":
      roundRectPath(ctx, -s * 0.75, -s * 0.75, s * 1.5, s * 1.5, s * 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(s * 0.5, -s * 0.5, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;

    default:
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
): void {
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

/* ============================================================
 * ORNAMENTS
 * ============================================================ */

function drawOrnament(
  ctx: CanvasRenderingContext2D,
  el: OrnamentElement,
  W: number,
  H: number
): void {
  const size = el.size * Math.min(W, H);
  const x = el.x * W;
  const y = el.y * H;
  const c1 = el.colors[0] ?? "#C99667";
  const c2 = el.colors[1] ?? c1;

  ctx.save();
  ctx.translate(x, y);

  switch (el.ornament) {
    case "gold-corner": {
      const s = size;
      // Two concentric L-shapes
      ctx.strokeStyle = c1;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-s, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, s);
      ctx.stroke();
      ctx.strokeStyle = c2;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-s * 0.7, s * 0.2);
      ctx.lineTo(s * 0.2, s * 0.2);
      ctx.lineTo(s * 0.2, s * 0.7);
      ctx.stroke();
      break;
    }

    case "mandala": {
      const cx = 0;
      const cy = 0;
      const r = size;
      ctx.strokeStyle = c1;
      ctx.lineWidth = 1;
      for (let ring = 0; ring < 5; ring++) {
        const rr = r * (0.3 + ring * 0.15);
        const petals = 6 + ring * 3;
        ctx.beginPath();
        for (let i = 0; i <= petals; i++) {
          const a = (Math.PI * 2 * i) / petals;
          const px = cx + Math.cos(a) * rr;
          const py = cy + Math.sin(a) * rr;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      break;
    }

    case "botanical-leaf": {
      ctx.strokeStyle = c1;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        const offset = i * size * 0.15;
        ctx.beginPath();
        ctx.moveTo(0, offset);
        ctx.quadraticCurveTo(size * 0.5, offset - size * 0.2, size, offset);
        ctx.stroke();
      }
      break;
    }

    case "circuit-line": {
      ctx.strokeStyle = c1;
      ctx.lineWidth = 1.2;
      const path: Array<[number, number]> = [
        [-size, 0],
        [-size * 0.5, 0],
        [-size * 0.3, -size * 0.3],
        [size * 0.3, -size * 0.3],
        [size * 0.5, 0],
        [size, 0],
      ];
      ctx.beginPath();
      ctx.moveTo(path[0][0], path[0][1]);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i][0], path[i][1]);
      }
      ctx.stroke();
      // Small dots on nodes
      ctx.fillStyle = c1;
      for (const [px, py] of path) {
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }

    case "hexagon-frame": {
      ctx.strokeStyle = c1;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = Math.cos(a) * size;
        const py = Math.sin(a) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      break;
    }

    case "crown": {
      ctx.fillStyle = c1;
      const s = size;
      ctx.beginPath();
      ctx.moveTo(-s, s * 0.5);
      ctx.lineTo(-s * 0.7, -s * 0.5);
      ctx.lineTo(-s * 0.3, s * 0.1);
      ctx.lineTo(0, -s * 0.7);
      ctx.lineTo(s * 0.3, s * 0.1);
      ctx.lineTo(s * 0.7, -s * 0.5);
      ctx.lineTo(s, s * 0.5);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "wave": {
      ctx.strokeStyle = c1;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const t = i / 40;
        const px = -size + t * size * 2;
        const py = Math.sin(t * Math.PI * 2) * size * 0.4;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      break;
    }

    case "japanese-sun": {
      // Red sun + minimal mountain
      ctx.fillStyle = c1;
      ctx.beginPath();
      ctx.arc(0, -size * 0.2, size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = c2;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size, size * 0.6);
      ctx.lineTo(-size * 0.2, -size * 0.1);
      ctx.lineTo(size * 0.3, size * 0.3);
      ctx.lineTo(size, size * 0.6);
      ctx.stroke();
      break;
    }

    case "marble-vein": {
      ctx.strokeStyle = hexToRgba(c1, 0.4);
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-size, -size + i * size * 0.5);
        ctx.bezierCurveTo(
          -size * 0.3, -size + i * size * 0.5 + size * 0.2,
          size * 0.3, -size + i * size * 0.5 - size * 0.2,
          size, -size + i * size * 0.5
        );
        ctx.stroke();
      }
      break;
    }

    case "carbon-fiber": {
      ctx.fillStyle = hexToRgba(c1, 0.3);
      const cell = size * 0.15;
      for (let i = -10; i < 10; i++) {
        for (let j = -10; j < 10; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(i * cell, j * cell, cell, cell);
          }
        }
      }
      break;
    }
  }

  ctx.restore();
}
