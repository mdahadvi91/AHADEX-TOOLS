import { useEffect } from "react";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { trackRecentTool } from "@lib/recentTools";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { TextCaseSEO } from "./SEO";
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

export default function TextCaseConverterTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/text-case-converter", name: "Text Case Converter", emoji: "🔧" });
  }, []);
  useToolAnalytics("text-case-converter");
  return (
    <>
      <TextCaseSEO />
      <ToolSchema toolId="text-case-converter" />
        <ToolBreadcrumb toolName="Text Case Converter" category="Text Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="text-case-converter" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
        <ToolRelatedGuides toolId="text-case-converter" />
        <RelatedArticles toolId="text-case-converter" />
        <ToolDataSections toolId="text-case-converter" />
        <RelatedTools />
      </div>
    </>
  );
}
