import { useEffect } from "react";

/* ============================================================
 * AdSense Loader
 * ------------------------------------------------------------
 * Loads the Google AdSense script only when:
 *   1. VITE_ADSENSE_CLIENT env var is set
 *   2. VITE_ENABLE_ADSENSE is "true"
 *
 * Add to a top-level component (MainLayout).
 * ============================================================ */

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseLoader() {
  useEffect(() => {
    const enabled = import.meta.env.VITE_ENABLE_ADSENSE === "true";
    const client = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

    if (!enabled || !client) return;

    // Already loaded?
    if (
      document.querySelector(
        'script[src*="pagead2.googlesyndication.com"]'
      )
    ) {
      return;
    }

    // Init queue
    window.adsbygoogle = window.adsbygoogle || [];

    // Load script
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
