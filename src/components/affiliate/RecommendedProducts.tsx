import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { getAffiliatesForTool } from "@data/affiliates";

interface Props {
  toolId: string;
  max?: number;
}

export function RecommendedProducts({ toolId, max = 3 }: Props) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const products = getAffiliatesForTool(toolId, max);

  if (products.length === 0) return null;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-2">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text">
            {bn ? "সহায়ক টুলস" : "Tools we recommend"}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary mt-2">
            {bn
              ? "এই টুলের সাথে ভালোভাবে কাজ করে — Amazon/অন্যান্য অ্যাফিলিয়েট লিংক"
              : "Works great alongside this tool — affiliate links"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-8">
          {products.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative p-5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 hover:border-silk-rose/50 hover:-translate-y-0.5 transition-all"
            >
              {p.badge && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-wide">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {bn ? p.badge.bn : p.badge.en}
                </span>
              )}
              <span className="text-3xl block mb-3">{p.emoji}</span>
              <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">
                {p.name}
              </h3>
              <p className="text-[11px] font-medium text-silk-rose mb-2">
                {bn ? p.tagline.bn : p.tagline.en}
              </p>
              <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-3">
                {bn ? p.description.bn : p.description.en}
              </p>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-silk-wine dark:text-silk-rose-soft group-hover:gap-2 transition-all">
                {bn ? p.ctaLabel.bn : p.ctaLabel.en}
                <ExternalLink className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>

        <p className="text-center text-[10px] text-light-textSecondary dark:text-dark-textSecondary mt-6">
          {bn ? "আমরা কিছু লিংক থেকে কমিশন পাই — আপনার দামে কোনো প্রভাব নেই। " : "We earn a small commission from some links — at no extra cost to you. "}
          <Link to="/affiliate-disclosure" className="underline hover:text-silk-rose">
            {bn ? "বিস্তারিত" : "Learn more"}
          </Link>
        </p>
      </div>
    </section>
  );
}
