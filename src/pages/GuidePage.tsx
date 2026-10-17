import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { getGuideBySlug, guides } from "@data/guides";
import { tools } from "@data/tools";
import { getAuthor } from "@data/authors";

const SITE_URL = "https://ahadex.fun";

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const bn = language === "bn";

  const guide = slug ? getGuideBySlug(slug) : undefined;
  const author = guide ? getAuthor(guide.authorId) : null;

  useEffect(() => {
    if (!guide) return;
    const title = `${bn ? guide.titleBn : guide.title} | AHADEX Guides`;
    const description = bn ? guide.excerptBn : guide.excerpt;
    const canonical = `${SITE_URL}/guides/${guide.slug}`;

    document.title = title;
    const ensureMeta = (attr: "name" | "property", key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    ensureMeta("name", "description", description);
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:type", "article");
    ensureMeta("property", "og:url", canonical);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);
  }, [guide, bn]);

  if (!guide) return <Navigate to="/guides" replace />;

  const related = guide.relatedTools
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 text-[12px] font-bold text-silk-wine dark:text-silk-rose-soft hover:text-silk-rose transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {bn ? "সব গাইড" : "All guides"}
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-3">
            {guide.category}
          </p>
          <h1 className="font-serif font-black text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl tracking-tight text-light-text dark:text-dark-text mb-4">
            {bn ? guide.titleBn : guide.title}
          </h1>
          <p className="text-[15px] sm:text-[17px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-6">
            {bn ? guide.excerptBn : guide.excerpt}
          </p>
          <div className="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary font-medium pb-6 border-b border-silk-rose/15">
            {author && (
              <span className="inline-flex items-center gap-1.5">
                <Link
                  to={`/about/author/${author.id}`}
                  className="hover:text-silk-rose transition-colors"
                >
                  {author.name}
                </Link>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime} {bn ? "মিনিট" : "min read"}
            </span>
          </div>
        </motion.header>

        <div className="space-y-8">
          {guide.sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif font-black text-xl sm:text-[26px] leading-[1.2] text-light-text dark:text-dark-text mb-4 pt-4">
                {section.heading}
              </h2>
              <div
                className="text-[15px] sm:text-[16px] text-light-textSecondary dark:text-dark-textSecondary leading-[1.75] [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-4 [&>table]:w-full [&>table]:text-sm [&>table]:border-collapse [&>table]:my-4 [&>thead>tr>th]:border [&>thead>tr>th]:border-silk-rose/20 [&>thead>tr>th]:p-2 [&>thead>tr>th]:text-left [&>thead>tr>th]:bg-silk-rose/5 [&>tbody>tr>td]:border [&>tbody>tr>td]:border-silk-rose/20 [&>tbody>tr>td]:p-2 [&>strong]:text-light-text [&>strong]:dark:text-dark-text [&_a]:text-silk-wine [&_a]:dark:text-silk-rose-soft [&_a]:underline [&_a:hover]:text-silk-rose [&_code]:text-[13px] [&_code]:bg-silk-rose/10 [&_code]:dark:bg-silk-rose/15 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </motion.section>
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-silk-rose/15">
            <h2 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-5">
              {bn ? "এই গাইডের টুলস" : "Tools used in this guide"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group p-4 rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 transition-all"
                >
                  <h3 className="font-serif font-bold text-base text-light-text dark:text-dark-text group-hover:text-silk-rose transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary line-clamp-2">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 pt-8 border-t border-silk-rose/15">
          <h2 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-5">
            {bn ? "প্রায়শই জিজ্ঞাসিত প্রশ্ন" : "Frequently asked questions"}
          </h2>
          <div className="space-y-4">
            {guide.faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-serif font-bold text-base text-light-text dark:text-dark-text mb-2">
                  {item.question}
                </h3>
                <p className="text-[14px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {otherGuides.length > 0 && (
          <section className="mt-12 pt-8 border-t border-silk-rose/15">
            <h2 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-5">
              {bn ? "আরও গাইড" : "More guides"}
            </h2>
            <div className="space-y-3">
              {otherGuides.map((g) => (
                <Link
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 transition-all"
                >
                  <span className="text-2xl shrink-0">{g.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-sm text-light-text dark:text-dark-text group-hover:text-silk-rose transition-colors">
                      {bn ? g.titleBn : g.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-silk-rose group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
