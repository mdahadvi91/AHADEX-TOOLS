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
  {
    id: "png-to-webp",
    slug: "png-to-webp",
    name: "PNG to WebP",
    path: "/tools/png-to-webp",
    description:
      "Convert PNG images to modern WebP format. 30-50% smaller files, transparency preserved, batch-capable, no uploads.",
    longDescription:
      "PNG to WebP Converter re-encodes your PNG images as modern WebP files. Unlike JPG, WebP keeps transparency, making it perfect for logos and graphics. Everything runs in your browser — no uploads, no servers, no accounts.",
    keywords: ["png", "webp", "convert", "image", "converter", "transparent"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: ["jpg-to-webp", "png-to-jpg"],
    seo: {
      title:
        "PNG to WebP Converter — Free, Fast & Private | AHADEX Tools",
      description:
        "Convert PNG to WebP instantly. 30-50% smaller files, transparency preserved, batch, no uploads.",
      ogImage: "/images/og/default-og.svg",
    },
  },
  {
    id: "webp-to-jpg",
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    path: "/tools/webp-to-jpg",
    description: "Convert WebP images to JPG format. Universal compatibility, no uploads.",
    longDescription: "WebP to JPG Converter re-encodes WebP images as standard JPG at 92% quality. Everything runs in your browser.",
    keywords: ["webp", "jpg", "convert"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "WebP to JPG Converter", description: "Convert WebP to JPG.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "webp-to-png",
    slug: "webp-to-png",
    name: "WebP to PNG",
    path: "/tools/webp-to-png",
    description: "Convert WebP images to PNG format. Lossless output, transparency preserved, no uploads.",
    longDescription: "WebP to PNG Converter re-encodes WebP images as lossless PNG files. Transparency is preserved. Everything runs in your browser.",
    keywords: ["webp", "png", "convert", "lossless"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "WebP to PNG Converter — Free & Private | AHADEX Tools", description: "Convert WebP to PNG instantly. Lossless, transparency preserved.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    path: "/tools/image-compressor",
    description: "Compress JPG, PNG, and WebP images in your browser. Adjustable quality, batch, no uploads.",
    longDescription: "Image Compressor shrinks JPG, PNG, and WebP files using the browser native encoder. Adjust quality and max width, see the savings live, and download.",
    keywords: ["image compressor", "compress", "jpg", "png", "webp"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "Image Compressor — Free, Fast & Private | AHADEX Tools", description: "Compress images in your browser. Adjustable quality, batch, no uploads.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Image Resizer",
    path: "/tools/image-resizer",
    description: "Resize JPG, PNG, and WebP images to any dimension in your browser. Lock aspect ratio, exact width/height, no uploads.",
    longDescription: "Image Resizer changes the pixel dimensions of JPG, PNG, and WebP files. Set exact width and height, optionally lock aspect ratio, and download resized files. Everything runs in your browser.",
    keywords: ["image resizer", "resize", "jpg", "png", "webp", "dimensions"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "Image Resizer — Free, Fast & Private | AHADEX Tools", description: "Resize images in your browser to any dimension.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "jpg-to-pdf",
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    path: "/tools/jpg-to-pdf",
    description: "Combine JPG images into a multi-page PDF in your browser. Reorderable, A4/Letter, no uploads.",
    longDescription: "JPG to PDF Converter combines one or many JPG images into a clean multi-page PDF. Reorder pages, choose A4 or Letter, set orientation and margins, and export — all in your browser using pdf-lib.",
    keywords: ["jpg to pdf", "jpeg to pdf", "image to pdf", "convert"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "JPG to PDF Converter — Free, Fast & Private | AHADEX Tools", description: "Convert JPG to PDF in your browser. Multi-page, reorderable.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "png-to-pdf",
    slug: "png-to-pdf",
    name: "PNG to PDF",
    path: "/tools/png-to-pdf",
    description: "Combine PNG images into a multi-page PDF in your browser. Reorderable, A4/Letter, white background, no uploads.",
    longDescription: "PNG to PDF Converter combines one or many PNG images into a clean multi-page PDF. Reorder pages, choose A4 or Letter, set orientation and margins, and export — all in your browser using pdf-lib. Transparent PNG areas are composited onto white for print-safe output.",
    keywords: ["png to pdf", "image to pdf", "convert"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "PNG to PDF Converter — Free, Fast & Private | AHADEX Tools", description: "Convert PNG to PDF in your browser. Multi-page, reorderable.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "image-cropper",
    slug: "image-cropper",
    name: "Image Cropper",
    path: "/tools/image-cropper",
    description: "Crop JPG, PNG, and WebP images in your browser. 8 aspect presets, live preview, pixel-precise fields, no uploads.",
    longDescription: "Image Cropper trims any JPG, PNG, or WebP image to the exact area you want. Drag the crop box, pick from aspect presets, or type exact coordinates. Everything runs in your browser with the Canvas API.",
    keywords: ["image cropper", "crop", "jpg", "png", "webp", "aspect ratio"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "Image Cropper — Free, Fast & Private | AHADEX Tools", description: "Crop images in your browser with aspect presets.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDF",
    path: "/tools/merge-pdf",
    description: "Combine multiple PDF files into one document in your browser. Reorder, no uploads, no servers.",
    longDescription: "Merge PDF combines two or more PDF files into a single document. Drop files, reorder them, click Merge, and download — all in your browser using pdf-lib. Every page is copied byte-for-byte with no quality loss.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "Merge PDF — Combine PDFs Free, Fast & Private | AHADEX Tools", description: "Merge multiple PDFs in your browser. Reorder, no uploads.", ogImage: "/images/og/default-og.svg" },
  },
  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    path: "/tools/split-pdf",
    description: "Extract pages from any PDF or split every page — in your browser. Custom ranges, no uploads.",
    longDescription: "Split PDF extracts selected page ranges (e.g. 1-3, 5, 7-9) or breaks every page into its own PDF. Everything runs in your browser using pdf-lib — no uploads, no servers.",
    keywords: ["split pdf", "extract pdf", "pdf splitter"],
    popular: true,
    newTool: true,
    features: [],
    howTo: [],
    faq: [],
    relatedTools: [],
    seo: { title: "Split PDF — Extract Pages Free & Private | AHADEX Tools", description: "Split PDFs in your browser. Custom page ranges, no uploads.", ogImage: "/images/og/default-og.svg" },
  },
];

export const TOOL_COUNT = tools.length;
