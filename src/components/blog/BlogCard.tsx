import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import type { BlogPost } from "@data/blog";

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm border border-silk-rose/15 hover:border-silk-rose/40 hover:shadow-xl transition-all duration-300"
      >
        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full aspect-video overflow-hidden bg-silk-rose/5 shrink-0">
            <img
              src={post.coverImage}
              alt={bn ? post.titleBn : post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-silk-rose/10 text-silk-rose text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h3 className="font-serif font-black text-[17px] leading-tight text-light-text dark:text-dark-text mb-2 group-hover:text-silk-rose transition-colors line-clamp-2">
            {bn ? post.titleBn : post.title}
          </h3>

          <p className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2 mb-4">
            {bn ? post.excerptBn : post.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-silk-rose/10 flex items-center justify-between text-[11px] font-medium text-light-textSecondary dark:text-dark-textSecondary">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} {bn ? "মিনিট" : "min"}
              </span>
            </div>
            <span className="text-silk-rose font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              {bn ? "পড়ুন" : "Read"} <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
