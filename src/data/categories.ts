import type { Category, CategoryId } from "@types/category";
import { tools } from "./tools";
import { plannedTools } from "./plannedTools";

/* ============================================================
 * Categories — counts are auto-calculated
 * - `count`        = implemented working tools
 * - `plannedCount` = coming soon tools
 * ============================================================ */

interface CategoryWithPlanned extends Category {
  plannedCount: number;
}

const baseCategories: Omit<CategoryWithPlanned, "count" | "plannedCount">[] = [
  {
    id: "image",
    slug: "image",
    name: "Image Tools",
    description:
      "Convert, compress, resize, and edit images right in your browser. No uploads, no quality loss.",
    icon: "/images/icons/image-tools.svg",
    color: "#D88B9A",
  },
  {
    id: "pdf",
    slug: "pdf",
    name: "PDF Tools",
    description:
      "Merge, split, compress, and convert PDF files instantly. Everything runs locally on your device.",
    icon: "/images/icons/pdf-tools.svg",
    color: "#B36878",
  },
  {
    id: "qr",
    slug: "qr",
    name: "QR & Barcode",
    description:
      "Generate and scan QR codes for URLs, Wi-Fi, email, vCards, and more. Perfect for print or screen.",
    icon: "/images/icons/qr-tools.svg",
    color: "#C99667",
  },
  {
    id: "text",
    slug: "text",
    name: "Text Tools",
    description:
      "Count words, change case, format JSON, encode Base64, and clean up text — all offline.",
    icon: "/images/icons/text-tools.svg",
    color: "#8B3A4F",
  },
  {
    id: "developer",
    slug: "developer",
    name: "Developer Tools",
    description:
      "URL encoding, UUID generation, regex testing — small utilities for everyday coding tasks.",
    icon: "/images/icons/dev-tools.svg",
    color: "#D88B9A",
  },
  {
    id: "calculators",
    slug: "calculators",
    name: "Calculators",
    description:
      "Percentage, age, date difference, units, BMI — everyday math made simple and accurate.",
    icon: "/images/icons/calculator-tools.svg",
    color: "#C99667",
  },
];

export const categories: Category[] = baseCategories.map((cat) => ({
  ...cat,
  count: tools.filter((t) => t.category === cat.id).length,
}));

/** Extended info with planned counts */
export const categoriesWithPlanned: CategoryWithPlanned[] =
  baseCategories.map((cat) => ({
    ...cat,
    count: tools.filter((t) => t.category === cat.id).length,
    plannedCount: plannedTools.filter((t) => t.category === cat.id).length,
  }));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Working tools count */
export const totalToolCount = tools.length;

/** Planned tools count */
export const totalPlannedCount = plannedTools.length;
