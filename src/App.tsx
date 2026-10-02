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
import { SoundProvider } from "@contexts/SoundContext";

/* ------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------ */
const ToolsIndexPage = lazy(() => import("@pages/ToolsIndexPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/PrivacyPage"));
const TermsPage = lazy(() => import("@pages/TermsPage"));
const DisclaimerPage = lazy(() => import("@pages/DisclaimerPage"));
const AccessibilityPage = lazy(() => import("@pages/AccessibilityPage"));
const CookiePolicyPage = lazy(() => import("@pages/CookiePolicyPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

/* ------------------------------------------------------------------
 * Tools
 * ------------------------------------------------------------------ */
const PhotoQrTool = lazy(() => import("@tools/qr/photo-qr"));
const VisitingCardTool = lazy(() => import("@tools/design/visiting-card"));
const CVBuilderTool = lazy(() => import("@tools/documents/cv-builder"));
const JpgToPngTool = lazy(() => import("@tools/image/jpg-to-png"));

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

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-silk-cream dark:bg-dark-bg">
      <div className="w-8 h-8 rounded-full border-2 border-silk-rose/30 border-t-silk-rose animate-spin" />
    </div>
  );
}

/* ------------------------------------------------------------------
 * App
 * ------------------------------------------------------------------ */
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  {/* Home */}
                  <Route index element={<ToolsIndexPage />} />
                  <Route path="tools" element={<ToolsIndexPage />} />

                  {/* Tools */}
                  <Route path="tools/photo-qr" element={<PhotoQrTool />} />

                  <Route
                    path="tools/visiting-card"
                    element={<VisitingCardTool />}
                  />
                  <Route
                    path="tools/visiting-card/edit/:templateId"
                    element={<VisitingCardEditor />}
                  />

                  <Route
                    path="tools/cv-builder"
                    element={<CVBuilderTool />}
                  />
                  <Route
                    path="tools/jpg-to-png"
                    element={<JpgToPngTool />}
                  />
                  <Route
                    path="tools/cv-builder/edit/:templateId"
                    element={<CVBuilderEditor />}
                  />

                  {/* Static pages */}
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="terms" element={<TermsPage />} />
                  <Route path="disclaimer" element={<DisclaimerPage />} />
                  <Route path="accessibility" element={<AccessibilityPage />} />
                  <Route path="cookie-policy" element={<CookiePolicyPage />} />

                  {/* Fallback */}
                  <Route path="404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
