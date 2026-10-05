import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ManifestoBlock } from "./ManifestoBlock";
import { useLanguage } from "@contexts/LanguageContext";
import { tools } from "@data/tools";

export function ToolsHero() {
  const { t, language } = useLanguage();
  const bn = language === "bn";
  const toolCount = tools.length;

  const badges = [
    {
      icon: Shield,
      label: bn ? "কোনো আপলোড নেই" : "No uploads",
    },
    {
      icon: Zap,
      label: bn ? "ইনস্ট্যান্ট" : "Instant",
    },
    {
      icon: Lock,
      label: bn ? "১০০% প্রাইভেট" : "100% private",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* ── Background: mesh gradient + grain + orbs ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {/* Top-left orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.45) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom-right orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,150,103,0.45) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Center accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2, delay: 0.4 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,58,79,0.35) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(216,139,154,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(216,139,154,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* ── Eyebrow badge ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/25 shadow-[0_4px_20px_-8px_rgba(139,58,79,0.2)] mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-silk-rose animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-silk-rose" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-silk-wine dark:text-silk-rose">
              {t.tools.heroEyebrow}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <h1 className="font-display font-black tracking-[-0.03em] leading-[0.98] text-light-text dark:text-dark-text">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block text-[clamp(2.75rem,7.5vw,6.25rem)]"
            >
              {t.tools.heroTitle1}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block mt-2 sm:mt-3 text-[clamp(2rem,6vw,5.25rem)]"
            >
              <span className="font-script text-silk-rose mr-3">
                {t.tools.heroTitle2}
              </span>
              <span
                className="font-display bg-gradient-to-r from-silk-wine via-silk-rose to-silk-gold bg-clip-text text-transparent bg-[length:200%_100%] animate-text-gradient-sweep"
                style={{ animationFillMode: "forwards" }}
              >
                {t.tools.heroTitle3}
              </span>
            </motion.span>
          </h1>

          {/* ── Subheadline ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 sm:mt-8 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-light-textSecondary dark:text-dark-textSecondary"
          >
            {bn
              ? `${toolCount}+ ফ্রি অনলাইন টুল — ছবি, PDF, টেক্সট, ডেভেলপার — সব আপনার ব্রাউজারে চলে। কোনো আপলোড নেই, কোনো সাইনআপ নেই, সম্পূর্ণ প্রাইভেট।`
              : `${toolCount}+ free online tools for image, PDF, text and developer tasks — all running in your browser. No uploads, no signup, fully private.`}
          </motion.p>

          {/* ── Trust badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {badges.map((b, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/20 text-[11px] sm:text-xs font-semibold text-silk-wine dark:text-silk-rose-soft"
              >
                <b.icon className="w-3.5 h-3.5 text-silk-rose" />
                {b.label}
              </motion.span>
            ))}
          </motion.div>

          {/* ── CTA row ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#tools"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white text-sm font-bold shadow-[0_10px_30px_-10px_rgba(139,58,79,0.55)] hover:shadow-[0_16px_40px_-12px_rgba(139,58,79,0.75)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              {bn ? "টুল এক্সপ্লোর করুন" : "Explore tools"}
              <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </a>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-sm font-semibold text-silk-wine dark:text-silk-rose-soft hover:border-silk-rose/55 hover:-translate-y-0.5 transition-all duration-300"
            >
              {bn ? "আমাদের সম্পর্কে" : "About us"}
            </Link>
          </motion.div>
        </div>

        {/* ── Manifesto block (existing) ── */}
        <div className="mt-14 sm:mt-20">
          <ManifestoBlock />
        </div>
      </div>

      {/* Bottom fade line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silk-rose/40 to-transparent"
      />
    </section>
  );
}
