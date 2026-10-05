import { useMemo, useState } from "react";
import { Copy, ClipboardCheck, Download, Trash2, Type } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { countStats, formatNumber, MAX_CHARS, PLATFORMS, copyText, downloadText } from "../logic";

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
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    if (!text) return;
    downloadText(text, "text.txt");
  };

  const clearAll = () => {
    setText("");
    setCopied(false);
  };

  return (
    <section className="pb-12 space-y-4">
      {/* Platform limits grid */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
          {bn ? "প্ল্যাটফর্ম সীমা" : "Platform limits"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PLATFORMS.map((p) => {
            const remaining = stats.remaining[p.id] ?? p.limit;
            const isOver = remaining < 0;
            const isClose = !isOver && remaining < p.limit * 0.1;
            const color = isOver
              ? "text-red-500 border-red-500/40 bg-red-500/10"
              : isClose
                ? "text-amber-600 dark:text-amber-400 border-amber-500/40 bg-amber-500/10"
                : "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5";
            return (
              <div
                key={p.id}
                className={cn(
                  "rounded-xl border p-2.5 transition-all",
                  text.length === 0
                    ? "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary"
                    : color
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">{p.emoji}</span>
                  <span className="text-[10px] font-semibold truncate">
                    {bn ? p.nameBn : p.name}
                  </span>
                </div>
                <p className="font-display font-black text-[15px] leading-none">
                  {text.length === 0 ? p.limit : isOver ? `+${formatNumber(-remaining)}` : formatNumber(remaining)}
                </p>
                <p className="text-[9px] uppercase tracking-wider mt-0.5 opacity-70">
                  {text.length === 0 ? (bn ? p.noteBn : p.note) : isOver ? (bn ? "over" : "over") : (bn ? "left" : "left")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-light-text dark:text-dark-text">
            <Type className="w-3.5 h-3.5 text-silk-rose" />
            {bn ? "আপনার টেক্সট" : "Your text"}
          </div>
          <div className="flex items-center gap-2">
            {text.length > 0 && (
              <>
                <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/10 px-2 py-1 rounded-md transition-colors">
                  {copied ? <ClipboardCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? (bn ? "কপি হয়েছে" : "Copied") : (bn ? "কপি" : "Copy")}
                </button>
                <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/10 px-2 py-1 rounded-md transition-colors">
                  <Download className="w-3 h-3" />
                  .txt
                </button>
                <button type="button" onClick={clearAll} className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors">
                  <Trash2 className="w-3 h-3" />
                  {bn ? "মুছুন" : "Clear"}
                </button>
              </>
            )}
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={bn ? "এখানে আপনার টেক্সট পেস্ট বা টাইপ করুন..." : "Paste or type your text here..."}
          spellCheck={false}
          className="w-full min-h-[300px] p-4 resize-y bg-transparent text-[14px] leading-relaxed text-light-text dark:text-dark-text placeholder:text-light-textSecondary/50 dark:placeholder:text-dark-textSecondary/40 outline-none"
        />
        {overLimit && (
          <div className="px-4 py-2 text-[11px] text-red-500 border-t border-red-500/20 bg-red-500/5">
            {bn ? `সর্বোচ্চ ${formatNumber(MAX_CHARS)} ক্যারেক্টার।` : `Max ${formatNumber(MAX_CHARS)} characters.`}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <Stat label={bn ? "ক্যারেক্টার" : "Characters"} value={formatNumber(stats.characters)} highlight />
        <Stat label={bn ? "স্পেস ছাড়া" : "No spaces"} value={formatNumber(stats.charactersNoSpaces)} />
        <Stat label={bn ? "শব্দ" : "Words"} value={formatNumber(stats.words)} />
        <Stat label={bn ? "লাইন" : "Lines"} value={formatNumber(stats.lines)} />
        <Stat label={bn ? "অনুচ্ছেদ" : "Paragraphs"} value={formatNumber(stats.paragraphs)} />
      </div>
    </section>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-2.5", highlight ? "bg-gradient-to-br from-silk-rose/15 to-silk-gold/10 border-silk-rose/30" : "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border-silk-rose/20")}>
      <p className={cn("font-display font-black text-lg sm:text-xl leading-none", highlight ? "text-silk-rose" : "text-light-text dark:text-dark-text")}>{value}</p>
      <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mt-1">{label}</p>
    </div>
  );
}
