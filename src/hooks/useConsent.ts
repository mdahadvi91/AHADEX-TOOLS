import { useCallback, useEffect, useState } from "react";
import {
  getStoredConsent, saveConsent, applyConsentToGtag, clearConsent,
  type ConsentChoice, type ConsentState,
} from "@lib/consent";

/* ============================================================
 * useConsent
 * ------------------------------------------------------------
 * React hook for reading and updating consent state.
 * Use this in a settings page to let users change their choice.
 * ============================================================ */

export function useConsent() {
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    setState(getStoredConsent());
  }, []);

  const update = useCallback((choice: ConsentChoice) => {
    const next = saveConsent(choice);
    applyConsentToGtag(choice);
    setState(next);
  }, []);

  const reset = useCallback(() => {
    clearConsent();
    applyConsentToGtag({ analytics: false, ads: false });
    setState(null);
  }, []);

  return { state, update, reset };
}
