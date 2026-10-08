import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Lock, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ManifestoBlock } from "./ManifestoBlock";
import { useLanguage } from "@contexts/LanguageContext";
import { tools } from "@data/tools";

export function ToolsHero() {
  const { t, language } = useLanguage();
  const bn = language === "bn";
  const toolCount = tools.length;

  // Decorative floating emojis
  const floaters = [
    { emoji: "📸", top: "12%", left: "5%", delay: 0 },
    { emoji: "📄", top: "25%", right: "8%", delay: 0.8 },
    { emoji: "🔐", bottom: "18%", left: "12%", delay: 1.6 },
    { emoji: "⚡", top: "55%", right: "15%", delay: 2.4 },
    { emoji: "🎨", bottom: "25%", right: "5%", delay: 0.4 },
    { emoji: "📱", top: "40%", left: "3%", delay: 1.2 },
  ];

  const badges = [
    {
      icon: Shield,
      label: bn ? "কোনো আপলোড নেই" : "No uploads",
      color: "silk-rose",
    },
    {
      icon: Zap,
      label: bn ? "ইনস্ট্যান্ট" : "Instant",
      color: "silk-gold",
    },
    {
      icon: Lock,
      label: bn ? "১০০% প্রাইভেট" : "100% private",
      color: "emerald",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* ═══ Background layers ═══ */}
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
        {/* Center accent — slow pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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

        {/* Floating decorative emojis */}
        {floaters.map((f, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.35, 0.25, 0.35, 0],
              y: [0, -20, 0, 15, 0],
              rotate: [0, 8, -5, 10, 0],
            }}
            transition={{
              duration: 12,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-4xl sm:text-5xl hidden md:block"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              bottom: f.bottom,
            }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      {/* ═══ Content ═══ */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* ── Live eyebrow badge ── */}
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

          {/* ── Headline with gradient shimmer ── */}
          <h1 className="font-display font-black tracking-[-0.03em] leading-[0.98] text-light-text dark:text-dark-text">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-[clamp(2.75rem,7.5vw,6.25rem)]"
            >
              {t.tools.heroTitle1}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
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

          {/* ── Live stat ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25"
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {bn ? "সব টুল এখন সক্রিয়" : "All tools are online"}
            </span>
          </motion.div>

          {/* ── Trust badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-7 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {badges.map((b, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/20 text-[11px] sm:text-xs font-semibold text-silk-wine dark:text-silk-rose-soft cursor-default"
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
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#tools"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white text-sm font-bold shadow-[0_10px_30px_-10px_rgba(139,58,79,0.55)] hover:shadow-[0_16px_40px_-12px_rgba(139,58,79,0.75)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Shine effect */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              <Sparkles className="w-4 h-4 relative" />
              <span className="relative">
                {bn ? "টুল এক্সপ্লোর করুন" : "Explore tools"}
              </span>
              <ArrowRight className="w-4 h-4 relative -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </a>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-sm font-semibold text-silk-wine dark:text-silk-rose-soft hover:border-silk-rose/55 hover:-translate-y-0.5 transition-all duration-300"
            >
              {bn ? "আমাদের সম্পর্কে" : "About us"}
            </Link>
          </motion.div>
        </div>

        {/* ── Manifesto block ── */}
        <div className="mt-14 sm:mt-20">
          <ManifestoBlock />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-silk-rose/50"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
          {bn ? "স্ক্রল" : "Scroll"}
        </span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>

      {/* Bottom fade line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silk-rose/40 to-transparent"
      />
    </section>
  );
}
