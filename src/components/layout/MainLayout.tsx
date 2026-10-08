import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { PageTransition } from "./PageTransition";
import { CinematicBackground } from "@components/background";
import { BackButton } from "@components/common/BackButton";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";
import { GoogleAnalyticsLoader } from "@components/analytics/GoogleAnalyticsLoader";
import { CookieConsentBanner, ConsentModeInit } from "@components/consent";
import { usePageTracking } from "@hooks/usePageTracking";

export function MainLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  usePageTracking();

  return (
    <>
      <ConsentModeInit />
      <GoogleAnalyticsLoader />
      <CinematicBackground />

      <Header
        onLeftMenuClick={() => setLeftOpen(true)}
        onRightMenuClick={() => setRightOpen(true)}
      />

      <LeftSidebar mobileOpen={leftOpen} onMobileClose={() => setLeftOpen(false)} />
      <RightSidebar mobileOpen={rightOpen} onMobileClose={() => setRightOpen(false)} />

      <BackButton />

      <div className="h-24 lg:h-28" aria-hidden="true" />

      {/* ── Header Ad — above main content ── */}
      <div className="max-w-5xl mx-auto px-4 mb-4">
        <AdSenseSlot slot="HEADER" label="Advertisement" />
      </div>

      <main id="main-content" className="relative lg:ml-64 lg:mr-72 min-h-[60vh]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* ── Footer Ad — above footer ── */}
      <div className="max-w-5xl mx-auto px-4 mt-8 mb-4">
        <AdSenseSlot slot="FOOTER" label="Advertisement" />
      </div>

      <Footer />
      <CookieConsentBanner />
    </>
  );
}
