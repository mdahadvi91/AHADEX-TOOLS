import JsBarcode from "jsbarcode";
import type { BarcodeFormat, BarcodeOptions, FormatDefinition } from "./types";

export const FORMATS: FormatDefinition[] = [
  { value: "CODE128", label: "CODE128", hint: "Any text or numbers, most versatile", example: "AHADEX-2026" },
  { value: "CODE39", label: "CODE39", hint: "Uppercase + digits + - . $ / + %", example: "AHADEX-TOOLS" },
  { value: "EAN13", label: "EAN-13", hint: "Exactly 13 digits (or 12 auto-checksum)", example: "590123412345" },
  { value: "EAN8", label: "EAN-8", hint: "Exactly 8 digits (or 7 auto-checksum)", example: "9638507" },
  { value: "UPC", label: "UPC-A", hint: "Exactly 12 digits (or 11 auto-checksum)", example: "12345678901" },
  { value: "ITF14", label: "ITF-14", hint: "Exactly 14 digits (or 13 auto-checksum)", example: "1234567890123" },
  { value: "MSI", label: "MSI", hint: "Digits only, inventory/shelf labels", example: "12345678" },
  { value: "pharmacode", label: "Pharmacode", hint: "Number 3–131070, pharma packaging", example: "1234" },
  { value: "codabar", label: "Codabar", hint: "Digits + A/B/C/D start/stop", example: "A1234567B" },
];

export const DEFAULT_OPTIONS: BarcodeOptions = {
  format: "CODE128",
  width: 2,
  height: 100,
  displayValue: true,
  fontSize: 18,
  textMargin: 4,
  margin: 10,
  lineColor: "#1A1114",
  background: "#FFFFFF",
};

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

/**
 * Renders a barcode onto an SVG element.
 * Returns an error string if the value doesn't match the format.
 */
export function renderBarcode(
  svg: SVGSVGElement,
  value: string,
  opts: BarcodeOptions
): string | null {
  if (!value.trim()) {
    svg.innerHTML = "";
    return null;
  }
  try {
    JsBarcode(svg, value, {
      format: opts.format,
      width: opts.width,
      height: opts.height,
      displayValue: opts.displayValue,
      fontSize: opts.fontSize,
      textMargin: opts.textMargin,
      margin: opts.margin,
      lineColor: opts.lineColor,
      background: opts.background,
      font: "monospace",
      valid: () => { /* handled below */ },
    });
    return null;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid input for this format";
    svg.innerHTML = "";
    return msg;
  }
}

export function svgToString(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return new XMLSerializer().serializeToString(clone);
}

export function downloadSvg(svg: SVGSVGElement, filename: string): void {
  const svgStr = svgToString(svg);
  const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadPng(svg: SVGSVGElement, filename: string, scale = 3): Promise<void> {
  const svgStr = svgToString(svg);
  const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error("Failed to load SVG"));
      i.src = url;
    });

    const canvas = document.createElement("canvas");
    const rect = svg.getBoundingClientRect();
    const w = Math.max(rect.width || 300, 200);
    const h = Math.max(rect.height || 150, 100);
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function copySvg(svg: SVGSVGElement): Promise<void> {
  const svgStr = svgToString(svg);
  await navigator.clipboard.writeText(svgStr);
}

export function findFormat(fmt: BarcodeFormat): FormatDefinition {
  return FORMATS.find((f) => f.value === fmt) ?? FORMATS[0];
}
