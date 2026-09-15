import React from 'react';
import type { MonetagConfig } from '@/src/types/ads';

export interface MonetagAdProps extends MonetagConfig {
  className?: string;
}

/**
 * Isolated Monetag Provider Architecture Foundation.
 * 
 * Safety & Architecture:
 * - Completely inert when not configured with genuine credentials.
 * - In accordance with Phase 10 guidelines, third-party Monetag scripts are NOT bundled or injected.
 * - Ready for seamless future integration when real network credentials are provided.
 */
export default function MonetagAd({ zoneId, tagType, className = '' }: MonetagAdProps) {
  const effectiveZoneId = zoneId || (import.meta.env.VITE_MONETAG_ZONE_ID as string);

  // If no legitimate zone ID is configured, remain disabled and inert
  if (!effectiveZoneId) {
    return null;
  }

  return (
    <div
      data-monetag-zone={effectiveZoneId}
      data-monetag-tag-type={tagType || 'banner'}
      className={`monetag-slot w-full flex justify-center items-center overflow-hidden ${className}`}
    >
      {/* Monetag real runtime mounting point */}
    </div>
  );
}
