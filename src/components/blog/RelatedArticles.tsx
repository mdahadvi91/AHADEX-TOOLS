import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { blogPosts } from "@data/blog";
import { getBlogForTool } from "@data/blogForTool";

interface RelatedArticlesProps {
  toolId: string;
  max?: number;
}

export function RelatedArticles({ toolId, max = 3 }: RelatedArticlesProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const slugs = getBlogForTool(toolId, max);

  const posts = slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (posts.length === 0) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 mb-3">
              <BookOpen className="w-3 h-3 text-silk-rose" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft">
                {bn ? "আরও পড়ুন" : "Read more"}
              </span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text leading-tight">
              {bn ? "এই টুল নিয়ে " : "Deep dives on "}
              <span className="font-script text-silk-rose text-[1.1em]">
                {bn ? "গাইড" : "this topic"}
              </span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-[12px] font-bold text-silk-wine dark:text-silk-rose-soft hover:text-silk-rose transition-colors shrink-0"
          >
            {bn ? "সব পোস্ট" : "All posts"}
            <ArrowRight className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.08, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group relative block h-full p-5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 hover:-translate-y-1 transition-all duration-400"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                <div className="relative flex items-start justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[9px] font-bold uppercase tracking-[0.15em]">
                    {post.category}
                  </span>
                  <span className="text-2xl leading-none">{post.emoji}</span>
                </div>

                <h3 className="relative font-serif font-bold text-[15px] leading-[1.25] text-light-text dark:text-dark-text mb-2.5 group-hover:text-silk-wine dark:group-hover:text-silk-rose-soft transition-colors line-clamp-2">
                  {bn ? post.titleBn : post.title}
                </h3>

                <p className="relative text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2 mb-4">
                  {bn ? post.excerptBn : post.excerpt}
                </p>

                <div className="relative flex items-center justify-between pt-3 border-t border-silk-rose/10">
                  <span className="inline-flex items-center gap-1 text-[10px] text-light-textSecondary dark:text-dark-textSecondary font-medium">
                    <Clock className="w-3 h-3" />
                    {post.readTime} {bn ? "মিনিট" : "min"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-silk-rose -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
