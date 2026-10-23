import { useState } from "react";
import { ToolSchema } from "@components/seo/ToolSchema";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { RelatedToolsBlock } from "@components/tools/RelatedToolsBlock";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { FAQ } from "./FAQ";
import { useLanguage } from "@contexts/LanguageContext";
import { visitingCardContent } from "./content";
import { WizardModal } from "./WizardModal"; // নতুন উইজার্ড ইমপোর্ট

export default function VisitingCardLanding() {
  const { language } = useLanguage();
  const content = visitingCardContent[language];
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen relative">
      <ToolSchema toolId="visiting-card" />
      
      {/* Hero Section (Start Button e click korle isWizardOpen true hobe) */}
      <Hero onStart={() => setIsWizardOpen(true)} />

      {/* SEO / AdSense Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
         <div className="prose dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.introBlocks[0].title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{content.introBlocks[0].text}</p>
          </div>
          
          {/* AdSense Slot */}
          <div className="my-10">
            <div className="h-24 bg-gray-50 dark:bg-gray-800 border border-dashed flex items-center justify-center rounded-xl text-gray-400 text-sm">
              AdSense Ad Slot
            </div>
          </div>
          
          <Features />
          <FAQ />
      </article>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-12 border-t border-gray-100 dark:border-gray-800">
        <ToolBreadcrumb toolName="Visiting Card Maker" category="Design Tools" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mt-8">
          <RelatedToolsBlock currentToolId="visiting-card" count={3} />
        </div>
      </div>

      {/* WIZARD POPUP (এখানেই আপনার ২০টি টেমপ্লেট লোড হবে) */}
      <WizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />

    </div>
  );
}
