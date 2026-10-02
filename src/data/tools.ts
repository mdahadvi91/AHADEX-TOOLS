import type { Tool } from "@/types/tool";

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
  {
    id: "cv-builder",
    slug: "cv-builder",
    name: "CV Builder",
    path: "/tools/cv-builder",
    description:
      "Build a professional CV in minutes. Real A4 templates, live preview, selectable-text PDF export, auto-save and full browser-side privacy.",
    longDescription:
      "CV Builder turns a blank page into a professional resume in under ten minutes. Choose a template, fill in your details, and download a print-ready PDF with selectable text, accurate page breaks, and full browser-side privacy. No account, no uploads, no watermarks.",
    keywords: ["cv", "resume", "cv builder", "resume builder", "pdf cv", "ats resume", "cv template"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["visiting-card", "photo-qr"],
    seo: {
      title:
        "Free CV Builder — Create & Download Professional Resumes | AHADEX Tools",
      description:
        "Build a professional CV in minutes. Real A4 templates, selectable-text PDF export, auto-save, full privacy.",
      ogImage: "/images/og/tools/cv-builder-og.svg",
    },
  },
  {
    id: "jpg-to-png",
    slug: "jpg-to-png",
    name: "JPG to PNG",
    path: "/tools/jpg-to-png",
    description:
      "Convert JPG images to PNG format instantly in your browser. Lossless, batch-capable, no uploads.",
    longDescription:
      "JPG to PNG Converter re-encodes your JPEG photos as lossless PNG images. Everything runs in your browser — no uploads, no servers, no accounts. Batch-convert multiple files and download them individually or all at once.",
    keywords: ["jpg", "png", "convert", "image", "converter"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["photo-qr", "image-compressor"],
    seo: {
      title:
        "JPG to PNG Converter — Free, Fast & Private | AHADEX Tools",
      description:
        "Convert JPG to PNG instantly in your browser. Lossless, batch, no uploads.",
      ogImage: "/images/og/default-og.svg",
    },
  },
  {
    id: "png-to-jpg",
    slug: "png-to-jpg",
    name: "PNG to JPG",
    path: "/tools/png-to-jpg",
    description:
      "Convert PNG images to JPG format instantly in your browser. Smaller files, universal compatibility, no uploads.",
    longDescription:
      "PNG to JPG Converter re-encodes your PNG images as compressed JPG files. Everything runs in your browser — no uploads, no servers, no accounts. Batch-convert multiple files and download them individually or all at once. JPG files are typically 5-10x smaller than the original PNGs.",
    keywords: ["png", "jpg", "convert", "image", "converter"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["jpg-to-png", "photo-qr"],
    seo: {
      title:
        "PNG to JPG Converter — Free, Fast & Private | AHADEX Tools",
      description:
        "Convert PNG to JPG instantly in your browser. Smaller files, batch, no uploads.",
      ogImage: "/images/og/default-og.svg",
    },
  },
  {
    id: "jpg-to-webp",
    slug: "jpg-to-webp",
    name: "JPG to WebP",
    path: "/tools/jpg-to-webp",
    description:
      "Convert JPG images to modern WebP format. 25-35% smaller files at the same quality. Batch-capable, no uploads.",
    longDescription:
      "JPG to WebP Converter re-encodes your JPEG photos as modern WebP images. Everything runs in your browser — no uploads, no servers, no accounts. WebP files are typically 25-35% smaller than JPG at the same visual quality.",
    keywords: ["jpg", "webp", "convert", "image", "converter"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["jpg-to-png", "png-to-jpg"],
    seo: {
      title:
        "JPG to WebP Converter — Free, Fast & Private | AHADEX Tools",
      description:
        "Convert JPG to WebP instantly. 25-35% smaller files, batch, no uploads.",
      ogImage: "/images/og/default-og.svg",
    },
  },
];

export const TOOL_COUNT = tools.length;
