import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { SvgToPngSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RecommendedProducts } from "@components/affiliate/RecommendedProducts";
import { RelatedTools } from "./components/RelatedTools";

export default function SvgToPngTool() {
  useToolAnalytics("svg-to-png");
  return (
    <>
      <SvgToPngSEO />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RecommendedProducts toolId="svg-to-png" />
        <RelatedTools />
      </div>
    </>
  );
}
