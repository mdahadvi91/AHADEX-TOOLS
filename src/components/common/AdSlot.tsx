import React from 'react';
import type { AdPlacement, AdProvider, AdFormat } from '@/src/types/ads';
import { getAdSettings } from '@/src/lib/ads';
import { checkAdVisibility, shouldShowDebugPlaceholder } from '@/src/components/ads/AdVisibility';
import AdContainer from '@/src/components/ads/AdContainer';
import AdPlaceholder from '@/src/components/ads/AdPlaceholder';

export interface AdSlotProps {
  /** Ad placement location identifier */
  placement: AdPlacement;
  /** Optional provider override */
  provider?: AdProvider;
  /** Optional format override (e.g. 'auto', 'rectangle', 'horizontal') */
  format?: AdFormat | string;
  /** Specific provider ad unit/slot ID */
  slotId?: string;
  /** Explicit enable/disable toggle */
  enabled?: boolean;
  /** Minimum reserved height in pixels to protect CLS */
  minHeightPx?: number;
  /** Whether to reserve space even when unmounted or loading */
  reserveSpace?: boolean;
  /** Whether to load lazily with IntersectionObserver */
  lazy?: boolean;
  /** Force or suppress developer debug placeholder (defaults to auto in dev mode) */
  debug?: boolean;
  /** Custom fallback component if ad cannot be served */
  fallback?: React.ReactNode;
  /** Container CSS classes */
  className?: string;
}

/**
 * Universal, Provider-Agnostic Ad Slot Component for AHADEX TOOLS.
 * 
 * Rules:
 * - Never renders fake advertisements or mock sponsors in production.
 * - In development mode, displays a clearly marked wireframe placeholder for layout sizing.
 * - If no provider is configured in production, renders null without DOM overhead or visual defects.
 * - Protects critical user workflows by strictly isolating ad logic from tool mechanics.
 */
export default function AdSlot({
  placement,
  provider,
  format,
  slotId,
  enabled,
  minHeightPx,
  reserveSpace,
  lazy = true,
  debug,
  fallback = null,
  className = '',
}: AdSlotProps) {
  const settings = getAdSettings();
  const placementConfig = settings.placements[placement];

  const effectiveMinHeight =
    minHeightPx !== undefined ? minHeightPx : placementConfig?.minHeightPx ?? 90;
  const effectiveFormat =
    format || placementConfig?.defaultFormat || 'auto';
  const effectiveReserveSpace =
    reserveSpace !== undefined ? reserveSpace : placementConfig?.reserveSpace ?? true;

  // Check programmatic visibility rules
  const visibility = checkAdVisibility(placement, {
    provider,
    enabled,
    debug,
  });

  // 1. Real ad rendering pathway (active when a legitimate provider is configured)
  if (visibility.canRender && visibility.provider) {
    return (
      <AdContainer
        placement={placement}
        provider={visibility.provider}
        format={effectiveFormat}
        slotId={slotId}
        minHeightPx={effectiveMinHeight}
        reserveSpace={effectiveReserveSpace}
        lazy={lazy}
        className={className}
      />
    );
  }

  // 2. Developer / Debug preview pathway (ONLY shown in test/dev mode, never in production)
  if (shouldShowDebugPlaceholder(visibility, debug)) {
    return (
      <AdPlaceholder
        placement={placement}
        provider={visibility.provider}
        reason={visibility.reason}
        minHeightPx={effectiveMinHeight}
        className={className}
      />
    );
  }

  // 3. Inert production fallback (cleanly renders nothing if no real ads are configured)
  return <>{fallback}</>;
}
