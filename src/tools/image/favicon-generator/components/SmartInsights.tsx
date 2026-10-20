import { Zap, AlertTriangle, CheckCircle2, MonitorSmartphone } from "lucide-react";

export function SmartInsights({ background, padding, filesCount, bn }: { background: string, padding: number, filesCount: number, bn: boolean }) {
  if (filesCount === 0) return null;

  const isTransparent = background === "transparent" || background === "auto";
  const hasGoodPadding = padding > 5;

  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Great Favicon Setup";
  let titleBn = "দুর্দান্ত ফ্যাভিকন সেটআপ";

  if (isTransparent && !hasGoodPadding) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Adjust Padding for Better Visibility";
    titleBn = "ভালো ভিজিবিলিটির জন্য প্যাডিং বাড়ান";
  } else if (isTransparent) {
    titleEn = "Transparent Background";
    titleBn = "ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড";
  }

  return (
    <div className={`mt-4 mb-2 rounded-2xl border ${colorClass} p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? titleBn : titleEn}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
            {isTransparent 
              ? (bn 
                  ? `আপনার ফ্যাভিকনে ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড আছে। এটি লাইট এবং ডার্ক—উভয় ব্রাউজার ট্যাবে পরীক্ষা করুন। ${!hasGoodPadding ? 'প্যাডিং বাড়ালে আইকনটি আরও সুন্দর দেখাবে।' : ''}`
                  : `Your favicon has a transparent background. Test it on both light and dark browser tabs. ${!hasGoodPadding ? 'Increasing padding will make the icon look more premium.' : ''}`)
              : (bn
                  ? `আপনার ফ্যাভিকনে সলিড ব্যাকগ্রাউন্ড আছে। এটি ব্রাউজারের ট্যাবে একটি সুন্দর ব্লক হিসেবে দেখাবে।`
                  : `Your favicon has a solid background. It will appear as a neat block in browser tabs.`)}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-silk-rose">
            <MonitorSmartphone className="w-3.5 h-3.5" />
            {bn ? "সব ডিভাইসের জন্য রেডি" : "Ready for all devices"}
          </div>
        </div>
      </div>
    </div>
  );
}
