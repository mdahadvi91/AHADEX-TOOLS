import { motion } from "framer-motion";
import { cn } from "@lib/cn";

/* ============================================================
 * ToolSkeleton — shimmering placeholder for lazy-loaded tool
 * pages. Visually matches the actual tool page layout so the
 * transition from SSR content (or from an empty state) to the
 * interactive tool is smooth rather than jarring.
 * ============================================================ */

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-silk-rose/8 dark:bg-silk-rose/5",
        className
      )}
    >
      <motion.span
        aria-hidden="true"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(216,139,154,0.15) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function ToolSkeleton() {
  return (
    <div
      className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10"
      aria-busy="true"
      aria-live="polite"
    >
      {/* Back link */}
      <div className="mb-5 sm:mb-7">
        <Shimmer className="h-4 w-24 rounded-full" />
      </div>

      {/* Hero: tag badge, title, subtitle */}
      <div className="space-y-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2">
          <Shimmer className="h-7 w-32 rounded-full" />
          <Shimmer className="h-7 w-28 rounded-full" />
          <Shimmer className="h-7 w-24 rounded-full" />
        </div>
        <Shimmer className="h-12 sm:h-16 lg:h-20 w-[80%] max-w-lg" />
        <div className="space-y-2 pt-2">
          <Shimmer className="h-4 w-full max-w-2xl" />
          <Shimmer className="h-4 w-[85%] max-w-xl" />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mb-8 sm:mb-10">
        {[0, 1, 2, 3].map((i) => (
          <Shimmer key={i} className="h-16" />
        ))}
      </div>

      {/* Workspace card */}
      <div className="mb-10 rounded-3xl border border-silk-rose/15 bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl p-4 sm:p-6">
        <div className="space-y-4">
          <Shimmer className="h-6 w-40" />
          <Shimmer className="h-48 sm:h-64 w-full" />
          <div className="flex flex-wrap gap-3 pt-1">
            <Shimmer className="h-10 w-32" />
            <Shimmer className="h-10 w-32" />
            <Shimmer className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Content blocks — matches the tool page's Intro / Features / FAQ rhythm */}
      <div className="max-w-3xl space-y-4">
        <Shimmer className="h-7 w-48" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-3/4" />
        </div>

        <div className="pt-4">
          <Shimmer className="h-7 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            {[0, 1, 2, 3].map((i) => (
              <Shimmer key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
