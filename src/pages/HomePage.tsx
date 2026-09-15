import React from 'react';
import { HeroSection } from '@/src/components/hero';
import { FeaturedTools, PopularTools, AllToolsSection } from '@/src/components/tools';
import { CategoryGrid, HowItWorksSection, TrustSection, FaqSection } from '@/src/components/home';
import { AdSlot } from '@/src/components/common';
import { useSEO, generateWebSiteSchema, generateOrganizationSchema } from '@/src/lib/seo';
import { SITE_CONFIG } from '@/src/data/site';

/**
 * Production HomePage for AHADEX TOOLS.
 * Composes platform introduction, centralized tool discovery, category navigation,
 * transparent trust commitments, and accessible FAQs.
 */
export default function HomePage() {
  useSEO({
    title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    path: '/',
    structuredData: [generateWebSiteSchema(), generateOrganizationSchema()],
  });

  return (
    <div id="ahadex-home-page" className="w-full flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 pb-12 animate-fade-in">
      {/* 1. Hero with value proposition, global discovery search & decorative visual */}
      <HeroSection />

      {/* 2. Featured Tools Spotlight (derived from central tools.ts) */}
      <FeaturedTools />

      {/* Safe Home Top Ad Placement */}
      <AdSlot placement="home-top" />

      {/* 3. Popular Utilities Trending (derived from central tools.ts) */}
      <PopularTools />

      {/* 4. Complete Directory: All Tools with dynamic category filtering */}
      <AllToolsSection />

      {/* Safe Home Middle Ad Placement */}
      <AdSlot placement="home-middle" />

      {/* 5. Domain Categories Grid (derived from central categories.ts) */}
      <CategoryGrid />

      {/* 6. How AHADEX TOOLS Works (4-step workflow overview) */}
      <HowItWorksSection />

      {/* 7. Privacy & Trust Architecture (transparent, non-exaggerated commitments) */}
      <TrustSection />

      {/* Safe Home Bottom Ad Placement */}
      <AdSlot placement="home-bottom" />

      {/* 8. Frequently Asked Questions (accessible disclosures) */}
      <FaqSection />
    </div>
  );
}
