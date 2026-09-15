import { CATEGORIES } from './categories';

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'All Tools', href: '/#tools' },
];

/**
 * Data-driven category navigation items derived directly from central category registry.
 */
export const CATEGORY_NAV_ITEMS: NavItem[] = CATEGORIES.map((cat) => ({
  label: cat.name,
  href: `/category/${cat.slug}`,
  badge: cat.status === 'coming-soon' ? 'Soon' : undefined,
}));

export const COMPANY_NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_NAV_ITEMS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Cookie Policy', href: '/cookies' },
];

export const ACCESSIBILITY_NAV_ITEMS: NavItem[] = [
  { label: 'Accessibility Statement', href: '/accessibility' },
];
