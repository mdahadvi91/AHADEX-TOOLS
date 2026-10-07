import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { UrlEncoderSEO } from "./SEO";
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

export default function UrlEncoderTool() {
  useToolAnalytics("url-encoder");
  return (
    <>
      <UrlEncoderSEO />
      <ToolSchema toolId="url-encoder" />
        <ToolBreadcrumb toolName="URL Encoder / Decoder" category="Developer Tools" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="url-encoder" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="url-encoder" />
        <RelatedTools />
      </div>
    </>
  );
}
