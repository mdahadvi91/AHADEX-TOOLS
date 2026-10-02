import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function CraftedCTA() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Primary CTA — gradient + letter hover wave */}
      <Link
        to="/tools"
        className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full overflow-hidden bg-gradient-to-r from-silk-rose via-silk-wine to-silk-wine-deep text-white font-medium shadow-[0_12px_30px_-10px_rgba(139,58,79,0.55)] hover:shadow-[0_20px_40px_-10px_rgba(139,58,79,0.65)] hover:-translate-y-0.5 transition-all duration-500"
      >
        {/* Shimmer sweep */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        <span className="relative font-display font-semibold text-base tracking-tight">
          Browse all tools
        </span>

        <span className="relative w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:rotate-45 transition-transform duration-500">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>

      {/* Secondary CTA — outline + underline slide */}
      <Link
        to="/about"
        className="group relative inline-flex items-center gap-2 px-7 py-4 text-silk-wine dark:text-silk-rose font-display font-medium text-base tracking-tight"
      >
        <span className="relative">
          Our story
          {/* Animated underline */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-silk-rose via-silk-gold to-transparent rounded-full"
          />
        </span>

        {/* Small script accent */}
        <span className="font-script text-silk-rose/70 text-sm -rotate-6 origin-left group-hover:rotate-0 transition-transform duration-500">
          →
        </span>
      </Link>
    </div>
  );
}
