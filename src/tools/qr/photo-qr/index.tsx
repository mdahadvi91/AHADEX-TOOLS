import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ToolRelatedGuides } from "@components/tools/ToolRelatedGuides";
import { trackRecentTool } from "@lib/recentTools";
import { ToolDataSections } from "@components/tools/ToolDataSections";
import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { useLanguage } from "@contexts/LanguageContext";
import { Hero } from "./Hero";
import { PrivacyNote } from "./PrivacyNote";
import { Intro } from "./Intro";
import { HowTo } from "./HowTo";
import { Features } from "./Features";
import { FAQ } from "./FAQ";
import { RelatedTools } from "./RelatedTools";
import { ToolSchema } from "@components/seo/ToolSchema";
import { ToolFieldNote } from "@components/tools/ToolFieldNote";
import { photoQrData } from "./data";
import { photoQrContent } from "./content";
import { ToolBreadcrumb } from "@components/tools/ToolBreadcrumb";
import { SmartInsights } from "./SmartInsights";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";
import { PhotoQRWizardModal } from "./PhotoQRWizardModal";

export default function PhotoQrTool() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { language } = useLanguage();
  const content = photoQrContent[language];

  useEffect(() => {
    trackRecentTool({ path: "/tools/photo-qr", name: "Photo Qr", emoji: "🔧" });
  }, []);
  useToolAnalytics("photo-qr");

  return (
    <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
      <ToolSchema toolId="photo-qr" />
      <ToolBreadcrumb toolName="Photo QR Code" category="QR Tools" />
      
      <Hero />

      {/* Start Button */}
      <div className="flex justify-center my-8">
        <button 
          onClick={() => setIsWizardOpen(true)} 
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
        >
          Start Creating Now <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <SmartInsights sizePercent={20} />
      <PrivacyNote text={content.privacyNote} />
      <Intro />
      
      <div className="max-w-3xl">
        <HowTo steps={content.howTo} />
        <Features features={content.features} />
        <AdSenseSlot slot="TOOL_BOTTOM" label="Advertisement" />
        <FAQ faqs={content.faq} />
      </div>

      <ToolFieldNote toolId="photo-qr" />
      <ToolDataSections toolId="photo-qr" />
      <ToolRelatedGuides toolId="photo-qr" />
      <RelatedTools toolIds={photoQrData.relatedTools} />

      <PhotoQRWizardModal isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </div>
  );
}
