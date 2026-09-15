import React, { useEffect, useRef, useState } from 'react';
import type { AdFormat } from '@/src/types/ads';
import { getAdSenseClientId, isValidAdSenseClientId, loadAdSenseScript } from '@/src/lib/ads';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export interface AdSenseAdProps {
  /** AdSense Publisher Client ID (e.g. ca-pub-XXXXXXXXXXXXXXXX) */
  clientId?: string;
  /** Specific Ad Unit Slot ID (e.g. 1234567890) */
  slotId?: string;
  /** Ad unit format */
  format?: AdFormat | string;
  /** Whether the unit is full-width responsive */
  responsive?: boolean;
  /** In-article or layout key parameter */
  layoutKey?: string;
  /** Styling */
  className?: string;
}

/**
 * Isolated Google AdSense Provider Component.
 * 
 * Safety & Architecture:
 * - Completely inert if no valid publisher client ID exists.
 * - Lazily loads official Google AdSense script only when needed.
 * - Catches script execution errors safely (preventing app crashes from ad blockers).
 * - Avoids duplicate adsbygoogle.push calls on re-renders.
 */
export default function AdSenseAd({
  clientId,
  slotId,
  format = 'auto',
  responsive = true,
  layoutKey,
  className = '',
}: AdSenseAdProps) {
  const effectiveClientId = clientId || getAdSenseClientId();
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushedRef = useRef<boolean>(false);
  const [scriptReady, setScriptReady] = useState(false);

  // Validate publisher identifier
  const isValid = isValidAdSenseClientId(effectiveClientId);

  useEffect(() => {
    if (!isValid || !effectiveClientId) return;

    let isMounted = true;
    loadAdSenseScript(effectiveClientId).then((loaded) => {
      if (isMounted && loaded) {
        setScriptReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isValid, effectiveClientId]);

  useEffect(() => {
    if (!scriptReady || !adRef.current || isPushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushedRef.current = true;
      }
    } catch {
      // Gracefully suppress AdSense push errors (e.g. ad blockers or strict browser privacy)
    }
  }, [scriptReady]);

  if (!isValid || !effectiveClientId) {
    return null;
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center items-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px' }}
        data-ad-client={effectiveClientId}
        data-ad-slot={slotId || undefined}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-ad-layout-key={layoutKey || undefined}
      />
    </div>
  );
}
