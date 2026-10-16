/* ============================================================
 * Consent state — single source of truth
 * ------------------------------------------------------------
 * Stores the user's cookie/consent choices in localStorage and
 * broadcasts changes to any React component that subscribes.
 *
 * This module is the ONLY place that:
 *   - Persists the choice
 *   - Fires the Google Consent Mode v2 'update' signal
 *   - Notifies subscribers (ad slots, analytics, UI)
 *
 * It does NOT rely on a global window flag. Components subscribe
 * via subscribeToConsent() and receive the current state on mount
 * and on every change.
 *
 * NOTE on EEA/UK/Switzerland traffic:
 *   Google requires a Google-certified CMP (IAB TCF v2.3) for
 *   personalized ads in the EEA, UK, and Switzerland. This module
 *   implements the techincal fallback and correctly forwards the
 *   choice to Consent Mode v2. The certified CMP (Google Privacy
 *   & Messaging) is configured separately in the AdSense dashboard.
 *   See docs/CONSENT.md.
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
    dataLayer?: unknown[];
  }
}

type Subscriber = (state: ConsentState | null) => void;
const subscribers = new Set<Subscriber>();

/** Notify every subscriber with the current stored state. */
function notify(): void {
  const state = getStoredConsent();
  for (const fn of subscribers) {
    try {
      fn(state);
    } catch {
      /* ignore subscriber errors */
    }
  }
}

/**
 * Subscribe to consent changes.
 * Fires immediately with the current state, then on every save/clear.
 * Returns an unsubscribe function.
 */
export function subscribeToConsent(fn: Subscriber): () => void {
  subscribers.add(fn);
  // Fire immediately with current state
  try {
    fn(getStoredConsent());
  } catch {
    /* ignore */
  }
  return () => {
    subscribers.delete(fn);
  };
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
      /* ignore quota errors */
    }
  }

  applyConsentToGtag(choice);
  notify();
  return state;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  applyConsentToGtag({ analytics: false, ads: false });
  notify();
}

/**
 * Fire Google Consent Mode v2 update.
 * Safe to call even if gtag.js has not loaded yet — the signal
 * is queued by the inline dataLayer stub in index.html.
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
 * Re-apply the stored consent (if any) to gtag.
 * Called by ConsentModeInit on app start and by the GA loader
 * after gtag.js finishes loading.
 */
export function applyStoredConsent(): void {
  const stored = getStoredConsent();
  if (stored) {
    applyConsentToGtag({ analytics: stored.analytics, ads: stored.ads });
  } else {
    applyConsentToGtag({ analytics: false, ads: false });
  }
}

export function hasUserChosen(): boolean {
  return getStoredConsent() !== null;
}
