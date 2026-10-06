import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Calendar } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import type { BlogPost } from "@data/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const date = new Date(post.publishedAt).toLocaleDateString(
    bn ? "bn-BD" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative block h-full rounded-3xl overflow-hidden bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/45 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(139,58,79,0.35)] transition-all duration-400"
      >
        {/* Corner glow */}
        <span
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.4) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative p-6 flex flex-col h-full">
          {/* Category + emoji */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold uppercase tracking-[0.15em]">
              {post.category}
            </span>
            <span className="text-3xl leading-none">{post.emoji}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-black text-lg sm:text-xl leading-[1.2] tracking-[-0.015em] text-light-text dark:text-dark-text mb-3 group-hover:text-silk-wine dark:group-hover:text-silk-rose-soft transition-colors line-clamp-2">
            {bn ? post.titleBn : post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-3 mb-5 flex-1">
            {bn ? post.excerptBn : post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-silk-rose/10">
            <div className="flex items-center gap-3 text-[10px] text-light-textSecondary dark:text-dark-textSecondary font-medium">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} {bn ? "মিনিট" : "min"}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-silk-rose -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
