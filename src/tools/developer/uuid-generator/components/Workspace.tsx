import { useState } from "react";
import { Copy, ClipboardCheck, Download, RefreshCw, Trash2, Hash } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  generateBatch, formatUuid, copyAll, copyText, downloadTxt,
  MIN_COUNT, MAX_COUNT, DEFAULT_COUNT,
} from "../logic";
import type { UuidVersion, UuidItem, GeneratorOptions } from "../types";

const VERSIONS: { value: UuidVersion; label: string }[] = [
  { value: "v4", label: "v4 · Random" },
  { value: "v7", label: "v7 · Time-ordered" },
];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [items, setItems] = useState<UuidItem[]>(() =>
    generateBatch({ version: "v4", count: DEFAULT_COUNT, uppercase: false, hyphens: true })
  );
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<string | null>(null);

  const opts: GeneratorOptions = { version, count, uppercase, hyphens };

  const regenerate = (o: Partial<GeneratorOptions> = {}) => {
    const next: GeneratorOptions = { ...opts, ...o };
    setVersion(next.version);
    setCount(next.count);
    setUppercase(next.uppercase);
    setHyphens(next.hyphens);
    setItems(generateBatch(next));
  };

  const handleCopyOne = async (item: UuidItem) => {
    try {
      await copyText(formatUuid(item.value, { uppercase, hyphens }));
      setCopiedOne(item.id);
      setTimeout(() => setCopiedOne(null), 1500);
    } catch { /* ignore */ }
  };

  const handleCopyAll = async () => {
    try {
      await copyText(copyAll(items, { uppercase, hyphens }));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    downloadTxt(copyAll(items, { uppercase, hyphens }), "uuids.txt");
  };

  const clearAll = () => setItems([]);

  return (
    <section className="pb-12 space-y-4">
      {/* Controls */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "ভার্সন" : "Version"}</p>
          <div className="grid grid-cols-2 gap-2">
            {VERSIONS.map((v) => (
              <button key={v.value} type="button" onClick={() => regenerate({ version: v.value })} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", version === v.value ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? `সংখ্যা (${MIN_COUNT}-${MAX_COUNT})` : `Count (${MIN_COUNT}-${MAX_COUNT})`}</p>
            <input
              type="number"
              min={MIN_COUNT}
              max={MAX_COUNT}
              value={count}
              onChange={(e) => setCount(Math.max(MIN_COUNT, Math.min(MAX_COUNT, parseInt(e.target.value) || MIN_COUNT)))}
              onBlur={() => regenerate()}
              className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "কেস" : "Case"}</p>
            <button type="button" onClick={() => regenerate({ uppercase: !uppercase })} className={cn("h-10 w-full rounded-lg border text-[11px] font-medium transition-all", uppercase ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
              {uppercase ? "UPPERCASE" : "lowercase"}
            </button>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "Hyphens" : "Hyphens"}</p>
            <button type="button" onClick={() => regenerate({ hyphens: !hyphens })} className={cn("h-10 w-full rounded-lg border text-[11px] font-medium transition-all", hyphens ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
              {hyphens ? (bn ? "সহ" : "with-hyphens") : (bn ? "ছাড়া" : "no-hyphens")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={() => regenerate()} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            {bn ? "রিজেনারেট" : "Regenerate"}
          </button>
          {items.length > 0 && (
            <>
              <button type="button" onClick={() => void handleCopyAll()} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                {copiedAll ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAll ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "সব কপি" : "Copy all")}
              </button>
              <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> .txt
              </button>
              <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[11px] font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                {bn ? "মুছুন" : "Clear"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* List */}
      {items.length > 0 && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-silk-rose/15 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
              {items.length} UUID{items.length === 1 ? "" : "s"}
            </span>
            <span className="text-[10px] font-mono text-lightTextSecondary dark:text-dark-textSecondary">
              {version.toUpperCase()}
            </span>
          </div>
          <ul className="divide-y divide-silk-rose/10 max-h-[480px] overflow-y-auto">
            {items.map((item, i) => {
              const display = formatUuid(item.value, { uppercase, hyphens });
              const isCopied = copiedOne === item.id;
              return (
                <li key={item.id} className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-silk-rose/5 transition-colors group">
                  <span className="w-7 shrink-0 text-[10px] font-mono text-lightTextSecondary dark:text-dark-textSecondary">{i + 1}</span>
                  <code className="flex-1 min-w-0 text-[11px] sm:text-[12px] font-mono text-light-text dark:text-dark-text truncate">{display}</code>
                  <button type="button" onClick={() => void handleCopyOne(item)} className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/10 transition-colors opacity-60 group-hover:opacity-100" aria-label="Copy">
                    {isCopied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {items.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <Hash className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "রিজেনারেট চেপে শুরু করুন" : "Click Regenerate to start"}
        </div>
      )}
    </section>
  );
}
