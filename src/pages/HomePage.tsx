import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { HeroSearch } from "@components/home/HeroSearch";
import { PopularTools } from "@components/home/PopularTools";
import { CategoryGrid } from "@components/home/CategoryGrid";
import { WhySection } from "@components/home/WhySection";
import { FAQSection } from "@components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative z-10 w-full max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-xs text-silk-wine dark:text-silk-rose mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium tracking-wide uppercase text-[10px]">
              42 free tools · 100% private
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-hero text-light-text dark:text-dark-text leading-[0.9] tracking-tight"
          >
            <span className="text-silk-gradient dark:text-silk-gradient-dark block">
              AHADEX
            </span>
            <span className="font-script text-silk-rose block mt-2 text-[0.45em] sm:text-[0.5em]">
              Tools
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-xl mx-auto leading-relaxed"
          >
            Simple, fast and private online tools — crafted like a living magazine. Everything runs in your browser.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <HeroSearch />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/tools"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium shadow-[0_12px_30px_-10px_rgba(139,58,79,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(139,58,79,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore All Tools
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-full border-2 border-silk-rose/40 text-silk-wine dark:text-silk-rose font-medium hover:bg-silk-rose/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-silk-wine/50 dark:text-silk-rose/40"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* SECTIONS */}
      <PopularTools />
      <CategoryGrid />
      <WhySection />
      <FAQSection />

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-light-text dark:text-dark-text">
            Ready to try{" "}
            <span className="font-script text-silk-rose">something new?</span>
          </h2>
          <p className="mt-4 text-sm text-light-textSecondary dark:text-dark-textSecondary">
            Pick any tool from above and start working immediately.
          </p>
          <Link
            to="/tools"
            className="mt-8 inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium shadow-[0_12px_30px_-10px_rgba(139,58,79,0.5)] hover:-translate-y-0.5 transition-all"
          >
            Browse All 42 Tools
          </Link>
        </div>
      </section>
    </>
  );
}
