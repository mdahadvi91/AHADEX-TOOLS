/* ============================================================
 * Shared helpers for CV templates
 * ============================================================ */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatDate(value: string): string {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length < 2) return value;
  const year = parts[0];
  const mi = parseInt(parts[1], 10) - 1;
  if (mi < 0 || mi > 11) return year;
  return `${MONTHS[mi]} ${year}`;
}

export function formatRange(
  start: string,
  end: string,
  current: boolean
): string {
  const s = formatDate(start);
  if (current) return s ? `${s} – Present` : "Present";
  const e = formatDate(end);
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

export function initials(fullName: string): string {
  if (!fullName) return "";
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
