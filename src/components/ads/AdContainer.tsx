import React, { useEffect, useRef, useState } from 'react';
import type { AdPlacement, AdProvider, AdFormat } from '@/src/types/ads';
import AdSenseAd from './providers/AdSenseAd';
import MonetagAd from './providers/MonetagAd';
import AdsterraAd from './providers/AdsterraAd';

export interface AdContainerProps {
  placement: AdPlacement;
  provider: AdProvider;
  format?: AdFormat | string;
  slotId?: string;
  minHeightPx?: number;
  reserveSpace?: boolean;
  className?: string;
  lazy?: boolean;
  children?: React.ReactNode;
}

/**
 * Universal Ad Container for AHADEX TOOLS.
 * 
 * Architectural Highlights:
 * - Decouples placement logic from provider implementation.
 * - Enforces Cumulative Layout Shift (CLS) protection via minHeight reservation.
 * - IntersectionObserver lazy-loading avoids off-screen script overhead.
 * - Full accessibility compliance (role="region", explicit aria-label).
 * - Theme-resilient layout that matches the liquid glass design system.
 */
export default function AdContainer({
  placement,
  provider,
  format = 'auto',
  slotId,
  minHeightPx = 90,
  reserveSpace = true,
  className = '',
  lazy = true,
  children,
}: AdContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(!lazy);

  useEffect(() => {
    if (!lazy || isVisible) return;

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [lazy, isVisible]);

  // Render provider-specific unit
  const renderProviderAd = () => {
    if (children) {
      return children;
    }

    switch (provider) {
      case 'adsense':
        return <AdSenseAd slotId={slotId} format={format} />;
      case 'monetag':
        return <MonetagAd tagType={typeof format === 'string' ? format : 'banner'} />;
      case 'adsterra':
        return <AdsterraAd format={typeof format === 'string' ? format : 'banner'} />;
      case 'custom':
      default:
        return null;
    }
  };

  const containerStyle: React.CSSProperties = {};
  if (reserveSpace && minHeightPx > 0) {
    containerStyle.minHeight = `${minHeightPx}px`;
  }

  return (
    <aside
      ref={containerRef}
      id={`ad-container-${placement}`}
      role="region"
      aria-label="Advertisement"
      style={containerStyle}
      className={`w-full my-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="w-full flex justify-center items-center">
        {isVisible ? renderProviderAd() : null}
      </div>
    </aside>
  );
}
