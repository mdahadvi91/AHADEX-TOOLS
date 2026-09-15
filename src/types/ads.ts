/**
 * Production Ad Architecture Contracts & Type Definitions for AHADEX TOOLS.
 * Supports provider-neutral multi-network monetization (AdSense, Monetag, Adsterra, Custom).
 * Strictly typed, backward-compatible, and isolated from UI implementations.
 */

export type AdProvider = 'adsense' | 'monetag' | 'adsterra' | 'custom';

export type AdPlacement =
  | 'header'
  | 'home-top'
  | 'home-middle'
  | 'home-bottom'
  | 'category'
  | 'tool-before-workspace'
  | 'tool-after-workspace'
  | 'tool-result'
  | 'footer';

/**
 * Backward compatibility with preliminary slot position definitions
 */
export type AdSlotPosition =
  | 'header-top'
  | 'sidebar-rail'
  | 'content-middle'
  | 'tool-footer'
  | AdPlacement;

export type AdFormat =
  | 'auto'
  | 'banner'
  | 'leaderboard'
  | 'rectangle'
  | 'horizontal'
  | 'in-article'
  | 'responsive'
  | 'native';

export interface AdSenseConfig {
  /** Google AdSense Publisher Client ID (format: ca-pub-XXXXXXXXXXXXXXXX) */
  clientId?: string;
  /** Specific Ad Unit Slot ID (e.g. 1234567890) */
  slotId?: string;
  /** Ad display format */
  format?: AdFormat | string;
  /** Whether the ad unit is full-width responsive */
  responsive?: boolean;
  /** In-article or layout key parameter */
  layoutKey?: string;
  /** Optional test mode flag for AdSense */
  testMode?: boolean;
}

export interface MonetagConfig {
  /** Monetag Zone Identifier */
  zoneId?: string;
  /** Format/tag type */
  tagType?: string;
}

export interface AdsterraConfig {
  /** Adsterra Placement/Key Identifier */
  placementKey?: string;
  /** Format specification */
  format?: string;
}

export interface CustomAdConfig {
  id?: string;
  identifier?: string;
}

export interface AdPlacementConfig {
  /** Placement key identifier */
  placement: AdPlacement;
  /** Whether this placement is actively permitted to render ads */
  isEnabled: boolean;
  /** Slot ID override when applicable */
  slotId?: string;
  /** Backward-compatible position alias */
  position?: AdSlotPosition;
  /** Allowed providers for this slot (if empty or undefined, uses active global provider) */
  allowedProviders?: AdProvider[];
  /** Default ad format for layout sizing */
  defaultFormat?: AdFormat;
  /** Reserved minimum height in pixels to avoid Cumulative Layout Shift (CLS) */
  minHeightPx?: number;
  /** Reserved minimum width in pixels */
  minWidthPx?: number;
  /** Whether to reserve blank space while loading or when empty */
  reserveSpace?: boolean;
}

export type AdConsentState = 'unknown' | 'granted' | 'denied';

export interface AdVisibilityResult {
  /** Whether the ad slot is permitted to render */
  canRender: boolean;
  /** Explanation code if rendering is skipped or blocked */
  reason?:
    | 'global_disabled'
    | 'placement_disabled'
    | 'no_provider'
    | 'provider_not_configured'
    | 'consent_denied'
    | 'consent_required'
    | 'unsupported_device'
    | 'ready';
  /** The determined active ad provider */
  provider?: AdProvider;
}

export interface GlobalAdSettings {
  /** Master switch for ads across the entire application */
  enabled: boolean;
  /** Default active provider to serve */
  activeProvider: AdProvider | null;
  /** Whether explicit user consent is required before loading ad tags */
  consentRequired: boolean;
  /** Debug mode for visualizing ad slots without serving real ads */
  debugMode: boolean;
  /** Provider-specific configuration registry */
  providers: {
    adsense: AdSenseConfig;
    monetag: MonetagConfig;
    adsterra: AdsterraConfig;
    custom: CustomAdConfig;
  };
  /** Placement configuration map */
  placements: Record<AdPlacement, AdPlacementConfig>;
}
