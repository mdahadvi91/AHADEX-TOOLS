import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, FileText, Wrench, BookOpen, Info } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { tools } from "@data/tools";
import { blogPosts } from "@data/blog";
import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";

export default function HtmlSitemapPage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const sections = [
    {
      title: bn ? "মূল পেজ" : "Main Pages",
      icon: Info,
      links: [
        { to: "/", label: bn ? "হোম" : "Home" },
        { to: "/tools", label: bn ? "সব টুল" : "All Tools" },
        { to: "/blog", label: bn ? "ব্লগ" : "Blog" },
        { to: "/about", label: bn ? "আমাদের সম্পর্কে" : "About" },
        { to: "/contact", label: bn ? "যোগাযোগ" : "Contact" },
      ],
    },
    {
      title: bn ? "আইনি পেজ" : "Legal Pages",
      icon: FileText,
      links: [
        { to: "/privacy", label: bn ? "প্রাইভেসি পলিসি" : "Privacy Policy" },
        { to: "/terms", label: bn ? "শর্তাবলী" : "Terms" },
        { to: "/disclaimer", label: bn ? "ডিসক্লেইমার" : "Disclaimer" },
        { to: "/cookie-policy", label: bn ? "কুকিজ" : "Cookies" },
        { to: "/accessibility", label: bn ? "অ্যাক্সেসিবিলিটি" : "Accessibility" },
        { to: "/editorial-policy", label: bn ? "এডিটোরিয়াল" : "Editorial Policy" },
        { to: "/affiliate-disclosure", label: bn ? "অ্যাফিলিয়েট" : "Affiliate Disclosure" },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-2xl bg-silk-rose/15 flex items-center justify-center">
            <Map className="w-5 h-5 text-silk-rose" />
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-light-text dark:text-dark-text">
            {bn ? "সাইটম্যাপ" : "Sitemap"}
          </h1>
        </div>
        <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-10 max-w-2xl">
          {bn
            ? "AHADEX Tools-এর সব পেজ এক জায়গায়। টুল, ব্লগ পোস্ট এবং অন্যান্য পেজের পূর্ণ তালিকা।"
            : "All pages of AHADEX Tools in one place. Complete list of tools, blog posts, and other pages."}
        </p>

        {/* Main + Legal sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((sec) => (
            <div
              key={sec.title}
              className="p-6 rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <sec.icon className="w-4 h-4 text-silk-rose" />
                <h2 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
                  {sec.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {sec.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="inline-flex items-center gap-2 text-[13px] text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors group"
                    >
                      <span className="w-1 h-1 rounded-full bg-silk-rose/40 group-hover:bg-silk-rose group-hover:w-3 transition-all" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-4 h-4 text-silk-rose" />
            <h2 className="font-serif font-black text-xl text-light-text dark:text-dark-text">
              {bn ? "সব টুল" : "All Tools"}{" "}
              <span className="text-silk-rose/60 text-base font-bold">
                ({tools.length})
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {tools.map((t) => (
              <Link
                key={t.id}
                to={t.path}
                className="p-3 rounded-xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 hover:-translate-y-0.5 transition-all text-[12px] font-bold text-light-text dark:text-dark-text truncate"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Blog */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-silk-rose" />
            <h2 className="font-serif font-black text-xl text-light-text dark:text-dark-text">
              {bn ? "ব্লগ পোস্ট" : "Blog Posts"}{" "}
              <span className="text-silk-rose/60 text-base font-bold">
                ({blogPosts.length})
              </span>
            </h2>
          </div>
          <ul className="space-y-2">
            {blogPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 transition-all group"
                >
                  <span className="text-lg leading-none shrink-0">{p.emoji}</span>
                  <span className="text-[13px] font-bold text-light-text dark:text-dark-text group-hover:text-silk-wine dark:group-hover:text-silk-rose-soft transition-colors">
                    {bn ? p.titleBn : p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <AdsterraNativeBanner />
    </div>
  );
}
