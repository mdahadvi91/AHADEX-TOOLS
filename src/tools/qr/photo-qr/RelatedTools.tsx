import { Link } from "react-router-dom";
import { Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";

interface RelatedToolsProps {
  toolIds: string[];
}

export function RelatedTools({ toolIds }: RelatedToolsProps) {
  const { language } = useLanguage();

  return (
    <section className="max-w-4xl pb-24">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
        {language === "bn" ? "সম্পর্কিত টুল" : "Related tools"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {toolIds.map((id) => (
          <Link
            key={id}
            to={`/tools/${id}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/40 hover:-translate-y-0.5 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-silk-rose shrink-0" />
            <span className="text-sm font-medium text-light-text dark:text-dark-text capitalize">
              {id.replace(/-/g, " ")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
