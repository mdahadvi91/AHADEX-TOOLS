import { Zap, AlertTriangle, CheckCircle2, MessageSquare } from "lucide-react";

export function SmartInsights({ length, bn }: { length: number, bn: boolean }) {
  if (!length) return null;

  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
  let colorClass = "border-emerald-500/30 bg-emerald-500/5";
  let titleEn = "Perfect Length";
  let titleBn = "পারফেক্ট দৈর্ঘ্য";
  let descEn = "Great for SMS, meta descriptions, and general social media posts.";
  let descBn = "SMS, মেটা ডেসক্রিপশন এবং সাধারণ সোশ্যাল মিডিয়া পোস্টের জন্য দুর্দান্ত।";

  if (length > 280) {
    icon = <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />;
    colorClass = "border-red-500/30 bg-red-500/5";
    titleEn = "Too Long for Twitter/X";
    titleBn = "টুইটার/এক্স-এর জন্য খুব বড়";
    descEn = `Your text is ${length} characters. Twitter/X has a strict 280-character limit.`;
    descBn = `আপনার টেক্সট ${length} অক্ষরের। টুইটার/এক্স-এর লিমিট ২৮০ অক্ষর।`;
  } else if (length > 160) {
    icon = <MessageSquare className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
    colorClass = "border-amber-500/30 bg-amber-500/5";
    titleEn = "Ideal for Twitter";
    titleBn = "টুইটারের জন্য আদর্শ";
    descEn = `At ${length} characters, this fits perfectly on Twitter, but is too long for an SMS or SEO meta description.`;
    descBn = `${length} অক্ষর দিয়ে এটি টুইটারে পারফেক্ট, কিন্তু SMS বা SEO মেটা ডেসক্রিপশনের জন্য বড়।`;
  }

  return (
    <div className={`mt-4 mb-2 rounded-2xl border ${colorClass} p-4 shadow-sm`}>
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
