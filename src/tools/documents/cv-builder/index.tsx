import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { CVBuilderSEO } from "./SEO";
import { CVBuilderHero } from "./components/Hero";
import { TemplateGallery } from "./components/TemplateGallery";
import { CVBuilderIntro } from "./components/Intro";
import { CVBuilderFeatures } from "./components/Features";
import { CVBuilderHowTo } from "./components/HowTo";
import { CVBuilderPrivacyNote } from "./components/PrivacyNote";
import { CVBuilderFAQ } from "./components/FAQ";
import { CVBuilderRelatedTools } from "./components/RelatedTools";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedArticles } from "@components/blog/RelatedArticles";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";

export default function CVBuilderTool() {
  useToolAnalytics("cv-builder");
  return (
    <>
      <CVBuilderSEO />
        <ToolBreadcrumb toolName="CV Builder" category="Design Tools" />
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        <CVBuilderHero />
        <TemplateGallery />
        <CVBuilderIntro />
        <CVBuilderFeatures />
        <CVBuilderHowTo />
        <CVBuilderPrivacyNote />
        <RecommendedProducts toolId="cv-builder" />
        <CVBuilderFAQ />
        <div className="pb-16">
          <CVBuilderRelatedTools />
        </div>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <RelatedArticles toolId="cv-builder" />
        </div>
      </div>
    </>
  );
}
