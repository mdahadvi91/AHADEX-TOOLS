import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { getPostBySlug, blogPosts } from "@data/blog";
import { tools } from "@data/tools";
import { getToolTranslation } from "@i18n/toolTranslations";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const bn = language === "bn";

  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${bn ? post.titleBn : post.title} | AHADEX Tools Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", bn ? post.excerptBn : post.excerpt);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [post, bn]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const date = new Date(post.publishedAt).toLocaleDateString(
    bn ? "bn-BD" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const relatedTool = tools.find((t) => t.id === post.relatedTool);
  const relatedTranslated = relatedTool
    ? getToolTranslation(relatedTool.id, language, {
        name: relatedTool.name,
        description: relatedTool.description,
      })
    : null;

  const sameCategory = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const otherCategory = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[12px] font-bold text-silk-wine dark:text-silk-rose-soft hover:text-silk-rose transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {bn ? "সব পোস্ট" : "All posts"}
      </Link>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-[0.15em]">
            {post.emoji} {post.category}
          </span>
        </div>

        <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.025em] text-light-text dark:text-dark-text mb-5">
          {bn ? post.titleBn : post.title}
        </h1>

        <p className="text-[15px] sm:text-[17px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-6">
          {bn ? post.excerptBn : post.excerpt}
        </p>

        <div className="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary font-medium pb-6 border-b border-silk-rose/15">
          <span className="inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {post.readTime} {bn ? "মিনিট পড়া" : "min read"}
          </span>
        </div>
      </motion.header>

      {/* Body */}
      <div className="space-y-5">
        {post.blocks.map((block, i) => {
          if (block.type === "h2") {
            return (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-serif font-black text-2xl sm:text-[28px] leading-[1.2] tracking-[-0.02em] text-light-text dark:text-dark-text pt-6"
              >
                {block.content}
              </motion.h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3
                key={i}
                className="font-serif font-bold text-lg sm:text-xl text-light-text dark:text-dark-text pt-3"
              >
                {block.content}
              </h3>
            );
          }
          if (block.type === "p") {
            return (
              <p
                key={i}
                className="text-[15px] sm:text-[16px] text-light-textSecondary dark:text-dark-textSecondary leading-[1.75]"
              >
                {block.content}
              </p>
            );
          }
          if (block.type === "ul" && block.items) {
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[15px] sm:text-[16px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-silk-rose mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "ol" && block.items) {
            return (
              <ol key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[15px] sm:text-[16px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-silk-rose/15 border border-silk-rose/30 text-silk-rose text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote
                key={i}
                className="relative pl-6 py-4 my-2 rounded-r-2xl bg-silk-rose/5 border-l-4 border-silk-rose"
              >
                <p className="text-[15px] sm:text-[16px] italic text-light-text dark:text-dark-text leading-relaxed">
                  {block.content}
                </p>
              </blockquote>
            );
          }
          if (block.type === "tip") {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl bg-gradient-to-br from-silk-gold/15 to-silk-rose/10 border border-silk-gold/30"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-2">
                  💡 {bn ? "টিপস" : "Pro tip"}
                </p>
                <p className="text-[14px] sm:text-[15px] text-light-text dark:text-dark-text leading-relaxed">
                  {block.content}
                </p>
              </motion.div>
            );
          }
          if (block.type === "cta" && block.toolId) {
            const tool = tools.find((t) => t.id === block.toolId);
            if (!tool) return null;
            const translated = getToolTranslation(tool.id, language, {
              name: tool.name,
              description: tool.description,
            });
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="my-8 p-6 rounded-3xl bg-gradient-to-br from-silk-rose/12 to-silk-gold/8 border border-silk-rose/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🛠️</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft">
                    {bn ? "সংশ্লিষ্ট টুল" : "Related tool"}
                  </span>
                </div>
                <h3 className="font-serif font-black text-xl text-light-text dark:text-dark-text mb-2">
                  {translated.name}
                </h3>
                <p className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-4">
                  {translated.description}
                </p>
                <Link
                  to={tool.path}
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white text-[13px] font-bold shadow-[0_12px_28px_-12px_rgba(139,58,79,0.6)] hover:shadow-[0_16px_38px_-14px_rgba(139,58,79,0.8)] hover:-translate-y-0.5 transition-all"
                >
                  {block.content || (bn ? "টুল খুলুন" : "Open tool")}
                  <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </Link>
              </motion.div>
            );
          }
          return null;
        })}
      </div>

      {/* Related tool bottom CTA */}
      {relatedTool && relatedTranslated && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-silk-rose/12 to-silk-gold/8 border border-silk-rose/25"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft">
            {bn ? "এই গাইডের টুল" : "Try the tool from this guide"}
          </span>
          <h3 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mt-3 mb-2">
            {relatedTranslated.name}
          </h3>
          <p className="text-[14px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-5">
            {relatedTranslated.description}
          </p>
          <Link
            to={relatedTool.path}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-silk-rose via-silk-rose-deep to-silk-wine text-white text-[13px] font-bold shadow-[0_12px_28px_-12px_rgba(139,58,79,0.6)] hover:shadow-[0_16px_38px_-14px_rgba(139,58,79,0.8)] hover:-translate-y-0.5 transition-all"
          >
            {bn ? "এখনই ট্রাই করুন" : "Try it now"}
            <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </Link>
        </motion.div>
      )}

      {/* Author Bio */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-silk-rose via-silk-rose-deep to-silk-wine flex items-center justify-center text-white font-black text-xl shrink-0">
            MA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-1">
              {bn ? "লেখক" : "Written by"}
            </p>
            <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text mb-1">
              Mohammad Ahad
            </h3>
            <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {bn
                ? "স্বাধীন ডেভেলপার ও AHADEX Tools-এর প্রতিষ্ঠাতা। দুবাই, UAE-তে অবস্থিত। ফ্রি ব্রাউজার-বেইজড টুল এবং প্রাইভেসি-ফোকাসড ওয়েব অ্যাপ্লিকেশন তৈরিতে বিশেষজ্ঞ।"
                : "Independent developer and founder of AHADEX Tools. Based in Dubai, UAE. Focused on building free browser-based tools and privacy-first web applications."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Other posts */}
      {otherPosts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-silk-rose/15">
          <h3 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-6">
            {bn ? "আরও পড়ুন" : "Keep reading"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="group p-5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl block mb-2">{p.emoji}</span>
                <h4 className="font-serif font-bold text-[15px] text-light-text dark:text-dark-text group-hover:text-silk-wine dark:group-hover:text-silk-rose-soft transition-colors leading-snug">
                  {bn ? p.titleBn : p.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
