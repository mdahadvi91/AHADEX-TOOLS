/* ============================================================
 * Rotating Backgrounds
 * ------------------------------------------------------------
 * Five images that cycle through the site background every
 * BACKGROUND_ROTATE_INTERVAL_MS.
 *
 * To swap them, just replace bg-1.webp ... bg-5.webp in
 * public/images/backgrounds/ — no code change needed.
 * ============================================================ */

export const ROTATING_BACKGROUNDS = [
  "/images/backgrounds/bg-1.webp",
  "/images/backgrounds/bg-2.webp",
  "/images/backgrounds/bg-3.webp",
  "/images/backgrounds/bg-4.webp",
  "/images/backgrounds/bg-5.webp",
];

export const BACKGROUND_ROTATE_INTERVAL_MS = 60_000; // 1 minute
export const BACKGROUND_FADE_DURATION_S = 2.5; // cross-fade

// Match the previous ImageBackground values for consistent readability
export const BACKGROUND_OPACITY_LIGHT = 0.15;
export const BACKGROUND_OPACITY_DARK = 0.55;
