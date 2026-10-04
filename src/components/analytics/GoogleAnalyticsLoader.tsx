import { useEffect } from "react";
import { applyStoredConsent } from "@lib/consent";

/* ============================================================
 * Google Analytics 4 Loader
 * ------------------------------------------------------------
 * Loads gtag.js when:
 *   1. VITE_GA_MEASUREMENT_ID is set (G-XXXXXXXXXX)
 *   2. VITE_ENABLE_ANALYTICS is "true"
 *
 * Consent Mode v2 defaults are set inline in index.html.
 * After gtag loads, we re-apply any stored user choice.
 * Idempotent — safe to mount multiple times.
 * ============================================================ */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalyticsLoader() {
  useEffect(() => {
    const enabled = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
    const measurementId = (
      import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
    )?.trim();

    if (!enabled || !measurementId) return;

    // Initialize dataLayer + gtag stub (harmless if already set)
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }

    // Already loaded?
    if (
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
    ) {
      applyStoredConsent();
      return;
    }

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false, // we send page views manually on route change
      anonymize_ip: true,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // After gtag.js loads, apply stored consent (if any)
    script.onload = () => applyStoredConsent();
  }, []);

  return null;
}
