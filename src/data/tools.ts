import type { Tool } from "@types/tool";

/* ============================================================
 * AHADEX Tools — Working Tools Registry
 * ------------------------------------------------------------
 * Only tools that are IMPLEMENTED and have working routes.
 *
 * Planned but unimplemented tools live in:
 *   src/data/plannedTools.ts
 *
 * DO NOT add tools here until they have:
 *   - A registered route in src/App.tsx
 *   - A working implementation in src/tools/
 * ============================================================ */

export const tools: Tool[] = [
  {
    id: "photo-qr",
    slug: "photo-qr",
    name: "Photo QR Code",
    category: "qr",
    path: "/tools/photo-qr",
    description:
      "Add a real, scannable QR badge to any photo — WhatsApp, Facebook, WiFi, and more.",
    longDescription:
      "Photo QR Code lets you add a real, scannable QR code to any photo in seconds. Upload a picture, choose a platform (WhatsApp, Facebook, Instagram, Telegram, phone, email, WiFi, website, SMS, or contact card), enter your details, and we'll place a scannable QR badge on a corner of your photo. The photo stays exactly as it was — only the badge is added. Every QR is generated with error-correction level H so it scans perfectly even when printed, and includes the platform's official logo in the center.",
    keywords: ["photo", "qr", "image", "badge", "whatsapp", "facebook"],
    popular: true,
    newTool: false,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["visiting-card"],
    seo: {
      title: "Photo QR Code — Add QR to Photos Free | AHADEX Tools",
      description:
        "Add a real, scannable QR code to any photo. WhatsApp, Facebook, Instagram, WiFi, and more. Free, private, no uploads.",
      ogImage: "/images/og/tools/photo-qr-og.svg",
    },
  },
  {
    id: "visiting-card",
    slug: "visiting-card",
    name: "Visiting Card Maker",
    category: "image",
    path: "/tools/visiting-card",
    description:
      "Design print-ready visiting cards in seconds. 20 premium templates — front & back. Free, private, exports PNG/JPG.",
    longDescription:
      "Visiting Card Maker turns a blank canvas into a professional business card in under a minute. Choose from 20 hand-designed premium templates — each with a matching front and back — fill in your details, pick a logo, and download a print-ready file in PNG or JPG up to 600 DPI. Every card auto-generates a scannable QR code. Everything runs in your browser; nothing is ever uploaded.",
    keywords: [
      "visiting card",
      "business card",
      "card maker",
      "design",
      "print ready",
      "double side",
      "single side",
    ],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["photo-qr"],
    seo: {
      title:
        "Visiting Card Maker — Free Business Card Designer | AHADEX Tools",
      description:
        "Design print-ready visiting cards with live preview. 20 premium templates. Free, private, PNG/JPG export.",
      ogImage: "/images/og/tools/visiting-card-og.svg",
    },
  },
];

export const TOOL_COUNT = tools.length;
