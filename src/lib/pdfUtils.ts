import { PDFDocument } from "pdf-lib";
import { readFileAsArrayBuffer } from "./fileUtils";

export async function loadPdf(file: File): Promise<PDFDocument> {
  const buffer = await readFileAsArrayBuffer(file);
  return PDFDocument.load(buffer, { ignoreEncryption: true });
}

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const source = await loadPdf(file);
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  return merged.save();
}

export async function splitPdf(file: File, pageIndices: number[]): Promise<Uint8Array> {
  const source = await loadPdf(file);
  const output = await PDFDocument.create();
  const pages = await output.copyPages(source, pageIndices);
  pages.forEach((page) => output.addPage(page));
  return output.save();
}

export async function getPdfPageCount(file: File): Promise<number> {
  const pdf = await loadPdf(file);
  return pdf.getPageCount();
}

export function parsePageRanges(input: string, max: number): number[] {
  const result = new Set<number>();
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(max, parseInt(endStr, 10) || max);
      for (let i = start; i <= end; i++) result.add(i - 1);
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= max) result.add(n - 1);
    }
  }

  return Array.from(result).sort((a, b) => a - b);
}
