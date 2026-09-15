import React from 'react';
import type { AdsterraConfig } from '@/src/types/ads';

export interface AdsterraAdProps extends AdsterraConfig {
  className?: string;
}

/**
 * Isolated Adsterra Provider Architecture Foundation.
 * 
 * Safety & Architecture:
 * - Completely inert when not configured with genuine credentials.
 * - In accordance with Phase 10 guidelines, third-party Adsterra scripts are NOT bundled or injected.
 * - Ready for seamless future integration when real network credentials are provided.
 */
export default function AdsterraAd({ placementKey, format, className = '' }: AdsterraAdProps) {
  const effectiveKey = placementKey || (import.meta.env.VITE_ADSTERRA_KEY as string);

  // If no legitimate placement key is configured, remain disabled and inert
  if (!effectiveKey) {
    return null;
  }

  return (
    <div
      data-adsterra-key={effectiveKey}
      data-adsterra-format={format || 'banner'}
      className={`adsterra-slot w-full flex justify-center items-center overflow-hidden ${className}`}
    >
      {/* Adsterra real runtime mounting point */}
    </div>
  );
}
