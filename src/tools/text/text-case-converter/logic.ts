import type { CaseType } from "./types";

export const MAX_CHARS = 500_000;

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Split text into words. Handles:
 *   - camelCase → camel, Case
 *   - PascalCase → Pascal, Case
 *   - snake_case → snake, case
 *   - kebab-case → kebab, case
 *   - spaces, tabs, newlines
 */
export function splitWords(input: string): string[] {
  if (!input.trim()) return [];
  // Insert space before uppercase letters that follow lowercase (camelCase)
  const withSpaces = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  return withSpaces
    .split(/[^A-Za-z0-9\u0980-\u09FF\u0600-\u06FF]+/u)
    .filter((w) => w.length > 0);
}

function capitalize(w: string): string {
  if (!w) return w;
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

const SMALL_WORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "if",
  "in", "into", "nor", "of", "on", "onto", "or", "over", "so",
  "the", "to", "up", "with", "yet",
]);

export function convert(input: string, type: CaseType): string {
  if (!input) return "";

  switch (type) {
    case "upper":
      return input.toUpperCase();

    case "lower":
      return input.toLowerCase();

    case "title": {
      const words = input.split(/(\s+)/);
      return words
        .map((w, i) => {
          if (/^\s+$/.test(w)) return w;
          const lower = w.toLowerCase();
          if (i > 0 && SMALL_WORDS.has(lower)) return lower;
          return capitalize(w);
        })
        .join("");
    }

    case "sentence": {
      const lower = input.toLowerCase();
      return lower.replace(/(^\s*\S|[.!?]\s+\S)/g, (m) => m.toUpperCase());
    }

    case "camel": {
      const words = splitWords(input);
      if (words.length === 0) return "";
      return words
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w)))
        .join("");
    }

    case "pascal": {
      const words = splitWords(input);
      return words.map(capitalize).join("");
    }

    case "snake": {
      const words = splitWords(input);
      return words.map((w) => w.toLowerCase()).join("_");
    }

    case "kebab": {
      const words = splitWords(input);
      return words.map((w) => w.toLowerCase()).join("-");
    }

    case "constant": {
      const words = splitWords(input);
      return words.map((w) => w.toUpperCase()).join("_");
    }

    case "dot": {
      const words = splitWords(input);
      return words.map((w) => w.toLowerCase()).join(".");
    }

    case "alternating": {
      let upper = true;
      return input
        .split("")
        .map((c) => {
          if (!/[a-zA-Z]/.test(c)) return c;
          const out = upper ? c.toUpperCase() : c.toLowerCase();
          upper = !upper;
          return out;
        })
        .join("");
    }

    case "inverse": {
      return input
        .split("")
        .map((c) => {
          const up = c.toUpperCase();
          const lo = c.toLowerCase();
          if (c === up && c !== lo) return lo;
          if (c === lo && c !== up) return up;
          return c;
        })
        .join("");
    }
  }
}
