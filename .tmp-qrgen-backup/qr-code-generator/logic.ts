import QRCode from "qrcode";
import type {
  QrType, ErrorLevel, QrOptions, WifiData, VCardData, LocationData,
} from "./types";

export const DEFAULT_OPTIONS: QrOptions = {
  errorLevel: "M",
  size: 512,
  foreground: "#1A1114",
  background: "#FFFFFF",
  margin: 2,
};

export function buildPayload(
  type: QrType,
  simple: string,
  wifi: WifiData,
  vcard: VCardData,
  location: LocationData
): string {
  switch (type) {
    case "text":
      return simple;
    case "url": {
      const trimmed = simple.trim();
      if (!trimmed) return "";
      return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    }
    case "wifi": {
      const esc = (s: string) => s.replace(/([\\;,":])/g, "\\$1");
      const parts = [
        `T:${wifi.encryption}`,
        `S:${esc(wifi.ssid)}`,
      ];
      if (wifi.encryption !== "nopass") parts.push(`P:${esc(wifi.password)}`);
      if (wifi.hidden) parts.push("H:true");
      return `WIFI:${parts.join(";")};;`;
    }
    case "email":
      return simple.trim() ? `mailto:${simple.trim()}` : "";
    case "phone":
      return simple.trim() ? `tel:${simple.trim()}` : "";
    case "sms":
      return simple.trim() ? `smsto:${simple.trim()}` : "";
    case "vcard": {
      const lines = ["BEGIN:VCARD", "VERSION:3.0"];
      const name = `${vcard.firstName} ${vcard.lastName}`.trim();
      if (name) lines.push(`FN:${name}`);
      if (vcard.lastName || vcard.firstName) {
        lines.push(`N:${vcard.lastName};${vcard.firstName};;;`);
      }
      if (vcard.organization) lines.push(`ORG:${vcard.organization}`);
      if (vcard.title) lines.push(`TITLE:${vcard.title}`);
      if (vcard.phone) lines.push(`TEL;TYPE=CELL:${vcard.phone}`);
      if (vcard.email) lines.push(`EMAIL:${vcard.email}`);
      if (vcard.website) lines.push(`URL:${vcard.website}`);
      lines.push("END:VCARD");
      return lines.join("\n");
    }
    case "location":
      if (!location.latitude || !location.longitude) return "";
      return `geo:${location.latitude},${location.longitude}`;
  }
}

export async function generateQrDataUrl(
  payload: string,
  opts: QrOptions
): Promise<string> {
  if (!payload.trim()) return "";
  return await QRCode.toDataURL(payload, {
    errorCorrectionLevel: opts.errorLevel as ErrorLevel,
    width: opts.size,
    margin: opts.margin,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
  });
}

export async function generateQrSvg(
  payload: string,
  opts: QrOptions
): Promise<string> {
  if (!payload.trim()) return "";
  return await QRCode.toString(payload, {
    type: "svg",
    errorCorrectionLevel: opts.errorLevel as ErrorLevel,
    width: opts.size,
    margin: opts.margin,
    color: {
      dark: opts.foreground,
      light: opts.background,
    },
  });
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadSvg(svg: string, filename: string): void {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  downloadDataUrl(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export const PAYLOAD_PLACEHOLDER: Record<QrType, { en: string; bn: string }> = {
  text: { en: "Type any text here...", bn: "যেকোনো টেক্সট লিখুন..." },
  url: { en: "https://example.com", bn: "https://example.com" },
  wifi: { en: "Wi-Fi credentials", bn: "Wi-Fi তথ্য" },
  email: { en: "hello@example.com", bn: "hello@example.com" },
  phone: { en: "+8801700000000", bn: "+৮৮০১৭০০০০০০০০" },
  sms: { en: "+8801700000000", bn: "+৮৮০১৭০০০০০০০০" },
  vcard: { en: "Contact details", bn: "যোগাযোগের তথ্য" },
  location: { en: "Latitude, longitude", bn: "অক্ষাংশ, দ্রাঘিমাংশ" },
};
