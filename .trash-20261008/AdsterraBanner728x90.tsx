import { useEffect, useRef } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

/* ============================================================
 * Adsterra Banner 728x90 (Leaderboard)
 * Desktop only — hidden on mobile.
 * ============================================================ */

const AT_KEY = "776836ab935c2245165e49beb9990de7";

export function AdsterraBanner728x90({ className }: { className?: string }) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Adsterra uses a global `atOptions` object + a script per invocation.
    // Since React can re-mount, we remove any previous script and re-inject.
    const container = document.createElement("div");
    container.className = "adsterra-728-wrapper";
    wrapper.appendChild(container);

    // Set options
    (window as unknown as { atOptions?: Record<string, unknown> }).atOptions = {
      key: AT_KEY,
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highrevenueformat.com/${AT_KEY}/invoke.js`;
    script.async = true;
    container.appendChild(script);

    return () => {
      wrapper.innerHTML = "";
    };
  }, []);

  return (
    <section
      aria-label={bn ? "স্পন্সরড" : "Sponsored"}
      className={cn(
        "hidden md:block my-8 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-light-textSecondary/60 dark:text-dark-textSecondary/60">
          {bn ? "স্পন্সরড" : "Sponsored"}
        </span>
        <span className="flex-1 h-px bg-silk-rose/10" />
      </div>
      <div
        ref={wrapperRef}
        className="rounded-xl overflow-hidden bg-white/40 dark:bg-dark-surface/40 flex items-center justify-center min-h-[90px]"
      />
    </section>
  );
}
