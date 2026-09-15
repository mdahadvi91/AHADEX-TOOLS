import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/src/components/layout';
import {
  HomePage,
  CategoryPage,
  ToolPage,
  AboutPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  DisclaimerPage,
  CookiePolicyPage,
  AccessibilityPage,
  NotFoundPage,
} from '@/src/pages';

/**
 * Centralized Route Paths for AHADEX TOOLS.
 * All route constants are maintained here to ensure scalability across 100+ tools.
 */
export const ROUTES = {
  HOME: '/',
  CATEGORY: '/category/:category',
  TOOL: '/tools/:tool',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  DISCLAIMER: '/disclaimer',
  COOKIES: '/cookies',
  COOKIE_POLICY: '/cookie-policy',
  ACCESSIBILITY: '/accessibility',
} as const;

export type RoutePathKey = keyof typeof ROUTES;

/**
 * Path Generator Helpers
 */
export function getCategoryRoute(category: string): string {
  return `/category/${encodeURIComponent(category)}`;
}

export function getToolRoute(toolSlug: string): string {
  return `/tools/${encodeURIComponent(toolSlug)}`;
}

/**
 * Core Application Routes
 * Decoupled from individual tool implementations to support lazy loading.
 * Nested under reusable MainLayout shell.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
        <Route path={ROUTES.TOOL} element={<ToolPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />
        <Route path={ROUTES.DISCLAIMER} element={<DisclaimerPage />} />
        <Route path={ROUTES.COOKIES} element={<CookiePolicyPage />} />
        <Route path={ROUTES.COOKIE_POLICY} element={<CookiePolicyPage />} />
        <Route path={ROUTES.ACCESSIBILITY} element={<AccessibilityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
