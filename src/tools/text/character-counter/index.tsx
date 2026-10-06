import { CharacterCounterSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RelatedTools } from "./components/RelatedTools";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedArticles } from "@components/blog/RelatedArticles";

export default function CharacterCounterTool() {
  useToolAnalytics("character-counter");
  return (
    <>
      <CharacterCounterSEO />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <RecommendedProducts toolId="character-counter" />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedArticles toolId="character-counter" />
        <RelatedTools />
      </div>
    </>
  );
}
