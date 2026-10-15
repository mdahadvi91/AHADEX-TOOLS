/* ============================================================
 * Cookie Consent State
 * ------------------------------------------------------------
 * Stores user's cookie/consent choices in localStorage.
 * Fires Google Consent Mode v2 signals when choice changes.
 * Also exposes window.__ahadex_ad_consent__ so AdSenseSlot
 * can decide whether to render ad units.
 * ============================================================ */

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
}

export interface ConsentState extends ConsentChoice {
  necessary: true;
  version: number;
  timestamp: number;
}

const STORAGE_KEY = "ahadex-cookie-consent";
const CONSENT_VERSION = 1;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __ahadex_ad_consent__?: boolean;
  }
}

/** Sync the global ad-consent flag used by AdSenseSlot */
function syncAdConsentFlag(granted: boolean): void {
  if (typeof window === "undefined") return;

  window.__ahadex_ad_consent__ = granted;
  window.dispatchEvent(new Event("ahadex:consent-change"));
}

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: choice.analytics,
    ads: choice.ads,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
    syncAdConsentFlag(choice.ads);
  }
  return state;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  syncAdConsentFlag(false);
}

/**
 * Fires Google Consent Mode v2 'update' with the user's choice.
 * Safe to call even if gtag.js hasn't loaded — signal is queued.
 */
export function applyConsentToGtag(choice: ConsentChoice): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: choice.ads ? "granted" : "denied",
    ad_user_data: choice.ads ? "granted" : "denied",
    ad_personalization: choice.ads ? "granted" : "denied",
    analytics_storage: choice.analytics ? "granted" : "denied",
    personalization_storage: choice.ads ? "granted" : "denied",
  });
}

/**
 * Reads stored consent (if any) and:
 *   1. Updates the global ad-consent flag
 *   2. Fires gtag consent update
 */
export function applyStoredConsent(): void {
  const stored = getStoredConsent();
  if (stored) {
    syncAdConsentFlag(stored.ads);
    applyConsentToGtag({ analytics: stored.analytics, ads: stored.ads });
  } else {
    // No choice yet → ads denied by default
    syncAdConsentFlag(false);
  }
}

export function hasUserChosen(): boolean {
  return getStoredConsent() !== null;
}
