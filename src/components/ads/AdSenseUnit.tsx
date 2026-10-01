import { useEffect, useRef } from "react";
import { cn } from "@lib/cn";

interface AdSenseUnitProps {
  client: string;
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  layoutKey?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseUnit({
  client,
  slot,
  format = "auto",
  responsive = true,
  layoutKey,
  className,
}: AdSenseUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (typeof window === "undefined") return;
    if (!client || !slot) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <div className={cn("overflow-hidden", className)}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
      />
    </div>
  );
}
