import { ShieldCheck, Eye, Lock, Server, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@lib/cn";

const PROMISES = [
  { Icon: Eye, text: "No file content is ever read by our servers" },
  { Icon: Lock, text: "All processing happens inside your browser" },
  { Icon: Server, text: "No uploads, no storage, no logging of your files" },
  { Icon: CheckCircle2, text: "Works offline once the page loads" },
];

export function PrivacyPromise() {
  return (
    <section className="relative py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className={cn(
          "relative overflow-hidden rounded-[32px]",
          "p-8 sm:p-12 lg:p-16",
          "bg-gradient-to-br from-silk-sand via-silk-rose/[0.06] to-silk-cream dark:from-[#251820] dark:via-silk-rose/[0.05] dark:to-[#32202A]",
          "border border-silk-rose/20"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-silk-rose/15 blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-silk-gold/15 blur-[80px]"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-silk-rose/15 border border-silk-rose/30 flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-silk-rose" />
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text">
              Your privacy{" "}
              <span className="font-script text-silk-rose text-[1.1em]">
                comes first.
              </span>
            </h2>

            <p className="mt-5 text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              Most tool sites upload your files to their servers. We don't.
              Every AHADEX tool processes data right inside your browser using
              modern web APIs. Your files never leave your device.
            </p>

            <Link
              to="/privacy"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-silk-rose hover:text-silk-wine transition-colors"
            >
              Read our privacy policy
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="space-y-3">
            {PROMISES.map(({ Icon, text }, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-2xl",
                  "bg-silk-rose/5 border border-silk-rose/15"
                )}
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-silk-rose/15 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-silk-rose" />
                </div>
                <span className="text-sm text-light-text dark:text-dark-text leading-relaxed pt-1.5">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
