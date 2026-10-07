import { useEffect, useRef } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

/* ============================================================
 * Adsterra Native Banner
 * ------------------------------------------------------------
 * Injects the Adsterra Native Banner container.
 * The Adsterra "invoke.js" script is loaded once in index.html.
 * This component only recreates the container div on each mount
 * (needed for SPA route changes).
 *
 * Non-intrusive: matches site typography, loads async.
 * ============================================================ */

const CONTAINER_ID = "container-754e14aa954e128c62cd2d9cf86b805c";

interface AdsterraNativeBannerProps {
  className?: string;
  /** Optional label override */
  label?: string;
}

export function AdsterraNativeBanner({
  className,
  label,
}: AdsterraNativeBannerProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Remove any existing container (from previous mount)
    document.getElementById(CONTAINER_ID)?.remove();

    // Create a fresh container
    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    wrapper.appendChild(container);

    return () => {
      document.getElementById(CONTAINER_ID)?.remove();
    };
  }, []);

  return (
    <section
      aria-label={bn ? "স্পন্সরড কনটেন্ট" : "Sponsored content"}
      className={cn(
        "relative my-8 sm:my-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Subtle "Ad" label */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-light-textSecondary/60 dark:text-dark-textSecondary/60">
          {label ?? (bn ? "স্পন্সরড" : "Sponsored")}
        </span>
        <span className="flex-1 h-px bg-silk-rose/10" />
      </div>

      {/* Adsterra container gets injected here */}
      <div
        ref={wrapperRef}
        className="rounded-2xl overflow-hidden bg-white/40 dark:bg-dark-surface/40 backdrop-blur-sm min-h-[90px] flex items-center justify-center"
      />
    </section>
  );
}
