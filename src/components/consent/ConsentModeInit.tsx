import { useEffect } from "react";
import { applyStoredConsent } from "@lib/consent";

/* ============================================================
 * Consent Mode Init
 * ------------------------------------------------------------
 * On mount, if the user has previously chosen a consent state,
 * immediately fires the Consent Mode v2 'update' signal.
 * The 'default' denied signal is set inline in index.html —
 * it MUST run before gtag.js loads.
 * ============================================================ */

export function ConsentModeInit() {
  useEffect(() => {
    applyStoredConsent();
  }, []);
  return null;
}
