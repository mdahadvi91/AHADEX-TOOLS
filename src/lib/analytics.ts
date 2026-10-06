/* ============================================================
 * Analytics — GA4 event tracking (consent-aware)
 * ------------------------------------------------------------
 * Every event is gated by:
 *   1. Feature flag (VITE_ENABLE_ANALYTICS)
 *   2. Explicit user consent for analytics (localStorage)
 *   3. gtag function availability
 *
 * If the user rejects analytics, no event is ever sent —
 * not even a denied-consent ping.
 * ============================================================ */

import { getStoredConsent } from "./consent";
import { FEATURE_FLAGS } from "@constants/config";

/* ── Event names (typed for safety) ── */
export type EventName =
  | "page_view"
  | "tool_open"
  | "tool_complete"
  | "file_upload"
  | "file_download"
  | "conversion_start"
  | "conversion_complete"
  | "copy_result"
  | "search"
  | "conversion_error"
  | "conversion_success";

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
  tool_id?: string;
  duration_ms?: number;
  size_bytes?: number;
  file_type?: string;
  reason?: string;
}

/**
 * Check if tracking is allowed.
 * Requires: feature flag on + user explicitly opted in + gtag exists.
 */
function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (!FEATURE_FLAGS.enableAnalytics) return false;

  // ── Consent gate ──
  // No stored consent → no tracking (opt-in model)
  const consent = getStoredConsent();
  if (!consent) return false;
  if (!consent.analytics) return false;

  return typeof window.gtag === "function";
}

/**
 * Send a generic GA4 event — consent-gated.
 */
export function trackEvent(name: EventName, params: EventParams = {}): void {
  if (!canTrack()) return;
  try {
    window.gtag!("event", name, params);
  } catch {
    /* swallow — analytics must never break the app */
  }
}

/**
 * Send a GA4 page_view event on SPA route change — consent-gated.
 */
export function trackPageView(path: string, title?: string): void {
  if (!canTrack()) return;
  try {
    window.gtag!("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    });
  } catch {
    /* swallow */
  }
}

/* ── Tool-level event helpers ── */
export const analytics = {
  toolOpen: (toolId: string) =>
    trackEvent("tool_open", { tool_id: toolId }),

  toolComplete: (toolId: string, durationMs?: number) =>
    trackEvent("tool_complete", {
      tool_id: toolId,
      duration_ms: durationMs,
    }),

  fileUpload: (toolId: string, sizeBytes?: number, fileType?: string) =>
    trackEvent("file_upload", {
      tool_id: toolId,
      size_bytes: sizeBytes,
      file_type: fileType,
    }),

  fileDownload: (toolId: string) =>
    trackEvent("file_download", { tool_id: toolId }),

  conversionStart: (toolId: string) =>
    trackEvent("conversion_start", { tool_id: toolId }),

  conversionComplete: (toolId: string, durationMs?: number) =>
    trackEvent("conversion_complete", {
      tool_id: toolId,
      duration_ms: durationMs,
    }),

  conversionSuccess: (toolId: string) =>
    trackEvent("conversion_success", { tool_id: toolId }),

  conversionError: (toolId: string, reason?: string) =>
    trackEvent("conversion_error", {
      tool_id: toolId,
      reason,
    }),

  copyResult: (toolId: string) =>
    trackEvent("copy_result", { tool_id: toolId }),

  search: (query: string, resultCount: number) =>
    trackEvent("search", {
      query,
      result_count: resultCount,
    }),
};

/* ── Global gtag declaration ── */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
