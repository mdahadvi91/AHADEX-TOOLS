import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      onError?.(language === "bn" ? "শুধু ছবি ফাইল দিন।" : "Please upload an image.");
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      onError?.(language === "bn" ? "লোগো অনেক বড় (সর্বোচ্চ ৫ MB)।" : "Logo too large (max 5 MB).");
      return;
    }

    setIsProcessing(true);

    // ইমেজ প্রসেসিং (অটোমেটিক স্কয়ার ক্রপ)
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const SIZE = 512; // 512x512 high res square
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // মাঝখান থেকে স্কয়ার বের করার ক্যালকুলেশন
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;

          // ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড ঠিক রাখার জন্য canvas ক্লিয়ার করা
          ctx.clearRect(0, 0, SIZE, SIZE);
          
          // স্কয়ার ক্রপ করে ক্যানভাসে আঁকা
          ctx.drawImage(
            img, 
            startX, startY, minDim, minDim, // সোর্স (মাঝখানের স্কয়ার অংশ)
            0, 0, SIZE, SIZE                // ডেস্টিনেশন (পুরো ক্যানভাস)
          );

          // DataURL তৈরি করা
          const croppedDataUrl = canvas.toDataURL("image/png");
          
          onChange({ ...userData, logoDataUrl: croppedDataUrl });
          setIsProcessing(false);
        } else {
          setIsProcessing(false);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const remove = () => {
    onChange({ ...userData, logoDataUrl: null });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="w-full">
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
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
          <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 shrink-0">
            <img
              src={userData.logoDataUrl}
              alt="logo"
              className="w-full h-full object-cover" // object-cover দেওয়া হলো যাতে স্কয়ারটা পারফেক্টলি ভরে
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">
              {language === "bn" ? "লোগো আপলোড হয়েছে" : "Logo Uploaded"}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {language === "bn" ? "অটো-স্কয়ার করা হয়েছে" : "Auto-cropped to square"}
            </p>
          </div>
          <button
            type="button"
            onClick={remove}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition-colors shrink-0"
            aria-label="Remove logo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isProcessing}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-2 h-28 rounded-xl transition-all",
            "bg-gray-50 border-2 border-dashed border-gray-300",
            "hover:border-red-500 hover:bg-red-50 group",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-red-600">
                {language === "bn" ? "লোগো আপলোড করুন" : "Upload Logo"}
              </span>
              <span className="text-[11px] text-gray-500">PNG, JPG (Max 5MB)</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
