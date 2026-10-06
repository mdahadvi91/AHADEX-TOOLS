import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PdfPageExtractorSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RelatedTools } from "./components/RelatedTools";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";

export default function PdfPageExtractorTool() {
  useToolAnalytics("pdf-page-extractor");
  return (
    <>
      <PdfPageExtractorSEO />
        <ToolBreadcrumb toolName="PDF Page Extractor" category="PDF Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="pdf-page-extractor" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="pdf-page-extractor" />
        <RelatedTools />
      </div>
    </>
  );
}
