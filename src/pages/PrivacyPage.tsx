import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";
import { trustContent } from "@data/trustContent";

export default function PrivacyPage() {
  const { language } = useLanguage();
  return (
    <TrustPageLayout
      content={trustContent[language].privacy}
      icon="shield"
    />
  );
}
