import QRCode from "qrcode";

export interface QRGenerateOptions {
  size?: number;
  margin?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  colorDark?: string;
  colorLight?: string;
}

export async function generateQRDataURL(
  text: string,
  options: QRGenerateOptions = {}
): Promise<string> {
  const {
    size = 512,
    margin = 2,
    errorCorrectionLevel = "M",
    colorDark = "#1A1114",
    colorLight = "#FFFFFF",
  } = options;

  return QRCode.toDataURL(text, {
    width: size,
    margin,
    errorCorrectionLevel,
    color: { dark: colorDark, light: colorLight },
  });
}

export async function generateQRSVG(
  text: string,
  options: QRGenerateOptions = {}
): Promise<string> {
  const { margin = 2, errorCorrectionLevel = "M" } = options;
  return QRCode.toString(text, { type: "svg", margin, errorCorrectionLevel });
}

export function buildWiFiString(
  ssid: string,
  password: string,
  security: "WPA" | "WEP" | "nopass" = "WPA",
  hidden = false
): string {
  return `WIFI:T:${security};S:${ssid};P:${password};${hidden ? "H:true;" : ""};`;
}

export function buildEmailString(to: string, subject = "", body = ""): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${to}${qs ? `?${qs}` : ""}`;
}

export function buildPhoneString(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function buildSMSString(phone: string, message = ""): string {
  return `sms:${phone.replace(/\s/g, "")}${message ? `?body=${encodeURIComponent(message)}` : ""}`;
}

export function buildVCardString(data: {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
  title?: string;
  website?: string;
  address?: string;
}): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${data.lastName ?? ""};${data.firstName};;;`,
    `FN:${[data.firstName, data.lastName].filter(Boolean).join(" ")}`,
  ];
  if (data.company) lines.push(`ORG:${data.company}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR:;;${data.address};;;;`);
  lines.push("END:VCARD");
  return lines.join("\n");
}
