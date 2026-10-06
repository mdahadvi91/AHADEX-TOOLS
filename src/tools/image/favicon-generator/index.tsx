import { FaviconGeneratorSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedTools } from "./components/RelatedTools";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { RelatedArticles } from "@components/blog/RelatedArticles";

export default function FaviconGeneratorTool() {
  useToolAnalytics("favicon-generator");
  return (
    <>
      <FaviconGeneratorSEO />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="favicon-generator" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="favicon-generator" />
        <RelatedTools />
      </div>
    </>
  );
}
