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

/* ------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------ */
const HomePage = lazy(() => import("@pages/HomePage"));
const ToolsIndexPage = lazy(() => import("@pages/ToolsIndexPage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const AuthorPage = lazy(() => import("@pages/AuthorPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
const PrivacyPage = lazy(() => import("@pages/PrivacyPage"));
const TermsPage = lazy(() => import("@pages/TermsPage"));
const DisclaimerPage = lazy(() => import("@pages/DisclaimerPage"));
const AccessibilityPage = lazy(() => import("@pages/AccessibilityPage"));
const CookiePolicyPage = lazy(() => import("@pages/CookiePolicyPage"));
const AffiliateDisclosurePage = lazy(() => import("@pages/AffiliateDisclosurePage"));
const EditorialPolicyPage = lazy(() => import("@pages/EditorialPolicyPage"));
const HtmlSitemapPage = lazy(() => import("@pages/HtmlSitemapPage"));
const GuidesIndexPage = lazy(() => import("@pages/GuidesIndexPage"));
const GuidePage = lazy(() => import("@pages/GuidePage"));
const BlogIndexPage = lazy(() => import("@pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("@pages/BlogPostPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage"));

/* ------------------------------------------------------------------
 * Tools
 * ------------------------------------------------------------------ */
const PhotoQrTool = lazy(() => import("@tools/qr/photo-qr"));
const VisitingCardTool = lazy(() => import("@tools/design/visiting-card"));
const CVBuilderTool = lazy(() => import("@tools/documents/cv-builder"));
const ImageConverterTool = lazy(() => import("@tools/image/converter"));
const PdfToImageTool = lazy(() => import("@tools/pdf/to-image"));
const ImageCompressorTool = lazy(() => import("@tools/image/image-compressor"));
const ImageResizerTool = lazy(() => import("@tools/image/image-resizer"));
const ImageCropperTool = lazy(() => import("@tools/image/image-cropper"));
const MergePdfTool = lazy(() => import("@tools/pdf/merge-pdf"));
const SplitPdfTool = lazy(() => import("@tools/pdf/split-pdf"));
const ImageToPdfTool = lazy(() => import("@tools/image/image-to-pdf"));
const ImageMetadataViewerTool = lazy(() => import("@tools/image/image-metadata-viewer"));
const FaviconGeneratorTool = lazy(() => import("@tools/image/favicon-generator"));
const SvgToPngTool = lazy(() => import("@tools/image/svg-to-png"));
const JsonFormatterTool = lazy(() => import("@tools/developer/json-formatter"));
const UrlEncoderTool = lazy(() => import("@tools/developer/url-encoder"));
const UuidGeneratorTool = lazy(() => import("@tools/developer/uuid-generator"));
const TextCaseConverterTool = lazy(() => import("@tools/text/text-case-converter"));
const ImageToSketchTool = lazy(() => import("@tools/image/image-to-sketch"));
const ImageToCartoonTool = lazy(() => import("@tools/image/image-to-cartoon"));
const Base64EncoderTool = lazy(() => import("@tools/developer/base64-encoder"));
const PasswordGeneratorTool = lazy(() => import("@tools/developer/password-generator"));
const BarcodeGeneratorTool = lazy(() => import("@tools/qr/barcode-generator"));
const WordCounterTool = lazy(() => import("@tools/text/word-counter"));
const CharacterCounterTool = lazy(() => import("@tools/text/character-counter"));
const PdfToTextTool = lazy(() => import("@tools/pdf/pdf-to-text"));
const PdfRotatorTool = lazy(() => import("@tools/pdf/pdf-rotator"));

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

/**
 * ToolSuspense — fallback for tool routes.
 * Shows a layout-preserving skeleton so the page doesn't flash blank.
 */
function ToolSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ToolSkeleton />}>
      {children}
    </Suspense>
  );
}

/**
 * PageSuspense — fallback for top-level pages (full-screen loader).
 */
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
                <Route
                  path="tools"
                  element={
                    <PageSuspense>
                      <ToolsIndexPage />
                    </PageSuspense>
                  }
                />

                {/* ── Tools — each wrapped in ToolSuspense for skeleton ── */}
                <Route path="tools/photo-qr" element={<ToolSuspense><PhotoQrTool /></ToolSuspense>} />
                <Route path="tools/visiting-card" element={<ToolSuspense><VisitingCardTool /></ToolSuspense>} />
                <Route path="tools/cv-builder" element={<ToolSuspense><CVBuilderTool /></ToolSuspense>} />
                <Route path="tools/image-converter" element={<ToolSuspense><ImageConverterTool /></ToolSuspense>} />
                <Route path="tools/pdf-to-image" element={<ToolSuspense><PdfToImageTool /></ToolSuspense>} />
                <Route path="tools/image-compressor" element={<ToolSuspense><ImageCompressorTool /></ToolSuspense>} />
                <Route path="tools/image-resizer" element={<ToolSuspense><ImageResizerTool /></ToolSuspense>} />
                <Route path="tools/image-cropper" element={<ToolSuspense><ImageCropperTool /></ToolSuspense>} />
                <Route path="tools/merge-pdf" element={<ToolSuspense><MergePdfTool /></ToolSuspense>} />
                <Route path="tools/split-pdf" element={<ToolSuspense><SplitPdfTool /></ToolSuspense>} />
                <Route path="tools/image-to-pdf" element={<ToolSuspense><ImageToPdfTool /></ToolSuspense>} />
                <Route path="tools/image-metadata-viewer" element={<ToolSuspense><ImageMetadataViewerTool /></ToolSuspense>} />
                <Route path="tools/favicon-generator" element={<ToolSuspense><FaviconGeneratorTool /></ToolSuspense>} />
                <Route path="tools/svg-to-png" element={<ToolSuspense><SvgToPngTool /></ToolSuspense>} />
                <Route path="tools/json-formatter" element={<ToolSuspense><JsonFormatterTool /></ToolSuspense>} />
                <Route path="tools/url-encoder" element={<ToolSuspense><UrlEncoderTool /></ToolSuspense>} />
                <Route path="tools/uuid-generator" element={<ToolSuspense><UuidGeneratorTool /></ToolSuspense>} />
                <Route path="tools/text-case-converter" element={<ToolSuspense><TextCaseConverterTool /></ToolSuspense>} />
                <Route path="tools/image-to-sketch" element={<ToolSuspense><ImageToSketchTool /></ToolSuspense>} />
                <Route path="tools/image-to-cartoon" element={<ToolSuspense><ImageToCartoonTool /></ToolSuspense>} />
                <Route path="tools/base64-encoder" element={<ToolSuspense><Base64EncoderTool /></ToolSuspense>} />
                <Route path="tools/password-generator" element={<ToolSuspense><PasswordGeneratorTool /></ToolSuspense>} />
                <Route path="tools/barcode-generator" element={<ToolSuspense><BarcodeGeneratorTool /></ToolSuspense>} />
                <Route path="tools/word-counter" element={<ToolSuspense><WordCounterTool /></ToolSuspense>} />
                <Route path="tools/character-counter" element={<ToolSuspense><CharacterCounterTool /></ToolSuspense>} />
                <Route path="tools/pdf-to-text" element={<ToolSuspense><PdfToTextTool /></ToolSuspense>} />
                <Route path="tools/pdf-rotator" element={<ToolSuspense><PdfRotatorTool /></ToolSuspense>} />

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
                <Route path="affiliate-disclosure" element={<PageSuspense><AffiliateDisclosurePage /></PageSuspense>} />
                <Route path="editorial-policy" element={<PageSuspense><EditorialPolicyPage /></PageSuspense>} />
                <Route path="sitemap" element={<PageSuspense><HtmlSitemapPage /></PageSuspense>} />
                <Route path="blog" element={<PageSuspense><BlogIndexPage /></PageSuspense>} />
                <Route path="blog/:slug" element={<PageSuspense><BlogPostPage /></PageSuspense>} />

                {/* Guides */}
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
