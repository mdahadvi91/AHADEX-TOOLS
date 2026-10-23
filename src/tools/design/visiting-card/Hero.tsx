import { Sparkles, Palette, Download, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { visitingCardContent } from "./content";

interface HeroProps {
  onStart?: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { language } = useLanguage();
  const content = visitingCardContent[language];

  return (
    <section className="relative pt-12 pb-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center px-4">
        
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium border border-red-100">
            <Sparkles className="w-3.5 h-3.5" /> {content.heroTag}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            <Palette className="w-3.5 h-3.5" /> {language === "bn" ? "২০টি টেমপ্লেট" : "20 Templates"}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
            <Download className="w-3.5 h-3.5" /> PNG · JPG · PDF
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-5">
          {language === "bn" ? "ভিজিটিং কার্ড মেকার" : "Visiting Card Maker"}
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-10">
          {content.heroSubtitle}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => onStart ? onStart() : document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            {language === "bn" ? "ডিজাইন শুরু করুন" : "Start Designing Now"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {content.heroStats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-2xl font-bold text-red-600">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
