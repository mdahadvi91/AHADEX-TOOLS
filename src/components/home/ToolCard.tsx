import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@lib/cn";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { Badge } from "@components/common/Badge";
import type { Tool } from "@types/tool";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link
        to={tool.path}
        className={cn(
          "group relative flex flex-col h-full p-6 rounded-3xl overflow-hidden",
          "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
          "border border-silk-rose/15 hover:border-silk-rose/50",
          "shadow-[0_4px_20px_-8px_rgba(139,58,79,0.12)]",
          "hover:shadow-[0_20px_50px_-15px_rgba(139,58,79,0.35)]",
          "hover:-translate-y-1.5",
          "transition-all duration-500"
        )}
      >
        {/* Rose glow corner on hover */}
        <span
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.5) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Header row — badge + arrow */}
        <div className="relative flex items-start justify-between gap-3 mb-5">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-silk-rose/25 to-silk-wine/15 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <span className="font-display font-black text-xl text-silk-wine dark:text-silk-rose">
              {tool.name.charAt(0)}
            </span>
          </span>

          <div className="flex flex-wrap gap-1.5 justify-end">
            {tool.popular && <Badge variant="popular">Popular</Badge>}
            {tool.newTool && <Badge variant="new">New</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1">
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 group-hover:text-silk-wine dark:group-hover:text-silk-rose transition-colors line-clamp-1">
            {tool.name}
          </h3>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-between pt-5 mt-5 border-t border-silk-rose/10">
          <span className="text-[10px] uppercase tracking-[0.15em] text-silk-wine/50 dark:text-silk-rose/40 font-semibold">
            {tool.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-silk-wine dark:text-silk-rose opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Open
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
