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
    id: "background-remover",
    slug: "background-remover",
    name: "Background Remover",
    nameBn: "ব্যাকগ্রাউন্ড রিমুভার",
    path: "/tools/background-remover",
    description: "Remove image backgrounds automatically with AI.",
    descriptionBn: "AI দিয়ে স্বয়ংক্রিয়ভাবে ছবির ব্যাকগ্রাউন্ড সরান।",
    eta: "Coming soon",
  },








































];

export const PLANNED_COUNT = plannedTools.length;

export function getPlannedById(id: string): PlannedTool | undefined {
  return plannedTools.find((t) => t.id === id);
}
