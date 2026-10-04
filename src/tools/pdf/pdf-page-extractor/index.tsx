import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { PdfPageExtractorSEO } from "./SEO";
import { Hero } from "./components/Hero";
import { Workspace } from "./components/Workspace";
import { Intro } from "./components/Intro";
import { Features } from "./components/Features";
import { HowTo } from "./components/HowTo";
import { PrivacyNote } from "./components/PrivacyNote";
import { FAQ } from "./components/FAQ";
import { RelatedTools } from "./components/RelatedTools";

export default function PdfPageExtractorTool() {
  useToolAnalytics("pdf-page-extractor");
  return (
    <>
      <PdfPageExtractorSEO />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Workspace />
        <Intro />
        <Features />
        <HowTo />
        <PrivacyNote />
        <FAQ />
        <RelatedTools />
      </div>
    </>
  );
}
