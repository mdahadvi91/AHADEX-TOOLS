import { announceDownload } from "@lib/speech";
import type { SvgInfo, PngResult, RenderOptions } from "./types";

export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/svg+xml", "text/xml", "application/xml"];
export const MAX_DIMENSION = 4096;

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
  const isSvg =
    ACCEPTED_TYPES.includes(file.type) ||
    file.name.toLowerCase().endsWith(".svg");
  if (!isSvg) return "Only SVG files are supported.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 20 MB).";
  return null;
}

export function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

export function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load SVG"));
    img.src = url;
  });
}

function parseSvgDimensions(svgText: string): { w: number; h: number } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;

  const wAttr = svg.getAttribute("width");
  const hAttr = svg.getAttribute("height");
  const viewBox = svg.getAttribute("viewBox");

  let w = 0;
  let h = 0;

  if (wAttr) w = parseFloat(wAttr);
  if (hAttr) h = parseFloat(hAttr);

  if ((!w || !h) && viewBox) {
    const parts = viewBox.split(/[\s,]+/).map(Number);
    if (parts.length === 4) {
      if (!w) w = parts[2];
      if (!h) h = parts[3];
    }
  }

  if (!w) w = 512;
  if (!h) h = 512;

  return { w, h };
}

export async function loadSvgFile(
  file: File,
  onError?: (msg: string) => void
): Promise<SvgInfo | null> {
  const err = validateFile(file);
  if (err) {
    onError?.(err);
    return null;
  }
  try {
    const svgText = await fileToText(file);
    const { w, h } = parseSvgDimensions(svgText);
    // Ensure the SVG has a viewBox so canvas renders reliably
    let patched = svgText;
    if (!/viewBox=/i.test(svgText)) {
      patched = svgText.replace(
        /<svg\b/i,
        `<svg viewBox="0 0 ${w} ${h}"`
      );
    }
    const blob = new Blob([patched], { type: "image/svg+xml;charset=utf-8" });
    const dataUrl = URL.createObjectURL(blob);
    // Ensure the image actually loads
    await loadImageFromUrl(dataUrl);
    return {
      id: makeId(),
      name: file.name,
      size: file.size,
      dataUrl,
      svgText: patched,
      width: w,
      height: h,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to read SVG");
    return null;
  }
}

export async function renderToPng(
  svg: SvgInfo,
  opts: RenderOptions
): Promise<PngResult> {
  const img = await loadImageFromUrl(svg.dataUrl);

  const targetW = Math.min(MAX_DIMENSION, Math.round(svg.width * opts.scale));
  const targetH = Math.min(MAX_DIMENSION, Math.round(svg.height * opts.scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  if (opts.background !== "transparent") {
    ctx.fillStyle = opts.background === "white" ? "#FFFFFF" : "#000000";
    ctx.fillRect(0, 0, targetW, targetH);
  }

  ctx.drawImage(img, 0, 0, targetW, targetH);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))),
      "image/png"
    );
  });

  const url = URL.createObjectURL(blob);
  const baseName = svg.name.replace(/\.svg$/i, "");
  return {
    blob,
    url,
    size: blob.size,
    filename: `${baseName}@${opts.scale}x.png`,
    width: targetW,
    height: targetH,
  };
}

export function downloadPng(result: PngResult): void {
  const a = document.createElement("a");
  a.href = result.url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function revokePng(result: PngResult): void {
  URL.revokeObjectURL(result.url);
}

export function revokeSvg(svg: SvgInfo): void {
  URL.revokeObjectURL(svg.dataUrl);
}
