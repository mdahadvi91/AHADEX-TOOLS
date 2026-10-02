import type { CardSize, CardSizeId } from "../types";

export const CARD_SIZES: CardSize[] = [
  {
    id: "standard",
    label: 'Standard (3.5" × 2")',
    labelBn: 'স্ট্যান্ডার্ড (৩.৫" × ২")',
    widthMm: 88.9,
    heightMm: 50.8,
    widthPx: 1050,
    heightPx: 600,
  },
  {
    id: "square",
    label: 'Square (2.5" × 2.5")',
    labelBn: 'স্কয়ার (২.৫" × ২.৫")',
    widthMm: 63.5,
    heightMm: 63.5,
    widthPx: 750,
    heightPx: 750,
  },
  {
    id: "slim",
    label: 'Slim (3.5" × 1.5")',
    labelBn: 'স্লিম (৩.৫" × ১.৫")',
    widthMm: 88.9,
    heightMm: 38.1,
    widthPx: 1050,
    heightPx: 450,
  },
  {
    id: "us",
    label: 'US (3.5" × 2")',
    labelBn: 'ইউএস (৩.৫" × ২")',
    widthMm: 88.9,
    heightMm: 50.8,
    widthPx: 1050,
    heightPx: 600,
  },
];

export function getCardSizeFromId(id: CardSizeId): CardSize {
  return CARD_SIZES.find((s) => s.id === id) ?? CARD_SIZES[0];
}
