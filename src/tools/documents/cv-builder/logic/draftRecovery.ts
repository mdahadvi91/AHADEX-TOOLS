/* ============================================================
 * Draft Recovery Hook
 * ------------------------------------------------------------
 * Auto-saves the current CV every few seconds and on unmount.
 * Detects unsaved drafts on mount so the user is never silently
 * losing work.
 * ============================================================ */

import { useEffect, useRef } from "react";
import type { CVData } from "../types";
import { saveDraft, loadDraft, clearDraft } from "./cvStorage";

interface UseDraftAutoSaveOptions {
  data: CVData;
  cvId: string | null;
  /** Debounce delay in ms. Default 1500. */
  delay?: number;
  /** When false, auto-save is paused. */
  enabled?: boolean;
}

export function useDraftAutoSave({
  data,
  cvId,
  delay = 1500,
  enabled = true,
}: UseDraftAutoSaveOptions): void {
  const timer = useRef<number | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    // Skip the very first render so we don't overwrite a
    // recovered draft with the just-loaded sample.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      saveDraft({ cvId, data, savedAt: Date.now() });
    }, delay);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [data, cvId, delay, enabled]);

  // Save immediately on unmount
  useEffect(() => {
    return () => {
      saveDraft({ cvId, data, savedAt: Date.now() });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { loadDraft, clearDraft };
