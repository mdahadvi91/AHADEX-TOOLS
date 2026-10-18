/* ============================================================
 * AdSenseSlot — Google AdSense ad unit renderer
 * ------------------------------------------------------------
 * - Reads slot IDs from .env (VITE_ADSENSE_SLOT_*)
 * - Respects Consent Mode v2 (ad_storage)
 * - Lazy-renders only when scrolled into view (performance)
 * - Silent no-op when AdSense is disabled or slot is empty
 * - Only pushes once per slot (avoids AdSense "already have ads" error)
 * ============================================================ */

import { useEffect, useRef } from "react";
import { subscribeToConsent, type ConsentState } from "@lib/consent";

type AdFormat = "auto" | "fluid" | "rectangle";

type SlotName = "HEADER" | "IN_ARTICLE" | "FOOTER";

interface AdSenseSlotProps {
  /** Which .env slot to use: VITE_ADSENSE_SLOT_HEADER / _IN_ARTICLE / _FOOTER */
  slot: SlotName;
  /** Optional override — pass an explicit slot ID to bypass env */
  slotId?: string;
  /** AdSense format: auto (display), fluid (in-article), rectangle */
  format?: AdFormat;
  /** Layout — only used for in-article */
  layout?: "in-article";
  /** Extra classes for the wrapper */
  className?: string;
  /** Inline style */
  style?: React.CSSProperties;
  /** Label text above ad (AdSense policy-friendly) */
  label?: string;
}

/** Read slot ID from env */
function getSlotId(name: SlotName): string {
  const map: Record<SlotName, string | undefined> = {
    HEADER: import.meta.env.VITE_ADSENSE_SLOT_HEADER as string | undefined,
    IN_ARTICLE: import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE as string | undefined,
    FOOTER: import.meta.env.VITE_ADSENSE_SLOT_FOOTER as string | undefined,
  };
  return (map[name] ?? "").trim();
}

/* Consent is now consumed via lib/consent.ts subscription.
   The component stores the latest state locally and re-evaluates
   the ad render whenever consent changes. */

export function AdSenseSlot({
  return null; // Temporarily disabled until AdSense approval
  slot,
  slotId,
  format = "auto",
  layout,
  className = "",
  style,
  label,
}: AdSenseSlotProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;
  const enabled = (import.meta.env.VITE_ENABLE_ADSENSE as string | undefined) === "true";

  const finalSlotId = (slotId ?? getSlotId(slot)).trim();

  useEffect(() => {
    if (!enabled || !clientId || !finalSlotId || !insRef.current) return;

    const node = insRef.current;
    let observer: IntersectionObserver | null = null;
    let adsGranted = false;

    const stopObserving = () => {
      observer?.disconnect();
      observer = null;
    };

    const startObserving = () => {
      if (!adsGranted || pushedRef.current || observer) return;
      if (typeof IntersectionObserver === "undefined") return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (pushedRef.current) {
              stopObserving();
              break;
            }

            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
              pushedRef.current = true;
            } catch {
              /* Ignore AdSense push errors; do not claim success. */
            }

            stopObserving();
            break;
          }
        },
        { rootMargin: "200px 0px", threshold: 0.01 }
      );

      observer.observe(node);
    };

    const unsubscribe = subscribeToConsent((state: ConsentState | null) => {
      adsGranted = state?.ads === true;
      if (adsGranted) {
        startObserving();
      } else {
        stopObserving();
      }
    });

    return () => {
      unsubscribe();
      stopObserving();
    };
  }, [enabled, clientId, finalSlotId]);

  // Silent no-op when disabled or unconfigured
  if (!enabled || !clientId || !finalSlotId) {
    return null;
  }

  return (
    <div className={`ahadex-ad-slot ahadex-ad-slot--${slot.toLowerCase()} ${className}`}>
      {label ? (
        <div className="text-[10px] uppercase tracking-wider text-center opacity-40 mb-1">
          {label}
        </div>
      ) : null}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          ...(layout === "in-article" ? { textAlign: "center" } : {}),
          ...style,
        }}
        data-ad-client={clientId}
        data-ad-slot={finalSlotId}
        data-ad-format={format}
        {...(layout === "in-article" ? { "data-ad-layout": "in-article" } : {})}
        {...(format === "auto" ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}

export default AdSenseSlot;
