import { useNavigate } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { CV_TEMPLATES, SAMPLE_CV_DATA } from "../data";
import { TemplatePreview } from "./TemplatePreview";

export function TemplateGallery() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-light-text dark:text-dark-text">
          {language === "bn"
            ? "CV টেমপ্লেট বেছে নিন"
            : "Choose a CV template"}
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-light-textSecondary dark:text-dark-textSecondary">
          {language === "bn"
            ? `${CV_TEMPLATES.length}টি পেশাদার ডিজাইন`
            : `${CV_TEMPLATES.length} professional designs`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CV_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            type="button"
            onClick={() => navigate(`/tools/cv-builder/edit/${tpl.id}`)}
            className={cn(
              "group flex flex-col items-center gap-3 p-4 rounded-2xl text-left",
              "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
              "border border-silk-rose/20 hover:border-silk-rose/50",
              "shadow-silk-soft hover:shadow-silk-deep",
              "transition-all duration-300 hover:-translate-y-1"
            )}
          >
            <div className="w-full flex justify-center">
              <TemplatePreview
                Template={tpl.Component}
                data={SAMPLE_CV_DATA}
                scale={0.45}
              />
            </div>
            <div className="text-center">
              <h3 className="font-display font-bold text-sm sm:text-base text-light-text dark:text-dark-text leading-tight">
                {language === "bn" ? tpl.nameBn : tpl.name}
              </h3>
              <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary capitalize mt-0.5">
                {tpl.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Coming-soon note */}
      <p className="mt-8 text-center text-xs text-light-textSecondary dark:text-dark-textSecondary">
        {language === "bn"
          ? "আরও টেমপ্লেট শীঘ্রই আসছে।"
          : "More templates coming soon."}
      </p>
    </section>
  );
}
