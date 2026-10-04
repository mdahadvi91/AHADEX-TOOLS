import { useEffect } from "react";

/* ============================================================
 * Google Analytics 4 Loader
 * ------------------------------------------------------------
 * Loads gtag.js only when:
 *   1. VITE_GA_MEASUREMENT_ID is set (G-XXXXXXXXXX)
 *   2. VITE_ENABLE_ANALYTICS is "true"
 *
 * Idempotent — safe to mount multiple times.
 * Mounted in MainLayout.
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

    // Already loaded? (idempotent guard)
    if (
      document.querySelector(
        'script[src*="googletagmanager.com/gtag/js"]'
      )
    ) {
      return;
    }

    // 1) Initialize dataLayer + gtag stub BEFORE the script loads
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false, // we send page views manually on route change
      anonymize_ip: true,
    });

    // 2) Load the gtag.js script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
