import { useEffect } from "react";
import { WhatNext } from "@components/tools/WhatNext";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { trackRecentTool } from "@lib/recentTools";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageToPdfSEO } from "./SEO";
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

export default function ImageToPdfTool() {

  useEffect(() => {
    trackRecentTool({ path: "/tools/image-to-pdf", name: "Image To Pdf", emoji: "🔧" });
  }, []);
  useToolAnalytics("image-to-pdf");
  return (
    <>
      <ImageToPdfSEO />
      <ToolSchema toolId="image-to-pdf" />
        <ToolBreadcrumb toolName="Image to PDF" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />

      <WhatNext
        actions={[
          { emoji: "📧", label: "Send by Email", to: "/tools/split-pdf", action: "Split if file is large" },
          { emoji: "🖨️", label: "Fix Orientation", to: "/tools/pdf-rotator", action: "Rotate pages" },
          { emoji: "📝", label: "Extract Text", to: "/tools/pdf-to-text", action: "Copy text content" }
        ]}
      />
        <RecommendedProducts toolId="image-to-pdf" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
          <ToolFieldNote toolId="image-to-pdf" />
        <ToolRelatedGuides toolId="image-to-pdf" />
        <RelatedArticles toolId="image-to-pdf" />
        <ToolDataSections toolId="image-to-pdf" />
        <RelatedTools />
      </div>
    </>
  );
}
