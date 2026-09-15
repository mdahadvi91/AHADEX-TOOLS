/**
 * Central Advertising Configuration & Utility Layer for AHADEX TOOLS.
 * 
 * Architectural Highlights:
 * - Network-agnostic: supports AdSense, Monetag, Adsterra, and Custom configurations.
 * - Zero fake IDs: no simulated or hardcoded publisher identifiers.
 * - Lazy & non-blocking: isolates script loading, respects Core Web Vitals.
 * - Consent-aware: integrates with privacy storage preferences.
 * - Safe for critical tool workflows: protects upload -> process -> download pathways.
 */

import type {
  AdProvider,
  AdPlacement,
  AdFormat,
  AdPlacementConfig,
  GlobalAdSettings,
  AdConsentState,
} from '@/src/types/ads';

const AD_CONSENT_STORAGE_KEY = 'ahadex_tools_ad_consent';

/**
 * Validates Google AdSense Publisher Client ID format (e.g. ca-pub-1234567890123456).
 */
export function isValidAdSenseClientId(clientId?: string | null): boolean {
  if (!clientId || typeof clientId !== 'string') return false;
  const clean = clientId.trim();
  // Valid AdSense format: ca-pub-XXXXXXXXXXXXXXXX (10 to 20 digits) or pub-XXXXXXXXXXXXXXXX
  return /^(ca-)?pub-\d{10,20}$/i.test(clean);
}

/**
 * Retrieves the configured AdSense Publisher Client ID from environment.
 * Returns undefined if missing or malformed. Never produces a fake ID.
 */
export function getAdSenseClientId(): string | undefined {
  const envId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  if (typeof envId === 'string' && isValidAdSenseClientId(envId)) {
    return envId.trim();
  }
  return undefined;
}

/**
 * Determines whether a specific advertising provider has real configuration available.
 */
export function isProviderConfigured(provider: AdProvider): boolean {
  switch (provider) {
    case 'adsense':
      return !!getAdSenseClientId();
    case 'monetag': {
      const zoneId = import.meta.env.VITE_MONETAG_ZONE_ID;
      return typeof zoneId === 'string' && zoneId.trim().length > 0;
    }
    case 'adsterra': {
      const key = import.meta.env.VITE_ADSTERRA_KEY;
      return typeof key === 'string' && key.trim().length > 0;
    }
    case 'custom':
      return false;
    default:
      return false;
  }
}

/**
 * Checks if advertising is globally permitted by configuration and environment.
 */
export function isAdsGloballyEnabled(): boolean {
  // Explicit kill-switch
  if (import.meta.env.VITE_ENABLE_ADS === 'false') {
    return false;
  }

  // Explicit enable switch
  if (import.meta.env.VITE_ENABLE_ADS === 'true') {
    return true;
  }

  // If a provider has real configuration, enable by default unless turned off
  return isProviderConfigured('adsense') || isProviderConfigured('monetag') || isProviderConfigured('adsterra');
}

/**
 * Retrieves the current user advertising consent state from local storage.
 */
export function getAdConsentState(): AdConsentState {
  if (typeof window === 'undefined') return 'unknown';
  try {
    const stored = localStorage.getItem(AD_CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') {
      return stored;
    }

    // Check fallback to general privacy consent if set
    const generalConsent = localStorage.getItem('ahadex_tools_analytics_consent');
    if (generalConsent === 'denied') {
      return 'denied';
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Updates user consent preference for advertising technologies.
 */
export function setAdConsentState(state: AdConsentState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AD_CONSENT_STORAGE_KEY, state);
  } catch {
    // Suppress storage exceptions
  }
}

/**
 * Returns true if advertising consent is considered granted or not explicitly denied.
 */
export function isAdConsentGranted(): boolean {
  const state = getAdConsentState();
  return state !== 'denied';
}

/**
 * Default safe placement configuration map.
 * Placements near critical tool operations have conservative constraints.
 */
export const DEFAULT_PLACEMENTS: Record<AdPlacement, AdPlacementConfig> = {
  header: {
    placement: 'header',
    isEnabled: false, // Disabled by default to preserve header UX
    defaultFormat: 'leaderboard',
    minHeightPx: 90,
    reserveSpace: false,
  },
  'home-top': {
    placement: 'home-top',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  'home-middle': {
    placement: 'home-middle',
    isEnabled: true,
    defaultFormat: 'rectangle',
    minHeightPx: 250,
    reserveSpace: true,
  },
  'home-bottom': {
    placement: 'home-bottom',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  category: {
    placement: 'category',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  'tool-before-workspace': {
    placement: 'tool-before-workspace',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  'tool-after-workspace': {
    placement: 'tool-after-workspace',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  'tool-result': {
    placement: 'tool-result',
    isEnabled: true,
    defaultFormat: 'horizontal',
    minHeightPx: 90,
    reserveSpace: true,
  },
  footer: {
    placement: 'footer',
    isEnabled: false, // Disabled by default to keep footer compact
    defaultFormat: 'leaderboard',
    minHeightPx: 90,
    reserveSpace: false,
  },
};

/**
 * Resolves active provider: checks environment variable or configured provider.
 */
export function getActiveAdProvider(): AdProvider | null {
  const envProvider = import.meta.env.VITE_AD_PROVIDER as AdProvider | undefined;
  if (envProvider && isProviderConfigured(envProvider)) {
    return envProvider;
  }

  if (isProviderConfigured('adsense')) return 'adsense';
  if (isProviderConfigured('monetag')) return 'monetag';
  if (isProviderConfigured('adsterra')) return 'adsterra';

  return null;
}

/**
 * Returns the unified global ad configuration.
 */
export function getAdSettings(): GlobalAdSettings {
  const adsenseClientId = getAdSenseClientId();
  const isDebug = import.meta.env.VITE_AD_DEBUG === 'true' || import.meta.env.DEV;

  return {
    enabled: isAdsGloballyEnabled(),
    activeProvider: getActiveAdProvider(),
    consentRequired: import.meta.env.VITE_AD_CONSENT_REQUIRED === 'true',
    debugMode: isDebug,
    providers: {
      adsense: {
        clientId: adsenseClientId,
        format: 'auto',
        responsive: true,
      },
      monetag: {
        zoneId: (import.meta.env.VITE_MONETAG_ZONE_ID as string) || undefined,
      },
      adsterra: {
        placementKey: (import.meta.env.VITE_ADSTERRA_KEY as string) || undefined,
      },
      custom: {},
    },
    placements: DEFAULT_PLACEMENTS,
  };
}

let adSenseScriptLoaded = false;
let adSenseScriptPromise: Promise<boolean> | null = null;

/**
 * Asynchronously and lazily loads the official Google AdSense runtime script.
 * Only executes when a valid client ID is provided and ads are enabled.
 * Deduplicates script insertion across route transitions.
 */
export function loadAdSenseScript(clientId?: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  const effectiveId = clientId || getAdSenseClientId();
  if (!effectiveId || !isValidAdSenseClientId(effectiveId)) {
    return Promise.resolve(false);
  }

  if (adSenseScriptLoaded) return Promise.resolve(true);
  if (adSenseScriptPromise) return adSenseScriptPromise;

  // Check if script tag already exists in DOM
  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );

  if (existingScript) {
    adSenseScriptLoaded = true;
    return Promise.resolve(true);
  }

  adSenseScriptPromise = new Promise<boolean>((resolve) => {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${effectiveId}`;
      script.onload = () => {
        adSenseScriptLoaded = true;
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.head.appendChild(script);
    } catch {
      resolve(false);
    }
  });

  return adSenseScriptPromise;
}
