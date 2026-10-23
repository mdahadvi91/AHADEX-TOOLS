/* ============================================================
 * Visiting Card — Constants
 * ============================================================ */

export const BASELINE_WIDTH = 1050;
export const BASELINE_HEIGHT = 600;
export const SAFE_MARGIN = 60;

export const EXPORT_DPI_OPTIONS = [150, 300, 600] as const;
export const MM_PER_INCH = 25.4;

/** Bigger, editorial font sizes for real business cards */
export const FONT_SIZE = {
  name: 72,
  title: 18,
  company: 22,
  phone: 20,
  email: 20,
  address: 17,
  website: 20,
  tagline: 22,
} as const;

export const FONT_STACKS: Record<string, string> = {
  display: `'Playfair Display', 'Georgia', serif`,
  sans: `'Inter', 'Helvetica Neue', Arial, sans-serif`,
  serif: `'Georgia', 'Times New Roman', serif`,
  script: `'Dancing Script', 'Brush Script MT', cursive`,
  mono: `'JetBrains Mono', 'Courier New', monospace`,
};

export const MAX_LOGO_SIZE = 5 * 1024 * 1024;
export const MAX_PHOTO_SIZE = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
export const IMAGE_ACCEPT_ATTR =
  "image/jpeg,image/png,image/webp,image/svg+xml,image/*";
