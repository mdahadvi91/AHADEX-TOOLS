import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Shield,
  Zap,
  Heart,
  Wand2,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";

const VALUE_ICONS = [Shield, Zap, Heart, Wand2];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <span className="absolute top-16 right-[12%] text-4xl opacity-40 animate-gentle-float">
            🌸
          </span>
          <span
            className="absolute bottom-20 left-[8%] text-3xl opacity-30 animate-gentle-float"
            style={{ animationDelay: "1.5s" }}
          >
            💗
          </span>
        </div>

        <div className="relative max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
              {t.about.heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold tracking-tight leading-[1.05] text-light-text dark:text-dark-text text-[clamp(2.5rem,6vw,5rem)]"
          >
            <span className="block">{t.about.heroTitle}</span>
            <span className="block mt-2 text-silk-gradient dark:text-silk-gradient-dark">
              {t.about.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-2xl"
          >
            {t.about.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* STORY */}
      <section className="relative py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
                <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                  {t.about.storyEyebrow}
                </p>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
                {t.about.storyTitle}
                <br />
                <span className="font-script text-silk-rose text-[1.1em]">
                  {t.about.storyTitle2}
                </span>
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {t.about.storyParagraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={cn(
                    "leading-relaxed",
                    i === 0
                      ? "text-lg text-light-text dark:text-dark-text font-medium"
                      : "text-base text-light-textSecondary dark:text-dark-textSecondary"
                  )}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[32px] overflow-hidden p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-silk-rose via-silk-wine to-silk-wine-deep"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
            }}
          />
          <span
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative text-white max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 font-semibold mb-4">
              {t.about.missionEyebrow}
            </p>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6">
              {t.about.missionTitle}
              <br />
              <span className="font-script text-[1.15em]">
                {t.about.missionTitle2}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-2xl">
              {t.about.missionStatement}
            </p>

            <ul className="space-y-3">
              {t.about.missionBullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm sm:text-base text-white/90"
                >
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span className="leading-relaxed">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="relative py-16 lg:py-20">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {t.about.valuesEyebrow}
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
            {t.about.valuesTitle}
            <br />
            <span className="font-script text-silk-rose text-[1.1em]">
              {t.about.valuesTitle2}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.about.values.map((value, i) => {
            const Icon = VALUE_ICONS[i] ?? Shield;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "group relative p-6 rounded-3xl h-full",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/50",
                  "shadow-[0_4px_20px_-8px_rgba(139,58,79,0.12)]",
                  "hover:shadow-[0_20px_50px_-15px_rgba(139,58,79,0.3)]",
                  "hover:-translate-y-1 transition-all duration-500"
                )}
              >
                <span className="inline-flex w-12 h-12 rounded-2xl bg-silk-rose/15 border border-silk-rose/25 items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Icon className="w-5 h-5 text-silk-rose" />
                </span>
                <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TECH */}
      <section className="relative py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                {t.about.techEyebrow}
              </p>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text mb-6">
              {t.about.techTitle}
            </h2>

            <p className="text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-8">
              {t.about.techDescription}
            </p>

            <ul className="space-y-3">
              {t.about.techStack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-light-text dark:text-dark-text"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-silk-rose shrink-0" />
                  <span className="font-mono text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden bg-dark-surface/95 border border-silk-rose/20 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(139,58,79,0.3)]"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-silk-rose/15 bg-silk-rose/5">
              <span className="w-3 h-3 rounded-full bg-silk-rose/60" />
              <span className="w-3 h-3 rounded-full bg-silk-gold/60" />
              <span className="w-3 h-3 rounded-full bg-silk-wine/60" />
              <span className="ml-3 text-xs text-silk-rose/60 font-mono">
                ahadex.config.ts
              </span>
            </div>
            <pre className="p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
              <code className="text-silk-rose-soft">
                <span className="text-silk-rose">export const</span>{" "}
                <span className="text-silk-gold">ahadex</span> = {"{"}
                {"\n"}  name: <span className="text-silk-blush">"AHADEX Tools"</span>,
                {"\n"}  tools: <span className="text-silk-gold">"growing"</span>,
                {"\n"}  private: <span className="text-silk-gold">true</span>,
                {"\n"}  free: <span className="text-silk-gold">true</span>,
                {"\n"}  tracking: <span className="text-silk-gold">false</span>,
                {"\n"}  uploads: <span className="text-silk-gold">0</span>,
                {"\n"}  ads: <span className="text-silk-gold">"minimal"</span>,
                {"\n"}{"}"};
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* FUTURE */}
      <section className="relative py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 sm:p-12 bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/20"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {t.about.futureEyebrow}
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text mb-4">
            {t.about.futureTitle}
          </h2>

          <p className="text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-8 max-w-2xl">
            {t.about.futureDescription}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.about.futurePlans.map((plan, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-dark-surface/70 border border-silk-rose/15"
              >
                <ArrowRight className="w-4 h-4 text-silk-rose shrink-0 mt-0.5" />
                <span className="text-sm text-light-text dark:text-dark-text leading-relaxed">
                  {plan}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
            {t.about.ctaTitle}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary">
            {t.about.ctaSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium shadow-silk-medium hover:shadow-silk-deep hover:-translate-y-0.5 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              {t.about.ctaContact}
            </Link>

            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-silk-rose/40 text-silk-wine dark:text-silk-rose font-medium hover:bg-silk-rose/10 transition-all duration-300"
            >
              {t.about.ctaTools}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
          <AdsterraNativeBanner />
    </div>
  );
}
