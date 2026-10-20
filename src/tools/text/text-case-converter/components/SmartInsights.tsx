import { Zap, Code2, PenTool, Type } from "lucide-react";

export function SmartInsights({ activeCase, bn }: { activeCase: string, bn: boolean }) {
  if (!activeCase) return null;

  const isProgramming = ["camel", "pascal", "snake", "kebab", "constant", "dot"].includes(activeCase);
  const isWriting = ["title", "sentence"].includes(activeCase);

  let icon = <Type className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />;
  let titleEn = "General Formatting";
  let titleBn = "সাধারণ ফরম্যাটিং";
  let descEn = "This format is suitable for general text styling.";
  let descBn = "এই ফরম্যাটটি সাধারণ টেক্সট স্টাইলিংয়ের জন্য উপযুক্ত।";

  if (isProgramming) {
    icon = <Code2 className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />;
    titleEn = "Developer Use Case";
    titleBn = "ডেভেলপার ব্যবহারের ক্ষেত্র";
    
    const devUses: Record<string, string> = {
      camel: "Used for naming variables and functions in JavaScript, Java, and TypeScript.",
      pascal: "Used for naming classes, interfaces, and React components.",
      snake: "Used for naming variables and columns in Python, SQL, and APIs.",
      kebab: "Used for CSS class names, URLs, and HTML attributes.",
      constant: "Used for defining environment variables and global constants.",
      dot: "Used for object properties or file names."
    };
    descEn = devUses[activeCase] || descEn;
    descBn = "প্রোগ্রামিং-এ ভেরিয়েবল, ফাংশন বা ফাইলের নামকরণের জন্য এই ফরম্যাটটি ব্যবহৃত হয়।";
  } else if (isWriting) {
    icon = <PenTool className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />;
    titleEn = "Writing & SEO Use Case";
    titleBn = "রাইটিং এবং SEO ব্যবহারের ক্ষেত্র";
    
    if (activeCase === "title") {
      descEn = "Perfect for blog post headlines and SEO titles to make them stand out.";
      descBn = "ব্লগ পোস্টের শিরোনাম এবং SEO টাইটেলের জন্য পারফেক্ট।";
    } else if (activeCase === "sentence") {
      descEn = "The standard format for writing paragraphs, emails, and articles.";
      descBn = "প্যারাগ্রাফ, ইমেইল এবং আর্টিকেল লেখার জন্য আদর্শ ফরম্যাট।";
    }
  }

  return (
    <div className="mb-2 rounded-2xl border border-silk-rose/20 bg-gradient-to-br from-silk-rose/5 to-transparent p-4 shadow-sm">
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
