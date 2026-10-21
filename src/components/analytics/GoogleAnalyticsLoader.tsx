import { useEffect, useState } from "react";
import { subscribeToConsent, applyStoredConsent } from "@lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GoogleAnalyticsLoader() {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);

  // Subscribe to consent changes
  useEffect(() => {
    const unsubscribe = subscribeToConsent((state) => {
      setHasAnalyticsConsent(!!state?.analytics);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const enabled = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
    const measurementId = (
      import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
    )?.trim();

    // 1. If not configured, or user hasn't consented to analytics, do NOTHING.
    if (!enabled || !measurementId || !hasAnalyticsConsent) return;

    // 2. Initialize dataLayer + gtag stub
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }

    // 3. If already loaded, just apply consent again (safety)
    if (
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
    ) {
      applyStoredConsent();
      return;
    }

    // 4. Load Google Analytics script ONLY NOW (after consent)
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // 5. Apply the consent state to gtag
    script.onload = () => applyStoredConsent();

  }, [hasAnalyticsConsent]);

  return null;
}
