import { Zap, AlertTriangle, CheckCircle2, Printer } from "lucide-react";

export function SmartInsights({ width, height, scale, background, bn }: { width: number, height: number, scale: number, background: string, bn: boolean }) {
  if (!width || !height) return null;

  const targetW = Math.min(4096, Math.round(width * scale));
  const targetH = Math.min(4096, Math.round(height * scale));
  const isHighRes = targetW >= 1920 || targetH >= 1920;
  const isTransparent = background === "transparent";

  return (
    <div className={`mt-4 mb-2 rounded-2xl border ${isTransparent ? 'border-amber-500/30 bg-amber-500/5' : 'border-emerald-500/30 bg-emerald-500/5'} p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-start gap-3">
          {isTransparent ? (
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-bold text-light-text dark:text-dark-text">
              {isTransparent ? "Transparent Background" : "Solid Background Selected"}
            </p>
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
              {isTransparent
                ? (bn 
                    ? `আপনার আউটপুট ${targetW}×${targetH}px হবে। ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড ওয়েবের জন্য ভালো, তবে প্রিন্ট করার আগে সাদা ব্যাকগ্রাউন্ড সিলেক্ট করুন।`
                    : `Your output will be ${targetW}×${targetH}px. Transparent is great for web, but select a white background before printing to avoid dark paper areas.`)
                : (bn
                    ? `আপনার আউটপুট ${targetW}×${targetH}px হবে। সলিড ব্যাকগ্রাউন্ড প্রিন্টের জন্য পারফেক্ট।`
                    : `Your output will be ${targetW}×${targetH}px. Solid background is perfect for printing.`)}
            </p>
          </div>
        </div>

        {isHighRes && !isTransparent && (
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Printer className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {bn ? "প্রিন্ট রেডি" : "Print Ready"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
