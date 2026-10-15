import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PdfToImageSEO } from "./SEO";
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
import { ToolSchema } from "@components/seo/ToolSchema";
import { ToolFieldNote } from "@components/tools/ToolFieldNote";

export default function PdfToImageTool() {
  useToolAnalytics("pdf-to-image");
  return (
    <>
      <PdfToImageSEO />
      <ToolSchema toolId="pdf-to-image" />
        <ToolBreadcrumb toolName="PDF to PNG" category="PDF Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="pdf-to-image" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
          <ToolFieldNote toolId="pdf-to-image" />
        <RelatedArticles toolId="pdf-to-image" />
        <RelatedTools />
      </div>
    </>
  );
}
