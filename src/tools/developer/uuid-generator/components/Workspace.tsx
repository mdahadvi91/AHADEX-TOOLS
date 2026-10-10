import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  ClipboardCheck,
  Download,
  RefreshCw,
  Trash2,
  Hash,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  WorkspacePanel,
  ToolButton,
  ResultStat,
} from "@components/workspace";
import {
  generateBatch,
  formatUuid,
  copyAll,
  copyText,
  downloadTxt,
  MIN_COUNT,
  MAX_COUNT,
  DEFAULT_COUNT,
} from "../logic";
import type {
  UuidVersion,
  UuidItem,
  GeneratorOptions,
} from "../types";

const VERSIONS: { value: UuidVersion; label: string; sub: string }[] = [
  { value: "v4", label: "v4", sub: "Random" },
  { value: "v7", label: "v7", sub: "Time-ordered" },
];

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [items, setItems] = useState<UuidItem[]>(() =>
    generateBatch({
      version: "v4",
      count: DEFAULT_COUNT,
      uppercase: false,
      hyphens: true,
    })
  );
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<string | null>(null);

  const opts: GeneratorOptions = {
    version,
    count,
    uppercase,
    hyphens,
  };

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
    } catch {
      /* ignore */
    }
  };

  const handleCopyAll = async () => {
    try {
      await copyText(copyAll(items, { uppercase, hyphens }));
      setCopiedAll(true);
      
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    downloadTxt(copyAll(items, { uppercase, hyphens }), "uuids.txt");
  };

  const clearAll = () => setItems([]);

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Controls */}
      <WorkspacePanel className="p-4 space-y-4">
        {/* Version */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
            {bn ? "ভার্সন" : "Version"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {VERSIONS.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => regenerate({ version: v.value })}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 h-14 rounded-xl border transition-all",
                  version === v.value
                    ? "bg-silk-rose/15 border-silk-rose/50 shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
                    : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                )}
              >
                <span
                  className={cn(
                    "text-[14px] font-bold font-mono",
                    version === v.value
                      ? "text-silk-wine dark:text-silk-rose-soft"
                      : "text-light-text dark:text-dark-text"
                  )}
                >
                  {v.label}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                  {v.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Count + Case + Hyphens */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? "সংখ্যা" : "Count"} ({MIN_COUNT}-{MAX_COUNT})
            </p>
            <input
              type="number"
              min={MIN_COUNT}
              max={MAX_COUNT}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.max(
                    MIN_COUNT,
                    Math.min(
                      MAX_COUNT,
                      parseInt(e.target.value) || MIN_COUNT
                    )
                  )
                )
              }
              onBlur={() => regenerate()}
              className="w-full h-10 px-3 rounded-xl text-[13px] font-mono font-bold bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none transition-all"
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? "কেস" : "Case"}
            </p>
            <button
              type="button"
              onClick={() =>
                regenerate({ uppercase: !uppercase })
              }
              className={cn(
                "h-10 w-full rounded-xl border text-[11px] font-bold transition-all",
                uppercase
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {uppercase ? "UPPERCASE" : "lowercase"}
            </button>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2.5">
              {bn ? "হাইফেন" : "Hyphens"}
            </p>
            <button
              type="button"
              onClick={() => regenerate({ hyphens: !hyphens })}
              className={cn(
                "h-10 w-full rounded-xl border text-[11px] font-bold transition-all",
                hyphens
                  ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                  : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
              )}
            >
              {hyphens
                ? bn
                  ? "সহ"
                  : "with-hyphens"
                : bn
                  ? "ছাড়া"
                  : "no-hyphens"}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-silk-rose/10">
          <ToolButton
            variant="primary"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => regenerate()}
          >
            {bn ? "রিজেনারেট" : "Regenerate"}
          </ToolButton>

          {items.length > 0 && (
            <>
              <ToolButton
                variant="secondary"
                icon={
                  copiedAll ? (
                    <ClipboardCheck className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )
                }
                onClick={() => void handleCopyAll()}
              >
                {copiedAll
                  ? bn
                    ? "কপি হয়েছে"
                    : "Copied"
                  : bn
                    ? "সব কপি"
                    : "Copy all"}
              </ToolButton>

              <ToolButton
                variant="primary"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={handleDownload}
              >
                .txt
              </ToolButton>

              <ToolButton
                variant="danger"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={clearAll}
                className="ml-auto"
              >
                {bn ? "মুছুন" : "Clear"}
              </ToolButton>
            </>
          )}
        </div>
      </WorkspacePanel>

      {/* List */}
      {items.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            <ResultStat
              label={bn ? "সংখ্যা" : "Count"}
              value={String(items.length)}
              accent="rose"
            />
            <ResultStat
              label={bn ? "ভার্সন" : "Version"}
              value={version.toUpperCase()}
              accent="rose"
            />
            <ResultStat
              label={bn ? "ফরম্যাট" : "Format"}
              value={hyphens ? "8-4-4-4-12" : "compact"}
              accent="rose"
            />
          </div>

          <WorkspacePanel className="overflow-hidden" animate={false}>
            <div className="px-4 py-2.5 border-b border-silk-rose/15 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-light-text dark:text-dark-text">
                {items.length} UUID{items.length === 1 ? "" : "s"}
              </span>
              <span className="text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2 py-0.5 rounded-md">
                {version.toUpperCase()}
              </span>
            </div>

            <ul className="divide-y divide-silk-rose/10 max-h-[480px] overflow-y-auto">
              <AnimatePresence>
                {items.map((item, i) => {
                  const display = formatUuid(item.value, {
                    uppercase,
                    hyphens,
                  });
                  const isCopied = copiedOne === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.3) }}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2.5 hover:bg-silk-rose/5 transition-colors group"
                    >
                      <span className="w-7 shrink-0 text-[10px] font-mono text-light-textSecondary dark:text-dark-textSecondary">
                        {i + 1}
                      </span>
                      <code className="flex-1 min-w-0 text-[11px] sm:text-[12px] font-mono font-bold text-light-text dark:text-dark-text truncate">
                        {display}
                      </code>
                      <button
                        type="button"
                        onClick={() => void handleCopyOne(item)}
                        aria-label="Copy"
                        className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/15 transition-colors opacity-60 group-hover:opacity-100"
                      >
                        {isCopied ? (
                          <ClipboardCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </WorkspacePanel>
        </>
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
