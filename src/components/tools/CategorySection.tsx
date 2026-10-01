import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ToolIcon } from "@components/common/ToolIcon";
import { SmallToolCard } from "./SmallToolCard";
import type { Category } from "@types/category";
import type { Tool } from "@types/tool";

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
  index: number;
}

export function CategorySection({ category, tools, index }: CategorySectionProps) {
  if (tools.length === 0) return null;

  const numeral = String(index + 1).padStart(2, "0");

  return (
    <section className="py-8 lg:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2.5 sm:gap-3 mb-5 flex-wrap"
      >
        <span className="font-script text-silk-rose/70 text-2xl sm:text-3xl shrink-0">
          {numeral}
        </span>

        <span className="w-6 sm:w-10 h-px bg-gradient-to-r from-silk-rose/60 to-transparent shrink-0" />

        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="w-8 h-8 rounded-lg bg-silk-rose/12 border border-silk-rose/25 flex items-center justify-center shrink-0">
            <ToolIcon category={category.id} size={16} />
          </span>
          <h2 className="font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight text-light-text dark:text-dark-text truncate">
            {category.name}
          </h2>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-silk-rose/15 text-silk-wine dark:text-silk-rose-soft shrink-0">
            {tools.length}
          </span>
        </div>

        <Link
          to={`/categories/${category.slug}`}
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-silk-wine dark:text-silk-rose-soft hover:gap-2 transition-all duration-300 shrink-0"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* Uniform grid — small cards only */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
        {tools.map((tool, i) => (
          <SmallToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
