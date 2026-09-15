/**
 * Sitemap Foundation for AHADEX TOOLS.
 * Dynamically aggregates canonical URLs from site routes, active categories, and registered tools.
 */

import { CANONICAL_BASE_URL } from '@/src/data/site';
import { CATEGORIES } from '@/src/data/categories';
import { TOOLS } from '@/src/data/tools';
import { buildCanonicalUrl } from './seo';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Returns all canonical indexable URLs across the entire platform.
 */
export function getSitemapEntries(): SitemapEntry[] {
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Core Platform Pages
  const staticRoutes: Array<{ path: string; priority: number; changefreq: SitemapEntry['changefreq'] }> = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.6, changefreq: 'monthly' },
    { path: '/privacy', priority: 0.5, changefreq: 'monthly' },
    { path: '/terms', priority: 0.5, changefreq: 'monthly' },
    { path: '/disclaimer', priority: 0.4, changefreq: 'monthly' },
    { path: '/cookies', priority: 0.4, changefreq: 'monthly' },
    { path: '/accessibility', priority: 0.5, changefreq: 'monthly' },
  ];

  const entries: SitemapEntry[] = staticRoutes.map((route) => ({
    url: buildCanonicalUrl(route.path),
    lastmod: currentDate,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  // 2. Active Category Pages
  CATEGORIES.forEach((category) => {
    entries.push({
      url: buildCanonicalUrl(`/category/${category.slug}`),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
    });
  });

  // 3. Central Tool Registry Pages
  TOOLS.forEach((tool) => {
    entries.push({
      url: buildCanonicalUrl(tool.route),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: tool.isFeatured || tool.isPopular ? 0.9 : 0.8,
    });
  });

  return entries;
}

/**
 * Generates valid XML format for sitemap.xml.
 */
export function generateSitemapXml(): string {
  const entries = getSitemapEntries();

  const urlElements = entries
    .map((entry) => {
      const parts = [`    <loc>${entry.url}</loc>`];
      if (entry.lastmod) parts.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      if (entry.changefreq) parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      if (entry.priority !== undefined) parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join('\n')}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}
