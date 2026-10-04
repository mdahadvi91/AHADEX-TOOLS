import { useEffect, useMemo, useRef, useState } from "react";
import {
  Copy, ClipboardCheck, Download, Trash2, AlertCircle,
  Upload, X, ImageIcon, ArrowLeftRight,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  encodeText, decodeText, fileToBase64, base64ToDataUrl, isValidBase64,
  downloadText, downloadDataUrl, copyText, formatBytes, formatNumber,
  MAX_FILE_SIZE, SAMPLES,
} from "../logic";
import type { Mode, InputKind, FileInfo } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [mode, setMode] = useState<Mode>("encode");
  const [kind, setKind] = useState<InputKind>("text");
  const [textInput, setTextInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const textResult = useMemo(() => {
    if (kind !== "text") return { output: "", byteDelta: 0 };
    return mode === "encode" ? encodeText(textInput, urlSafe) : decodeText(textInput, urlSafe);
  }, [kind, mode, textInput, urlSafe]);

  useEffect(() => {
    if (textResult.error) setError(textResult.error);
    else setError(null);
  }, [textResult.error]);

  const handleFile = async (file: File) => {
    setError(null);
    if (file.size > MAX_FILE_SIZE) {
      setError(bn ? `সর্বোচ্চ ${formatBytes(MAX_FILE_SIZE)}।` : `Max ${formatBytes(MAX_FILE_SIZE)}.`);
      return;
    }
    try {
      const info = await fileToBase64(file);
      setFileInfo(info);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file");
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) void handleFile(f);
  };

  const handleSwap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    if (kind === "text" && textResult.output) setTextInput(textResult.output);
  };

  const handleCopy = async () => {
    const out = kind === "text" ? textResult.output : (fileInfo?.base64 ?? "");
    if (!out) return;
    try {
      await copyText(out);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    if (kind === "text") {
      if (!textResult.output) return;
      downloadText(textResult.output, `base64-${mode}.txt`);
    } else {
      if (!fileInfo) return;
      downloadText(fileInfo.base64, `${fileInfo.name}.base64.txt`);
    }
  };

  const clearAll = () => {
    setTextInput("");
    setFileInfo(null);
    setError(null);
    setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const loadSample = () => setTextInput(SAMPLES[language].text);

  const currentOutput = kind === "text" ? textResult.output : (fileInfo?.base64 ?? "");
  const delta = kind === "text" ? textResult.byteDelta : 0;
  const deltaLabel =
    delta === 0
      ? (bn ? "পরিবর্তন নেই" : "no change")
      : delta > 0
        ? `+${formatNumber(delta)} B`
        : `${formatNumber(delta)} B`;

  const decodedImage = useMemo(() => {
    if (kind !== "text" || mode !== "decode") return null;
    const clean = textInput.trim().replace(/\s+/g, "");
    if (!clean || !isValidBase64(clean)) return null;
    const mime = clean.startsWith("/9j/") ? "image/jpeg"
      : clean.startsWith("iVBOR") ? "image/png"
      : clean.startsWith("R0lGO") ? "image/gif"
      : clean.startsWith("UklGR") ? "image/webp"
      : null;
    if (!mime) return null;
    return { url: base64ToDataUrl(clean, mime), mime };
  }, [kind, mode, textInput]);

  return (
    <section className="pb-12 space-y-4">
      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "মোড" : "Mode"}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMode("encode")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", mode === "encode" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>Encode</button>
              <button type="button" onClick={() => setMode("decode")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", mode === "decode" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>Decode</button>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">{bn ? "Input ধরন" : "Input kind"}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setKind("text")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", kind === "text" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>{bn ? "টেক্সট" : "Text"}</button>
              <button type="button" onClick={() => setKind("file")} className={cn("h-10 rounded-lg border text-[12px] font-medium transition-all", kind === "file" ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>{bn ? "ফাইল" : "File"}</button>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60 mb-2">URL-safe</p>
            <button type="button" onClick={() => setUrlSafe((v) => !v)} className={cn("h-10 w-full rounded-lg border text-[11px] font-medium transition-all", urlSafe ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft" : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40")}>
              {urlSafe ? "✓ RFC 4648" : (bn ? "Standard" : "Standard")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" onClick={handleSwap} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
            <ArrowLeftRight className="w-3.5 h-3.5" />{bn ? "Swap" : "Swap"}
          </button>
          {kind === "text" && (
            <button type="button" onClick={loadSample} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
              {bn ? "নমুনা" : "Sample"}
            </button>
          )}
          {(textInput.length > 0 || fileInfo) && (
            <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-medium text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />{bn ? "মুছুন" : "Clear"}
            </button>
          )}
          <span className="ml-auto text-[10px] text-lightTextSecondary dark:text-dark-textSecondary font-mono">{deltaLabel}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
        <div className="px-4 py-2.5 border-b border-silk-rose/15 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">
            {kind === "file" ? (bn ? "ফাইল" : "File") : mode === "encode" ? (bn ? "Raw text" : "Raw text") : (bn ? "Base64 input" : "Base64 input")}
          </span>
          {kind === "text" && textInput && (
            <span className="text-[10px] font-mono text-lightTextSecondary dark:text-dark-textSecondary">{formatNumber(textInput.length)} chars</span>
          )}
        </div>

        {kind === "text" ? (
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={mode === "encode"
              ? (bn ? "এখানে টেক্সট paste বা লিখুন..." : "Paste or type text here...")
              : (bn ? "Base64 string বা data URL paste করুন..." : "Paste Base64 string or data URL...")}
            spellCheck={false}
            className="w-full min-h-[140px] p-4 resize-y bg-transparent text-[13px] font-mono leading-relaxed text-light-text dark:text-dark-text placeholder:text-lightTextSecondary/50 dark:placeholder:text-darkTextSecondary/40 outline-none"
          />
        ) : (
          <div className="p-4">
            <input ref={inputRef} type="file" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} className="hidden" />
            {!fileInfo ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
                className={cn("flex flex-col items-center justify-center gap-3 p-8 sm:p-12 rounded-2xl cursor-pointer bg-silk-rose/5 border-2 border-dashed transition-all", drag ? "border-silk-rose/70 bg-silk-rose/10" : "border-silk-rose/25 hover:border-silk-rose/50")}
              >
                <Upload className="w-8 h-8 text-silk-rose" />
                <p className="text-[12px] font-semibold text-light-text dark:text-dark-text">{bn ? "ফাইল ড্রপ করুন" : "Drop a file"}</p>
                <p className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary">{bn ? `সর্বোচ্চ ${formatBytes(MAX_FILE_SIZE)}` : `Up to ${formatBytes(MAX_FILE_SIZE)}`}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-silk-rose/5 border border-silk-rose/15">
                {fileInfo.isImage ? (
                  <img src={fileInfo.dataUrl} alt={fileInfo.name} className="w-12 h-12 rounded-lg object-cover bg-white border border-silk-rose/15" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-silk-rose/10 border border-silk-rose/20 flex items-center justify-center"><ImageIcon className="w-5 h-5 text-silk-rose" /></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-light-text dark:text-dark-text truncate">{fileInfo.name}</p>
                  <p className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5">{formatBytes(fileInfo.size)} · {fileInfo.type}</p>
                </div>
                <button type="button" onClick={() => { setFileInfo(null); if (inputRef.current) inputRef.current.value = ""; }} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors shrink-0" aria-label="Remove"><X className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-[12px] text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
        </div>
      )}

      {decodedImage && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-silk-wine/70 dark:text-silk-rose/60">{bn ? "Decoded ছবি" : "Decoded image"}</span>
            <button type="button" onClick={() => downloadDataUrl(decodedImage.url, `decoded.${decodedImage.mime.split("/")[1]}`)} className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-emerald-600 text-white text-[10px] font-semibold hover:bg-emerald-700 transition-colors">
              <Download className="w-3 h-3" />{bn ? "ডাউনলোড" : "Download"}
            </button>
          </div>
          <div className="rounded-xl bg-white border border-silk-rose/15 flex items-center justify-center p-3">
            <img src={decodedImage.url} alt="Decoded" className="max-w-full max-h-[300px] object-contain" />
          </div>
        </div>
      )}

      {currentOutput && (
        <div className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-silk-rose/15 flex-wrap">
            <span className="text-[11px] font-semibold text-light-text dark:text-dark-text">{bn ? "আউটপুট" : "Output"} · {formatBytes(new Blob([currentOutput]).size)}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => void handleCopy()} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-medium text-silk-rose hover:bg-silk-rose/20 transition-all">
                {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (bn ? "কপি" : "Copied") : (bn ? "কপি" : "Copy")}
              </button>
              <button type="button" onClick={handleDownload} className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> .txt
              </button>
            </div>
          </div>
          <pre className="p-4 max-h-[300px] overflow-auto text-[12px] font-mono leading-relaxed text-light-text dark:text-dark-text whitespace-pre-wrap break-all">{currentOutput}</pre>
        </div>
      )}

      {!textInput && !fileInfo && (
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-lightTextSecondary dark:text-dark-textSecondary">
          <ImageIcon className="w-3.5 h-3.5 text-silk-rose" />
          {bn ? "আপনার ডেটা ব্রাউজারেই প্রসেস হয়" : "Your data is processed in your browser"}
        </div>
      )}
    </section>
  );
}
