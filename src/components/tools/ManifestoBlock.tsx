import { motion } from "framer-motion";
import { Lock, Zap, Heart, Sparkles } from "lucide-react";

export function ManifestoBlock() {
  return (
    <div className="mt-16 relative">
      {/* Left vertical accent */}
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-2 bottom-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-silk-rose via-silk-gold to-transparent"
      />

      <div className="pl-7 sm:pl-10">
        {/* Eyebrow — small caps with dot */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
            A growing collection
          </p>
        </motion.div>

        {/* Big statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight text-light-text dark:text-dark-text max-w-2xl"
        >
          Tools for everyday{" "}
          <span className="relative inline-block">
            <span className="font-script text-silk-rose text-[1.25em] leading-none italic">
              digital life.
            </span>
            {/* Curved underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 pointer-events-none"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 5 Q 50 1, 100 4 T 198 5"
                fill="none"
                stroke="url(#mfgUnderline)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="mfgUnderline" x1="0" x2="1">
                  <stop offset="0%" stopColor="#D88B9A" stopOpacity="0" />
                  <stop offset="50%" stopColor="#D88B9A" />
                  <stop offset="100%" stopColor="#C99667" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h2>

        {/* Divider with sparkle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-3 my-8"
        >
          <span className="h-px w-12 bg-gradient-to-r from-silk-rose/60 to-transparent" />
          <Sparkles className="w-3 h-3 text-silk-rose/70" />
          <span className="h-px w-12 bg-gradient-to-l from-silk-gold/60 to-transparent" />
        </motion.div>

        {/* Poetic lines */}
        <div className="space-y-4 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="text-base sm:text-lg leading-[1.75] text-light-textSecondary dark:text-dark-textSecondary"
          >
            Every file you drop{" "}
            <span className="font-script text-silk-rose text-[1.35em] leading-none italic">
              stays with you
            </span>{" "}
            — processed in your browser, never sent, never stored.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-base sm:text-lg leading-[1.75] text-light-textSecondary dark:text-dark-textSecondary"
          >
            Built to feel{" "}
            <span className="font-script text-silk-rose text-[1.35em] leading-none italic">
              effortless
            </span>
            . Made to disappear — so you can focus on the work that matters.
          </motion.p>
        </div>

        {/* Chips with icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap items-center gap-2 mt-8"
        >
          <Chip Icon={Lock} label="No accounts" />
          <Chip Icon={Zap} label="No tracking" />
          <Chip Icon={Heart} label="No limits" />
        </motion.div>
      </div>
    </div>
  );
}

function Chip({ Icon, label }: { Icon: typeof Lock; label: string }) {
  return (
    <span className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 hover:border-silk-rose/50 hover:-translate-y-0.5 transition-all duration-300">
      <Icon className="w-3.5 h-3.5 text-silk-rose" />
      <span className="text-xs font-medium tracking-wide text-light-text dark:text-dark-text">
        {label}
      </span>
    </span>
  );
}
