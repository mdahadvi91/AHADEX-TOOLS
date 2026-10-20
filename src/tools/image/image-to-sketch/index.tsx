import { useEffect } from "react";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { trackRecentTool } from "@lib/recentTools";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageToSketchSEO } from "./SEO";
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
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function ImageToSketchTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/image-to-sketch", name: "Image To Sketch", emoji: "🔧" });
  }, []);
  useToolAnalytics("image-to-sketch");
  return (
    <>
      <ImageToSketchSEO />
      <ToolSchema toolId="image-to-sketch" />
        <ToolBreadcrumb toolName="Image to Sketch" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="image-to-sketch" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
        <ToolRelatedGuides toolId="image-to-sketch" />
        <RelatedArticles toolId="image-to-sketch" />
        <ToolDataSections toolId="image-to-sketch" />
        <RelatedTools />
      </div>
    </>
  );
}
