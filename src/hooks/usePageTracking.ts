import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@lib/analytics";

/* ============================================================
 * usePageTracking
 * ------------------------------------------------------------
 * Sends a GA4 page_view event on every SPA route change.
 * Skipped automatically by trackPageView() when GA is disabled.
 * ============================================================ */

export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    // Defer to next tick so the new route's <title> and SEO effect have run
    const id = window.setTimeout(() => {
      trackPageView(fullPath, document.title);
    }, 50);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);
}
