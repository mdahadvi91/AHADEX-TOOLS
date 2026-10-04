import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import {
  hasUserChosen, saveConsent, applyConsentToGtag, type ConsentChoice,
} from "@lib/consent";

/* ============================================================
 * Cookie Consent Banner
 * ------------------------------------------------------------
 * Appears on first visit. Three actions:
 *   - Accept all     (analytics + ads)
 *   - Reject all     (only necessary)
 *   - Customize      (individual toggles)
 * Choice is persisted and applied to Google Consent Mode v2.
 * ============================================================ */

const COPY = {
  en: {
    title: "We value your privacy",
    body: "We use cookies to power analytics and personalized ads. You can accept all, reject non-essential, or choose what you allow.",
    acceptAll: "Accept all",
    rejectAll: "Reject non-essential",
    customize: "Customize",
    save: "Save preferences",
    policy: "Cookie Policy",
    necessaryTitle: "Strictly necessary",
    necessaryDesc: "Theme, language, and session. Always on.",
    analyticsTitle: "Analytics",
    analyticsDesc: "Google Analytics 4 — helps us understand how visitors use the site.",
    adsTitle: "Advertising",
    adsDesc: "Google AdSense — used to show relevant ads and support the project.",
    always: "Always on",
  },
  bn: {
    title: "আপনার প্রাইভেসি আমাদের কাছে গুরুত্বপূর্ণ",
    body: "আমরা অ্যানালিটিক্স ও পার্সোনালাইজড বিজ্ঞাপনের জন্য কুকি ব্যবহার করি। আপনি সব একসাথে অ্যাকসেপ্ট করতে পারেন, শুধু প্রয়োজনীয় রাখতে পারেন, অথবা আলাদা করে বেছে নিতে পারেন।",
    acceptAll: "সব অ্যাকসেপ্ট",
    rejectAll: "প্রয়োজনীয় ছাড়া বন্ধ",
    customize: "কাস্টমাইজ",
    save: "পছন্দ সেভ করুন",
    policy: "কুকি পলিসি",
    necessaryTitle: "অপরিহার্য",
    necessaryDesc: "থিম, ভাষা ও সেশন। সবসময় চালু।",
    analyticsTitle: "অ্যানালিটিক্স",
    analyticsDesc: "Google Analytics 4 — কেউ কীভাবে সাইট ব্যবহার করে বুঝতে সাহায্য করে।",
    adsTitle: "বিজ্ঞাপন",
    adsDesc: "Google AdSense — প্রাসঙ্গিক বিজ্ঞাপন দেখাতে ও প্রজেক্ট সাপোর্ট করতে ব্যবহৃত।",
    always: "সবসময় চালু",
  },
} as const;

export function CookieConsentBanner() {
  const { language } = useLanguage();
  const t = COPY[language];
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(true);
  const [adsOn, setAdsOn] = useState(true);

  useEffect(() => {
    if (!hasUserChosen()) {
      // Small delay so it doesn't slam the user on first paint
      const id = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(id);
    }
  }, []);

  const finish = (choice: ConsentChoice) => {
    saveConsent(choice);
    applyConsentToGtag(choice);
    setVisible(false);
  };

  const acceptAll = () => finish({ analytics: true, ads: true });
  const rejectAll = () => finish({ analytics: false, ads: false });
  const saveCustom = () => finish({ analytics: analyticsOn, ads: adsOn });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t.title}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-3 left-3 right-3 sm:left-4 sm:right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-md z-[60]"
        >
          <div className="rounded-2xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-2xl border border-silk-rose/30 shadow-[0_20px_50px_-12px_rgba(43,24,16,0.35)] overflow-hidden">
            {/* Top accent */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-silk-rose to-transparent" />

            <div className="p-4 sm:p-5 space-y-3">
              {/* Header */}
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-9 h-9 rounded-xl bg-silk-rose/15 border border-silk-rose/30 flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-silk-rose" />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-[14px] sm:text-[15px] text-light-text dark:text-dark-text leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </div>

              {/* Customize panel */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-1">
                      {/* Necessary */}
                      <div className="flex items-start gap-3 p-2.5 rounded-xl bg-silk-rose/5 border border-silk-rose/15">
                        <Shield className="w-4 h-4 text-silk-wine/60 dark:text-silk-rose/60 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-semibold text-light-text dark:text-dark-text">{t.necessaryTitle}</span>
                            <span className="text-[9px] uppercase tracking-wider text-silk-rose font-semibold">{t.always}</span>
                          </div>
                          <p className="text-[10px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5 leading-relaxed">{t.necessaryDesc}</p>
                        </div>
                      </div>

                      {/* Analytics toggle */}
                      <Toggle
                        label={t.analyticsTitle}
                        desc={t.analyticsDesc}
                        checked={analyticsOn}
                        onChange={setAnalyticsOn}
                      />

                      {/* Ads toggle */}
                      <Toggle
                        label={t.adsTitle}
                        desc={t.adsDesc}
                        checked={adsOn}
                        onChange={setAdsOn}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {expanded ? (
                  <button
                    type="button"
                    onClick={saveCustom}
                    className="flex-1 min-w-[140px] h-10 rounded-xl bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[12px] font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {t.save}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={rejectAll}
                      className="flex-1 min-w-[120px] h-10 rounded-xl bg-silk-rose/10 border border-silk-rose/30 text-[12px] font-semibold text-silk-rose hover:bg-silk-rose/20 transition-all"
                    >
                      {t.rejectAll}
                    </button>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="flex-1 min-w-[120px] h-10 rounded-xl bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-[12px] font-semibold shadow-silk-soft hover:shadow-silk-deep transition-all"
                    >
                      {t.acceptAll}
                    </button>
                  </>
                )}
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-silk-rose hover:underline"
                >
                  {t.customize}
                  <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
                </button>
                <Link
                  to="/cookie-policy"
                  className="text-[11px] font-medium text-lightTextSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
                >
                  {t.policy}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Toggle({
  label, desc, checked, onChange,
}: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all",
        checked
          ? "bg-silk-rose/8 border-silk-rose/35"
          : "bg-silk-rose/5 border-silk-rose/15 hover:border-silk-rose/30"
      )}
    >
      <span
        className={cn(
          "mt-0.5 shrink-0 w-8 h-[18px] rounded-full transition-colors relative",
          checked ? "bg-silk-rose" : "bg-silk-rose/25"
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-all",
            checked ? "left-[16px]" : "left-[2px]"
          )}
        />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[12px] font-semibold text-light-text dark:text-dark-text">{label}</span>
        <span className="block text-[10px] text-lightTextSecondary dark:text-dark-textSecondary mt-0.5 leading-relaxed">{desc}</span>
      </span>
    </button>
  );
}
