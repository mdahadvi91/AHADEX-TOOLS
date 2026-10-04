import { useEffect, useRef } from "react";
import { analytics } from "@lib/analytics";

/* ============================================================
 * useToolAnalytics
 * ------------------------------------------------------------
 * Auto-fires GA4 events for a tool:
 *   - tool_open      → on mount
 *   - tool_complete  → on unmount (with duration in ms)
 *
 * Both are no-ops if GA is disabled or consent hasn't been given.
 * Mount this once per tool in the tool's index.tsx.
 * ============================================================ */

export function useToolAnalytics(toolId: string): void {
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    analytics.toolOpen(toolId);

    return () => {
      const duration = Date.now() - startRef.current;
      // Only fire complete if user spent more than 3 seconds
      // (avoids noise from accidental clicks / immediate back)
      if (duration > 3000) {
        analytics.toolComplete(toolId, duration);
      }
    };
  }, [toolId]);
}
