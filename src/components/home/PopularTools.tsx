import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@data/tools";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { ToolIcon } from "@components/common/ToolIcon";
import { cn } from "@lib/cn";
import type { Tool } from "@types/tool";

export function PopularTools() {
  const prefersReduced = useReducedMotion();
  const popular = tools.filter((t) => t.popular).slice(0, 6);

  if (popular.length === 0) return null;

  const [featured, ...rest] = popular;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
              Featured
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-light-text dark:text-dark-text leading-tight">
              Most{" "}
              <span className="font-script text-silk-rose">loved</span> tools
            </h2>
          </div>
          <Link
            to="/tools"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-silk-wine dark:text-silk-rose hover:gap-3 transition-all"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <FeaturedCard tool={featured} />
          </motion.div>

          {rest.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * (i + 1) }}
            >
              <SmallCard tool={tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={tool.path}
      className={cn(
        "group relative flex flex-col h-full min-h-[380px] p-8 rounded-[32px] overflow-hidden",
        "bg-gradient-to-br from-silk-rose via-silk-wine to-silk-wine-deep",
        "shadow-[0_20px_60px_-15px_rgba(139,58,79,0.4)]",
        "hover:shadow-[0_30px_80px_-15px_rgba(139,58,79,0.5)]",
        "transition-all duration-700"
      )}
    >
      {/* Texture overlay */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating petals */}
      <span aria-hidden="true" className="absolute top-8 right-8 text-2xl opacity-30 animate-gentle-float">
        🌸
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-12 left-10 text-3xl opacity-20 animate-gentle-float"
        style={{ animationDelay: "1s" }}
      >
        💗
      </span>

      <div className="relative flex flex-col h-full text-white">
        {/* Icon + badge */}
        <div className="flex items-start justify-between gap-3">
          <span className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <ToolIcon category={tool.category} size={32} className="brightness-0 invert opacity-95" />
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-medium tracking-widest uppercase border border-white/30">
            Featured
          </span>
        </div>

        <div className="flex-1" />

        <span className="font-script text-3xl opacity-80 mb-2">No. 1</span>
        <h3 className="font-display font-black text-3xl sm:text-4xl leading-tight mb-3">
          {tool.name}
        </h3>
        <p className="text-white/85 text-sm leading-relaxed max-w-sm">
          {tool.description}
        </p>

        <div className="mt-6 flex items-center gap-3 text-sm font-medium">
          <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </span>
          Open tool
        </div>
      </div>
    </Link>
  );
}

function SmallCard({ tool }: { tool: Tool }) {
  return (
    <Link
      to={tool.path}
      className={cn(
        "group relative flex flex-col p-6 rounded-3xl h-full",
        "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
        "border border-silk-rose/15 hover:border-silk-rose/50",
        "shadow-[0_4px_20px_-8px_rgba(139,58,79,0.15)]",
        "hover:shadow-[0_12px_40px_-10px_rgba(139,58,79,0.3)]",
        "hover:-translate-y-1",
        "transition-all duration-500"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <span
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
            "bg-gradient-to-br from-silk-rose/15 to-silk-gold/10",
            "border border-silk-rose/20",
            "group-hover:scale-110 group-hover:rotate-3",
            "transition-all duration-500"
          )}
        >
          <ToolIcon category={tool.category} size={24} />
        </span>
        <ArrowUpRight className="w-5 h-5 text-silk-rose opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1.5 group-hover:text-silk-wine dark:group-hover:text-silk-rose transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}
