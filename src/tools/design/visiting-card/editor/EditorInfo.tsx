import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Ruler,
  Printer,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

/* ============================================================
 * Editor page info — valuable, not filler
 * Print guidelines · Best practices · Related tools
 * ============================================================ */

export function EditorInfo() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <div className="mt-12 sm:mt-16 max-w-5xl mx-auto space-y-10 sm:space-y-14">
      {/* ─── PRINT GUIDELINES ─── */}
      <section>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Printer className="w-3 h-3" />
            {bn ? "প্রিন্ট গাইড" : "Print guide"}
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text">
            {bn ? "প্রিন্ট করার আগে যা জানা দরকার" : "Everything before you print"}
          </h2>
          <p className="mt-2 text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
            {bn
              ? "প্রফেশনাল প্রিন্টের জন্য এই চারটি জিনিস মাথায় রাখুন।"
              : "Four things to know for a professional-grade result."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <GuideCard
            icon={<Ruler className="w-5 h-5" />}
            title={bn ? "সাইজ" : "Size"}
            text={
              bn
                ? "স্ট্যান্ডার্ড সাইজ ৮৮.৯ × ৫০.৮ মিমি — ইন্ডাস্ট্রি স্ট্যান্ডার্ড। স্কয়ার ও স্লিম-ও সাপোর্টেড।"
                : "Standard is 88.9 × 50.8 mm — the industry default. Square and slim are also supported."
            }
          />
          <GuideCard
            icon={<Printer className="w-5 h-5" />}
            title={bn ? "DPI" : "DPI"}
            text={
              bn
                ? "সাধারণ প্রিন্টের জন্য ৩০০ DPI। প্রিমিয়াম ফিনিশের জন্য ৬০০ DPI। দ্রুত প্রিভিউয়ের জন্য ১৫০ DPI।"
                : "300 DPI for standard print. 600 DPI for premium finishes. 150 DPI for quick preview only."
            }
          />
          <GuideCard
            icon={<Shield className="w-5 h-5" />}
            title={bn ? "সেফ এরিয়া" : "Safe area"}
            text={
              bn
                ? "কোনো টেক্সট কার্ডের কিনারা থেকে ৩ মিমি-এর ভিতরে রাখুন — ছাঁটার সময় কাটা পড়বে না।"
                : "Keep all text at least 3 mm inside the card edge — this is the safe zone that won't be trimmed."
            }
          />
          <GuideCard
            icon={<Sparkles className="w-5 h-5" />}
            title={bn ? "ফরম্যাট" : "Format"}
            text={
              bn
                ? "প্রিন্টের জন্য PNG বা PDF। ইমেইলের জন্য JPG। PDF প্রিন্ট শপে সরাসরি দেওয়া যায়।"
                : "Use PNG or PDF for printing. JPG for email. PDF hands straight to any print shop."
            }
          />
        </div>
      </section>

      {/* ─── BEST PRACTICES ─── */}
      <section>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/8 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3 h-3" />
            {bn ? "বেস্ট প্র্যাকটিস" : "Best practices"}
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text">
            {bn ? "ভালো কার্ড কীভাবে বানাবেন" : "How to make a card that works"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <PracticeCard
            type="do"
            title={bn ? "যা করবেন" : "Do"}
            items={
              bn
                ? [
                    "একটি ফোন নম্বর এবং একটি ইমেইল — বেশি নয়",
                    "লোগো ছোট রাখুন, নাম বড়",
                    "উচ্চ কনট্রাস্ট — হালকা ব্যাকগ্রাউন্ডে গাঢ় টেক্সট",
                    "প্রিন্টের আগে সবসময় প্রিভিউ দেখুন",
                  ]
                : [
                    "One phone number and one email — not more",
                    "Keep the logo small, the name large",
                    "High contrast — dark text on light backgrounds",
                    "Always preview before you print",
                  ]
            }
          />
          <PracticeCard
            type="avoid"
            title={bn ? "যা এড়িয়ে চলবেন" : "Avoid"}
            items={
              bn
                ? [
                    "অতিরিক্ত ছোট font — ৯ pt এর নিচে নয়",
                    "খুব হালকা রঙ (যেমন ধূসর টেক্সট সাদা ব্যাকগ্রাউন্ডে)",
                    "কিনারার খুব কাছে টেক্সট",
                    "একই কার্ডে তিন-চারটি ফন্ট মেশানো",
                  ]
                : [
                    "Extra small fonts — nothing below 9 pt",
                    "Very light text (grey text on white paper)",
                    "Text too close to the card edge",
                    "Mixing three or four different fonts on one card",
                  ]
            }
          />
        </div>
      </section>

      {/* ─── RELATED TOOLS ─── */}
      <section>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text">
            {bn ? "সম্পর্কিত টুলস" : "Related tools"}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <RelatedTool
            to="/tools/photo-qr"
            emoji="📸"
            title="Photo QR Code"
            desc={bn ? "যেকোনো ছবিতে স্ক্যানযোগ্য QR" : "Add QR to any photo"}
          />
          <RelatedTool
            to="/tools/image-resizer"
            emoji="🖼️"
            title="Image Resizer"
            desc={bn ? "লোগো সঠিক সাইজে কাটুন" : "Resize your logo to size"}
          />
          <RelatedTool
            to="/tools/image-compressor"
            emoji="⚡"
            title="Image Compressor"
            desc={bn ? "ছবি হালকা করুন" : "Compress images without loss"}
          />
        </div>
      </section>

      {/* ─── SHORT CTA ─── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-silk-rose/10 to-silk-gold/10 border border-silk-rose/20">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/70 dark:bg-dark-surface/70 border border-silk-rose/25 flex items-center justify-center text-2xl shrink-0">
            🎨
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-1">
              {bn ? "আরও টেমপ্লেট দেখতে চান?" : "Want to try another template?"}
            </h3>
            <p className="text-[13px] text-light-textSecondary dark:text-dark-textSecondary">
              {bn
                ? "২০টি হাতে-ডিজাইন করা টেমপ্লেট — সব ফ্রি, সব এডিটেবল।"
                : "20 hand-designed templates — all free, all editable."}
            </p>
          </div>
          <Link
            to="/tools/visiting-card"
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full shrink-0",
              "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white",
              "text-[12px] font-semibold shadow-silk-soft",
              "hover:shadow-silk-deep hover:gap-2.5 transition-all"
            )}
          >
            {bn ? "গ্যালারিতে যান" : "View gallery"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components ─── */

function GuideCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="p-4 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15"
    >
      <div className="w-10 h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center text-silk-rose mb-3">
        {icon}
      </div>
      <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-1.5">
        {title}
      </h3>
      <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

function PracticeCard({
  type,
  title,
  items,
}: {
  type: "do" | "avoid";
  title: string;
  items: string[];
}) {
  const isDo = type === "do";
  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-2xl backdrop-blur-xl border",
        isDo
          ? "bg-emerald-50/60 dark:bg-emerald-900/10 border-emerald-500/20"
          : "bg-red-50/60 dark:bg-red-900/10 border-red-500/20"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center",
            isDo
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/15 text-red-600 dark:text-red-400"
          )}
        >
          {isDo ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
        </span>
        <h3
          className={cn(
            "font-display font-bold text-sm",
            isDo
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-red-700 dark:text-red-300"
          )}
        >
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[12px] sm:text-[13px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
          >
            <span
              className={cn(
                "w-1 h-1 rounded-full mt-2 shrink-0",
                isDo ? "bg-emerald-500" : "bg-red-500"
              )}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedTool({
  to,
  emoji,
  title,
  desc,
}: {
  to: string;
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3 p-4 rounded-2xl",
        "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
        "border border-silk-rose/15 hover:border-silk-rose/50",
        "hover:-translate-y-0.5 transition-all duration-300"
      )}
    >
      <span className="text-2xl shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-light-text dark:text-dark-text leading-tight">
          {title}
        </p>
        <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
          {desc}
        </p>
      </div>
      <ArrowRight className="w-4 h-4 text-silk-rose shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
