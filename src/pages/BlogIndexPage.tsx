import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { blogPosts, blogCategories } from "@data/blog";
import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";
import { AdsterraBanner728x90 } from "@components/ads/AdsterraBanner728x90";
import { BlogCard } from "@components/blog/BlogCard";
import { cn } from "@lib/cn";

export default function BlogIndexPage() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === category),
    [category]
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/10 border border-silk-rose/25 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-silk-rose" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-silk-wine dark:text-silk-rose-soft">
            {bn ? "ব্লগ ও গাইড" : "Blog & Guides"}
          </span>
        </div>

        <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text mb-4">
          {bn ? "শিখুন, জানুন, " : "Learn, explore, "}
          <span className="font-script text-silk-rose text-[1.15em]">
            {bn ? "আরও ভালো হোন।" : "get better."}
          </span>
        </h1>

        <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-2xl mx-auto">
          {bn
            ? "ফ্রি টুলগুলো আরও ভালোভাবে ব্যবহার করার জন্য বিস্তারিত গাইড, টিপস ও টিউটোরিয়াল।"
            : "In-depth guides, tips, and tutorials for getting more out of the free tools."}
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {blogCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "px-4 py-2 rounded-full text-[12px] font-bold transition-all",
              category === c
                ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-[0_8px_20px_-8px_rgba(139,58,79,0.5)]"
                : "bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/15 hover:border-silk-rose/45"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Ad after filters */}
      <AdsterraBanner728x90 />
      <AdsterraNativeBanner />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-silk-rose/50 mx-auto mb-4" />
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            {bn ? "এই ক্যাটাগরিতে কোনো পোস্ট নেই।" : "No posts in this category."}
          </p>
        </div>
      )}
    </div>
  );
}
