/* ============================================================
 * Cookie Consent State
 * ------------------------------------------------------------
 * Stores user's cookie/consent choices in localStorage.
 * Fires Google Consent Mode v2 signals when choice changes.
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
  }
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

export function applyStoredConsent(): void {
  const stored = getStoredConsent();
  if (stored) {
    applyConsentToGtag({ analytics: stored.analytics, ads: stored.ads });
  }
}

export function hasUserChosen(): boolean {
  return getStoredConsent() !== null;
}
