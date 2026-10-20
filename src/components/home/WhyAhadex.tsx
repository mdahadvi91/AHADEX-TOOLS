import { Lock, Zap, Smartphone, Brain, Link2 } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";

const PILLARS = [
  {
    icon: Lock,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    titleEn: "Your files stay on your device",
    titleBn: "আপনার ফাইল আপনার ডিভাইসেই থাকে",
    descEn: "No upload server for browser-based tools. Files are processed 100% locally.",
    descBn: "ব্রাউজার-বেইজড টুলে কোনো আপলোড সার্ভার নেই। ফাইল ১০০% লোকালি প্রসেস হয়।",
  },
  {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    titleEn: "Work instantly",
    titleBn: "সাথে সাথে কাজ করুন",
    descEn: "No account, no queue, no waiting for server processing. Instant results.",
    descBn: "কোনো অ্যাকাউন্ট, কিউ বা সার্ভার প্রসেসিংয়ের অপেক্ষা নেই। তাৎক্ষণিক ফলাফল।",
  },
  {
    icon: Smartphone,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    titleEn: "Built for phones",
    titleBn: "মোবাইলের জন্য তৈরি",
    descEn: "Upload → process → download directly from mobile. Touch-optimized.",
    descBn: "মোবাইল থেকে সরাসরি আপলোড → প্রসেস → ডাউনলোড। টাচ-অপ্টিমাইজড।",
  },
  {
    icon: Brain,
    color: "text-silk-rose",
    bg: "bg-silk-rose/10",
    titleEn: "Tools that explain the result",
    titleBn: "টুল যা ফলাফল ব্যাখ্যা করে",
    descEn: "Not just 'Done'. AHADEX tells you what changed and if it's good for your use case.",
    descBn: "শুধু 'সম্পন্ন' নয়। AHADEX বলে কী বদলেছে এবং আপনার কাজে এটি উপযুক্ত কিনা।",
  },
  {
    icon: Link2,
    color: "text-silk-gold",
    bg: "bg-silk-gold/10",
    titleEn: "Workflows, not isolated tools",
    titleBn: "ওয়ার্কফ্লো, আলাদা টুল নয়",
    descEn: "Compress → Resize → Convert → Download. Chain tools for real tasks.",
    descBn: "কম্প্রেস → রিসাইজ → কনভার্ট → ডাউনলোড। আসল কাজের জন্য টুল চেইন করুন।",
  },
];

export function WhyAhadex() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-12">
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-silk-rose mb-3">
          {bn ? "কেন AHADEX?" : "Why AHADEX?"}
        </p>
        <h2 className="font-serif font-black text-2xl sm:text-4xl text-light-text dark:text-dark-text leading-tight max-w-2xl mx-auto">
          {bn 
            ? "শুধু টুল নয় — একটি স্মার্ট, প্রাইভেট ওয়ার্কফ্লো" 
            : "Not just tools — a smarter, private workflow"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/15 hover:border-silk-rose/40 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <h3 className="font-bold text-sm text-light-text dark:text-dark-text mb-1.5 leading-tight">
                {bn ? p.titleBn : p.titleEn}
              </h3>
              <p className="text-[12px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                {bn ? p.descBn : p.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
