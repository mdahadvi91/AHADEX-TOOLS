import { Zap, AlertTriangle, ShoppingBag, Box } from "lucide-react";

export function SmartInsights({ format, height, width, bn }: { format: string, height: number, width: number, bn: boolean }) {
  if (!format) return null;

  const isRetail = format.includes("EAN") || format.includes("UPC");
  const isTooSmall = height < 60 || width < 1.5;

  let icon = isRetail ? <ShoppingBag className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" /> : <Box className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />;
  let titleEn = isRetail ? "Retail Product Barcode" : "Internal Tracking Barcode";
  let titleBn = isRetail ? "রিটেইল প্রোডাক্ট বারকোড" : "ইন্টারনাল ট্র্যাকিং বারকোড";
  let descEn = isRetail 
    ? "Perfect for retail products. This format is internationally recognized by standard POS scanners." 
    : "Best for internal logistics, inventory, or shipping labels. Not for retail shelf scanning.";
  let descBn = isRetail
    ? "রিটেইল প্রোডাক্টের জন্য পারফেক্ট। এই ফরম্যাটটি আন্তর্জাতিকভাবে স্বীকৃত এবং যেকোনো POS স্ক্যানারে কাজ করে।"
    : "ইন্টারনাল লজিস্টিকস, ইনভেন্টরি বা শিপিং লেবেলের জন্য সেরা। রিটেইল স্ক্যানিংয়ের জন্য এটি ব্যবহার করবেন না।";

  if (isTooSmall) {
    icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    titleEn = "Warning: Might Not Scan";
    titleBn = "সতর্কতা: স্ক্যান নাও হতে পারে";
    descEn = "Your barcode height is too small. Increase the height to at least 60px for reliable scanning.";
    descBn = "আপনার বারকোডের উচ্চতা খুব কম। ভালোভাবে স্ক্যান হওয়ার জন্য উচ্চতা অন্তত ৬০ পিক্সেল করুন।";
  }

  return (
    <div className={`mt-3 rounded-2xl border ${isTooSmall ? 'border-amber-500/30 bg-amber-500/5' : 'border-silk-rose/20 bg-silk-rose/5'} p-4 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-silk-gold" />
        <h3 className="font-serif font-black text-sm text-light-text dark:text-dark-text">
          AHADEX Smart Insights
        </h3>
      </div>

      <div className="flex items-start gap-3">
        {icon}
        <div>
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            {bn ? titleBn : titleEn}
          </p>
          <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-relaxed">
            {bn ? descBn : descEn}
          </p>
        </div>
      </div>
    </div>
  );
}
