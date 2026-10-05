import { useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

interface DropZoneProps {
  onFiles: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  busy?: boolean;
  drag: boolean;
  onDragChange: (drag: boolean) => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function DropZone({
  onFiles,
  accept,
  multiple = false,
  busy = false,
  drag,
  onDragChange,
  title,
  subtitle,
  icon,
  className,
}: DropZoneProps) {
  const { language } = useLanguage();
  const bn = language === "bn";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDragChange(false);
    onFiles(e.dataTransfer.files);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles(e.target.files)}
        className="hidden"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onDragOver={(e) => {
          e.preventDefault();
          onDragChange(true);
        }}
        onDragLeave={() => onDragChange(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "group relative flex flex-col items-center justify-center gap-4 p-8 sm:p-16 rounded-3xl cursor-pointer overflow-hidden",
          "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
          "border-2 border-dashed transition-all duration-300",
          drag
            ? "border-silk-rose/70 bg-silk-rose/10 scale-[1.01] shadow-[0_20px_50px_-20px_rgba(139,58,79,0.4)]"
            : "border-silk-rose/25 hover:border-silk-rose/50 hover:bg-silk-rose/[0.03]",
          className
        )}
      >
        {/* Radial glow on drag */}
        <AnimatePresence>
          {drag && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(216,139,154,0.15) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <div
          className={cn(
            "relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-500",
            "bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/15",
            "border border-silk-rose/25",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
            drag && "scale-110 rotate-3 border-silk-rose/60"
          )}
        >
          {busy ? (
            <Loader2 className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose animate-spin" />
          ) : (
            icon ?? <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />
          )}
        </div>

        {/* Text */}
        <div className="text-center px-3 relative">
          <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">
            {busy
              ? bn
                ? "প্রসেস হচ্ছে..."
                : "Processing..."
              : title ?? (bn ? "ফাইল ড্রপ করুন" : "Drop your files")}
          </p>
          <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            {subtitle ??
              (bn
                ? "অথবা ক্লিক করে ব্রাউজ করুন"
                : "or click to browse")}
          </p>
        </div>

        {/* Bottom accent line */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500",
            "bg-gradient-to-r from-transparent via-silk-rose to-transparent",
            drag ? "w-48 opacity-100" : "w-20 opacity-40 group-hover:opacity-70"
          )}
        />
      </motion.div>
    </>
  );
}
