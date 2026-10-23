import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "@components/common/ToastContainer";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { PageTransition } from "./PageTransition";
import { BackButton } from "@components/common/BackButton";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";
import { GoogleAnalyticsLoader } from "@components/analytics/GoogleAnalyticsLoader";
import { usePageTracking } from "@hooks/usePageTracking";

export function MainLayout() {

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const location = useLocation();

  usePageTracking();

  /* ── Route-aware ad placement ──────────────────────────────
   * AdSense policy expects meaningful publisher content to be
   * visible on the same screen as every ad. A "header ad" that
   * renders before the tool workspace puts the ad on a page with
   * no user-facing content yet — high accidental-click risk and a
   * policy gray zone.
   *
   * Strategy:
   *   - Tool pages: no top ad. The footer ad below the tool content
   *     remains (it sits after Hero, Workspace, Intro, Features,
   *     HowTo, Privacy, FAQ, Related — plenty of context).
   *   - Editor routes (cv-builder/edit, visiting-card/edit): no ads
   *     at all — the editor is the entire page and ads would only
   *     distract from active work.
   *   - Blog posts, static pages, home: keep both top and bottom
   *     ads. Content is editorial text; the top ad sits between
   *     header and body, which is standard for a text article.
   * ─────────────────────────────────────────────────────────── */
  const pathname = location.pathname;
  const isToolPage = pathname.startsWith("/tools/");
  const isEditorRoute = /^\/tools\/(cv-builder|visiting-card)\/edit\//.test(
    pathname
  );

  const showTopAd = !isToolPage && !isEditorRoute;
  const showBottomAd = !isEditorRoute;

  return (
    <>
      <GoogleAnalyticsLoader />
      

      <Header
        onLeftMenuClick={() => setLeftOpen(true)}
        onRightMenuClick={() => setRightOpen(true)}
      />

      <LeftSidebar mobileOpen={leftOpen} onMobileClose={() => setLeftOpen(false)} />
      <RightSidebar mobileOpen={rightOpen} onMobileClose={() => setRightOpen(false)} />

      <BackButton />

      <div className="h-24 lg:h-28" aria-hidden="true" />

      {showTopAd && (
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <AdSenseSlot slot="1234567890" label="Advertisement" />
        </div>
      )}

      <main
        id="main-content"
        className="relative lg:ml-64 lg:mr-72 min-h-[60vh]"
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
            <ToastContainer />
      </main>

      {showBottomAd && (
        <div className="max-w-5xl mx-auto px-4 mt-8 mb-4">
          <AdSenseSlot slot="0987654321" label="Advertisement" />
        </div>
      )}

      <Footer />
      </>
  );
}
