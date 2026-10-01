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
  Square,
  Squircle,
  Frame,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { PLATFORMS, getPlatform } from "./platforms";
import {
  composePhoto,
  generatePreview,
  type Position,
  type QrBackground,
} from "./logic";
import { photoQrData } from "./data";

export default function PhotoQrTool() {
  const { language, t } = useLanguage();
  const content = photoQrData.content[language];

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [platformId, setPlatformId] = useState<string>("whatsapp");
  const [values, setValues] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizePercent, setSizePercent] = useState(20);
  const [padding, setPadding] = useState(10);
  const [qrBackground, setQrBackground] = useState<QrBackground>("rounded");

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
  const PlatformIcon = platform.Icon;

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
          qrBackground,
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
  }, [
    photoFile,
    platform,
    values,
    position,
    sizePercent,
    padding,
    qrBackground,
    canPreview,
  ]);

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
        qrBackground,
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

  const backgrounds: { id: QrBackground; Icon: typeof Square; label: string; labelBn: string }[] = [
    { id: "white", Icon: Square, label: "White", labelBn: "সাদা" },
    { id: "rounded", Icon: Squircle, label: "Rounded", labelBn: "গোল" },
    { id: "none", Icon: Frame, label: "None", labelBn: "নেই" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
      {/* HEADER */}
      <header className="pt-6 sm:pt-10 pb-5 sm:pb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {t.common.home}
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-silk-wine dark:text-silk-rose-soft text-[10px] sm:text-xs font-medium">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {t.categories.qr}
          </span>
          {photoQrData.newTool && (
            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-silk-wine/15 text-silk-wine dark:text-silk-rose-soft text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border border-silk-wine/25">
              New
            </span>
          )}
        </div>

        <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-light-text dark:text-dark-text leading-tight">
          {photoQrData.name}
        </h1>

        <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl leading-relaxed">
          {photoQrData.description}
        </p>
      </header>

      {/* WORKSPACE — 50/50 on mobile, fixed on larger */}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[260px_1fr] lg:grid-cols-[340px_1fr] gap-2.5 sm:gap-4 lg:gap-6 pb-16 items-stretch">
        {/* LEFT COLUMN — WHAT the QR does */}
        <aside className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-2.5 sm:p-4 lg:p-5 space-y-3.5 sm:space-y-5">
          {/* Platform */}
          <div>
            <h3 className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-2 sm:mb-3">
              {language === "bn" ? "প্ল্যাটফর্ম" : "Platform"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
              {PLATFORMS.map((p) => {
                const active = p.id === platformId;
                const PIcon = p.Icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPlatformId(p.id);
                      setValues({});
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1 p-1.5 sm:p-2 lg:p-2.5 rounded-lg sm:rounded-xl border transition-all duration-200 min-w-0",
                      active
                        ? "bg-silk-rose/15 border-silk-rose/50 shadow-silk-soft"
                        : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/40"
                    )}
                    title={language === "bn" ? p.nameBn : p.name}
                  >
                    <span
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md sm:rounded-lg flex items-center justify-center text-[14px] sm:text-base lg:text-lg"
                      style={{ backgroundColor: `${p.color}20`, color: p.color }}
                    >
                      <PIcon />
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-medium text-light-text dark:text-dark-text text-center leading-tight line-clamp-2 w-full">
                      {language === "bn" ? p.nameBn : p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fields */}
          <div>
            <h3 className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-2 sm:mb-3">
              {language === "bn" ? "তথ্য" : "Details"}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {platform.fields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={`field-${field.key}`}
                    className="block text-[9px] sm:text-[10px] lg:text-xs font-medium text-light-text dark:text-dark-text mb-1 sm:mb-1.5 leading-tight"
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
                      "w-full h-8 sm:h-9 lg:h-10 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs lg:text-sm",
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
            <h3 className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-2 sm:mb-3">
              {language === "bn" ? "কোণা" : "Position"}
            </h3>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {(
                ["top-left", "top-right", "bottom-left", "bottom-right"] as const
              ).map((pos) => {
                const active = position === pos;
                const label = pos.replace("-", " ");
                return (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setPosition(pos)}
                    className={cn(
                      "h-7 sm:h-8 lg:h-10 rounded-lg sm:rounded-xl border text-[8px] sm:text-[9px] lg:text-[11px] font-medium capitalize transition-all px-1 truncate",
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
        </aside>

        {/* RIGHT COLUMN — HOW it looks + preview + download */}
        <main className="flex flex-col rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 overflow-hidden">
          {/* Upload or Preview */}
          <div className="flex-1 min-w-0">
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
                  "flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-16 h-full min-h-[380px] sm:min-h-[520px] cursor-pointer transition-all duration-300",
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
                    "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                    "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25",
                    isDragging && "scale-110"
                  )}
                >
                  <Upload className="w-5 h-5 sm:w-7 sm:h-7 text-silk-rose" />
                </div>
                <div className="text-center px-2">
                  <p className="font-display font-semibold text-xs sm:text-base text-light-text dark:text-dark-text mb-1">
                    {language === "bn"
                      ? "ছবি আপলোড করুন"
                      : "Upload your photo"}
                  </p>
                  <p className="text-[9px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {language === "bn"
                      ? "ক্লিক বা টেনে আনুন"
                      : "Click or drag"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-2.5 sm:p-4 lg:p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2 sm:mb-3 shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <PlatformIcon
                      size={14}
                      color={platform.color}
                      className="shrink-0"
                    />
                    <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold truncate">
                      {language === "bn" ? "প্রিভিউ" : "Preview"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-silk-rose hover:text-silk-wine transition-colors shrink-0"
                  >
                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">
                      {language === "bn" ? "বদলান" : "Change"}
                    </span>
                  </button>
                </div>

                <div className="relative flex-1 rounded-xl sm:rounded-2xl overflow-hidden bg-dark-surface/30 flex items-center justify-center min-h-[240px] sm:min-h-[380px]">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-[400px] sm:max-h-[560px] object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 sm:gap-3 py-10 text-light-textSecondary dark:text-dark-textSecondary">
                      <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-silk-rose" />
                      <p className="text-[10px] sm:text-xs">
                        {language === "bn" ? "তৈরি হচ্ছে..." : "Loading..."}
                      </p>
                    </div>
                  )}
                  {generating && preview && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full bg-silk-rose/90 text-white text-[9px] sm:text-[10px] font-medium">
                      <Loader2 className="w-3 h-3 animate-spin" />
                    </div>
                  )}
                </div>

                {!payload && (
                  <p className="mt-2 sm:mt-3 text-[9px] sm:text-xs text-center text-light-textSecondary dark:text-dark-textSecondary leading-tight shrink-0">
                    {language === "bn"
                      ? "বাম দিকে তথ্য লিখুন"
                      : "Fill in the fields"}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom settings strip — Size + Padding + Style + Download */}
          {photoFile && (
            <div className="border-t border-silk-rose/15 p-2.5 sm:p-4 space-y-2.5 sm:space-y-3 bg-white/40 dark:bg-dark-surface/40 backdrop-blur-xl shrink-0">
              {/* Size + Padding — 2 cols */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                    <h3 className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                      {language === "bn" ? "সাইজ" : "Size"}
                    </h3>
                    <span className="text-[8px] sm:text-[10px] font-mono text-silk-rose">
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
                <div>
                  <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                    <h3 className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
                      {language === "bn" ? "প্যাডিং" : "Padding"}
                    </h3>
                    <span className="text-[8px] sm:text-[10px] font-mono text-silk-rose">
                      {padding}px
                    </span>
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
              </div>

              {/* QR Background — 3 cols */}
              <div>
                <h3 className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-1 sm:mb-1.5">
                  {language === "bn" ? "ব্যাকগ্রাউন্ড" : "Background"}
                </h3>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {backgrounds.map(({ id, Icon, label, labelBn }) => {
                    const active = qrBackground === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setQrBackground(id)}
                        className={cn(
                          "flex items-center justify-center gap-1 h-8 sm:h-9 rounded-lg sm:rounded-xl border text-[9px] sm:text-[11px] font-medium transition-all",
                          active
                            ? "bg-silk-rose/15 border-silk-rose/50 text-silk-wine dark:text-silk-rose-soft"
                            : "bg-silk-rose/5 border-silk-rose/15 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/40"
                        )}
                      >
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span className="truncate">
                          {language === "bn" ? labelBn : label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Download */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!canPreview || generating}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-11 rounded-full",
                  "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium text-[11px] sm:text-sm",
                  "shadow-silk-medium hover:shadow-silk-deep",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "transition-all duration-300"
                )}
              >
                {generating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    <span className="truncate">
                      {language === "bn" ? "তৈরি হচ্ছে..." : "Generating..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">
                      {language === "bn" ? "ডাউনলোড PNG" : "Download PNG"}
                    </span>
                  </>
                )}
              </button>

              {error && (
                <p className="text-[9px] sm:text-xs text-silk-rose text-center leading-tight">
                  {error}
                </p>
              )}
            </div>
          )}
        </main>
      </section>

      {/* PRIVACY NOTE */}
      <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/20 p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3 mb-12">
        <Shield className="w-4 h-4 text-silk-rose shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
          {content.privacyNote}
        </p>
      </div>

      {/* CONTENT — FULL WIDTH */}
      <div className="max-w-3xl pb-20">
        <section className="mb-12">
          <p className="text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            {content.intro}
          </p>
        </section>

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

        <section className="mb-12">
          <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
            {language === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
          </h2>
          <div className="space-y-2">
            {content.faq.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

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
