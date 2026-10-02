import { useLanguage } from "@contexts/LanguageContext";
import { photoQrContent } from "./content";

interface HowToProps {
  steps: typeof photoQrContent.en.howTo;
}

export function HowTo({ steps }: HowToProps) {
  const { language } = useLanguage();

  return (
    <section className="max-w-3xl mb-14">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
        {language === "bn" ? "কীভাবে ব্যবহার করবেন" : "How to Use"}
      </h2>
      <ol className="space-y-5">
        {steps.map((step) => (
          <li key={step.step} className="flex gap-4">
            <span className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white text-sm font-bold flex items-center justify-center shadow-silk-soft">
              {step.step}
            </span>
            <div>
              <h3 className="font-display font-semibold text-light-text dark:text-dark-text text-[15px] sm:text-base mb-1.5">
                {step.title}
              </h3>
              <p className="text-[14px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
