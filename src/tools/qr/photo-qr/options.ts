import {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiTelegram,
} from "react-icons/si";
import {
  FiPhone,
  FiMail,
  FiWifi,
  FiGlobe,
  FiMessageSquare,
  FiUser,
  FiType,
} from "react-icons/fi";
import { Square, Squircle, Frame } from "lucide-react";
import type { PlatformConfig, Position, QrBackground } from "./types";

/* ============================================================
 * PLATFORMS
 * ============================================================ */

export const PLATFORMS: PlatformConfig[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    nameBn: "হোয়াটসঅ্যাপ",
    color: "#25D366",
    Icon: SiWhatsapp,
    fields: [
      {
        key: "phone",
        label: "Enter your WhatsApp number",
        labelBn: "আপনার হোয়াটসঅ্যাপ নম্বর লিখুন",
        placeholder: "+8801712345678",
        placeholderBn: "+৮৮০১৭১২৩৪৫৬৭৮",
        type: "tel",
      },
    ],
    buildPayload: (v) =>
      `https://wa.me/${(v.phone || "").replace(/[^\d]/g, "")}`,
  },
  {
    id: "facebook",
    name: "Facebook",
    nameBn: "ফেসবুক",
    color: "#1877F2",
    Icon: SiFacebook,
    fields: [
      {
        key: "url",
        label: "Enter your Facebook link",
        labelBn: "আপনার ফেসবুক লিংক লিখুন",
        placeholder: "https://facebook.com/username",
        placeholderBn: "https://facebook.com/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "instagram",
    name: "Instagram",
    nameBn: "ইনস্টাগ্রাম",
    color: "#E4405F",
    Icon: SiInstagram,
    fields: [
      {
        key: "url",
        label: "Enter your Instagram link",
        labelBn: "আপনার ইনস্টাগ্রাম লিংক লিখুন",
        placeholder: "https://instagram.com/username",
        placeholderBn: "https://instagram.com/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "telegram",
    name: "Telegram",
    nameBn: "টেলিগ্রাম",
    color: "#0088CC",
    Icon: SiTelegram,
    fields: [
      {
        key: "url",
        label: "Enter your Telegram link",
        labelBn: "আপনার টেলিগ্রাম লিংক লিখুন",
        placeholder: "https://t.me/username",
        placeholderBn: "https://t.me/username",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "phone",
    name: "Phone Call",
    nameBn: "ফোন কল",
    color: "#4A2A3A",
    Icon: FiPhone,
    fields: [
      {
        key: "phone",
        label: "Enter phone number",
        labelBn: "ফোন নম্বর লিখুন",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
    ],
    buildPayload: (v) => `tel:${(v.phone || "").replace(/\s/g, "")}`,
  },
  {
    id: "email",
    name: "Email",
    nameBn: "ইমেইল",
    color: "#8B3A4F",
    Icon: FiMail,
    fields: [
      {
        key: "email",
        label: "Enter email address",
        labelBn: "ইমেইল ঠিকানা লিখুন",
        placeholder: "you@example.com",
        placeholderBn: "you@example.com",
        type: "email",
      },
      {
        key: "subject",
        label: "Subject (optional)",
        labelBn: "বিষয় (ঐচ্ছিক)",
        placeholder: "Hello!",
        placeholderBn: "হ্যালো!",
        type: "text",
      },
    ],
    buildPayload: (v) => {
      const s = v.subject ? `?subject=${encodeURIComponent(v.subject)}` : "";
      return `mailto:${v.email}${s}`;
    },
  },
  {
    id: "wifi",
    name: "WiFi",
    nameBn: "ওয়াইফাই",
    color: "#C99667",
    Icon: FiWifi,
    fields: [
      {
        key: "ssid",
        label: "WiFi network name (SSID)",
        labelBn: "ওয়াইফাই নেটওয়ার্কের নাম",
        placeholder: "MyHomeWiFi",
        placeholderBn: "MyHomeWiFi",
        type: "text",
      },
      {
        key: "password",
        label: "WiFi password",
        labelBn: "ওয়াইফাই পাসওয়ার্ড",
        placeholder: "••••••••",
        placeholderBn: "••••••••",
        type: "password",
      },
    ],
    buildPayload: (v) => `WIFI:T:WPA;S:${v.ssid};P:${v.password};;`,
  },
  {
    id: "website",
    name: "Website",
    nameBn: "ওয়েবসাইট",
    color: "#8B9DC7",
    Icon: FiGlobe,
    fields: [
      {
        key: "url",
        label: "Enter website URL",
        labelBn: "ওয়েবসাইট URL লিখুন",
        placeholder: "https://example.com",
        placeholderBn: "https://example.com",
        type: "url",
      },
    ],
    buildPayload: (v) => v.url || "",
  },
  {
    id: "sms",
    name: "SMS",
    nameBn: "এসএমএস",
    color: "#B36878",
    Icon: FiMessageSquare,
    fields: [
      {
        key: "phone",
        label: "Enter phone number",
        labelBn: "ফোন নম্বর লিখুন",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
      {
        key: "message",
        label: "Message (optional)",
        labelBn: "বার্তা (ঐচ্ছিক)",
        placeholder: "Hi there!",
        placeholderBn: "হ্যালো!",
        type: "text",
      },
    ],
    buildPayload: (v) =>
      `sms:${(v.phone || "").replace(/\s/g, "")}${
        v.message ? `?body=${encodeURIComponent(v.message)}` : ""
      }`,
  },
  {
    id: "vcard",
    name: "Contact",
    nameBn: "যোগাযোগ",
    color: "#D88B9A",
    Icon: FiUser,
    fields: [
      {
        key: "name",
        label: "Your name",
        labelBn: "আপনার নাম",
        placeholder: "Jane Doe",
        placeholderBn: "করিম আহমেদ",
        type: "text",
      },
      {
        key: "phone",
        label: "Phone number",
        labelBn: "ফোন নম্বর",
        placeholder: "+971507975837",
        placeholderBn: "+৯৭১৫০৭৯৭৫৮৩৭",
        type: "tel",
      },
      {
        key: "email",
        label: "Email (optional)",
        labelBn: "ইমেইল (ঐচ্ছিক)",
        placeholder: "you@example.com",
        placeholderBn: "you@example.com",
        type: "email",
      },
    ],
    buildPayload: (v) => {
      const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${v.name || ""}`];
      if (v.phone) lines.push(`TEL:${v.phone}`);
      if (v.email) lines.push(`EMAIL:${v.email}`);
      lines.push("END:VCARD");
      return lines.join("\n");
    },
  },
  {
    id: "text",
    name: "Plain Text",
    nameBn: "সাধারণ টেক্সট",
    color: "#4A2A3A",
    Icon: FiType,
    fields: [
      {
        key: "text",
        label: "Enter text",
        labelBn: "টেক্সট লিখুন",
        placeholder: "Any text you want...",
        placeholderBn: "যেকোনো টেক্সট...",
        type: "text",
      },
    ],
    buildPayload: (v) => v.text || "",
  },
];

export function getPlatform(id: string): PlatformConfig | undefined {
  return PLATFORMS.find((p) => p.id === id);
}

/* ============================================================
 * POSITIONS
 * ============================================================ */

export const POSITIONS: {
  id: Position;
  label: string;
  labelBn: string;
}[] = [
  { id: "top-left", label: "Top left", labelBn: "উপরে বাম" },
  { id: "top-right", label: "Top right", labelBn: "উপরে ডান" },
  { id: "bottom-left", label: "Bottom left", labelBn: "নিচে বাম" },
  { id: "bottom-right", label: "Bottom right", labelBn: "নিচে ডান" },
];

/* ============================================================
 * QR BACKGROUNDS
 * ============================================================ */

export const QR_BACKGROUNDS: {
  id: QrBackground;
  label: string;
  labelBn: string;
  Icon: typeof Square;
}[] = [
  { id: "white", label: "White", labelBn: "সাদা", Icon: Square },
  { id: "rounded", label: "Rounded", labelBn: "গোল", Icon: Squircle },
  { id: "none", label: "None", labelBn: "নেই", Icon: Frame },
];

/* ============================================================
 * SLIDER RANGES
 * ============================================================ */

export const SIZE_RANGE = { min: 10, max: 35, step: 1, default: 20 };
export const PADDING_RANGE = { min: 0, max: 40, step: 1, default: 10 };

/* ============================================================
 * FILE UPLOAD
 * ============================================================ */

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ACCEPT_ATTR = "image/jpeg,image/png,image/webp,image/*";
