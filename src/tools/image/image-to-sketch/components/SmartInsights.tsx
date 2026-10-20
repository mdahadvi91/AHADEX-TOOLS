import { Zap, AlertTriangle, CheckCircle2, Printer } from "lucide-react";

export function SmartInsights({ width, height, bn }: { width: number, height: number, bn: boolean }) {
  if (!width || !height) return null;

  const minDimension = Math.min(width, height);
  const isHighRes = minDimension >= 1000;
  const isLowRes = minDimension < 600;

  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Great for Digital Use";
  let titleBn = "ডিজিটাল ব্যবহারের জন্য দুর্দান্ত";
  let descEn = `Your sketch is ${width}×${height}px. It's perfect for profile pictures, social media, and digital use.`;
  let descBn = `আপনার স্কেচটি ${width}×${height}px। এটি প্রোফাইল ছবি এবং সোশ্যাল মিডিয়ার জন্য পারফেক্ট।`;

  if (isHighRes) {
    icon = <Printer className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
    titleEn = "Print-Ready Quality";
    titleBn = "প্রিন্ট করার জন্য উপযুক্ত";
    descEn = `High resolution (${width}×${height}px). You can safely print this sketch on A4 paper or canvas.`;
    descBn = `উচ্চ রেজোলিউশন (${width}×${height}px)। আপনি এই স্কেচটি A4 পেপার বা ক্যানভাসে প্রিন্ট করতে পারেন।`;
  } else if (isLowRes) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Low Resolution Warning";
    titleBn = "কম রেজোলিউশনের সতর্কতা";
    descEn = `Your image is only ${width}×${height}px. If you print this, it might look blurry. Try uploading a larger image.`;
    descBn = `আপনার ছবিটি মাত্র ${width}×${height}px। প্রিন্ট করলে এটি ঘোলা দেখাতে পারে। বড় সাইজের ছবি আপলোড করার চেষ্টা করুন।`;
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
            {bn ? descBn : descEn}
          </p>
        </div>
      </div>
    </div>
  );
}
