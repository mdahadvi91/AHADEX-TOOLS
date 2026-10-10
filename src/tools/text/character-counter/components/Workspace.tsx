import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, ClipboardCheck, Download, Type } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { TextPanel, WorkspacePanel } from "@components/workspace";
import {
  countStats,
  formatNumber,
  MAX_CHARS,
  PLATFORMS,
  copyText,
  downloadText,
} from "../logic";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => countStats(text), [text]);
  const overLimit = text.length > MAX_CHARS;

  const handleCopy = async () => {
    if (!text) return;
    try {
      await copyText(text);
      setCopied(true);
      
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    if (!text) return;
    downloadText(text, "text.txt");
  };

  const clearAll = () => {
    setText("");
    setCopied(false);
  };

  const inputBytes = text ? `${formatNumber(text.length)} chars` : undefined;

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Platform limits grid */}
      <WorkspacePanel className="p-3.5 sm:p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-silk-rose/15 border border-silk-rose/25 flex items-center justify-center">
            <Type className="w-3.5 h-3.5 text-silk-rose" />
          </span>
          <span className="text-[12px] sm:text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? "প্ল্যাটফর্ম সীমা" : "Platform limits"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {PLATFORMS.map((p, i) => {
            const remaining = stats.remaining[p.id] ?? p.limit;
            const isOver = remaining < 0;
            const isClose = !isOver && remaining < p.limit * 0.1;
            const empty = text.length === 0;

            const statusClass = empty
              ? "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15"
              : isOver
                ? "bg-red-500/10 border-red-500/40 shadow-[0_8px_20px_-10px_rgba(239,68,68,0.35)]"
                : isClose
                  ? "bg-amber-500/10 border-amber-500/40"
                  : "bg-emerald-500/8 border-emerald-500/30";

            const valueColor = empty
              ? "text-light-text dark:text-dark-text"
              : isOver
                ? "text-red-500"
                : isClose
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-emerald-600 dark:text-emerald-400";

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                className={cn(
                  "relative rounded-xl border p-2.5 sm:p-3 overflow-hidden transition-all duration-300",
                  statusClass
                )}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-base leading-none">{p.emoji}</span>
                  <span className="text-[10px] font-bold truncate uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary">
                    {bn ? p.nameBn : p.name}
                  </span>
                </div>
                <p
                  className={cn(
                    "font-serif font-black text-lg sm:text-xl leading-none font-mono",
                    valueColor
                  )}
                >
                  {empty
                    ? formatNumber(p.limit)
                    : isOver
                      ? `+${formatNumber(-remaining)}`
                      : formatNumber(remaining)}
                </p>
                <p className="text-[9px] uppercase tracking-wider mt-1 font-bold opacity-70 text-light-textSecondary dark:text-dark-textSecondary">
                  {empty
                    ? bn
                      ? p.noteBn
                      : p.note
                    : isOver
                      ? bn
                        ? " বেশি"
                        : "over"
                      : bn
                        ? "বাকি"
                        : "left"}
                </p>
              </motion.div>
            );
          })}
        </div>
      </WorkspacePanel>

      {/* Editor */}
      <TextPanel
        label={bn ? "আপনার টেক্সট" : "Your text"}
        value={text}
        onChange={setText}
        placeholder={
          bn
            ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..."
            : "Paste or type your text here..."
        }
        minHeight="min-h-[300px] sm:min-h-[380px]"
        mono={false}
        onClear={text.length > 0 ? clearAll : undefined}
        meta={inputBytes}
      >
        {/* Extra action buttons row */}
        {text.length > 0 && (
          <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
            <button
              type="button"
              onClick={() => void handleCopy()}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-bold transition-all",
                copied
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                  : "bg-silk-rose/10 border border-silk-rose/25 text-silk-rose hover:bg-silk-rose/20 hover:border-silk-rose/45"
              )}
            >
              {copied ? (
                <ClipboardCheck className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? (bn ? "কপি হয়েছে" : "Copied") : bn ? "কপি" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-bold bg-silk-rose/10 border border-silk-rose/25 text-silk-rose hover:bg-silk-rose/20 hover:border-silk-rose/45 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              .txt
            </button>
          </div>
        )}

        {overLimit && (
          <div className="mx-4 mb-4 px-3.5 py-2.5 rounded-lg text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/30">
            {bn
              ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} ক্যারেক্টার।`
              : `Max ${formatNumber(MAX_CHARS)} characters.`}
          </div>
        )}
      </TextPanel>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
        <SmallStat
          label={bn ? "ক্যারেক্টার" : "Characters"}
          value={formatNumber(stats.characters)}
          accent
        />
        <SmallStat
          label={bn ? "স্পেস ছাড়া" : "No spaces"}
          value={formatNumber(stats.charactersNoSpaces)}
        />
        <SmallStat
          label={bn ? "শব্দ" : "Words"}
          value={formatNumber(stats.words)}
        />
        <SmallStat
          label={bn ? "লাইন" : "Lines"}
          value={formatNumber(stats.lines)}
        />
        <SmallStat
          label={bn ? "অনুচ্ছেদ" : "Paragraphs"}
          value={formatNumber(stats.paragraphs)}
        />
      </div>
    </section>
  );
}

function SmallStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-2.5 sm:p-3 overflow-hidden",
        accent
          ? "bg-gradient-to-br from-silk-rose/15 via-silk-rose/8 to-silk-gold/10 border-silk-rose/35 shadow-[0_8px_20px_-10px_rgba(139,58,79,0.35)]"
          : "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border-silk-rose/20"
      )}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-silk-rose/20 blur-2xl pointer-events-none"
        />
      )}
      <p
        className={cn(
          "relative font-serif font-black text-lg sm:text-xl leading-none",
          accent ? "text-silk-rose" : "text-light-text dark:text-dark-text"
        )}
      >
        {value}
      </p>
      <p className="relative text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold text-light-textSecondary dark:text-dark-textSecondary mt-1.5">
        {label}
      </p>
    </div>
  );
}
