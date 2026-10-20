import { Zap, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

export function SmartInsights({ words, readingTimeMin, bn }: { words: number, readingTimeMin: number, bn: boolean }) {
  if (words === 0) return null;

  let icon = <FileText className="w-5 h-5 text-silk-rose" />;
  let colorClass = "border-silk-rose/30 bg-silk-rose/5";
  let titleEn = "Good Content Length";
  let titleBn = "ভালো কন্টেন্ট দৈর্ঘ্য";
  let descEn = `Your text has ${words} words. Perfect for standard blog posts or news articles.`;
  let descBn = `আপনার টেক্সটে ${words}টি শব্দ আছে। সাধারণ ব্লগ পোস্ট বা নিউজ আর্টিকেলের জন্য পারফেক্ট।`;

  if (words < 300) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Too Short for SEO";
    titleBn = "SEO-এর জন্য খুব ছোট";
    descEn = `Only ${words} words. Search engines prefer at least 300 words for ranking. Try adding more details.`;
    descBn = `মাত্র ${words}টি শব্দ। গুগলে র‍্যাংক করার জন্য কমপক্ষে ৩০০ শব্দ থাকা ভালো। আরও বিস্তারিত যোগ করুন।`;
  } else if (words >= 800) {
    icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    colorClass = "border-emerald-500/30 bg-emerald-500/5";
    titleEn = "In-Depth Masterpiece";
    titleBn = "বিস্তারিত এবং অসাধারণ";
    descEn = `${words} words! Excellent for comprehensive tutorials, guides, and high SEO ranking.`;
    descBn = `${words}টি শব্দ! টিউটোরিয়াল, গাইড এবং গুগলে উচ্চ র‍্যাংকিংয়ের জন্য অসাধারণ।`;
  }

  return (
    <div className={`mb-3 rounded-2xl border ${colorClass} p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>
      
      <div className="flex items-start gap-3 mt-3">
        {icon}
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? titleBn : titleEn}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
            {bn ? descBn : descEn}
          </p>
          <p className="text-[11px] font-bold text-silk-rose mt-2">
            {bn ? `আনুমানিক পড়ার সময়: ${readingTimeMin} মিনিট` : `Estimated reading time: ${readingTimeMin} min`}
          </p>
        </div>
      </div>
    </div>
  );
}
