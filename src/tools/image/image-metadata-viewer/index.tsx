import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageMetadataSEO } from "./SEO";
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

export default function ImageMetadataViewerTool() {
  useToolAnalytics("image-metadata-viewer");
  return (
    <>
      <ImageMetadataSEO />
        <ToolBreadcrumb toolName="Image Metadata Viewer" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="image-metadata-viewer" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="image-metadata-viewer" />
        <RelatedTools />
      </div>
    </>
  );
}
