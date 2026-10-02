import type { CVData, CVPersonal } from "../types";

/* ============================================================
 * CV Data — state update helpers
 * ------------------------------------------------------------
 * Pure functions — no React dependency. Easy to test.
 * ============================================================ */

export function updatePersonal(
  data: CVData,
  patch: Partial<CVPersonal>
): CVData {
  return {
    ...data,
    personal: { ...data.personal, ...patch },
  };
}

export function updateSummary(data: CVData, summary: string): CVData {
  return { ...data, summary };
}

export function updateTemplate(
  data: CVData,
  templateId: string
): CVData {
  return {
    ...data,
    settings: { ...data.settings, templateId },
  };
}

/* ============================================================
 * Simple validation helpers (used by form)
 * ============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(v: string): boolean {
  if (!v) return true; // empty is allowed
  return EMAIL_RE.test(v);
}

export function isValidUrl(v: string): boolean {
  if (!v) return true;
  // Accept bare domains like "example.com"
  const normalized = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}
