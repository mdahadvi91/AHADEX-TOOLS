import { FONT_STACKS } from "./constants";

/* ============================================================
 * COLOR
 * ============================================================ */

export function hexToRgba(hex: string, alpha = 1): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function lighten(hex: string, amount = 0.2): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const nr = Math.min(255, Math.round(r + (255 - r) * amount));
  const ng = Math.min(255, Math.round(g + (255 - g) * amount));
  const nb = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
}

export function darken(hex: string, amount = 0.2): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `#${Math.round(r * (1 - amount)).toString(16).padStart(2, "0")}${Math.round(g * (1 - amount)).toString(16).padStart(2, "0")}${Math.round(b * (1 - amount)).toString(16).padStart(2, "0")}`;
}

/* ============================================================
 * SHAPES
 * ============================================================ */

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
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

export function circle(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number
): void {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.closePath();
}

export function line(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  color: string,
  width = 1
): void {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

export function dottedLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  color: string,
  width = 1,
  dash: [number, number] = [4, 4]
): void {
  ctx.save();
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

/* ============================================================
 * GRADIENTS
 * ============================================================ */

export function drawLinearGradient(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  c1: string, c2: string,
  angleDeg = 135
): void {
  const angle = (angleDeg * Math.PI) / 180;
  const cx = W / 2;
  const cy = H / 2;
  const radius = Math.max(W, H) / 2;
  const x1 = cx - Math.cos(angle) * radius;
  const y1 = cy - Math.sin(angle) * radius;
  const x2 = cx + Math.cos(angle) * radius;
  const y2 = cy + Math.sin(angle) * radius;
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

/* ============================================================
 * PATTERNS
 * ============================================================ */

export function drawPattern(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  type: "dots" | "grid" | "diagonal" | "waves" | "lines",
  color: string,
  alpha = 0.08
): void {
  ctx.save();
  ctx.globalAlpha = alpha;
  const step = Math.max(20, Math.round(W / 35));

  if (type === "dots") {
    ctx.fillStyle = color;
    for (let x = step; x < W; x += step) {
      for (let y = step; y < H; y += step) {
        circle(ctx, x, y, 1.5);
        ctx.fill();
      }
    }
  } else if (type === "grid") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let x = step; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = step; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  } else if (type === "diagonal") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    for (let i = -H; i < W + H; i += step * 1.5) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
    }
  } else if (type === "waves") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    for (let y = step; y < H; y += step * 1.6) {
      ctx.beginPath();
      for (let x = 0; x < W; x += 6) {
        const yy = y + Math.sin(x / 45) * 5;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  } else if (type === "lines") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let y = step; y < H; y += step / 2) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }
  ctx.restore();
}

/* ============================================================
 * DECORATIONS
 * ============================================================ */

export function drawCorner(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  size: number,
  color: string,
  corner: "tl" | "tr" | "bl" | "br" = "tl"
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.08);
  ctx.beginPath();
  switch (corner) {
    case "tl":
      ctx.moveTo(x, y + size);
      ctx.lineTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case "tr":
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + size);
      break;
    case "bl":
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y);
      ctx.lineTo(x + size, y);
      break;
    case "br":
      ctx.moveTo(x - size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y - size);
      break;
  }
  ctx.stroke();
  ctx.restore();
}

export function drawDiagonalStripe(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  color: string,
  thickness: number,
  offset = 0
): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-thickness + offset, 0);
  ctx.lineTo(W + offset, 0);
  ctx.lineTo(W + offset - H, H);
  ctx.lineTo(-thickness + offset - H, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* ============================================================
 * TEXT
 * ============================================================ */

export function setFont(
  ctx: CanvasRenderingContext2D,
  family: keyof typeof FONT_STACKS,
  size: number,
  weight: number | string,
  italic = false
): void {
  const stack = FONT_STACKS[family] ?? FONT_STACKS.sans;
  ctx.font = `${italic ? "italic " : ""}${weight} ${size}px ${stack}`;
}

/* ============================================================
 * IMAGE LOADING
 * ============================================================ */

export function loadImageFromDataUrl(
  dataUrl: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = dataUrl;
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
