import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Shield, FileText } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { LiveText } from "@components/common/LiveText";
import { jpgToPdfContent } from "../content";

export function Hero() {
  const { language, t } = useLanguage();
  const prefersReduced = useReducedMotion();
  const c = jpgToPdfContent[language];
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-6 sm:pb-10">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)", filter: "blur(70px)" }} />
      </div>
      <div className="relative">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors mb-5 sm:mb-7">
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.common.home}
        </Link>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase">
            <Sparkles className="w-3 h-3" />
            {c.heroTag}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <Shield className="w-3 h-3" />
            {language === "bn" ? "১০০% প্রাইভেট" : "100% Private"}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
            <FileText className="w-3 h-3" />
            {language === "bn" ? "মাল্টি-পেজ" : "Multi-page"}
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display font-black text-[2rem] leading-[1.05] sm:text-4xl lg:text-5xl tracking-tight text-light-text dark:text-dark-text">
          <LiveText text={language === "bn" ? "JPG থেকে PDF" : "JPG to PDF"} gradient="rose" waveAmplitude={prefersReduced ? 0 : 12} waveDuration={2.8} letterStagger={0.09} />
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-4 sm:mt-6 text-[14px] sm:text-base lg:text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl leading-relaxed">
          {c.heroSubtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
          {c.heroStats.map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15">
              <p className="font-display font-black text-base sm:text-lg text-silk-rose">{s.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
