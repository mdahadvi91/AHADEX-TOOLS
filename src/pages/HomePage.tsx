import { Link } from "react-router-dom";
import { WhyAhadex } from "@components/home/WhyAhadex";
import { TrustBar } from "@components/home/TrustBar";
import { RecentlyUsed } from "@components/home/RecentlyUsed";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Globe } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { HomeSchema } from "@components/seo/HomeSchema";
import { PopularTools } from "@components/home/PopularTools";
import { WhySection } from "@components/home/WhySection";
import { HowItWorks } from "@components/home/HowItWorks";
import { PrivacyPromise } from "@components/home/PrivacyPromise";
import { HomeFAQ } from "@components/home/HomeFAQ";
import { tools } from "@data/tools";

/**
 * HomePage — brand-focused landing page.
 * Distinct from ToolsIndexPage: this page tells the story of the
 * site (what it is, why it exists, who it is for) and points to a
 * handpicked set of featured tools. The full directory lives at
 * /tools.
 */
export default function HomePage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <>
      <HomeSchema />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
                filter: "blur(70px)",
              }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
                filter: "blur(70px)",
              }}
            />
          </div>

          <div className="relative max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase">
                <Sparkles className="w-3 h-3" />
                {bn ? "স্বাধীনভাবে তৈরি" : "Independently built"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-silk-rose/5 border border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary text-[10px] sm:text-xs font-medium">
                <Shield className="w-3 h-3" />
                {bn ? "প্রাইভেসি-ফার্স্ট" : "Privacy-first"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif font-black text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-6xl tracking-tight text-light-text dark:text-dark-text"
            >
              {bn ? (
                <>
                  দৈনন্দিন কাজের জন্য{" "}
                  <span className="text-silk-rose">
                    {tools.length}টি ব্রাউজার-বেইজড টুল
                  </span>
                  । কোনো আপলোড নেই।
                </>
              ) : (
                <>
                  <span className="text-silk-rose">
                    {tools.length} free browser tools
                  </span>{" "}
                  that never upload your files.
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-[15px] sm:text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl leading-relaxed"
            >
              {bn
                ? "ছবি রূপান্তর, PDF হ্যান্ডলিং, টেক্সট প্রসেসিং, ডেভেলপার হেল্পার এবং QR কোড — সবকিছু আপনার ব্রাউজারেই চলে। ফাইল আপলোড হয় না, অ্যাকাউন্ট লাগে না, ওয়াটারমার্ক নেই।"
                : "Image conversion, PDF handling, text processing, developer helpers, and QR codes — everything runs inside your browser. No file uploads, no accounts, no watermarks."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/tools"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-silk-wine text-white font-medium shadow-lg shadow-silk-wine/20 hover:bg-silk-rose hover:shadow-silk-rose/30 transition-all"
              >
                {bn
                  ? `সব ${tools.length}টি টুল দেখুন`
                  : `Browse all ${tools.length} tools`}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/25 text-light-text dark:text-dark-text font-medium hover:border-silk-rose/45 transition-colors"
              >
                {bn ? "কেন তৈরি করেছি" : "Why we built this"}
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary"
            >
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-silk-rose" />
                {bn ? "১০০% ব্রাউজারেই প্রসেস" : "100% in-browser processing"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-silk-rose" />
                {bn ? "অ্যাকাউন্ট লাগে না" : "No account required"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-silk-rose" />
                {bn ? "অফলাইনে চলে" : "Works offline"}
              </span>
            </motion.div>
          </div>
        </section>
      <TrustBar />
      <WhyAhadex />
      <RecentlyUsed />

        {/* ── Featured tools ── */}
        <PopularTools />

        {/* ── Why AHADEX ── */}
        <WhySection />

        {/* ── How it works ── */}
        <HowItWorks />

        {/* ── Privacy promise ── */}
        <PrivacyPromise />

        {/* ── FAQ ── */}
        <HomeFAQ />

        {/* ── Final CTA ── */}
        <section className="py-16 sm:py-20 text-center">
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-4">
            {bn
              ? `সব ${tools.length}টি টুল দেখতে প্রস্তুত?`
              : `Ready to see all ${tools.length} tools?`}
          </h2>
          <p className="text-[15px] text-light-textSecondary dark:text-dark-textSecondary max-w-xl mx-auto mb-8">
            {bn
              ? "ছবি, PDF, টেক্সট, ডেভেলপার, QR কোড এবং ডিজাইন — সব ক্যাটাগরি এক জায়গায়।"
              : "Image, PDF, text, developer, QR, and design — every category in one place."}
          </p>
          <Link
            to="/tools"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-silk-wine text-white font-medium shadow-lg shadow-silk-wine/20 hover:bg-silk-rose hover:shadow-silk-rose/30 transition-all"
          >
            {bn ? "টুল ডিরেক্টরিতে যান" : "Go to tool directory"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </div>
    </>
  );
}
