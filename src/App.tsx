import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { MainLayout } from "@components/layout/MainLayout";
import { ThemeProvider } from "@contexts/ThemeContext";
import { LanguageProvider } from "@contexts/LanguageContext";
import { Loader } from "@components/common/Loader";
import { ToolSkeleton } from "@components/common/ToolSkeleton";
import { ConsentModeInit } from "@components/consent/ConsentModeInit";
import { CookieConsentBanner } from "@components/consent/CookieConsentBanner";

/* ------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------ */
const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsIndexPage = lazy(() => import("@pages/ToolsIndexPage")); // 🚨 নতুন ইমপোর্ট
const AboutPage = lazy(() => import("@pages/AboutPage"));
const AuthorPage = lazy(() => import("@pages/AuthorPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/PrivacyPage"));
const TermsPage = lazy(() => import("@pages/TermsPage"));
const DisclaimerPage = lazy(() => import("@pages/DisclaimerPage"));
const AccessibilityPage = lazy(() => import("@pages/AccessibilityPage"));
const CookiePolicyPage = lazy(() => import("@pages/CookiePolicyPage"));
const EditorialPolicyPage = lazy(() => import("@pages/EditorialPolicyPage"));
const HtmlSitemapPage = lazy(() => import("@pages/HtmlSitemapPage"));
const GuidesIndexPage = lazy(() => import("@pages/GuidesIndexPage"));
const GuidePage = lazy(() => import("@pages/GuidePage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

/* ------------------------------------------------------------------
 * Tools
 * ------------------------------------------------------------------ */
const PhotoQrTool = lazy(() => import("@tools/qr/photo-qr"));
const VisitingCardTool = lazy(() => import("@tools/design/visiting-card"));
const CVBuilderTool = lazy(() => import("@tools/documents/cv-builder"));

const CVBuilderEditor = lazy(() =>
  import("@tools/documents/cv-builder/editor").then((m) => ({
    default: m.CVEditor,
  }))
);

const VisitingCardEditor = lazy(() =>
  import("@tools/design/visiting-card/editor").then((m) => ({
    default: m.Editor,
  }))
);

/* ------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------ */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function ToolSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ToolSkeleton />}>
      {children}
    </Suspense>
  );
}

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}

/* ------------------------------------------------------------------
 * App
 * ------------------------------------------------------------------ */
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ConsentModeInit />
          <CookieConsentBanner />

          <Routes>
            <Route element={<MainLayout />}>
              {/* Home */}
              <Route
                index
                element={
                  <PageSuspense>
                    <HomePage />
                  </PageSuspense>
                }
              />
              
              {/* 🚨 /tools route now renders the Tools listing page instead of redirecting */}
              <Route path="tools" element={<PageSuspense><ToolsIndexPage /></PageSuspense>} />

              {/* ── Tools ── */}
              <Route path="tools/photo-qr" element={<ToolSuspense><PhotoQrTool /></ToolSuspense>} />
              <Route path="tools/visiting-card" element={<ToolSuspense><VisitingCardTool /></ToolSuspense>} />
              <Route path="tools/cv-builder" element={<ToolSuspense><CVBuilderTool /></ToolSuspense>} />

              {/* Tool editors */}
              <Route path="tools/cv-builder/edit/:templateId" element={<ToolSuspense><CVBuilderEditor /></ToolSuspense>} />
              <Route path="tools/visiting-card/edit/:templateId" element={<ToolSuspense><VisitingCardEditor /></ToolSuspense>} />

              {/* Static pages */}
              <Route path="about" element={<PageSuspense><AboutPage /></PageSuspense>} />
              <Route path="about/author/:id" element={<PageSuspense><AuthorPage /></PageSuspense>} />
              <Route path="contact" element={<PageSuspense><ContactPage /></PageSuspense>} />
              <Route path="privacy" element={<PageSuspense><PrivacyPage /></PageSuspense>} />
              <Route path="terms" element={<PageSuspense><TermsPage /></PageSuspense>} />
              <Route path="disclaimer" element={<PageSuspense><DisclaimerPage /></PageSuspense>} />
              <Route path="accessibility" element={<PageSuspense><AccessibilityPage /></PageSuspense>} />
              <Route path="cookie-policy" element={<PageSuspense><CookiePolicyPage /></PageSuspense>} />
              <Route path="editorial-policy" element={<PageSuspense><EditorialPolicyPage /></PageSuspense>} />
              <Route path="sitemap" element={<PageSuspense><HtmlSitemapPage /></PageSuspense>} />

              {/* Global Guides */}
              <Route path="guides" element={<PageSuspense><GuidesIndexPage /></PageSuspense>} />
              <Route path="guides/:slug" element={<PageSuspense><GuidePage /></PageSuspense>} />

              {/* Fallback */}
              <Route path="404" element={<PageSuspense><NotFoundPage /></PageSuspense>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
