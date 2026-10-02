/* ============================================================
 * Planned Tool Translations (Bangla)
 * ------------------------------------------------------------
 * BN translations for tools listed in src/data/plannedTools.ts
 * that are not yet implemented.
 *
 * These are used ONLY in the "Coming Soon" section.
 * Once a planned tool is implemented, MOVE its translation to
 * src/i18n/toolTranslations.ts.
 * ============================================================ */

import type { ToolTranslation } from "./toolTranslations";

export const plannedToolTranslationsBn: Record<string, ToolTranslation> = {
  // Image
  "jpg-to-png": { name: "JPG থেকে PNG", description: "JPG ছবি PNG ফরম্যাটে রূপান্তর।" },
  "png-to-jpg": { name: "PNG থেকে JPG", description: "PNG ছবি ছোট সাইজের JPG-তে রূপান্তর।" },
  "jpg-to-webp": { name: "JPG থেকে WebP", description: "আধুনিক WebP ফরম্যাটে ছোট ফাইলের জন্য রূপান্তর।" },
  "png-to-webp": { name: "PNG থেকে WebP", description: "স্বচ্ছতা সহ ছোট WebP ফাইলে রূপান্তর।" },
  "webp-to-jpg": { name: "WebP থেকে JPG", description: "সার্বজনীন ব্যবহারের জন্য WebP থেকে JPG।" },
  "webp-to-png": { name: "WebP থেকে PNG", description: "স্বচ্ছতা সংরক্ষণ করে WebP থেকে PNG।" },
  "image-compressor": { name: "ইমেজ কমপ্রেসর", description: "গুণমান না হারিয়ে ছবি কমপ্রেস করুন।" },
  "image-resizer": { name: "ইমেজ রিসাইজার", description: "যেকোনো মাপে ছবি রিসাইজ করুন।" },
  "image-cropper": { name: "ইমেজ ক্রপার", description: "সঠিক অনুপাতে ছবি ক্রপ করুন।" },
  "image-to-pdf": { name: "ইমেজ থেকে PDF", description: "অনেক ছবি মিলিয়ে একটা PDF তৈরি করুন।" },
  "image-metadata-viewer": { name: "ইমেজ মেটাডেটা", description: "ছবির EXIF, GPS ও ক্যামেরার তথ্য দেখুন।" },
  "background-remover": { name: "ব্যাকগ্রাউন্ড রিমুভার", description: "AI দিয়ে স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ড সরান।" },

  // PDF
  "jpg-to-pdf": { name: "JPG থেকে PDF", description: "JPG ছবি পরিষ্কার PDF-এ রূপান্তর।" },
  "png-to-pdf": { name: "PNG থেকে PDF", description: "PNG ছবি PDF ফাইলে রূপান্তর।" },
  "merge-pdf": { name: "PDF মার্জ", description: "একাধিক PDF এক ফাইলে যুক্ত করুন।" },
  "split-pdf": { name: "PDF স্প্লিট", description: "পেজ রেঞ্জ অনুযায়ী PDF আলাদা করুন।" },
};

export function getPlannedToolTranslation(
  toolId: string,
  lang: "en" | "bn",
  fallback: { name: string; description: string }
): { name: string; description: string } {
  if (lang === "bn") {
    const tr = plannedToolTranslationsBn[toolId];
    if (tr) return tr;
  }
  return fallback;
}
