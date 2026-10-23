import { Shield, Zap, CheckCircle2, Sparkles } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Sparkles, label: "3 Free Tools", color: "text-silk-rose" },
  { icon: Zap, label: "Instant Processing", color: "text-silk-gold" },
  { icon: CheckCircle2, label: "No Signup Required", color: "text-emerald-500" },
  { icon: Shield, label: "Files Stay on Device", color: "text-blue-500" },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {TRUST_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/20 text-[11px] sm:text-xs font-bold text-light-text dark:text-dark-text"
            >
              <Icon className={"w-3.5 h-3.5 " + item.color} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
