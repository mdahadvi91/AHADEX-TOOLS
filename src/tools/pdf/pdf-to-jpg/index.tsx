import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PdfToJpgSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedTools } from "./components/RelatedTools";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { ToolSchema } from "@components/seo/ToolSchema";

export default function PdfToJpgTool() {
  useToolAnalytics("pdf-to-jpg");
  return (
    <>
      <PdfToJpgSEO />
      <ToolSchema toolId="pdf-to-jpg" />
        <ToolBreadcrumb toolName="PDF to JPG" category="PDF Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="pdf-to-jpg" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="pdf-to-jpg" />
        <RelatedTools />
      </div>
    </>
  );
}
