import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ImageCropperSEO } from "./SEO";
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

export default function ImageCropperTool() {
  useToolAnalytics("image-cropper");
  return (
    <>
      <ImageCropperSEO />
      <ToolSchema toolId="image-cropper" />
        <ToolBreadcrumb toolName="Image Cropper" category="Image Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="image-cropper" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <ToolRelatedGuides toolId="image-cropper" />
        <RelatedArticles toolId="image-cropper" />
        <ToolDataSections toolId="image-cropper" />
        <RelatedTools />
      </div>
    </>
  );
}
