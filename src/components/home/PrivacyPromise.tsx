import { ShieldCheck, Eye, Lock, Server, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

export function PrivacyPromise() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const promises = [
    {
      Icon: Eye,
      text: bn
        ? "আপনার ফাইলের কনটেন্ট কখনো আমাদের সার্ভার পড়ে না"
        : "No file content is ever read by our servers",
    },
    {
      Icon: Lock,
      text: bn
        ? "সব প্রসেসিং আপনার ব্রাউজারেই হয়"
        : "All processing happens inside your browser",
    },
    {
      Icon: Server,
      text: bn
        ? "কোনো আপলোড নেই, স্টোরেজ নেই, লগ নেই"
        : "No uploads, no storage, no logging of your files",
    },
    {
      Icon: CheckCircle2,
      text: bn
        ? "পেজ লোড হলে অফলাইনেও কাজ করে"
        : "Works offline once the page loads",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative overflow-hidden rounded-[32px] sm:rounded-[40px]",
          "p-7 sm:p-12 lg:p-16",
          "bg-gradient-to-br from-silk-sand via-silk-rose/[0.06] to-silk-cream",
          "dark:from-[#251820] dark:via-silk-rose/[0.05] dark:to-[#32202A]",
          "border border-silk-rose/20",
          "shadow-[0_30px_70px_-30px_rgba(139,58,79,0.35)]"
        )}
      >
        {/* Ambient orbs */}
        <span
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-silk-rose/20 blur-[90px]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-silk-gold/20 blur-[90px]"
        />

        {/* Fine grid overlay */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(216,139,154,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(216,139,154,0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-silk-rose/12 border border-silk-rose/30 mb-5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-silk-rose" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-silk-wine dark:text-silk-rose-soft">
                {bn ? "প্রাইভেসি প্রতিশ্রুতি" : "Privacy promise"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif font-black text-3xl sm:text-4xl lg:text-[42px] leading-[1.05] tracking-[-0.025em] text-light-text dark:text-dark-text"
            >
              {bn ? "আপনার প্রাইভেসি " : "Your privacy "}
              <span className="font-script text-silk-rose text-[1.15em]">
                {bn ? "সবার আগে।" : "comes first."}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-xl"
            >
              {bn
                ? "অন্য অনেকে আপনার ফাইল তাদের সার্ভারে আপলোড করে। আমরা তা করি না। প্রতিটি AHADEX টুল আপনার ব্রাউজারেই আধুনিক Web API ব্যবহার করে কাজ করে। আপনার ফাইল কখনো ডিভাইস ছাড়ে না।"
                : "Most tool sites upload your files to their servers. We don't. Every AHADEX tool processes data right inside your browser using modern web APIs. Your files never leave your device."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/privacy"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-silk-wine dark:text-silk-rose-soft hover:text-silk-rose transition-colors"
              >
                {bn ? "প্রাইভেসি পলিসি পড়ুন" : "Read our privacy policy"}
                <ArrowRight className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Promise list */}
          <ul className="space-y-3">
            {promises.map(({ Icon, text }, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: 0.25 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group flex items-start gap-3.5 p-4 rounded-2xl",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/20",
                  "hover:border-silk-rose/45 hover:-translate-y-0.5",
                  "transition-all duration-400"
                )}
              >
                <span className="shrink-0 inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-silk-rose/20 to-silk-gold/15 border border-silk-rose/30 items-center justify-center group-hover:scale-110 transition-transform duration-400">
                  <Icon className="w-4 h-4 text-silk-rose" />
                </span>
                <span className="text-[13px] sm:text-sm text-light-text dark:text-dark-text leading-relaxed pt-1.5 font-medium">
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
