import { AdContainer } from "./AdContainer";
import { AdSenseUnit } from "./AdSenseUnit";
import { AdPlaceholder } from "./AdPlaceholder";
import { FEATURE_FLAGS } from "@constants/config";

type SlotName =
  | "header"
  | "in-article"
  | "footer"
  | "sidebar"
  | "home-top"
  | "home-mid"
  | "tool-top"
  | "tool-mid"
  | "tool-bottom"
  | "content-top"
  | "content-mid"
  | "content-bottom";

interface AdSlotProps {
  slot: SlotName;
  className?: string;
  label?: string;
  hideLabel?: boolean;
}

const SLOT_CONFIG: Record<SlotName, { client: string; unit: string }> = {
  header: {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_HEADER ?? "",
  },
  "in-article": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE ?? "",
  },
  footer: {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? "",
  },
  sidebar: {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? "",
  },
  "home-top": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_HEADER ?? "",
  },
  "home-mid": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE ?? "",
  },
  "tool-top": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_HEADER ?? "",
  },
  "tool-mid": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE ?? "",
  },
  "tool-bottom": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? "",
  },
  "content-top": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_HEADER ?? "",
  },
  "content-mid": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_IN_ARTICLE ?? "",
  },
  "content-bottom": {
    client: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? "",
    unit: import.meta.env.VITE_ADSENSE_SLOT_FOOTER ?? "",
  },
};

export function AdSlot({
  slot,
  className,
  label,
  hideLabel = false,
}: AdSlotProps) {
  const config = SLOT_CONFIG[slot];
  const hasRealAds = FEATURE_FLAGS.enableAdSense && config.client && config.unit;

  if (hasRealAds) {
    return (
      <AdContainer label={hideLabel ? "" : label} className={className}>
        <AdSenseUnit
          client={config.client}
          slot={config.unit}
          format="auto"
          responsive
        />
      </AdContainer>
    );
  }

  if (import.meta.env.DEV) {
    return (
      <AdContainer label={hideLabel ? "" : label} className={className}>
        <AdPlaceholder
          slot={slot}
          height={
            slot.startsWith("tool") || slot === "in-article" ? "medium" : "banner"
          }
        />
      </AdContainer>
    );
  }

  return null;
}
