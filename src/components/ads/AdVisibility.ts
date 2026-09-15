/**
 * Ad Visibility Engine for AHADEX TOOLS.
 * Determines programmatic eligibility for ad slot rendering based on
 * network status, placement policies, consent state, and device context.
 * 
 * Rules:
 * - No deceptive visibility tricks or aggressive frequency manipulation.
 * - Respects disabled states unconditionally.
 * - Distinguishes between real rendering vs developer debug placeholder rendering.
 */

import type { AdPlacement, AdProvider, AdVisibilityResult } from '@/src/types/ads';
import {
  getAdSettings,
  isAdsGloballyEnabled,
  isProviderConfigured,
  isAdConsentGranted,
} from '@/src/lib/ads';

export interface CheckAdVisibilityOptions {
  /** Override or target specific provider */
  provider?: AdProvider;
  /** Explicit placement override flag */
  enabled?: boolean;
  /** Whether user is in testing or inspection mode */
  debug?: boolean;
}

/**
 * Evaluates whether an ad placement is currently allowed to render.
 */
export function checkAdVisibility(
  placement: AdPlacement,
  options: CheckAdVisibilityOptions = {}
): AdVisibilityResult {
  const settings = getAdSettings();

  // 1. Global killswitch check
  if (!isAdsGloballyEnabled()) {
    return {
      canRender: false,
      reason: 'global_disabled',
    };
  }

  // 2. Specific placement check
  const placementConfig = settings.placements[placement];
  const isPlacementPermitted = options.enabled !== undefined ? options.enabled : placementConfig?.isEnabled;

  if (!isPlacementPermitted) {
    return {
      canRender: false,
      reason: 'placement_disabled',
    };
  }

  // 3. User privacy / consent check
  if (settings.consentRequired && !isAdConsentGranted()) {
    return {
      canRender: false,
      reason: 'consent_denied',
    };
  }

  // 4. Provider determination and configuration check
  const candidateProvider: AdProvider | null = options.provider || settings.activeProvider;

  if (!candidateProvider) {
    return {
      canRender: false,
      reason: 'no_provider',
    };
  }

  if (!isProviderConfigured(candidateProvider)) {
    return {
      canRender: false,
      reason: 'provider_not_configured',
      provider: candidateProvider,
    };
  }

  return {
    canRender: true,
    reason: 'ready',
    provider: candidateProvider,
  };
}

/**
 * Checks if the slot should display the non-misleading developer debug placeholder.
 * Strictly forbidden from showing fake real ads to regular production users.
 */
export function shouldShowDebugPlaceholder(
  visibility: AdVisibilityResult,
  debugProp?: boolean
): boolean {
  if (debugProp === false) return false;
  if (debugProp === true) return true;

  // Show placeholder only when explicit debug mode is activated
  return import.meta.env.VITE_AD_DEBUG === 'true';
}
