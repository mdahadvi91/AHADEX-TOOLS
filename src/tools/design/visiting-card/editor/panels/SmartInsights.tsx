import { Zap, AlertTriangle, CheckCircle2, Crown } from "lucide-react";

export function SmartInsights({ dpi, format, bn }: { dpi: number, format: string, bn: boolean }) {
  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Standard Print Quality";
  let titleBn = "স্ট্যান্ডার্ড প্রিন্ট কোয়ালিটি";
  let descEn = "300 DPI is the industry standard for business cards. Perfect for most local print shops.";
  let descBn = "৩০০ DPI হলো বিজনেস কার্ডের জন্য স্ট্যান্ডার্ড। যেকোনো প্রিন্ট শপের জন্য পারফেক্ট।";

  if (dpi === 150) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Digital Preview Quality";
    titleBn = "ডিজিটাল প্রিভিউ কোয়ালিটি";
    descEn = "150 DPI is only suitable for screen previews or digital sharing. Printing this will look blurry.";
    descBn = "১৫০ DPI শুধুমাত্র স্ক্রিন প্রিভিউ বা ডিজিটাল শেয়ারিংয়ের জন্য। এটি প্রিন্ট করলে ঘোলা দেখাবে।";
  } else if (dpi === 600) {
    icon = <Crown className="w-5 h-5 text-silk-gold shrink-0 mt-0.5" />;
    colorClass = "border-silk-gold/30 bg-silk-gold/5";
    titleEn = "Premium Print Quality";
    titleBn = "প্রিমিয়াম প্রিন্ট কোয়ালিটি";
    descEn = "600 DPI is ultra-high resolution. Great for premium finishes like gold foil or embossing, but the file size will be larger.";
    descBn = "৬০০ DPI অত্যন্ত উচ্চ রেজোলিউশন। গোল্ড ফয়েল বা এমবসিং-এর মতো প্রিমিয়াম ফিনিশের জন্য দুর্দান্ত, তবে ফাইলের সাইজ বড় হবে।";
  }

  return (
    <div className={`my-3 rounded-2xl border ${colorClass} p-4 shadow-sm`}>
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
            {bn ? `ফরম্যাট: ${format.toUpperCase()} (${format === 'png' ? 'লসলেস, টেক্সট শার্প' : 'কমপ্রেসড, ছোট সাইজ'})` : `Format: ${format.toUpperCase()} (${format === 'png' ? 'Lossless, sharp text' : 'Compressed, smaller size'})`}
          </p>
        </div>
      </div>
    </div>
  );
}
