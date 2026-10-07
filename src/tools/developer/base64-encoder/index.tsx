import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { ToolSchema } from "@components/seo/ToolSchema";
import { Base64SEO } from "./SEO";
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

export default function Base64EncoderTool() {
  useToolAnalytics("base64-encoder");
  return (
    <>
      <Base64SEO />
      <ToolSchema toolId="base64-encoder" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <ToolBreadcrumb toolName="Base64 Encoder / Decoder" category="Developer Tools" />

        <Hero />
        <Workspace />
        <RecommendedProducts toolId="base64-encoder" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="base64-encoder" />
        <RelatedTools />
      </div>
    </>
  );
}
