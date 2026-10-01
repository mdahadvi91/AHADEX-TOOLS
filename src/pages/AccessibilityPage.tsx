import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";
import { trustContent } from "@data/trustContent";

export default function AccessibilityPage() {
  const { language } = useLanguage();
  return (
    <TrustPageLayout
      content={trustContent[language].accessibility}
      icon="access"
    />
  );
}
