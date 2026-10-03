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
  "background-remover": {
    name: "ব্যাকগ্রাউন্ড রিমুভার",
    description: "AI দিয়ে স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ড সরান।",
  },
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
