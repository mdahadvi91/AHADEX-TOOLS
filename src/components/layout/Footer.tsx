import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Heart,
  ArrowUp,
  Coffee,
  Sparkles,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Logo } from "@components/common/Logo";
import { useLanguage } from "@contexts/LanguageContext";
import { APP_CONFIG } from "@constants/config";

export function Footer() {
  const year = new Date().getFullYear();
  const { t, language } = useLanguage();
  const bn = language === "bn";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      title: bn ? "টুলস" : "Tools",
      links: [
        { to: "/tools", label: t.footer.allTools },
        { to: "/tools/image-compressor", label: bn ? "ইমেজ কমপ্রেসর" : "Image Compressor" },
        { to: "/tools/merge-pdf", label: bn ? "PDF মার্জ" : "PDF Merge" },
        { to: "/tools/json-formatter", label: bn ? "JSON ফরম্যাটার" : "JSON Formatter" },
      ],
    },
    {
      title: bn ? "কোম্পানি" : "Company",
      links: [
        { to: "/blog", label: bn ? "ব্লগ" : "Blog" },
        { to: "/about", label: t.nav.about },
        { to: "/contact", label: t.nav.contact },
        { to: "/affiliate-disclosure", label: bn ? "অ্যাফিলিয়েট" : "Affiliates" },
        { to: APP_CONFIG.github, label: "GitHub", external: true },
      ],
    },
    {
      title: bn ? "আইনি" : "Legal",
      links: [
        { to: "/privacy", label: t.footer.privacy },
        { to: "/terms", label: t.footer.terms },
        { to: "/disclaimer", label: t.footer.disclaimer },
        { to: "/cookie-policy", label: bn ? "কুকিজ" : "Cookies" },
        { to: "/editorial-policy", label: bn ? "এডিটোরিয়াল" : "Editorial" },
        { to: "/sitemap", label: bn ? "সাইটম্যাপ" : "Sitemap" },
      ],
    },
  ];

  return (
    <footer className="relative mt-28 border-t border-silk-rose/15">
      {/* Top accent line */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silk-rose/60 to-transparent"
      />

      {/* Support CTA banner */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-7 sm:p-10 bg-gradient-to-br from-silk-rose/12 via-silk-gold/8 to-silk-cream dark:from-silk-rose/[0.08] dark:via-silk-gold/[0.05] dark:to-[#251820] border border-silk-rose/25"
        >
          <span
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-silk-rose/25 blur-[70px]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-silk-gold/25 blur-[70px]"
          />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/15 border border-silk-rose/30 mb-3">
                <Sparkles className="w-3 h-3 text-silk-rose" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-silk-wine dark:text-silk-rose-soft">
                  {bn ? "সমর্থন করুন" : "Support the project"}
                </span>
              </div>

              <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl leading-tight tracking-[-0.02em] text-light-text dark:text-dark-text">
                {bn ? "ভালো লাগলে " : "Love the tools? "}
                <span className="font-script text-silk-rose text-[1.1em]">
                  {bn ? "কফি খাইয়ে দিন।" : "Buy me a coffee."}
                </span>
              </h3>

              <p className="mt-2 text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {bn
                  ? "আপনার ছোট একটা সাপোর্ট আমাকে নতুন ফ্রি টুল বানাতে সাহায্য করে।"
                  : "Your small support helps me keep building free tools for everyone."}
              </p>
            </div>

            <a
              href="https://ko-fi.com/ahadex"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white text-sm font-bold shadow-[0_12px_32px_-12px_rgba(139,58,79,0.6)] hover:shadow-[0_18px_42px_-14px_rgba(139,58,79,0.8)] hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              <Coffee className="w-4 h-4" />
              {bn ? "কফি কিনুন" : "Buy a coffee"}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Logo size="md" />
            <p className="mt-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              <a
                href={APP_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-silk-rose/8 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 hover:border-silk-rose/50 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/ahadex_tools"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-silk-rose/8 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 hover:border-silk-rose/50 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-silk-rose/8 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 hover:border-silk-rose/50 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:mdahadvi91@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-silk-rose/8 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 hover:border-silk-rose/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/20">
              <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft">
                {bn ? "সম্পূর্ণ ফ্রি" : "100% Free"}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-[11px] uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  const LinkComponent = isExternal ? "a" : Link;
                  const linkProps = isExternal
                    ? { href: link.to, target: "_blank", rel: "noopener noreferrer" }
                    : { to: link.to };

                  return (
                    <li key={link.to}>
                      <LinkComponent
                        {...(linkProps as any)}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors duration-300"
                      >
                        <span className="w-1 h-1 rounded-full bg-silk-rose/40 group-hover:bg-silk-rose group-hover:w-3 transition-all duration-300" />
                        {link.label}
                      </LinkComponent>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-8 border-t border-silk-rose/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary text-center sm:text-left">
            © {year} <span className="font-bold text-silk-wine dark:text-silk-rose-soft">{APP_CONFIG.name}</span>.{" "}
            {bn ? "সব অধিকার সংরক্ষিত।" : "All rights reserved."}{" "}
            <span className="inline-flex items-center gap-1 ml-1">
              {bn ? "বানানো হয়েছে" : "Made with"}
              <Heart className="w-3 h-3 text-silk-rose fill-silk-rose" />
              {bn ? "দিয়ে" : ""}
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-silk-rose/8 border border-silk-rose/20 hover:bg-silk-rose/20 hover:border-silk-rose/45 hover:-translate-y-0.5 transition-all duration-300"
          >
            <ArrowUp className="w-3.5 h-3.5 text-silk-rose group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose-soft">
              {bn ? "উপরে" : "Top"}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
