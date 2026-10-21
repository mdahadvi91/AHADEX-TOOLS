import { useEffect, useRef, useState } from "react";
import { subscribeToConsent } from "@lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseSlotProps {
  slot?: string; // e.g. "TOOL_BOTTOM"
  label?: string;
}

export function AdSenseSlot({ slot = "default", label }: AdSenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [hasAdsConsent, setHasAdsConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Check Consent
  useEffect(() => {
    const unsubscribe = subscribeToConsent((state) => {
      setHasAdsConsent(!!state?.ads);
    });
    return unsubscribe;
  }, []);

  // 2. Lazy Load Ad only when visible
  useEffect(() => {
    if (!hasAdsConsent || !adRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [hasAdsConsent]);

  // 3. Push Ad to AdSense
  useEffect(() => {
    if (isVisible && hasAdsConsent) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, [isVisible, hasAdsConsent]);

  // If user hasn't consented to ads, show nothing (or a placeholder)
  if (!hasAdsConsent) return null;

  return (
    <div className="my-6 flex flex-col items-center justify-center min-h-[100px] bg-silk-rose/5 rounded-xl border border-silk-rose/10 overflow-hidden">
      {label && <span className="text-[9px] uppercase tracking-widest text-light-textSecondary dark:text-dark-textSecondary mb-1 opacity-50">{label}</span>}
      
      {/* AdSense Ad Unit */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", minHeight: "90px" }}
        data-ad-client="ca-pub-5216241068377334"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
