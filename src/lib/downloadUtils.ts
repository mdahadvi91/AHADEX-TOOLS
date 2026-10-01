import { saveAs } from "file-saver";

export function downloadBlob(blob: Blob, filename: string): void {
  saveAs(blob, filename);
}

export function downloadText(
  text: string,
  filename: string,
  mimeType = "text/plain;charset=utf-8"
): void {
  const blob = new Blob([text], { type: mimeType });
  saveAs(blob, filename);
}

export function downloadJSON(data: unknown, filename: string): void {
  const text = JSON.stringify(data, null, 2);
  downloadText(text, filename, "application/json;charset=utf-8");
}

export function downloadDataURL(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadFromURL(url: string, filename: string): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
