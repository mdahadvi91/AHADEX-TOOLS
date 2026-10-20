import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";

import { getCVTemplate, SAMPLE_CV_DATA } from "../data";
import { PROFESSION_PRESETS } from "../presets";
import { useDraftAutoSave, loadDraft, clearDraft } from "../logic/draftRecovery";
import type { CVData } from "../types";

import { CVPreview } from "../components/CVPreview";
import { PrintRoot } from "../components/PrintRoot";
import { ExportPanel } from "../components/ExportPanel";

export function CVEditor() {
  const { templateId } = useParams<{ templateId: string }>();
  const { language, t } = useLanguage();
  const template = useMemo(() => getCVTemplate(templateId ?? "cv-ats-cleanline"), [templateId]);

    const draftOverrideStr = sessionStorage.getItem("cv_draft_override");
  const [data, setData] = useState<CVData>(() => {
    let baseData = {
      ...SAMPLE_CV_DATA,
      settings: { ...SAMPLE_CV_DATA.settings, templateId: template.id },
    };

    if (draftOverrideStr) {
      try {
        const parsed = JSON.parse(draftOverrideStr);
        return {
          ...baseData,
          ...parsed,
          settings: { 
            ...baseData.settings, 
            ...(parsed.settings || {}), 
            photoEnabled: parsed.personal?.photoDataUrl ? true : baseData.settings.photoEnabled 
          },
          personal: { ...baseData.personal, ...(parsed.personal || {}) },
        };
      } catch (e) {
        console.error("Failed to parse wizard data", e);
      }
    }

    const presetKey = sessionStorage.getItem("cv_preset");
    if (presetKey && PROFESSION_PRESETS[presetKey]) {
      const preset = PROFESSION_PRESETS[presetKey];
      sessionStorage.removeItem("cv_preset");
      return {
        ...baseData,
        ...preset,
        settings: baseData.settings,
      };
    }

    return baseData;
  });

  const [isFromWizard] = useState(!!draftOverrideStr);

  const [cvId, setCvId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recoveredDraft, setRecoveredDraft] = useState<{
    data: CVData;
    cvId: string | null;
    savedAt: number;
  } | null>(null);

  useEffect(() => {
    if (isFromWizard) {
      sessionStorage.removeItem("cv_draft_override");
      return;
    }
    const draft = loadDraft();
    if (!draft) return;
    const hasContent =
      draft.data.personal?.fullName ||
      draft.data.summary ||
      draft.data.experience?.length > 0 ||
      draft.data.education?.length > 0;
    if (!hasContent) {
      clearDraft();
      return;
    }
    setRecoveredDraft(draft);
  }, [isFromWizard]);

  useDraftAutoSave({ data, cvId, enabled: !recoveredDraft });

  const acceptRecovery = () => {
    if (!recoveredDraft) return;
    setData({
      ...SAMPLE_CV_DATA,
      ...recoveredDraft.data,
      settings: { ...SAMPLE_CV_DATA.settings, ...(recoveredDraft.data.settings || {}), templateId: template.id }
    });
    setCvId(recoveredDraft.cvId);
    setRecoveredDraft(null);
    clearDraft();
  };

  const dismissRecovery = () => {
    setRecoveredDraft(null);
    clearDraft();
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-light-text dark:text-dark-text">Template not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-5 lg:px-8 py-4 sm:py-8">
      {recoveredDraft && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-silk-rose/15 to-silk-gold/10 border border-silk-rose/30 p-3 sm:p-4 flex items-start gap-3">
          <RotateCcw className="w-4 h-4 text-silk-rose shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-light-text dark:text-dark-text mb-0.5">
              {language === "bn" ? "অসমাপ্ত CV পাওয়া গেছে" : "Unsaved draft found"}
            </p>
            <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
              {new Date(recoveredDraft.savedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button type="button" onClick={acceptRecovery} className="px-3 py-1.5 rounded-lg bg-silk-rose text-white text-[11px] font-semibold hover:bg-silk-wine-deep transition-colors">
              {language === "bn" ? "পুনরুদ্ধার" : "Recover"}
            </button>
            <button type="button" onClick={dismissRecovery} className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-dark-surface/60 border border-silk-rose/25 text-[11px] font-medium text-light-textSecondary hover:text-silk-rose transition-colors">
              {language === "bn" ? "বাদ দিন" : "Dismiss"}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <Link to="/tools/cv-builder" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.common.back}
        </Link>
        <div className="flex items-center gap-2 text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          {language === "bn" ? template.nameBn : template.name}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full rounded-2xl bg-silk-rose/5 border border-silk-rose/15 p-3 sm:p-6 flex flex-col items-center">
          <div className="w-full mb-3 flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60">
              {language === "bn" ? "চূড়ান্ত প্রিভিউ" : "Final Preview"}
            </span>
            <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary">
              {data.settings.pageSize} · {data.settings.fontFamily} · {data.settings.fontSize}pt
            </span>
          </div>

          <div className="w-full overflow-x-auto flex justify-center pb-4">
             <CVPreview Template={template.Component} data={data} scale={0.85} />
          </div>
        </div>

        <div className="w-full max-w-md">
          <ExportPanel data={data} />
        </div>
      </div>

      <PrintRoot Template={template.Component} data={data} />

      {error && (
        <div role="alert" onClick={() => setError(null)} className={cn("fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl flex items-start gap-2 cursor-pointer", "bg-silk-rose text-white text-xs font-medium shadow-silk-deep max-w-xs")}>
          <span className="flex-1">{error}</span>
          <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        </div>
      )}
    </div>
  );
}
