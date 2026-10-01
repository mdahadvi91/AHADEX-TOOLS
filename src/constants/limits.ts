export const FILE_SIZE = {
  image: 50 * 1024 * 1024,
  pdf: 100 * 1024 * 1024,
  text: 5 * 1024 * 1024,
} as const;

export const UI_LIMITS = {
  searchResultsMax: 8,
  relatedToolsMax: 6,
  popularToolsMax: 6,
  recentToolsMax: 5,
  toastDurationMs: 4000,
  tooltipDelayMs: 300,
} as const;

export const TOOL_LIMITS = {
  qrCodeMaxLength: 2953,
  wordCounterMaxChars: 1_000_000,
  jsonMaxSize: 10 * 1024 * 1024,
  uuidBulkMax: 1000,
} as const;
