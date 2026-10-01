import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Download,
  Image as ImageIcon,
  X,
  Shield,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { PLATFORMS, getPlatform } from "./platforms";
import {
  composePhoto,
  generatePreview,
  type Position,
} from "./logic";
import { photoQrData } from "./data";

/* ============================================================
 * MAIN COMPONENT
 * ============================================================ */

export default function PhotoQrTool() {
  const { language, t } = useLanguage();
  const content = photoQrData.content[language];

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [platformId, setPlatformId] = useState<string>("whatsapp");
  const [values, setValues] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizePercent, setSizePercent] = useState(20);
  const [padding, setPadding] = useState(10);

  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewTimerRef = useRef<number | null>(null);

  const platform = useMemo(
    () => getPlatform(platformId) ?? PLATFORMS[0],
    [platformId]
  );

  const payload = useMemo(() => {
    try {
      return platform.buildPayload(values);
    } catch {
      return "";
    }
  }, [platform, values]);

  const canPreview = Boolean(photoFile && payload);

  /* ---- Photo upload ---- */
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File is too large (max 50 MB).");
      return;
    }
    setError(null);
    setPhotoFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---- Live preview (debounced) ---- */
  useEffect(() => {
    if (!canPreview || !photoFile) {
      setPreview(null);
      return;
    }
    if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);

    previewTimerRef.current = window.setTimeout(async () => {
      setGenerating(true);
      try {
        const url = await generatePreview({
          photoFile,
          platform,
          values,
          position,
          sizePercent,
          padding,
        });
        setPreview(url);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Preview failed");
      } finally {
        setGenerating(false);
      }
    }, 250);

    return () => {
      if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);
    };
  }, [photoFile, platform, values, position, sizePercent, padding, canPreview]);

  /* ---- Download ---- */
  const handleDownload = async () => {
    if (!photoFile || !payload) return;
    setGenerating(true);
    try {
      const blob = await composePhoto({
        photoFile,
        platform,
        values,
        position,
        sizePercent,
        padding,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photoQrData.slug}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <header className="pt-10 pb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.common.home}
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            {t.categories.qr}
          </span>
          {photoQrData.newTool && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-silk-wine/15 text-silk-wine dark:text-silk-rose-soft text-[10px] font-bold tracking-widest uppercase border border-silk-wine/25">
              New
            </span>
          )}
        </div>

        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-light-text dark:text-dark-text leading-tight">
          {photoQrData.name}
        </h1>

        <p className="mt-3 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl leading-relaxed">
          {photoQrData.description}
        </p>
      </header>

      {/* WORKSPACE — 2 column */}
      <section className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 pb-16">
        {/* LEFT: SETTINGS PANEL */}
        <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-5 space-y-6">
            {/* Platform */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
                {language === "bn" ? "প্ল্যাটফর্ম" : "Platform"}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORMS.map((p) => {
                  const active = p.id === platformId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPlatformId(p.id);
                        setValues({});
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200",
                        active
                          ? "bg-silk-rose/15 border-silk-rose/50 shadow-silk-soft"
                          : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                      )}
                      title={language === "bn" ? p.nameBn : p.name}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${p.color}20` }}
                      >
                        <span
                          className="w-5 h-5 flex items-center justify-center"
                          style={{ color: p.color }}
                          dangerouslySetInnerHTML={{ __html: p.iconSvg }}
                        />
                      </span>
                      <span className="text-[9px] font-medium text-light-text dark:text-dark-text text-center leading-tight">
                        {language === "bn" ? p.nameBn : p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform fields */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
                {language === "bn" ? "তথ্য" : "Details"}
              </h3>
              <div className="space-y-3">
                {platform.fields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={`field-${field.key}`}
                      className="block text-xs font-medium text-light-text dark:text-dark-text mb-1.5"
                    >
                      {language === "bn" ? field.labelBn : field.label}
                    </label>
                    <input
                      id={`field-${field.key}`}
                      type={field.type}
                      value={values[field.key] ?? ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [field.key]: e.target.value }))
                      }
                      placeholder={
                        language === "bn" ? field.placeholderBn : field.placeholder
                      }
                      className={cn(
                        "w-full h-10 px-3 rounded-xl text-sm",
                        "bg-white/80 dark:bg-dark-surface/80",
                        "border border-silk-rose/20 focus:border-silk-rose/50",
                        "text-light-text dark:text-dark-text",
                        "placeholder:text-light-textSecondary/50 dark:placeholder:text-dark-textSecondary/40",
                        "outline-none transition-all"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Position */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
                {language === "bn" ? "কোণা" : "Position"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => {
                  const active = position === pos;
                  const label = pos.replace("-", " ");
                  return (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setPosition(pos)}
                      className={cn(
                        "h-10 rounded-xl border text-[11px] font-medium capitalize transition-all",
                        active
                          ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                          : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                  {language === "bn" ? "সাইজ" : "Size"}
                </h3>
                <span className="text-xs font-mono text-silk-rose">
                  {sizePercent}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={sizePercent}
                onChange={(e) => setSizePercent(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Padding */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                  {language === "bn" ? "প্যাডিং" : "Padding"}
                </h3>
                <span className="text-xs font-mono text-silk-rose">{padding}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={padding}
                onChange={(e) => setPadding(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={!canPreview || generating}
              className={cn(
                "w-full inline-flex items-center justify-center gap-2 h-12 rounded-full",
                "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium",
                "shadow-silk-medium hover:shadow-silk-deep",
                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-silk-medium",
                "transition-all duration-300"
              )}
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === "bn" ? "তৈরি হচ্ছে..." : "Generating..."}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {language === "bn" ? "ডাউনলোড PNG" : "Download PNG"}
                </>
              )}
            </button>

            {error && (
              <p className="text-xs text-silk-rose text-center">{error}</p>
            )}
          </div>
        </aside>

        {/* RIGHT: WORKSPACE */}
        <main className="min-w-0 space-y-6">
          {/* Upload OR Preview */}
          <div className="rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
            {!photoFile ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click();
                  }
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-4 p-8 sm:p-16 min-h-[400px] cursor-pointer transition-all duration-300",
                  isDragging && "bg-silk-rose/10"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                    "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25",
                    isDragging && "scale-110"
                  )}
                >
                  <Upload className="w-7 h-7 text-silk-rose" />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-base text-light-text dark:text-dark-text mb-1">
                    {language === "bn"
                      ? "আপনার ছবি আপলোড করুন"
                      : "Upload your photo"}
                  </p>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                    {language === "bn"
                      ? "ক্লিক করুন বা টেনে আনুন · JPG, PNG, WebP · সর্বোচ্চ ৫০ MB"
                      : "Click or drag · JPG, PNG, WebP · max 50 MB"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6">
                {/* Preview header */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                    {language === "bn" ? "প্রিভিউ" : "Preview"}
                  </p>
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="inline-flex items-center gap-1.5 text-xs text-silk-rose hover:text-silk-wine transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    {language === "bn" ? "ছবি বদলান" : "Change photo"}
                  </button>
                </div>

                {/* Preview canvas */}
                <div className="relative rounded-2xl overflow-hidden bg-dark-surface/30 flex items-center justify-center min-h-[300px]">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-[600px] object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-16 text-light-textSecondary dark:text-dark-textSecondary">
                      <Loader2 className="w-6 h-6 animate-spin text-silk-rose" />
                      <p className="text-xs">
                        {language === "bn"
                          ? "তৈরি হচ্ছে..."
                          : "Generating preview..."}
                      </p>
                    </div>
                  )}
                  {generating && preview && (
                    <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-full bg-silk-rose/90 text-white text-[10px] font-medium flex items-center gap-1.5">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {language === "bn" ? "আপডেট" : "Updating"}
                    </div>
                  )}
                </div>

                {/* Empty payload hint */}
                {!payload && (
                  <p className="mt-4 text-xs text-center text-light-textSecondary dark:text-dark-textSecondary">
                    {language === "bn"
                      ? "QR দেখতে বাম দিকে তথ্য লিখুন"
                      : "Fill in the fields on the left to see the QR"}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Privacy note */}
          <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/20 p-4 flex items-start gap-3">
            <Shield className="w-4 h-4 text-silk-rose shrink-0 mt-0.5" />
            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {content.privacyNote}
            </p>
          </div>
        </main>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-3xl pb-20">
        {/* Intro */}
        <section className="mb-12">
          <p className="text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            {content.intro}
          </p>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
            {language === "bn" ? "কীভাবে ব্যবহার করবেন" : "How to Use"}
          </h2>
          <ol className="space-y-4">
            {content.howTo.map((step) => (
              <li key={step.step} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-medium text-light-text dark:text-dark-text text-sm mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
            {language === "bn" ? "ফিচার" : "Features"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.features.map((f) => (
              <div
                key={f.title}
                className="p-4 rounded-2xl bg-silk-rose/5 border border-silk-rose/15"
              >
                <h3 className="font-medium text-sm text-light-text dark:text-dark-text mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
            {language === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
          </h2>
          <div className="space-y-2">
            {content.faq.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
            {language === "bn" ? "সম্পর্কিত টুল" : "Related tools"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {photoQrData.relatedTools.map((id) => (
              <Link
                key={id}
                to={`/tools/${id}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-silk-rose/5 border border-silk-rose/15 hover:border-silk-rose/40 hover:-translate-y-0.5 transition-all"
              >
                <ImageIcon className="w-4 h-4 text-silk-rose shrink-0" />
                <span className="text-sm font-medium text-light-text dark:text-dark-text capitalize">
                  {id.replace(/-/g, " ")}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================================================
 * FAQ ITEM
 * ============================================================ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        open
          ? "bg-white/85 dark:bg-dark-surface/85 border-silk-rose/40"
          : "bg-white/60 dark:bg-dark-surface/60 border-silk-rose/15 hover:border-silk-rose/30"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-sm sm:text-base text-light-text dark:text-dark-text">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-silk-rose"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
