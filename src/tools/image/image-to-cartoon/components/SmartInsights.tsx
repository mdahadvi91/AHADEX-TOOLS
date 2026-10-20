import { Zap, CheckCircle2, AlertTriangle, UserCircle2 } from "lucide-react";

export function SmartInsights({ width, height, bn }: { width: number, height: number, bn: boolean }) {
  if (!width || !height) return null;

  const minDimension = Math.min(width, height);
  const isAvatarReady = minDimension >= 500;
  const isLowRes = minDimension < 300;

  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Perfect for Social Media";
  let titleBn = "সোশ্যাল মিডিয়ার জন্য পারফেক্ট";
  let descEn = `Your cartoon is ${width}×${height}px. It's a great fit for profile pictures and sharing online.`;
  let descBn = `আপনার কার্টুনটি ${width}×${height}px। প্রোফাইল ছবি এবং অনলাইনে শেয়ার করার জন্য এটি দুর্দান্ত।`;

  if (isLowRes) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Low Resolution";
    titleBn = "কম রেজোলিউশন";
    descEn = `Only ${width}×${height}px. It might look a bit blurry as a profile picture. Try uploading a larger image.`;
    descBn = `মাত্র ${width}×${height}px। প্রোফাইল ছবি হিসেবে এটি ঘোলা দেখাতে পারে। বড় ছবি আপলোড করার চেষ্টা করুন।`;
  } else if (isAvatarReady) {
    icon = <UserCircle2 className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />;
    colorClass = "border-silk-rose/30 bg-silk-rose/5";
    titleEn = "Avatar Ready!";
    titleBn = "অ্যাভাটার হিসেবে প্রস্তুত!";
    descEn = `High-quality ${width}×${height}px output. This will look incredibly sharp as a WhatsApp, Discord, or Instagram DP.`;
    descBn = `উচ্চ মানের ${width}×${height}px আউটপুট। হোয়াটসঅ্যাপ, ডিসকর্ড বা ইনস্টাগ্রামের ডিপি হিসেবে এটি দুর্দান্ত দেখাবে।`;
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
