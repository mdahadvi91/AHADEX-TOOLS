import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";
import { HomeSchema } from "@components/seo/HomeSchema";
import { ToolsShowcase } from "@components/tools/ToolsShowcase";
import { WhySection } from "@components/home/WhySection";
import { HowItWorks } from "@components/home/HowItWorks";
import { PrivacyPromise } from "@components/home/PrivacyPromise";
import { HomeFAQ } from "@components/home/HomeFAQ";

export default function ToolsIndexPage() {
  return (
    <>
      <HomeSchema />
      <ToolsShowcase />
      <AdsterraNativeBanner />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <WhySection />
        <HowItWorks />
        <PrivacyPromise />
        <HomeFAQ />
      </div>
    </>
  );
}
