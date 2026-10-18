import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageCompressorSEO } from "./SEO";
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
import { ToolEditorial } from "@components/tools/ToolEditorial";
import { ToolDataSections } from "@components/tools/ToolDataSections";

export default function ImageCompressorTool() {
  useToolAnalytics("image-compressor");
  return (
    <>
      <ImageCompressorSEO />
      <ToolSchema toolId="image-compressor" />
        <ToolBreadcrumb toolName="Image Compressor" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <ToolEditorial toolId="image-compressor" />
        <Workspace />
        <RecommendedProducts toolId="image-compressor" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
          <ToolFieldNote toolId="image-compressor" />
        <RelatedArticles toolId="image-compressor" />
        <ToolDataSections toolId="image-compressor" />
        <RelatedTools />
      </div>
    </>
  );
}
