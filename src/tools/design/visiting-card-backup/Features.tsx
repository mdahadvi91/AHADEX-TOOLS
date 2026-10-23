import { useLanguage } from "@contexts/LanguageContext";
import { visitingCardContent } from "./content";

export function Features() {
  const { language } = useLanguage();
  const content = visitingCardContent[language];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          {content.featuresTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((f) => (
            <div 
              key={f.title} 
              className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <span className="text-3xl block mb-4">{f.emoji}</span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
