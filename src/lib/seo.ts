/**
 * Centralized SEO, Metadata, and Structured Data Architecture for AHADEX TOOLS.
 * All canonical URLs, titles, robots directives, and schema generators derive from this module.
 */

import { useEffect } from 'react';
import { CANONICAL_BASE_URL, SITE_CONFIG } from '@/src/data/site';
import type { Tool } from '@/src/types/tool';
import type { Category } from '@/src/types/category';
import type { HowToUseStep, ToolFAQItem } from '@/src/types/workspace';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SEOMetadata {
  title?: string;
  description?: string;
  path?: string;
  canonicalUrl?: string;
  robots?: 'index, follow' | 'noindex, nofollow' | 'noindex, follow' | 'index, nofollow';
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Returns a normalized, absolute canonical URL.
 * Ensures consistent single trailing slash on root, no trailing slashes on sub-paths,
 * and completely strips any user-controlled query strings or hashes.
 */
export function buildCanonicalUrl(pathname: string = '/'): string {
  // Strip query parameters and hash fragments
  const cleanPath = pathname.split('?')[0].split('#')[0];
  // Normalize slashes
  let normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  // Remove trailing slash unless path is strictly '/'
  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  return `${CANONICAL_BASE_URL}${normalizedPath}`;
}

/**
 * Constructs a clean, professional, non-stuffed page title.
 */
export function buildPageTitle(subTitle?: string): string {
  const brand = SITE_CONFIG.brandName;
  if (!subTitle || subTitle.trim() === '' || subTitle === brand) {
    return `${brand} | ${SITE_CONFIG.tagline}`;
  }
  return `${subTitle.trim()} | ${brand}`;
}

/**
 * Generates Schema.org WebSite JSON-LD.
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.siteName,
    url: CANONICAL_BASE_URL,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_BASE_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generates Schema.org Organization JSON-LD.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.brandName,
    url: CANONICAL_BASE_URL,
    logo: `${CANONICAL_BASE_URL}/favicon.svg`,
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD from actual route relationships.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

/**
 * Generates Schema.org SoftwareApplication JSON-LD for a Tool.
 * Only claims genuine capabilities (in-browser, free, privacy-first).
 * Never claims fake reviews or fake ratings.
 */
export function generateSoftwareApplicationSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.shortDescription,
    url: buildCanonicalUrl(tool.route),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Generates Schema.org HowTo JSON-LD only when genuine steps exist.
 */
export function generateHowToSchema(toolName: string, steps: HowToUseStep[]) {
  if (!steps || steps.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${toolName}`,
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.stepNumber,
      name: step.title,
      text: step.description,
    })),
  };
}

/**
 * Generates Schema.org FAQPage JSON-LD only when matching visible FAQs exist.
 */
export function generateFAQSchema(faqs: ToolFAQItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Helper to update or create an HTML head element.
 */
function setMetaTag(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLElement | null;
  if (!element) {
    element = document.createElement(selector.startsWith('meta') ? 'meta' : 'link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, val]) => {
    element?.setAttribute(key, val);
  });
}

/**
 * Helper to remove an HTML head element if it exists.
 */
function removeHeadElement(selector: string) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.remove();
  }
}

const STRUCTURED_DATA_SCRIPT_ID = 'ahadex-structured-data-jsonld';

/**
 * React hook to manage page-level SEO tags and JSON-LD structured data.
 * Updates the document head on render and cleans up on unmount.
 */
export function useSEO(metadata: SEOMetadata) {
  const {
    title,
    description = SITE_CONFIG.description,
    path = window.location.pathname,
    canonicalUrl,
    robots = 'index, follow',
    ogType = 'website',
    ogImage,
    keywords,
    breadcrumbs,
    structuredData,
  } = metadata;

  useEffect(() => {
    // 1. Title
    const formattedTitle = buildPageTitle(title);
    document.title = formattedTitle;

    // 2. Canonical URL
    const finalCanonical = canonicalUrl || buildCanonicalUrl(path);
    setMetaTag('link[rel="canonical"]', { rel: 'canonical', href: finalCanonical });

    // 3. Meta Description
    setMetaTag('meta[name="description"]', { name: 'description', content: description });

    // 4. Meta Robots
    setMetaTag('meta[name="robots"]', { name: 'robots', content: robots });

    // 5. Meta Keywords (only if provided)
    if (keywords && keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    } else {
      removeHeadElement('meta[name="keywords"]');
    }

    // 6. Open Graph Tags
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: formattedTitle });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: ogType });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: finalCanonical });
    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_CONFIG.siteName });
    setMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });

    if (ogImage) {
      setMetaTag('meta[property="og:image"]', { property: 'og:image', content: ogImage });
      setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
      setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    } else {
      removeHeadElement('meta[property="og:image"]');
      removeHeadElement('meta[name="twitter:image"]');
      setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary' });
    }

    // 7. Twitter / X Card Tags
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: formattedTitle });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

    // 8. JSON-LD Structured Data Injection
    const schemasToInject: object[] = [];

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
      if (breadcrumbSchema) schemasToInject.push(breadcrumbSchema);
    }

    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemasToInject.push(...structuredData);
      } else {
        schemasToInject.push(structuredData);
      }
    }

    if (schemasToInject.length > 0) {
      let script = document.getElementById(STRUCTURED_DATA_SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = STRUCTURED_DATA_SCRIPT_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(
        schemasToInject.length === 1 ? schemasToInject[0] : schemasToInject
      );
    } else {
      removeHeadElement(`#${STRUCTURED_DATA_SCRIPT_ID}`);
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [
    title,
    description,
    path,
    canonicalUrl,
    robots,
    ogType,
    ogImage,
    keywords,
    breadcrumbs,
    structuredData,
  ]);
}

/**
 * Declarative component wrapper for useSEO.
 */
export function SEOHead(props: SEOMetadata) {
  useSEO(props);
  return null;
}
