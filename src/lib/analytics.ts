import { FEATURE_FLAGS } from "@constants/config";

type EventName =
  | "tool_open"
  | "tool_complete"
  | "file_upload"
  | "file_download"
  | "copy_result"
  | "conversion_success"
  | "conversion_error"
  | "search"

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  if (!FEATURE_FLAGS.enableAnalytics) return false;
  return typeof window.gtag === "function";
}

export function trackEvent(name: EventName, params: EventParams = {}): void {
  if (!canTrack()) return;
  try { window.gtag!("event", name, params); } catch {}
}

export function trackPageView(path: string, title?: string): void {
  if (!canTrack()) return;
  try {
    window.gtag!("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
    });
  } catch {}
}

export const analytics = {
  toolOpen: (toolId: string) => trackEvent("tool_open", { tool_id: toolId }),
  toolComplete: (toolId: string, durationMs?: number) =>
    trackEvent("tool_complete", { tool_id: toolId, duration_ms: durationMs }),
  fileUpload: (toolId: string, sizeBytes?: number) =>
    trackEvent("file_upload", { tool_id: toolId, size_bytes: sizeBytes }),
  fileDownload: (toolId: string) =>
    trackEvent("file_download", { tool_id: toolId }),
  copyResult: (toolId: string) =>
    trackEvent("copy_result", { tool_id: toolId }),
  conversionSuccess: (toolId: string) =>
    trackEvent("conversion_success", { tool_id: toolId }),
  conversionError: (toolId: string, reason?: string) =>
    trackEvent("conversion_error", { tool_id: toolId, reason }),
  search: (query: string) => trackEvent("search", { search_term: query }),
  trackPageView,
};
