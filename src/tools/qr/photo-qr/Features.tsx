import { useLanguage } from "@contexts/LanguageContext";
import { photoQrContent } from "./content";

interface FeaturesProps {
  features: typeof photoQrContent.en.features;
}

export function Features({ features }: FeaturesProps) {
  const { language } = useLanguage();

  return (
    <section className="max-w-4xl mb-14">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
        {language === "bn" ? "ফিচার" : "Features"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-5 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/40 transition-all"
          >
            <h3 className="font-display font-semibold text-[15px] sm:text-base text-light-text dark:text-dark-text mb-2">
              {f.title}
            </h3>
            <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
