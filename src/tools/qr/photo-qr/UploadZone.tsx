import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Upload } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { useSound } from "@contexts/SoundContext";
import { cn } from "@lib/cn";
import { MAX_FILE_SIZE, ACCEPTED_TYPES, ACCEPT_ATTR } from "./options";

interface UploadZoneProps {
  onPhotoChange: (file: File) => void;
  onError: (msg: string) => void;
}

export function UploadZone({ onPhotoChange, onError }: UploadZoneProps) {
  const { language } = useLanguage();
  const { play } = useSound();
  const bn = language === "bn";
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError(
        bn
          ? "শুধু JPG, PNG বা WebP ছবি নির্বাচন করুন।"
          : "Please select a JPG, PNG, or WebP image."
      );
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      onError(
        bn
          ? "ফাইল অনেক বড় (সর্বোচ্চ ৫০ MB)।"
          : "File is too large (max 50 MB)."
      );
      return;
    }
    onPhotoChange(file);
    play("success");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          inputRef.current?.click();
        }
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-5 p-6 sm:p-16 h-full min-h-[380px] sm:min-h-[520px] cursor-pointer overflow-hidden",
        "transition-all duration-300",
        isDragging && "bg-silk-rose/10"
      )}
    >
      {/* Ambient glow on drag */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          isDragging ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(circle at center, rgba(216,139,154,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Decorative corner dots */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 w-2 h-2 rounded-full bg-silk-rose/30"
      />
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-silk-rose/30"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-silk-rose/30"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-silk-rose/30"
      />

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Icon */}
      <div className="relative">
        {/* Glow behind icon */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-silk-rose/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div
          className={cn(
            "relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all duration-500",
            "bg-gradient-to-br from-silk-rose/20 via-silk-rose/10 to-silk-gold/15",
            "border border-silk-rose/30",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
            isDragging && "scale-110 rotate-3 border-silk-rose/60"
          )}
        >
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-silk-rose" />
        </div>
      </div>

      {/* Text */}
      <div className="relative text-center px-3 max-w-sm">
        <p className="font-serif font-black text-[17px] sm:text-xl text-light-text dark:text-dark-text mb-2 tracking-[-0.01em] leading-tight">
          {bn ? "আপনার ছবি আপলোড করুন" : "Upload your photo"}
        </p>
        <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
          {bn
            ? "ক্লিক করুন বা টেনে আনুন · JPG, PNG, WebP · ৫০ MB পর্যন্ত"
            : "Click or drag · JPG, PNG, WebP · Up to 50 MB"}
        </p>
      </div>

      {/* CTA pill */}
      <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-silk-rose/10 border border-silk-rose/25 text-[11px] font-bold text-silk-wine dark:text-silk-rose-soft group-hover:bg-silk-rose/20 group-hover:border-silk-rose/45 transition-all">
        <ImageIcon className="w-3.5 h-3.5" />
        {bn ? "ছবি নির্বাচন করুন" : "Choose photo"}
      </div>

      {/* Bottom accent line */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-500",
          "bg-gradient-to-r from-transparent via-silk-rose to-transparent",
          isDragging ? "w-56 opacity-100" : "w-24 opacity-50 group-hover:w-40 group-hover:opacity-80"
        )}
      />
    </motion.div>
  );
}
