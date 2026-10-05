import { motion } from "framer-motion";
import { cn } from "@lib/cn";

/* ============================================================
 * ToolSkeleton — shimmering skeleton for tool pages
 * Shown while the tool's JS chunk is loading (lazy route)
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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
      {/* Hero skeleton */}
      <div className="space-y-4 mb-10">
        <Shimmer className="h-4 w-28 rounded-full" />
        <Shimmer className="h-10 sm:h-14 w-3/4 max-w-md" />
        <Shimmer className="h-4 w-1/2 max-w-sm" />
      </div>

      {/* Workspace skeleton */}
      <div className="space-y-4 mb-8">
        <Shimmer className="h-20 w-full" />
        <Shimmer className="h-56 sm:h-64 w-full" />
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Shimmer className="h-24" />
        <Shimmer className="h-24" />
        <Shimmer className="h-24" />
        <Shimmer className="h-24" />
      </div>
    </div>
  );
}
