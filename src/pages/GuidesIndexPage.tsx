import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { guides } from "@data/guides";
import { tools } from "@data/tools";

export default function GuidesIndexPage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-silk-wine dark:text-silk-rose-soft">
            {bn ? "গাইড" : "Guides"}
          </span>
        </div>

        <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text mb-4">
          {bn ? (
            <>
              কাজ সম্পন্ন করার <span className="text-silk-rose">সঠিক পদ্ধতি</span>
            </>
          ) : (
            <>
              Complete <span className="text-silk-rose">workflows</span> for real tasks
            </>
          )}
        </h1>

        <p className="text-[15px] sm:text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
          {bn
            ? `প্রতিটা গাইড একটা নির্দিষ্ট লক্ষ্যের জন্য — টুলগুলোকে একসাথে ব্যবহার করার ধাপে ধাপে পদ্ধতি, টার্গেট ফাইল সাইজ, এবং ভেরিফিকেশন সহ।`
            : `Each guide is built for one specific goal — the exact steps to chain our ${tools.length} tools, target file sizes, and how to verify the result.`}
        </p>
      </motion.header>

      <div className="space-y-5 max-w-3xl mx-auto">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              to={`/guides/${guide.slug}`}
              className="group block p-6 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{guide.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose-soft mb-1.5">
                    {guide.category}
                  </p>
                  <h2 className="font-serif font-black text-lg sm:text-xl text-light-text dark:text-dark-text group-hover:text-silk-rose transition-colors mb-2">
                    {bn ? guide.titleBn : guide.title}
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-3">
                    {bn ? guide.excerptBn : guide.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {guide.sections.length} sections
                    </span>
                    <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
