export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const MEDIA_QUERIES = {
  isMobile: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  isDesktop: `(min-width: ${BREAKPOINTS.lg}px)`,
  prefersReducedMotion: "(prefers-reduced-motion: reduce)",
  prefersDarkMode: "(prefers-color-scheme: dark)",
} as const;

export const LAYOUT = {
  headerHeight: 72,
  headerHeightMobile: 64,
  sidebarWidth: 256,
  maxContentWidth: 1400,
} as const;
