import { useEffect, useState } from "react";
import {
  RefreshCw, Copy, ClipboardCheck, Download, Eye, EyeOff, Trash2, KeyRound,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  generateBatch, copyText, downloadText,
  DEFAULT_OPTIONS, MIN_LENGTH, MAX_LENGTH, MAX_BATCH,
} from "../logic";
import type { PasswordOptions, GeneratedPassword } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [batch, setBatch] = useState(5);
  const [passwords, setPasswords] = useState<GeneratedPassword[]>([]);
  const [showAll, setShowAll] = useState(true);
  const [shownIds, setShownIds] = useState<Set<string>>(new Set());
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedOne, setCopiedOne] = useState<string | null>(null);

  useEffect(() => {
    setPasswords(generateBatch(opts, batch));
  }, [opts, batch]);

  const regenerate = () => {
    setPasswords(generateBatch(opts, batch));
  };

  const handleCopyOne = async (p: GeneratedPassword) => {
    try {
      await copyText(p.value);
      setCopiedOne(p.id);
      setTimeout(() => setCopiedOne(null), 1500);
    } catch { /* ignore */ }
  };

  const handleCopyAll = async () => {
    try {
      await copyText(passwords.map((p) => p.value).join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    downloadText(passwords.map((p) => p.value).join("\n"), "passwords.txt");
  };

  const clearAll = () => setPasswords([]);

  const toggleSet = (key: keyof PasswordOptions) => {
    setOpts((p) => ({ ...p, [key]: !p[key] }));
  };

  const toggleShow = (id: string) => {
    setShownIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const noSetsSelected =
    !opts.lowercase && !opts.uppercase && !opts.numbers && !opts.symbols;

  const sets: { key: keyof PasswordOptions; label: string; labelBn: string }[] = [
    { key: "lowercase", label: "abc", labelBn: "abc" },
    { key: "uppercase", label: "ABC", labelBn: "ABC" },
    { key: "numbers", label: "123", labelBn: "123" },
    { key: "symbols", label: "!@#", labelBn: "!@#" },
  ];

  return (
    <section className="pb-12 space-y-4">
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-medium text-light-text dark:text-dark-text">
              {bn ? "দৈর্ঘ্য" : "Length"}
            </label>
            <span className="text-[13px] font-mono font-bold text-silk-rose">{opts.length}</span>
          </div>
          <input
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            step={1}
            value={opts.length}
            onChange={(e) => setOpts((p) => ({ ...p, length: parseInt(e.target.value) }))}
            className="w-full accent-silk-rose"
          />
          <div className="flex justify-between text-[9px] text-lightTextSecondary dark:text-dark-textSecondary mt-1">
            <span>{MIN_LENGTH}</span>
            <span>{MAX_LENGTH}</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
            {bn ? "Character set" : "Character sets"}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {sets.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSet(s.key)}
                className={cn(
                  "h-11 rounded-lg border text-[13px] font-mono font-semibold transition-all",
                  opts[s.key]
                    ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                    : "bg-silk-rose/5 border-silk-rose/15 text-lightTextSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                )}
              >
                {bn ? s.labelBn : s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? `ব্যাচ (1-${MAX_BATCH})` : `Batch (1-${MAX_BATCH})`}
            </p>
            <input
              type="number"
              min={1}
              max={MAX_BATCH}
              value={batch}
              onChange={(e) => setBatch(Math.max(1, Math.min(MAX_BATCH, parseInt(e.target.value) || 1)))}
              className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 focus:border-silk-rose/50 text-light-text dark:text-dark-text outline-none"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "Ambiguity" : "Ambiguity"}
            </p>
            <button
              type="button"
              onClick={() => setOpts((p) => ({ ...p, excludeAmbiguous: !p.excludeAmbiguous }))}
              className={cn("h-10 w-full rounded-lg border text-[11px] font-medium transition-all", opts.excludeAmbiguous ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}
            >
              {opts.excludeAmbiguous ? (bn ? "বাদ দেওয়া" : "Excluded") : (bn ? "রাখা" : "Included")}
            </button>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "Require each" : "Require each"}
            </p>
            <button
              type="button"
              onClick={() => setOpts((p) => ({ ...p, requireEach: !p.requireEach }))}
              className={cn("h-10 w-full rounded-lg border text-[11px] font-medium transition-all", opts.requireEach ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}
            >
              {opts.requireEach ? (bn ? "চালু" : "Enabled") : (bn ? "বন্ধ" : "Disabled")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={regenerate}
            disabled={noSetsSelected}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[11px] sm:text-xs font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {bn ? "রিজেনারেট" : "Regenerate"}
          </button>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all"
          >
            {showAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showAll ? (bn ? "লুকান" : "Hide") : (bn ? "দেখান" : "Show")}
          </button>
          {passwords.length > 0 && (
            <>
              <button type="button" onClick={() => void handleCopyAll()} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                {copiedAll ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAll ? (bn ? "কপি" : "Copied") : (bn ? "সব কপি" : "Copy all")}
              </button>
              <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> .txt
              </button>
              <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-[11px] font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> {bn ? "মুছুন" : "Clear"}
              </button>
            </>
          )}
        </div>

        {noSetsSelected && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">
            {bn ? "অন্তত একটি character set নির্বাচন করুন।" : "Select at least one character set."}
          </div>
        )}
      </div>

      {passwords.length > 0 && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-silk-rose/15 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
              {passwords.length} {passwords.length === 1 ? "password" : "passwords"}
            </span>
            <span className="text-[10px] font-mono text-lightTextSecondary dark:text-dark-textSecondary">
              {opts.length} chars
            </span>
          </div>
          <ul className="divide-y divide-silk-rose/10 max-h-[560px] overflow-y-auto">
            {passwords.map((p) => {
              const visible = showAll || shownIds.has(p.id);
              const isCopied = copiedOne === p.id;
              return (
                <li key={p.id} className="p-3 sm:p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <code className={cn("flex-1 min-w-0 text-[12px] sm:text-[13px] font-mono text-light-text dark:text-dark-text break-all", !visible && "blur-[5px] select-none")}>
                      {p.value}
                    </code>
                    <button
                      type="button"
                      onClick={() => toggleShow(p.id)}
                      className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/10 transition-colors"
                      aria-label="Toggle visibility"
                    >
                      {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleCopyOne(p)}
                      className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/10 transition-colors"
                      aria-label="Copy"
                    >
                      {isCopied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex-1 h-1.5 rounded-full bg-silk-rose/10 overflow-hidden min-w-[80px]">
                      <div className="h-full rounded-full transition-all" style={{ width: `${((p.strength.score + 1) / 5) * 100}%`, backgroundColor: p.strength.color }} />
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: p.strength.color }}>
                      {bn ? p.strength.labelBn : p.strength.label}
                    </span>
                    <span className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary font-mono">
                      {p.strength.entropy} bits
                    </span>
                    <span className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">
                      · {bn ? p.strength.crackTimeBn : p.strength.crackTime}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {passwords.length === 0 && !noSetsSelected && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <KeyRound className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "রিজেনারেট চেপে শুরু করুন" : "Click Regenerate to start"}
        </div>
      )}
    </section>
  );
}
