import { useEffect } from "react";
import { FaviconGeneratorSEO } from "./SEO";
import { trackRecentTool } from "@lib/recentTools";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedTools } from "./components/RelatedTools";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { ToolSchema } from "@components/seo/ToolSchema";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function FaviconGeneratorTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/favicon-generator", name: "Favicon Generator", emoji: "🔧" });
  }, []);
  useToolAnalytics("favicon-generator");
  return (
    <>
      <FaviconGeneratorSEO />
      <ToolSchema toolId="favicon-generator" />
        <ToolBreadcrumb toolName="Favicon Generator" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="favicon-generator" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
        <ToolRelatedGuides toolId="favicon-generator" />
        <RelatedArticles toolId="favicon-generator" />
        <ToolDataSections toolId="favicon-generator" />
        <RelatedTools />
      </div>
    </>
  );
}
