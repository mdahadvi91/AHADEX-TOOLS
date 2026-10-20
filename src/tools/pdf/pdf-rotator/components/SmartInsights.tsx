import { Zap, ShieldCheck, HardDrive } from "lucide-react";

export function SmartInsights({ originalSize, outputSize, bn }: { originalSize: number, outputSize?: number, bn: boolean }) {
  if (!originalSize) return null;

  return (
    <div className="mt-4 mb-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? "১০০% লসলেস রোটেশন" : "100% Lossless Rotation"}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
            {bn 
              ? "পিডিএফ ঘোরালে এর ভেতরের টেক্সট বা ছবির কোয়ালিটি একদমই নষ্ট হয় না।" 
              : "Rotating a PDF does not affect the quality of text or images inside it."}
          </p>
        </div>
      </div>

      {outputSize && (
        <div className="mt-3 flex items-center gap-2 bg-white/50 dark:bg-dark-surface/50 px-3 py-2 rounded-lg border border-silk-rose/10">
          <HardDrive className="w-4 h-4 text-silk-rose shrink-0" />
          <p className="text-xs font-medium text-light-text dark:text-dark-text">
            {bn ? "ফাইল সাইজ: " : "File Size: "} 
            <span className="font-bold">{(originalSize / 1024 / 1024).toFixed(2)} MB</span>
            {outputSize !== originalSize && (
              <span className="text-light-textSecondary dark:text-dark-textSecondary ml-1">
                ➔ <span className="font-bold">{(outputSize / 1024 / 1024).toFixed(2)} MB</span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
