import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { MAX_FILE_SIZE, ACCEPTED_TYPES, ACCEPT_ATTR } from "./options";

interface UploadZoneProps {
  onPhotoChange: (file: File) => void;
  onError: (msg: string) => void;
}

export function UploadZone({ onPhotoChange, onError }: UploadZoneProps) {
  const { language } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError(
        language === "bn"
          ? "শুধু JPG, PNG বা WebP ছবি নির্বাচন করুন।"
          : "Please select a JPG, PNG, or WebP image."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      onError(
        language === "bn"
          ? "ফাইল অনেক বড় (সর্বোচ্চ ৫০ MB)।"
          : "File is too large (max 50 MB)."
      );
      return;
    }

    onPhotoChange(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
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
        "flex flex-col items-center justify-center gap-4 p-6 sm:p-16 h-full min-h-[380px] sm:min-h-[520px] cursor-pointer transition-all duration-300",
        isDragging && "bg-silk-rose/10"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <div
        className={cn(
          "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
          "bg-gradient-to-br from-silk-rose/20 to-silk-gold/10 border border-silk-rose/25",
          isDragging && "scale-110"
        )}
      >
        <Upload className="w-7 h-7 sm:w-9 sm:h-9 text-silk-rose" />
      </div>
      <div className="text-center px-3">
        <p className="font-display font-bold text-[15px] sm:text-lg text-light-text dark:text-dark-text mb-1.5">
          {language === "bn"
            ? "আপনার ছবি আপলোড করুন"
            : "Upload your photo"}
        </p>
        <p className="text-[12px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
          {language === "bn"
            ? "ক্লিক করুন বা টেনে আনুন · JPG, PNG, WebP"
            : "Click or drag · JPG, PNG, WebP"}
        </p>
      </div>
    </div>
  );
}
