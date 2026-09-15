import type { SupportedLanguage } from '@/src/types/common';

export interface SiteLanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export interface SiteConfig {
  brandName: string;
  siteName: string;
  tagline: string;
  description: string;
  baseUrl: string;
  defaultLanguage: SupportedLanguage;
  supportedLanguages: SiteLanguageConfig[];
}

/**
 * Canonical base production URL for AHADEX TOOLS.
 * All canonical URLs, sitemaps, and Open Graph references derive from this constant.
 */
export const CANONICAL_BASE_URL = 'https://ahadex.fun';

/**
 * Global site configuration data.
 * No hardcoded secrets, ads, or invented social media URLs.
 */
export const SITE_CONFIG: SiteConfig = {
  brandName: 'AHADEX TOOLS',
  siteName: 'AHADEX TOOLS',
  tagline: 'Privacy-First Free Online Utilities',
  description: 'Fast, secure, client-side browser tools for PDFs, image conversions, compression, and QR codes. Zero file uploads to servers.',
  baseUrl: CANONICAL_BASE_URL,
  defaultLanguage: 'en',
  supportedLanguages: [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
    },
    {
      code: 'bn',
      name: 'Bangla',
      nativeName: 'বাংলা',
      direction: 'ltr',
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl',
    },
  ],
};
