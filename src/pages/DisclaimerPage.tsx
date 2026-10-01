import { TrustPageLayout } from "@components/trust/TrustPageLayout";
import { useLanguage } from "@contexts/LanguageContext";
import { trustContent } from "@data/trustContent";

export default function DisclaimerPage() {
  const { language } = useLanguage();
  return (
    <TrustPageLayout
      content={trustContent[language].disclaimer}
      icon="alert"
    />
  );
}
