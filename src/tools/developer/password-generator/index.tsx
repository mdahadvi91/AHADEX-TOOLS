import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PasswordGeneratorSEO } from "./SEO";
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
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function PasswordGeneratorTool() {
  useToolAnalytics("password-generator");
  return (
    <>
      <PasswordGeneratorSEO />
      <ToolSchema toolId="password-generator" />
        <ToolBreadcrumb toolName="Password Generator" category="Developer Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="password-generator" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
              <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />

<FAQ />
          <ToolFieldNote toolId="password-generator" />
        <ToolRelatedGuides toolId="password-generator" />
        <RelatedArticles toolId="password-generator" />
        <ToolDataSections toolId="password-generator" />
        <RelatedTools />
      </div>
    </>
  );
}
