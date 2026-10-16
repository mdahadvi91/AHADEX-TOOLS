import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Users,
  Ban,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { FEATURE_FLAGS } from "@constants/config";
import {
  getAffiliatesForTool,
  type AffiliateProduct,
} from "@data/affiliates";

interface Props {
  toolId: string;
  max?: number;
}

/**
 * RecommendedProducts — rich affiliate cards.
 *
 * Gated by FEATURE_FLAGS.enableAffiliateRecommendations (default off).
 * When on, every card must include the full content set enforced by
 * scripts/verify-affiliate-content.ts:
 *   tested, whyThisProduct, advantages, limitations, alternatives,
 *   notRecommendedWhen.
 *
 * If any of those fields are missing on the products returned for
 * this tool, the component renders nothing — this is a defensive
 * fallback against a build that somehow shipped with incomplete
 * content.
 */
export function RecommendedProducts({ toolId, max = 3 }: Props) {
  const { language } = useLanguage();
  const bn = language === "bn";

  if (!FEATURE_FLAGS.enableAffiliateRecommendations) return null;

  const products = getAffiliatesForTool(toolId, max);

  // Defensive: every product must be marked "ready" and include all
  // rich fields. The build guard already enforces this, but if any
  // product slipped through, we would rather render nothing than a
  // generic placeholder card.
  const ready = products.filter(
    (p): p is AffiliateProduct & {
      tested: boolean;
      whyThisProduct: { en: string; bn: string };
      advantages: { en: string[]; bn: string[] };
      limitations: { en: string[]; bn: string[] };
      alternatives: { en: string; bn: string };
      notRecommendedWhen: { en: string; bn: string };
    } =>
      p.contentStatus === "ready" &&
      typeof p.tested === "boolean" &&
      Boolean(p.whyThisProduct?.en?.trim()) &&
      Boolean(p.whyThisProduct?.bn?.trim()) &&
      Array.isArray(p.advantages?.en) &&
      p.advantages.en.length >= 3 &&
      Array.isArray(p.advantages?.bn) &&
      p.advantages.bn.length >= 3 &&
      Array.isArray(p.limitations?.en) &&
      p.limitations.en.length >= 2 &&
      Array.isArray(p.limitations?.bn) &&
      p.limitations.bn.length >= 2 &&
      Boolean(p.alternatives?.en?.trim()) &&
      Boolean(p.alternatives?.bn?.trim()) &&
      Boolean(p.notRecommendedWhen?.en?.trim()) &&
      Boolean(p.notRecommendedWhen?.bn?.trim())
  );

  if (ready.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/10 border border-silk-rose/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-silk-wine dark:text-silk-rose-soft">
              {bn ? "হাতে-বাছাই করা" : "Hand-picked"}
            </span>
          </motion.div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-3">
            {bn ? "এই কাজের জন্য টুল" : "Tools for this workflow"}
          </h2>
          <p className="text-[13px] sm:text-[14px] text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto leading-relaxed">
            {bn
              ? "আমরা নিজে ব্যবহার করি এমন প্রোডাক্ট — কেন ভালো, কোথায় সীমাবদ্ধ, কখন এড়িয়ে যাওয়া উচিত, সব স্পষ্টভাবে লেখা।"
              : "Products we actually use — with an honest writeup of what they do well, where they fall short, and when to skip them."}
          </p>
        </div>

        {/* Product Cards */}
        <div className="space-y-5">
          {ready.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20"
            >
              {/* Header */}
              <header className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="text-3xl shrink-0" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[12px] font-medium text-silk-rose mt-0.5">
                      {bn ? p.tagline.bn : p.tagline.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Tested badge */}
                  {p.tested ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {bn ? "টেস্টেড" : "Tested"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wide">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {bn ? "টেস্ট করা হয়নি" : "Not tested"}
                    </span>
                  )}

                  {p.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-wide">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      {bn ? p.badge.bn : p.badge.en}
                    </span>
                  )}
                </div>
              </header>

              {/* Why this product */}
              <div className="mb-5">
                <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose-soft mb-2">
                  {bn ? "কেন এই প্রোডাক্ট" : "Why this product"}
                </h4>
                <p className="text-[13.5px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {bn ? p.whyThisProduct.bn : p.whyThisProduct.en}
                </p>
              </div>

              {/* Advantages + Limitations — two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 mb-2">
                    {bn ? "সুবিধা" : "Strengths"}
                  </h4>
                  <ul className="space-y-1.5">
                    {(bn ? p.advantages.bn : p.advantages.en).map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400 mb-2">
                    {bn ? "সীমাবদ্ধতা" : "Limitations"}
                  </h4>
                  <ul className="space-y-1.5">
                    {(bn ? p.limitations.bn : p.limitations.en).map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alternatives + Not recommended when */}
              <div className="space-y-3 mb-5 pt-4 border-t border-silk-rose/15">
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-silk-rose mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose-soft mr-2">
                      {bn ? "বিকল্প" : "Alternatives"}
                    </span>
                    <span className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary">
                      {bn ? p.alternatives.bn : p.alternatives.en}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Ban className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] text-red-600 dark:text-red-400 mr-2">
                      {bn ? "কখন এড়িয়ে যাবেন" : "Skip when"}
                    </span>
                    <span className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary">
                      {bn ? p.notRecommendedWhen.bn : p.notRecommendedWhen.en}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-silk-rose/15">
                <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
                  {bn
                    ? "আমরা কমিশন পাই — দামে কোনো প্রভাব নেই।"
                    : "We earn a small commission — no impact on your price."}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white bg-silk-rose px-4 py-2 rounded-full hover:bg-silk-wine hover:gap-2.5 transition-all shrink-0"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {bn ? p.ctaLabel.bn : p.ctaLabel.en}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom disclosure */}
        <p className="text-center text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-8">
          <Link
            to="/affiliate-disclosure"
            className="underline hover:text-silk-rose transition-colors"
          >
            {bn ? "অ্যাফিলিয়েট ডিসক্লোজার" : "Affiliate disclosure"}
          </Link>
        </p>
      </div>
    </section>
  );
}
