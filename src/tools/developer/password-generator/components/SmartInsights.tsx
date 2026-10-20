import { Zap, ShieldCheck, ShieldAlert, Shield } from "lucide-react";

export function SmartInsights({ entropy, crackTime, length, bn }: { entropy: number, crackTime: string, length: number, bn: boolean }) {
  if (!entropy) return null;

  const isHighlySecure = entropy >= 80;
  const isModerate = entropy >= 50 && entropy < 80;

  // Icon and colors based on strength
  let icon = <Shield className="w-5 h-5 text-emerald-500" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Good Password";
  let titleBn = "ভালো পাসওয়ার্ড";

  if (isHighlySecure) {
    icon = <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    colorClass = "border-emerald-500/30 bg-emerald-500/5";
    titleEn = "Highly Secure & Recommended";
    titleBn = "অত্যন্ত সুরক্ষিত এবং সুপারিশকৃত";
  } else if (isModerate) {
    icon = <Shield className="w-5 h-5 text-amber-500" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Moderately Secure";
    titleBn = "মাঝারি সুরক্ষিত";
  } else {
    icon = <ShieldAlert className="w-5 h-5 text-red-500" />;
    colorClass = "border-red-500/30 bg-red-500/5";
    titleEn = "Weak Password";
    titleBn = "দুর্বল পাসওয়ার্ড";
  }

  return (
    <div className={`mt-6 mb-4 rounded-2xl border ${colorClass} p-5 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-5 h-5 text-silk-gold" />
        <h3 className="font-serif font-black text-lg text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {bn ? titleBn : titleEn}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">
              {bn
                ? `এনট্রপি: ${entropy} বিট। আনুমানিক হ্যাক করতে সময় লাগবে: ${crackTime}`
                : `Entropy: ${entropy} bits. Estimated time to crack: ${crackTime}`}
            </p>
          </div>
        </div>

        {!isHighlySecure && (
          <div className="shrink-0 bg-white/50 dark:bg-dark-surface/50 px-3 py-2 rounded-lg border border-silk-rose/10">
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              {bn ? "টিপস:" : "Tip:"} {bn ? `দৈর্ঘ্য ${length + 4} অক্ষরে বাড়ান।` : `Increase length to ${length + 4} characters.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
