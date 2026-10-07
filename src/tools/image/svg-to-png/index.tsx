import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { SvgToPngSEO } from "./SEO";
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

export default function SvgToPngTool() {
  useToolAnalytics("svg-to-png");
  return (
    <>
      <SvgToPngSEO />
      <ToolSchema toolId="svg-to-png" />
        <ToolBreadcrumb toolName="SVG to PNG" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="svg-to-png" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="svg-to-png" />
        <RelatedTools />
      </div>
    </>
  );
}
