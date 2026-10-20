import { useEffect } from "react";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { trackRecentTool } from "@lib/recentTools";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageResizerSEO } from "./SEO";
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
import { ToolFieldNote } from "@components/tools/ToolFieldNote";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function ImageResizerTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/image-resizer", name: "Image Resizer", emoji: "🔧" });
  }, []);
  useToolAnalytics("image-resizer");
  return (
    <>
      <ImageResizerSEO />
      <ToolSchema toolId="image-resizer" />
        <ToolBreadcrumb toolName="Image Resizer" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="image-resizer" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
          <ToolFieldNote toolId="image-resizer" />
        <ToolRelatedGuides toolId="image-resizer" />
        <RelatedArticles toolId="image-resizer" />
        <ToolDataSections toolId="image-resizer" />
        <RelatedTools />
      </div>
    </>
  );
}
