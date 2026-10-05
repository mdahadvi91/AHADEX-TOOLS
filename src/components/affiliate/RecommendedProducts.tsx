import { motion } from "framer-motion";
import { ExternalLink, Star, ShoppingBag, Sparkles } from "lucide-react";
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
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/10 border border-silk-rose/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-silk-wine dark:text-silk-rose-soft">
              {bn ? "এই কাজটি আরও সহজ করুন" : "Make this task easier"}
            </span>
          </motion.div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-2">
            {bn ? "যা আপনার কাজে লাগতে পারে" : "Recommended for you"}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
            {bn
              ? "আপনি এই টুলটি ব্যবহার করেছেন — এই প্রোডাক্টগুলো আপনার পরবর্তী কাজে সাহায্য করতে পারে।"
              : "You just used this tool — these products can help with your next task."}
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {products.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative p-5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 hover:border-silk-rose/50 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              {p.badge && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-wide">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {bn ? p.badge.bn : p.badge.en}
                </span>
              )}

              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl shrink-0">{p.emoji}</span>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[11px] font-medium text-silk-rose mt-0.5">
                    {bn ? p.tagline.bn : p.tagline.en}
                  </p>
                </div>
              </div>

              <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-4 line-clamp-3">
                {bn ? p.description.bn : p.description.en}
              </p>

              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white bg-silk-rose px-3 py-1.5 rounded-full group-hover:bg-silk-wine group-hover:gap-2.5 transition-all">
                <ShoppingBag className="w-3.5 h-3.5" />
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
