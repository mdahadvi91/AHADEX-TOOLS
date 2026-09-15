import type { Category } from '@/src/types/category';

/**
 * Canonical category registry for AHADEX TOOLS.
 * All category references and navigation must derive from this registry.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'image',
    slug: 'image',
    name: 'Image Tools',
    description: 'Compress, convert, resize, crop, and optimize images directly in the browser.',
    icon: 'Image',
    order: 1,
    status: 'active',
  },
  {
    id: 'pdf',
    slug: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, convert, and organize PDF documents securely.',
    icon: 'FileText',
    order: 2,
    status: 'active',
  },
  {
    id: 'qr',
    slug: 'qr',
    name: 'QR & Barcode',
    description: 'Generate and scan custom QR codes with color, logos, and high resolution.',
    icon: 'QrCode',
    order: 3,
    status: 'active',
  },
  {
    id: 'text',
    slug: 'text',
    name: 'Text & Lists',
    description: 'Format, inspect, compare, count, and manipulate text strings and lists.',
    icon: 'Type',
    order: 4,
    status: 'coming-soon',
  },
  {
    id: 'developer',
    slug: 'developer',
    name: 'Developer Tools',
    description: 'JSON formatters, encoders, hashes, regex testers, and code utilities.',
    icon: 'Code2',
    order: 5,
    status: 'coming-soon',
  },
  {
    id: 'converters',
    slug: 'converters',
    name: 'Converters',
    description: 'Unit conversion, color spaces, timestamps, data sizes, and measurements.',
    icon: 'RefreshCw',
    order: 6,
    status: 'coming-soon',
  },
  {
    id: 'utilities',
    slug: 'utilities',
    name: 'General Utilities',
    description: 'Calculators, random generators, timers, and productivity essentials.',
    icon: 'Wrench',
    order: 7,
    status: 'coming-soon',
  },
];

/**
 * Retrieve a category by its unique ID.
 */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

/**
 * Retrieve a category by its URL slug.
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}

/**
 * Retrieve only currently active categories.
 */
export function getActiveCategories(): Category[] {
  return CATEGORIES.filter((cat) => cat.status === 'active');
}

/**
 * Lightweight runtime validation for category data integrity.
 */
export function validateCategoryRegistry(): boolean {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const cat of CATEGORIES) {
    if (!cat.id || seenIds.has(cat.id)) {
      throw new Error(`[CategoryRegistry] Duplicate or invalid Category ID: "${cat.id}"`);
    }
    if (!cat.slug || seenSlugs.has(cat.slug)) {
      throw new Error(`[CategoryRegistry] Duplicate or invalid Category Slug: "${cat.slug}"`);
    }
    seenIds.add(cat.id);
    seenSlugs.add(cat.slug);
  }

  return true;
}

// Validate registry integrity on load
validateCategoryRegistry();
