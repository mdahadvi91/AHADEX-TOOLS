import { Zap, Heart, Sparkles, Lock, Wand2, Globe } from "lucide-react";

const ITEMS = [
  { Icon: Zap, label: "Instant processing" },
  { Icon: Heart, label: "Crafted with care" },
  { Icon: Sparkles, label: "Free forever" },
  { Icon: Lock, label: "100% private" },
  { Icon: Wand2, label: "Runs in your browser" },
  { Icon: Globe, label: "Works everywhere" },
];

export function TrustMarquee() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade left */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-silk-cream dark:from-dark-bg to-transparent"
      />
      {/* Fade right */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-silk-cream dark:from-dark-bg to-transparent"
      />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map(({ Icon, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 sm:px-12 py-5 shrink-0"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-silk-rose/15 border border-silk-rose/25">
              <Icon className="w-3.5 h-3.5 text-silk-rose" />
            </span>
            <span className="font-display font-medium text-sm sm:text-base tracking-tight text-light-text dark:text-dark-text whitespace-nowrap">
              {label}
            </span>
            <span
              aria-hidden="true"
              className="ml-4 text-silk-rose/40 font-script text-xl"
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
