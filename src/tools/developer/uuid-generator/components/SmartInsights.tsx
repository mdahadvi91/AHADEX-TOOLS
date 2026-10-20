import { Zap, ShieldCheck, Clock, Fingerprint } from "lucide-react";

export function SmartInsights({ version, bn }: { version: string, bn: boolean }) {
  const isV4 = version === "v4";
  
  return (
    <div className="mt-4 mb-2 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          {isV4 ? (
            <Fingerprint className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />
          ) : (
            <Clock className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isV4 ? "UUID v4 (Random)" : "UUID v7 (Time-ordered)"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
              {isV4 
                ? (bn 
                    ? "এটি সম্পূর্ণ র‍্যান্ডম এবং সুরক্ষিত। ডাটাবেসের প্রাইমারি কী হিসেবে ব্যবহারের জন্য দুর্দান্ত।" 
                    : "Completely random and secure. Excellent for primary keys.")
                : (bn 
                    ? "এটি টাইমস্ট্যাম্প ভিত্তিক। ডাটাবেসের ইনডেক্সিং এবং দ্রুত সর্টিংয়ের জন্য এটি অনেক ভালো।" 
                    : "Timestamp-based. Excellent for database indexing and sorting.")}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {bn ? "১০০% ইউনিক" : "100% Unique"}
          </span>
        </div>
      </div>
    </div>
  );
}
