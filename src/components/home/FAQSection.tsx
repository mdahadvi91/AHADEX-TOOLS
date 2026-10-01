import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { homeFaqs } from "@data/faqs";
import { cn } from "@lib/cn";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-3">
            FAQ
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-light-text dark:text-dark-text leading-tight">
            Things you{" "}
            <span className="font-script text-silk-rose">may ask</span>
          </h2>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {homeFaqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "bg-white/80 dark:bg-dark-surface/80 border-silk-rose/40 shadow-[0_12px_40px_-10px_rgba(139,58,79,0.25)]"
                    : "bg-white/50 dark:bg-dark-surface/50 border-silk-rose/15 hover:border-silk-rose/30"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-base text-light-text dark:text-dark-text">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      isOpen
                        ? "bg-silk-rose text-white"
                        : "bg-silk-rose/10 text-silk-rose"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
