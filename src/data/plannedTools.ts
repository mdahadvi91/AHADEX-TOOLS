/* ============================================================
 * PLANNED TOOLS — Coming Soon
 * ------------------------------------------------------------
 * Tools visible in the "Coming Soon" section.
 * NO routes, NO implementation yet.
 *
 * DO NOT include these in the main tools registry (src/data/tools.ts).
 * ============================================================ */

export interface PlannedTool {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  path: string;
  description: string;
  descriptionBn: string;
  eta?: string;
}

export const plannedTools: PlannedTool[] = [



  {
    id: "jpg-to-webp",
    slug: "jpg-to-webp",
    name: "JPG to WebP",
    nameBn: "JPG থেকে WebP",
    path: "/tools/jpg-to-webp",
    description: "Convert JPG to modern WebP format for smaller files.",
    descriptionBn: "আধুনিক WebP ফরম্যাটে ছোট ফাইলের জন্য রূপান্তর।",
    eta: "Coming soon",
  },


  {
    id: "png-to-webp",
    slug: "png-to-webp",
    name: "PNG to WebP",
    nameBn: "PNG থেকে WebP",
    path: "/tools/png-to-webp",
    description: "Convert PNG to WebP — smaller files with transparency.",
    descriptionBn: "স্বচ্ছতা সহ ছোট WebP ফাইলে রূপান্তর।",
    eta: "Coming soon",
  },


  {
    id: "webp-to-jpg",
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    nameBn: "WebP থেকে JPG",
    path: "/tools/webp-to-jpg",
    description: "Convert WebP to JPG for universal compatibility.",
    descriptionBn: "সার্বজনীন ব্যবহারের জন্য WebP থেকে JPG।",
    eta: "Coming soon",
  },


  {
    id: "webp-to-png",
    slug: "webp-to-png",
    name: "WebP to PNG",
    nameBn: "WebP থেকে PNG",
    path: "/tools/webp-to-png",
    description: "Convert WebP to PNG, preserving transparency.",
    descriptionBn: "স্বচ্ছতা সংরক্ষণ করে WebP থেকে PNG।",
    eta: "Coming soon",
  },


  {
    id: "image-compressor",
    slug: "image-compressor",
    name: "Image Compressor",
    nameBn: "ইমেজ কমপ্রেসর",
    path: "/tools/image-compressor",
    description: "Compress JPG, PNG, and WebP without visible quality loss.",
    descriptionBn: "গুণমান না হারিয়ে JPG, PNG, WebP কমপ্রেস করুন।",
    eta: "Coming soon",
  },


  {
    id: "image-resizer",
    slug: "image-resizer",
    name: "Image Resizer",
    nameBn: "ইমেজ রিসাইজার",
    path: "/tools/image-resizer",
    description: "Resize images to any dimension with aspect ratio control.",
    descriptionBn: "যেকোনো মাপে ছবি রিসাইজ করুন, অনুপাত নিয়ন্ত্রণ সহ।",
    eta: "Coming soon",
  },


  {
    id: "image-cropper",
    slug: "image-cropper",
    name: "Image Cropper",
    nameBn: "ইমেজ ক্রপার",
    path: "/tools/image-cropper",
    description: "Crop images precisely with custom ratio.",
    descriptionBn: "সঠিক অনুপাতে ছবি ক্রপ করুন।",
    eta: "Coming soon",
  },


  {
    id: "image-to-pdf",
    slug: "image-to-pdf",
    name: "Image to PDF",
    nameBn: "ইমেজ থেকে PDF",
    path: "/tools/image-to-pdf",
    description: "Convert images to a multi-page PDF document.",
    descriptionBn: "অনেক ছবি মিলিয়ে একটা PDF তৈরি করুন।",
    eta: "Coming soon",
  },


  {
    id: "image-metadata-viewer",
    slug: "image-metadata-viewer",
    name: "Image Metadata Viewer",
    nameBn: "ইমেজ মেটাডেটা",
    path: "/tools/image-metadata-viewer",
    description: "View EXIF, GPS, and camera metadata in your photos.",
    descriptionBn: "ছবির EXIF, GPS ও ক্যামেরার তথ্য দেখুন।",
    eta: "Coming soon",
  },


  {
    id: "background-remover",
    slug: "background-remover",
    name: "Background Remover",
    nameBn: "ব্যাকগ্রাউন্ড রিমুভার",
    path: "/tools/background-remover",
    description: "Remove image backgrounds automatically with AI.",
    descriptionBn: "AI দিয়ে স্বয়ংক্রিয়ভাবে ছবির ব্যাকগ্রাউন্ড সরান।",
    eta: "Coming soon",
  },


  {
    id: "jpg-to-pdf",
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    nameBn: "JPG থেকে PDF",
    path: "/tools/jpg-to-pdf",
    description: "Convert JPG images into a clean PDF document.",
    descriptionBn: "JPG ছবি পরিষ্কার PDF ডকুমেন্টে রূপান্তর করুন।",
    eta: "Coming soon",
  },


  {
    id: "png-to-pdf",
    slug: "png-to-pdf",
    name: "PNG to PDF",
    nameBn: "PNG থেকে PDF",
    path: "/tools/png-to-pdf",
    description: "Convert PNG images into a PDF file.",
    descriptionBn: "PNG ছবি PDF ফাইলে রূপান্তর করুন।",
    eta: "Coming soon",
  },


  {
    id: "merge-pdf",
    slug: "merge-pdf",
    name: "Merge PDF",
    nameBn: "PDF মার্জ",
    path: "/tools/merge-pdf",
    description: "Combine multiple PDF files into one document.",
    descriptionBn: "একাধিক PDF এক ফাইলে যুক্ত করুন।",
    eta: "Coming soon",
  },


  {
    id: "split-pdf",
    slug: "split-pdf",
    name: "Split PDF",
    nameBn: "PDF স্প্লিট",
    path: "/tools/split-pdf",
    description: "Split a PDF into separate files by page range.",
    descriptionBn: "পেজ রেঞ্জ অনুযায়ী PDF আলাদা করুন।",
    eta: "Coming soon",
  },
];

export const PLANNED_COUNT = plannedTools.length;

export function getPlannedById(id: string): PlannedTool | undefined {
  return plannedTools.find((t) => t.id === id);
}
