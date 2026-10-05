import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Trash2,
  AlertCircle,
  Upload,
  X,
  ArrowLeftRight,
  Sparkles,
  FileText,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import {
  TextPanel,
  ToolButton,
  WorkspacePanel,
  DropZone,
  ResultStat,
} from "@components/workspace";
import {
  encodeText,
  decodeText,
  fileToBase64,
  base64ToDataUrl,
  isValidBase64,
  downloadText,
  downloadDataUrl,
  copyText,
  formatBytes,
  formatNumber,
  MAX_FILE_SIZE,
  SAMPLES,
} from "../logic";
import type { Mode, InputKind, FileInfo } from "../types";

export function Workspace() {
  const { language } = useLanguage();
  const { play } = useSound();
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
    if (kind !== "text") return { output: "", byteDelta: 0, error: undefined };
    return mode === "encode"
      ? encodeText(textInput, urlSafe)
      : decodeText(textInput, urlSafe);
  }, [kind, mode, textInput, urlSafe]);

  useEffect(() => {
    if (textResult.error) setError(textResult.error);
    else setError(null);
  }, [textResult.error]);

  const handleFile = async (file: File) => {
    setError(null);
    if (file.size > MAX_FILE_SIZE) {
      setError(
        bn
          ? `সর্বোচ্চ ${formatBytes(MAX_FILE_SIZE)}।`
          : `Max ${formatBytes(MAX_FILE_SIZE)}.`
      );
      return;
    }
    try {
      const info = await fileToBase64(file);
      setFileInfo(info);
      play("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file");
    }
  };

  const handleSwap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    if (kind === "text" && textResult.output) setTextInput(textResult.output);
  };

  const handleCopy = async () => {
    const out =
      kind === "text" ? textResult.output : (fileInfo?.base64 ?? "");
    if (!out) return;
    try {
      await copyText(out);
      setCopied(true);
      play("success");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
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

  const currentOutput =
    kind === "text" ? textResult.output : (fileInfo?.base64 ?? "");
  const delta = kind === "text" ? textResult.byteDelta : 0;
  const deltaLabel =
    delta === 0
      ? bn
        ? "পরিবর্তন নেই"
        : "no change"
      : delta > 0
        ? `+${formatNumber(delta)} B`
        : `${formatNumber(delta)} B`;

  const decodedImage = useMemo(() => {
    if (kind !== "text" || mode !== "decode") return null;
    const clean = textInput.trim().replace(/\s+/g, "");
    if (!clean || !isValidBase64(clean)) return null;
    const mime = clean.startsWith("/9j/")
      ? "image/jpeg"
      : clean.startsWith("iVBOR")
        ? "image/png"
        : clean.startsWith("R0lGO")
          ? "image/gif"
          : clean.startsWith("UklGR")
            ? "image/webp"
            : null;
    if (!mime) return null;
    return { url: base64ToDataUrl(clean, mime), mime };
  }, [kind, mode, textInput]);

  const inputBytes = textInput
    ? formatBytes(new Blob([textInput]).size)
    : "0 B";
  const outputBytes = currentOutput
    ? formatBytes(new Blob([currentOutput]).size)
    : "0 B";

  return (
    <section className="pb-12 space-y-4 sm:space-y-5">
      {/* Controls */}
      <WorkspacePanel className="p-3.5 sm:p-4 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Mode */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "মোড" : "Mode"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ToggleBtn
                active={mode === "encode"}
                onClick={() => setMode("encode")}
              >
                Encode
              </ToggleBtn>
              <ToggleBtn
                active={mode === "decode"}
                onClick={() => setMode("decode")}
              >
                Decode
              </ToggleBtn>
            </div>
          </div>

          {/* Input kind */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              {bn ? "ইনপুট" : "Input"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <ToggleBtn
                active={kind === "text"}
                onClick={() => setKind("text")}
              >
                {bn ? "টেক্সট" : "Text"}
              </ToggleBtn>
              <ToggleBtn
                active={kind === "file"}
                onClick={() => setKind("file")}
              >
                {bn ? "ফাইল" : "File"}
              </ToggleBtn>
            </div>
          </div>

          {/* URL safe */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60 mb-2">
              URL-safe
            </p>
            <ToggleBtn
              active={urlSafe}
              onClick={() => setUrlSafe((v) => !v)}
            >
              {urlSafe ? "✓ RFC 4648" : bn ? "স্ট্যান্ডার্ড" : "Standard"}
            </ToggleBtn>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-silk-rose/10">
          <ToolButton
            size="sm"
            variant="secondary"
            icon={<ArrowLeftRight className="w-3.5 h-3.5" />}
            onClick={handleSwap}
            disabled={!currentOutput && !textInput}
          >
            {bn ? "সোয়াপ" : "Swap"}
          </ToolButton>

          {kind === "text" && (
            <ToolButton
              size="sm"
              variant="secondary"
              icon={<Sparkles className="w-3.5 h-3.5" />}
              onClick={loadSample}
            >
              {bn ? "নমুনা" : "Sample"}
            </ToolButton>
          )}

          {(textInput || fileInfo) && (
            <ToolButton
              size="sm"
              variant="danger"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={clearAll}
            >
              {bn ? "মুছুন" : "Clear"}
            </ToolButton>
          )}

          <span className="ml-auto text-[10px] font-mono font-bold text-silk-rose bg-silk-rose/10 px-2.5 py-1 rounded-md">
            {deltaLabel}
          </span>
        </div>
      </WorkspacePanel>

      {/* Text input */}
      {kind === "text" && (
        <TextPanel
          label={
            mode === "encode"
              ? bn
                ? "র ইনপুট"
                : "Raw text"
              : bn
                ? "Base64 ইনপুট"
                : "Base64 input"
          }
          value={textInput}
          onChange={setTextInput}
          placeholder={
            mode === "encode"
              ? bn
                ? "এখানে টেক্সট পেস্ট বা লিখুন..."
                : "Paste or type text here..."
              : bn
                ? "Base64 স্ট্রিং বা data URL পেস্ট করুন..."
                : "Paste Base64 string or data URL..."
          }
          onClear={() => setTextInput("")}
          meta={`${formatNumber(textInput.length)} chars · ${inputBytes}`}
        />
      )}

      {/* File input */}
      {kind === "file" && (
        <>
          <input
            ref={inputRef}
            type="file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
            }}
            className="hidden"
          />

          {!fileInfo ? (
            <DropZone
              onFiles={(list) => {
                const f = list?.[0];
                if (f) void handleFile(f);
              }}
              drag={drag}
              onDragChange={setDrag}
              title={bn ? "ফাইল ড্রপ করুন" : "Drop a file"}
              subtitle={
                bn
                  ? `সর্বোচ্চ ${formatBytes(MAX_FILE_SIZE)}`
                  : `Up to ${formatBytes(MAX_FILE_SIZE)}`
              }
              icon={<Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />}
            />
          ) : (
            <WorkspacePanel className="p-3.5 sm:p-4">
              <div className="flex items-center gap-3">
                {fileInfo.isImage ? (
                  <img
                    src={fileInfo.dataUrl}
                    alt={fileInfo.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white border border-silk-rose/15 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-silk-rose/10 border border-silk-rose/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-silk-rose" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-light-text dark:text-dark-text truncate">
                    {fileInfo.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5 font-mono">
                    {formatBytes(fileInfo.size)} · {fileInfo.type}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFileInfo(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  aria-label="Remove"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 bg-red-500/5 border border-red-500/15 hover:bg-red-500/15 transition-all shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </WorkspacePanel>
          )}
        </>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-[12px] sm:text-[13px] text-red-600 dark:text-red-400 font-medium"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats (only if we have output) */}
      {currentOutput && (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <ResultStat
            label={bn ? "ইনপুট" : "Input"}
            value={kind === "text" ? inputBytes : formatBytes(fileInfo?.size ?? 0)}
            accent="rose"
          />
          <ResultStat
            label={bn ? "আউটপুট" : "Output"}
            value={outputBytes}
            accent="emerald"
          />
        </div>
      )}

      {/* Decoded image preview */}
      <AnimatePresence>
        {decodedImage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4"
          >
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-wine/70 dark:text-silk-rose/60">
                {bn ? "ডিকোডেড ছবি" : "Decoded image"}
              </span>
              <ToolButton
                size="sm"
                variant="primary"
                icon={<Download className="w-3 h-3" />}
                onClick={() =>
                  downloadDataUrl(
                    decodedImage.url,
                    `decoded.${decodedImage.mime.split("/")[1]}`
                  )
                }
              >
                {bn ? "ডাউনলোড" : "Download"}
              </ToolButton>
            </div>
            <div className="rounded-xl bg-white border border-silk-rose/15 flex items-center justify-center p-3">
              <img
                src={decodedImage.url}
                alt="Decoded"
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output (text mode) */}
      {kind === "text" && currentOutput && (
        <TextPanel
          label={bn ? "আউটপুট" : "Output"}
          value={currentOutput}
          readOnly
          copied={copied}
          onCopy={handleCopy}
          meta={outputBytes}
        >
          <div className="flex items-center justify-end gap-2 px-4 pb-3">
            <ToolButton
              size="sm"
              variant="primary"
              icon={<Download className="w-3 h-3" />}
              onClick={handleDownload}
            >
              {bn ? "ডাউনলোড" : "Download"}
            </ToolButton>
          </div>
        </TextPanel>
      )}

      {/* Output (file mode) */}
      {kind === "file" && fileInfo && (
        <TextPanel
          label={bn ? "Base64 আউটপুট" : "Base64 output"}
          value={fileInfo.base64}
          readOnly
          copied={copied}
          onCopy={handleCopy}
          meta={outputBytes}
        >
          <div className="flex items-center justify-end gap-2 px-4 pb-3">
            <ToolButton
              size="sm"
              variant="primary"
              icon={<Download className="w-3 h-3" />}
              onClick={handleDownload}
            >
              {bn ? "ডাউনলোড" : "Download"}
            </ToolButton>
          </div>
        </TextPanel>
      )}
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-xl border text-[12px] font-bold transition-all px-2",
        active
          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft shadow-[0_6px_16px_-8px_rgba(139,58,79,0.35)]"
          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
      )}
    >
      {children}
    </button>
  );
}
