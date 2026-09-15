/**
 * Google Analytics 4 (GA4) abstraction for AHADEX TOOLS.
 * Operates purely in a privacy-first manner: never collects file contents, filenames,
 * personal credentials, or raw user document text.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare global window gtag types
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'page_view'
  | 'tool_view'
  | 'tool_search'
  | 'tool_open'
  | 'file_upload'
  | 'processing_start'
  | 'processing_success'
  | 'processing_error'
  | 'file_download'
  | 'tool_reset'
  | 'related_tool_click';

export interface AnalyticsSafeParams {
  tool_id?: string;
  tool_slug?: string;
  category_id?: string;
  category_slug?: string;
  input_type?: string;
  output_type?: string;
  file_count?: number;
  size_bytes?: number;
  duration_ms?: number;
  error_code?: string;
  result_count?: number;
  source?: string;
  page_title?: string;
  page_path?: string;
  [key: string]: string | number | boolean | undefined;
}

const CONSENT_STORAGE_KEY = 'ahadex_tools_analytics_consent';

/**
 * Checks if user has explicitly opted out of analytics tracking.
 */
export function isTrackingConsentGranted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored !== 'denied';
  } catch {
    return true;
  }
}

/**
 * Updates user consent preference for analytics.
 */
export function setTrackingConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
  } catch {
    // Ignore storage restrictions
  }
}

/**
 * Retrieves the configured GA4 Measurement ID from the environment.
 */
export function getMeasurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof id === 'string' && id.trim().startsWith('G-')) {
    return id.trim();
  }
  return undefined;
}

let isInitialized = false;

/**
 * Asynchronously initializes GA4 without blocking application rendering.
 * Remains completely inert if no Measurement ID is provided or if consent was revoked.
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  const measurementId = getMeasurementId();
  if (!measurementId) {
    // Graceful no-op: GA4 remains disabled safely without crashing
    return;
  }

  if (!isTrackingConsentGranted()) {
    return;
  }

  // Setup dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // Handled manually on route changes
    anonymize_ip: true,
  });

  // Inject script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  isInitialized = true;
}

/**
 * Generic type-safe event dispatcher.
 */
export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsSafeParams): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!isTrackingConsentGranted()) return;

  try {
    window.gtag('event', eventName, params);
  } catch {
    // Suppress analytics dispatch exceptions
  }
}

/**
 * Tracks a route/page view.
 */
export function trackPageView(path: string, title?: string): void {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return;
  if (!isTrackingConsentGranted()) return;

  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  } catch {
    // Suppress analytics dispatch exceptions
  }
}

/**
 * Tracks a tool page view.
 */
export function trackToolView(toolId: string, categoryId?: string): void {
  trackEvent('tool_view', {
    tool_id: toolId,
    category_id: categoryId,
  });
}

/**
 * Tracks tool search without collecting potentially sensitive query text.
 */
export function trackToolSearch(queryLength: number, resultCount: number): void {
  trackEvent('tool_search', {
    result_count: resultCount,
    // Send query length only for metrics, NEVER send user search strings
    query_length: queryLength,
  });
}

/**
 * Tracks tool opening/navigation from directory or recommendations.
 */
export function trackToolOpen(toolId: string, source: 'home' | 'search' | 'related' | 'category' = 'home'): void {
  trackEvent('tool_open', {
    tool_id: toolId,
    source,
  });
}

/**
 * Tracks file upload metadata strictly without capturing filenames or contents.
 */
export function trackFileUpload(toolId: string, fileCount: number, totalSizeBytes: number, fileType?: string): void {
  trackEvent('file_upload', {
    tool_id: toolId,
    file_count: fileCount,
    size_bytes: totalSizeBytes,
    input_type: fileType || 'unknown',
  });
}

/**
 * Tracks start of processing execution.
 */
export function trackProcessingStart(toolId: string, inputType?: string): void {
  trackEvent('processing_start', {
    tool_id: toolId,
    input_type: inputType,
  });
}

/**
 * Tracks successful processing completion.
 */
export function trackProcessingSuccess(toolId: string, outputType?: string, durationMs?: number): void {
  trackEvent('processing_success', {
    tool_id: toolId,
    output_type: outputType,
    duration_ms: durationMs,
  });
}

/**
 * Tracks processing errors without exposing sensitive system traces.
 */
export function trackProcessingError(toolId: string, errorCode?: string): void {
  trackEvent('processing_error', {
    tool_id: toolId,
    error_code: errorCode || 'UNKNOWN_ERROR',
  });
}

/**
 * Tracks file download action.
 */
export function trackFileDownload(toolId: string, outputType?: string, sizeBytes?: number): void {
  trackEvent('file_download', {
    tool_id: toolId,
    output_type: outputType,
    size_bytes: sizeBytes,
  });
}

/**
 * Tracks workspace reset action.
 */
export function trackToolReset(toolId: string): void {
  trackEvent('tool_reset', {
    tool_id: toolId,
  });
}

/**
 * Tracks clicks on related tool suggestions.
 */
export function trackRelatedToolClick(sourceToolId: string, targetToolId: string): void {
  trackEvent('related_tool_click', {
    tool_id: sourceToolId,
    target_tool_id: targetToolId,
  });
}

/**
 * React hook to automatically dispatch page views on route changes.
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);
}
