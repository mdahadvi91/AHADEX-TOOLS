import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { UserData } from "../../types";
import { MAX_LOGO_SIZE } from "../../shared/constants";

interface LogoPanelProps {
  userData: UserData;
  onChange: (next: UserData) => void;
  onError?: (msg: string) => void;
}

export function LogoPanel({ userData, onChange, onError }: LogoPanelProps) {
  const { language } = useLanguage();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      onError?.(
        language === "bn" ? "শুধু ছবি ফাইল দিন।" : "Please upload an image."
      );
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      onError?.(
        language === "bn"
          ? "লোগো অনেক বড় (সর্বোচ্চ ৫ MB)।"
          : "Logo too large (max 5 MB)."
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...userData, logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const remove = () => {
    onChange({ ...userData, logoDataUrl: null });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleUpload(f);
        }}
        className="hidden"
      />
      {userData.logoDataUrl ? (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-silk-rose/5 border border-silk-rose/15">
          <img
            src={userData.logoDataUrl}
            alt="logo"
            className="w-12 h-12 object-contain rounded-lg bg-white"
          />
          <p className="flex-1 text-[11px] text-light-text dark:text-dark-text">
            {language === "bn" ? "লোগো লোড হয়েছে" : "Logo loaded"}
          </p>
          <button
            type="button"
            onClick={remove}
            className="w-7 h-7 rounded-md flex items-center justify-center text-silk-rose hover:bg-silk-rose/15 transition-colors"
            aria-label="Remove logo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-1.5 h-20 rounded-xl",
            "bg-silk-rose/5 border border-dashed border-silk-rose/30",
            "hover:border-silk-rose/60 transition-all"
          )}
        >
          <Upload className="w-4 h-4 text-silk-rose" />
          <span className="text-[11px] font-medium text-silk-rose">
            {language === "bn" ? "লোগো আপলোড করুন" : "Upload logo"}
          </span>
        </button>
      )}
    </div>
  );
}
