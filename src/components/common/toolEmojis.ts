/* ============================================================
 * Tool Emojis
 * ------------------------------------------------------------
 * Maps every tool ID to a single emoji character.
 * Used everywhere instead of icons for a colorful, friendly
 * look across all devices.
 * ============================================================ */

export const TOOL_EMOJIS: Record<string, string> = {
  // ---- Working tools ----
  "photo-qr": "📸",
  "visiting-card": "🎴",
  "cv-builder": "📄",

  // ---- Image tools ----
  "jpg-to-png": "🖼️",
  "png-to-jpg": "🎨",
  "jpg-to-webp": "⚡",
  "png-to-webp": "📦",
  "webp-to-jpg": "🔄",
  "webp-to-png": "♻️",
  "image-compressor": "🗜️",
  "image-resizer": "📐",
  "image-cropper": "✂️",
  "image-to-pdf": "📑",
  "image-metadata-viewer": "🔍",

  // ---- PDF tools ----
  "jpg-to-pdf": "📕",
  "png-to-pdf": "📗",
  "merge-pdf": "📚",
  "split-pdf": "✂️",
  "compress-pdf": "📉",
  "pdf-to-jpg": "🖼️",
  "pdf-to-png": "🖼️",
  "pdf-page-extractor": "📃",

  // ---- QR tools ----
  "wifi-qr-generator": "📶",
  "email-qr-generator": "✉️",
  "phone-qr-generator": "📞",
  "vcard-qr-generator": "👤",
  "qr-code-scanner": "📷",
  "barcode-generator": "📊",
  "qr-code-with-logo": "🎯",

  // ---- Text tools ----
  "word-counter": "🔤",
  "character-counter": "🔡",
  "case-converter": "🔠",
  "text-cleaner": "🧹",
  "json-formatter": "{}",
  "json-to-csv": "📊",
  "base64-tool": "🔐",

  // ---- Developer tools ----
  "url-encoder": "🔗",
  "uuid-generator": "#️⃣",
  "regex-tester": "🔣",

  // ---- Calculators ----
  "percentage-calculator": "％",
  "age-calculator": "🎂",
  "date-difference": "📅",
  "unit-converter": "📏",
  "bmi-calculator": "💪",
};

export function getToolEmoji(toolId: string): string {
  return TOOL_EMOJIS[toolId] ?? "🛠️";
}
