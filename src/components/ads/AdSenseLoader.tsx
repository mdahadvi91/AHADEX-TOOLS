import { useEffect } from "react";
import { getStoredConsent } from "@lib/consent";

/* ============================================================
 * AdSense Loader
 * ------------------------------------------------------------
 * Loads the Google AdSense script when:
 *   1. VITE_ADSENSE_CLIENT_ID env var is set
 *   2. VITE_ENABLE_ADSENSE is "true"
 *   3. The user has granted (or not yet decided) ad consent
 *
 * Consent Mode v2 handles personalization automatically —
 * ads still serve non-personalized when consent is denied,
 * but the script itself is only loaded if consent allows.
 * ============================================================ */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseLoader() {
  useEffect(() => {
    const enabled = import.meta.env.VITE_ENABLE_ADSENSE === "true";
    const client = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

    if (!enabled || !client) return;

    const stored = getStoredConsent();
    // If the user explicitly denied ads, do not load AdSense
    if (stored && !stored.ads) return;

    // Already loaded?
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      return;
    }

    window.adsbygoogle = window.adsbygoogle || [];

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
