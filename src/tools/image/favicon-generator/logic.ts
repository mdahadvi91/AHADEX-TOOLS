import { announceDownload } from "@lib/speech";
import type { LoadedImage, FaviconOptions, GeneratedFile, GenerationResult } from "./types";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];

export const DEFAULT_OPTIONS: FaviconOptions = {
  padding: 10,
  background: "auto",
  customBackground: "#8B3A4F",
  rounded: false,
  radius: 20,
};

export const FAVICON_SIZES = [
  { size: 16, label: "16×16 (browser)" },
  { size: 32, label: "32×32 (browser)" },
  { size: 48, label: "48×48 (Windows)" },
  { size: 96, label: "96×96 (high-DPI)" },
  { size: 180, label: "180×180 (apple-touch)" },
  { size: 192, label: "192×192 (Android)" },
  { size: 512, label: "512×512 (PWA)" },
];

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
  if (!ACCEPTED_TYPES.includes(file.type)) return "Only JPG, PNG, WebP, and SVG files are supported.";
  if (file.size > MAX_FILE_SIZE) return "File is too large (max 10 MB).";
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
    img.crossOrigin = "anonymous";
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
  if (err) { onError?.(err); return null; }
  try {
    const dataUrl = await fileToDataUrl(file);
    const element = await loadImage(dataUrl);
    return {
      id: makeId(),
      name: file.name,
      dataUrl,
      element,
      width: element.naturalWidth,
      height: element.naturalHeight,
    };
  } catch (e) {
    onError?.(e instanceof Error ? e.message : "Failed to load image");
    return null;
  }
}

function detectAutoBackground(img: HTMLImageElement): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = Math.min(img.naturalWidth, 64);
  canvas.height = Math.min(img.naturalHeight, 64);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, 4, 4).data;
  const r = data[0], g = data[1], b = data[2], a = data[3];
  if (a < 30) return null; // transparent
  return `rgb(${r}, ${g}, ${b})`;
}

async function renderAtSize(
  img: LoadedImage,
  size: number,
  opts: FaviconOptions
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  // Background
  if (opts.background !== "transparent") {
    let bg = opts.customBackground;
    if (opts.background === "auto") {
      bg = detectAutoBackground(img.element) ?? opts.customBackground;
    } else if (opts.background === "white") bg = "#FFFFFF";
    else if (opts.background === "black") bg = "#000000";

    if (opts.rounded) {
      const r = (opts.radius / 100) * size;
      ctx.beginPath();
      // Rounded rect via arcTo
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.fillStyle = bg;
      ctx.fill();
    } else {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
    }
  } else if (opts.rounded) {
    ctx.beginPath();
    const r = (opts.radius / 100) * size;
    ctx.moveTo(r, 0);
    ctx.arcTo(size, 0, size, size, r);
    ctx.arcTo(size, size, 0, size, r);
    ctx.arcTo(0, size, 0, 0, r);
    ctx.arcTo(0, 0, size, 0, r);
    ctx.closePath();
    ctx.clip();
  }

  // Image centered with padding
  const padding = (opts.padding / 100) * size;
  const avail = size - padding * 2;
  const ratio = img.width / img.height;
  let drawW = avail, drawH = avail;
  if (ratio > 1) drawH = avail / ratio;
  else drawW = avail * ratio;
  const x = (size - drawW) / 2;
  const y = (size - drawH) / 2;
  ctx.drawImage(img.element, x, y, drawW, drawH);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG encode failed"))), "image/png");
  });
  return blob;
}

/* ── ICO packer (PNG-in-ICO) ── */
async function packIco(pngBlobs: { size: number; blob: Blob }[]): Promise<Blob> {
  const headerSize = 6 + 16 * pngBlobs.length;
  const entries: Uint8Array[] = [];
  const imageBuffers: ArrayBuffer[] = [];

  let offset = headerSize;
  for (const { size, blob } of pngBlobs) {
    const buf = await blob.arrayBuffer();
    imageBuffers.push(buf);
    const entry = new Uint8Array(16);
    entry[0] = size >= 256 ? 0 : size;
    entry[1] = size >= 256 ? 0 : size;
    entry[2] = 0; // palette
    entry[3] = 0;
    // planes (2)
    entry[4] = 1; entry[5] = 0;
    // bitCount (2)
    entry[6] = 32; entry[7] = 0;
    // bytes in resource
    const d = new DataView(entry.buffer);
    d.setUint32(8, buf.byteLength, true);
    d.setUint32(12, offset, true);
    entries.push(entry);
    offset += buf.byteLength;
  }

  const header = new Uint8Array(6);
  const hv = new DataView(header.buffer);
  hv.setUint16(0, 0, true);
  hv.setUint16(2, 1, true);
  hv.setUint16(4, pngBlobs.length, true);

  // Copy each Uint8Array into a fresh ArrayBuffer (avoids SharedArrayBuffer type union)
  const toArrayBuffer = (u: Uint8Array): ArrayBuffer => {
    const ab = new ArrayBuffer(u.byteLength);
    new Uint8Array(ab).set(u);
    return ab;
  };

  const parts: BlobPart[] = [
    toArrayBuffer(header),
    ...entries.map(toArrayBuffer),
    ...imageBuffers.map((b) => b.slice(0) as ArrayBuffer),
  ];
  return new Blob(parts, { type: "image/x-icon" });
}

export async function generateAll(
  img: LoadedImage,
  opts: FaviconOptions,
  includeIco: boolean
): Promise<GenerationResult> {
  const files: GeneratedFile[] = [];

  for (const { size, label } of FAVICON_SIZES) {
    const blob = await renderAtSize(img, size, opts);
    files.push({
      filename: size === 180 ? "apple-touch-icon.png" : `favicon-${size}x${size}.png`,
      blob,
      url: URL.createObjectURL(blob),
      size: blob.size,
      width: size,
      height: size,
      label,
    });
  }

  if (includeIco) {
    const icoBlobs = await Promise.all(
      [16, 32, 48].map(async (s) => ({ size: s, blob: await renderAtSize(img, s, opts) }))
    );
    const ico = await packIco(icoBlobs);
    files.push({
      filename: "favicon.ico",
      blob: ico,
      url: URL.createObjectURL(ico),
      size: ico.size,
      width: 48,
      height: 48,
      label: "favicon.ico (16+32+48)",
    });
  }

  const manifest = JSON.stringify(
    {
      name: "Site",
      short_name: "Site",
      icons: [
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      theme_color: "#8B3A4F",
      background_color: "#1A1114",
      display: "standalone",
    },
    null,
    2
  );

  return { files, manifest };
}

export function downloadFile(file: GeneratedFile): void {
  const a = document.createElement("a");
  a.href = file.url;
  a.download = file.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  announceDownload();
}

export function downloadManifest(manifest: string): void {
  const blob = new Blob([manifest], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "site.webmanifest";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function revokeFiles(files: GeneratedFile[]): void {
  files.forEach((f) => URL.revokeObjectURL(f.url));
}
