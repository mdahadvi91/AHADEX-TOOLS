import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@data/categories";
import { ToolIcon } from "@components/common/ToolIcon";
import { useReducedMotion } from "@hooks/useReducedMotion";

export function CategoryGrid() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            Browse by category
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-light-text dark:text-dark-text leading-tight">
            Everything,{" "}
            <span className="font-script text-silk-rose">organised</span>
          </h2>
          <p className="mt-4 text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-xl mx-auto">
            Six categories. . All running in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/categories/${cat.slug}`}
                className="group relative flex flex-col p-7 rounded-3xl h-full overflow-hidden bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/50 shadow-[0_4px_20px_-8px_rgba(139,58,79,0.12)] hover:shadow-[0_20px_50px_-15px_rgba(139,58,79,0.3)] hover:-translate-y-1 transition-all duration-500"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle, ${cat.color}66 0%, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />

                <span
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <ToolIcon category={cat.id} size={28} />
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                      {cat.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold"
                      style={{
                        backgroundColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                    >
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium" style={{ color: cat.color }}>
                  Explore
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
