import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { JpgToPngSEO } from "./SEO";
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

export default function JpgToPngTool() {
  useToolAnalytics("jpg-to-png");
  return (
    <>
      <JpgToPngSEO />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="jpg-to-png" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="jpg-to-png" />
        <RelatedTools />
      </div>
    </>
  );
}
