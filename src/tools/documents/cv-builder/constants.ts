/* ============================================================
 * CV Builder — Constants
 * ============================================================ */

export const PAGE_SIZES = {
  A4: { widthMm: 210, heightMm: 297, label: "A4 · 210 × 297 mm" },
  Letter: { widthMm: 216, heightMm: 279, label: "Letter · 216 × 279 mm" },
} as const;

export const FONT_FAMILIES = [
  { id: "Inter", label: "Inter (Sans)", stack: "'Inter', system-ui, sans-serif" },
  { id: "Helvetica", label: "Helvetica (Sans)", stack: "'Helvetica Neue', Arial, sans-serif" },
  { id: "Georgia", label: "Georgia (Serif)", stack: "Georgia, 'Times New Roman', serif" },
  { id: "Playfair Display", label: "Playfair Display (Serif)", stack: "'Playfair Display', Georgia, serif" },
  { id: "JetBrains Mono", label: "JetBrains Mono", stack: "'JetBrains Mono', 'Courier New', monospace" },
] as const;

export const ACCENT_COLORS = [
  { id: "slate",  value: "#334155", label: "Slate" },
  { id: "navy",   value: "#1E3A8A", label: "Navy" },
  { id: "wine",   value: "#8B3A4F", label: "Wine" },
  { id: "forest", value: "#166534", label: "Forest" },
  { id: "rose",   value: "#B36878", label: "Rose" },
  { id: "gold",   value: "#C99667", label: "Gold" },
  { id: "black",  value: "#0A0A0A", label: "Black" },
  { id: "coral",  value: "#EA580C", label: "Coral" },
] as const;

export const DEFAULT_FONT_SIZE = 10;        // pt
export const DEFAULT_SECTION_SPACING = 5;   // mm
export const DEFAULT_PAGE_MARGIN = 15;      // mm
