import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PdfToTextSEO } from "./SEO";
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
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function PdfToTextTool() {
  useToolAnalytics("pdf-to-text");
  return (
    <>
      <PdfToTextSEO />
      <ToolSchema toolId="pdf-to-text" />
        <ToolBreadcrumb toolName="PDF to Text" category="PDF Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="pdf-to-text" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
        <ToolRelatedGuides toolId="pdf-to-text" />
        <RelatedArticles toolId="pdf-to-text" />
        <ToolDataSections toolId="pdf-to-text" />
        <RelatedTools />
      </div>
    </>
  );
}
