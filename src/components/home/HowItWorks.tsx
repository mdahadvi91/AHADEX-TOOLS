import { Search, MousePointerClick, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@hooks/useReducedMotion";
import { cn } from "@lib/cn";

const ICONS = [Search, MousePointerClick, Download];

export function HowItWorks() {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      number: "01",
      title: "Find your tool",
      description: "Search or browse by category to find exactly what you need.",
    },
    {
      number: "02",
      title: "Use it instantly",
      description: "Upload or type. Everything processes right in your browser.",
    },
    {
      number: "03",
      title: "Download the result",
      description: "One click to save. Your file never touched a server.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
            How it works
          </p>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
          Three steps to{" "}
          <span className="font-script text-silk-rose text-[1.1em]">
            get things done.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = ICONS[i] ?? Search;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[-1.5rem] h-px bg-gradient-to-r from-silk-rose/40 via-silk-rose/20 to-transparent"
                />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-silk-rose to-silk-wine-deep flex items-center justify-center shadow-silk-medium">
                    <Icon className="w-7 h-7 text-white" />
                  </span>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-dark-elevated dark:bg-silk-cream border border-silk-rose/30 flex items-center justify-center text-[10px] font-mono font-bold text-silk-rose">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
