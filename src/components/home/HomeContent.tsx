import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@data/blog";
import { useLanguage } from "@contexts/LanguageContext";
import { motion } from "framer-motion";

export function HomeContent() {
  const { language } = useLanguage();
  const bn = language === "bn";
  
  // Get latest 3 blog posts
  const latestBlogs = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-black text-2xl text-light-text dark:text-dark-text">
          {bn ? "সাম্প্রতিক ব্লগ" : "Latest from the Blog"}
        </h2>
        <Link to="/blog" className="text-silk-rose text-sm font-bold flex items-center gap-1 hover:underline">
          {bn ? "সব দেখুন" : "View all"} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="space-y-8">
        {latestBlogs.map((post, i) => (
          <motion.div 
            key={post.slug} 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              to={`/blog/${post.slug}`} 
              className="group block rounded-3xl overflow-hidden bg-white dark:bg-dark-surface border border-silk-rose/15 hover:border-silk-rose/40 hover:shadow-xl transition-all"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="w-full aspect-video overflow-hidden bg-silk-rose/5">
                  <img 
                    src={post.coverImage} 
                    alt={bn ? post.titleBn : post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-silk-rose/10 text-silk-rose text-[10px] font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-2 group-hover:text-silk-rose transition-colors">
                  {bn ? post.titleBn : post.title}
                </h3>
                
                <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2 mb-4">
                  {bn ? post.excerptBn : post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-silk-rose">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime} {bn ? "মিনিট" : "min read"}
                  </div>
                  <span className="text-silk-rose font-bold text-sm flex items-center gap-1">
                    {bn ? "পড়ুন" : "Read more"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
