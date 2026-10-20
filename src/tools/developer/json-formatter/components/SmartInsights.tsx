import { Zap, FileJson, Minimize2, Maximize2 } from "lucide-react";

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export function SmartInsights({ input, mode }: { input: string, mode: string }) {
  if (!input.trim()) return null;

  let parsed;
  try {
    parsed = JSON.parse(input);
  } catch (e) {
    return null; // Don't render if JSON is invalid
  }

  const originalBytes = new Blob([input]).size;
  const minifiedBytes = new Blob([JSON.stringify(parsed)]).size;
  const formattedBytes = new Blob([JSON.stringify(parsed, null, 2)]).size;

  const isMinified = mode === "minified";
  const savedBytes = Math.abs(formattedBytes - minifiedBytes);
  const savedPercent = formattedBytes > 0 ? Math.round((savedBytes / formattedBytes) * 100) : 0;

  return (
    <div className="mt-4 mb-2 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/60 dark:bg-dark-surface/60 rounded-xl p-2 border border-silk-rose/10 flex flex-col items-center justify-center text-center">
          <FileJson className="w-4 h-4 text-silk-rose mb-1" />
          <p className="text-[9px] uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary">Input</p>
          <p className="text-xs font-black text-light-text dark:text-dark-text mt-0.5">{formatSize(originalBytes)}</p>
        </div>

        <div className={`rounded-xl p-2 border flex flex-col items-center justify-center text-center transition-colors ${!isMinified ? 'bg-silk-rose/10 border-silk-rose/30' : 'bg-white/60 dark:bg-dark-surface/60 border-silk-rose/10'}`}>
          <Maximize2 className="w-4 h-4 text-silk-rose mb-1" />
          <p className="text-[9px] uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary">Formatted</p>
          <p className="text-xs font-black text-light-text dark:text-dark-text mt-0.5">{formatSize(formattedBytes)}</p>
        </div>

        <div className={`rounded-xl p-2 border flex flex-col items-center justify-center text-center transition-colors ${isMinified ? 'bg-silk-rose/10 border-silk-rose/30' : 'bg-white/60 dark:bg-dark-surface/60 border-silk-rose/10'}`}>
          <Minimize2 className="w-4 h-4 text-silk-rose mb-1" />
          <p className="text-[9px] uppercase tracking-wider font-bold text-light-textSecondary dark:text-dark-textSecondary">Minified</p>
          <p className="text-xs font-black text-light-text dark:text-dark-text mt-0.5">{formatSize(minifiedBytes)}</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
        {isMinified 
          ? `Minifying saves ${savedPercent}% (${formatSize(savedBytes)}) compared to formatted JSON.`
          : `Minifying this JSON can save ${savedPercent}% (${formatSize(savedBytes)}) of space for production.`}
      </p>
    </div>
  );
}
