import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, User, FileText, Briefcase, GraduationCap,
  Wrench, FolderKanban, Palette, RotateCcw, X,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { PersonalForm } from "../components/PersonalForm";
import { SummaryForm } from "../components/SummaryForm";
import { ExperienceForm } from "../components/ExperienceForm";
import { EducationForm } from "../components/EducationForm";
import { SkillsForm } from "../components/SkillsForm";
import { ProjectsForm } from "../components/ProjectsForm";
import { DesignPanel } from "../components/DesignPanel";
import { CVPreview } from "../components/CVPreview";
import { PrintRoot } from "../components/PrintRoot";
import { ExportPanel } from "../components/ExportPanel";
import { SavePanel } from "../components/SavePanel";
import { getCVTemplate, SAMPLE_CV_DATA } from "../data";
import { updatePersonal, updateSummary } from "../logic/stateHelpers";
import { useDraftAutoSave, loadDraft, clearDraft } from "../logic/draftRecovery";
import type {
  CVData, CVExperience, CVEducation, CVSkill, CVProject, CVSettings,
} from "../types";

type SectionId =
  | "personal" | "summary" | "experience" | "education"
  | "skills" | "projects" | "design" | "save";

const SECTIONS: {
  id: SectionId;
  icon: typeof User;
  labelEn: string;
  labelBn: string;
}[] = [
  { id: "personal", icon: User, labelEn: "Personal", labelBn: "ব্যক্তিগত" },
  { id: "summary", icon: FileText, labelEn: "Summary", labelBn: "সারাংশ" },
  { id: "experience", icon: Briefcase, labelEn: "Experience", labelBn: "অভিজ্ঞতা" },
  { id: "education", icon: GraduationCap, labelEn: "Education", labelBn: "শিক্ষা" },
  { id: "skills", icon: Wrench, labelEn: "Skills", labelBn: "স্কিল" },
  { id: "projects", icon: FolderKanban, labelEn: "Projects", labelBn: "প্রজেক্ট" },
  { id: "design", icon: Palette, labelEn: "Design", labelBn: "ডিজাইন" },
];

export function CVEditor() {
  const { templateId } = useParams<{ templateId: string }>();
  const { language, t } = useLanguage();

  const template = useMemo(
    () => getCVTemplate(templateId ?? "cv-ats-cleanline"),
    [templateId]
  );

  const [data, setData] = useState<CVData>(() => ({
    ...SAMPLE_CV_DATA,
    settings: { ...SAMPLE_CV_DATA.settings, templateId: template.id },
  }));

  const [cvId, setCvId] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string>("Untitled CV");
  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [error, setError] = useState<string | null>(null);
  const [recoveredDraft, setRecoveredDraft] = useState<{
    data: CVData;
    cvId: string | null;
    savedAt: number;
  } | null>(null);

  useEffect(() => {
    const draft = loadDraft();
    if (!draft) return;
    const hasContent =
      draft.data.personal.fullName ||
      draft.data.summary ||
      draft.data.experience.length > 0 ||
      draft.data.education.length > 0;
    if (!hasContent) {
      clearDraft();
      return;
    }
    setRecoveredDraft(draft);
  }, []);

  useDraftAutoSave({
    data,
    cvId,
    enabled: !recoveredDraft,
  });

  const acceptRecovery = () => {
    if (!recoveredDraft) return;
    setData(recoveredDraft.data);
    setCvId(recoveredDraft.cvId);
    setRecoveredDraft(null);
    clearDraft();
  };

  const dismissRecovery = () => {
    setRecoveredDraft(null);
    clearDraft();
  };

  const updateSettings = (patch: Partial<CVSettings>) =>
    setData((d) => ({ ...d, settings: { ...d.settings, ...patch } }));

  const updatePhoto = (photoDataUrl: string | null) =>
    setData((d) => ({ ...d, personal: { ...d.personal, photoDataUrl } }));

  return (
    <div className="mx-auto max-w-[1600px] px-3 sm:px-5 lg:px-8 py-4 sm:py-6">
      {recoveredDraft && (
        <div className="mb-4 rounded-2xl bg-gradient-to-r from-silk-rose/15 to-silk-gold/10 border border-silk-rose/30 p-3 sm:p-4 flex items-start gap-3">
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
            <button
              type="button"
              onClick={acceptRecovery}
              className="px-3 py-1.5 rounded-lg bg-silk-rose text-white text-[11px] font-semibold hover:bg-silk-wine-deep transition-colors"
            >
              {language === "bn" ? "পুনরুদ্ধার" : "Recover"}
            </button>
            <button
              type="button"
              onClick={dismissRecovery}
              className="px-3 py-1.5 rounded-lg bg-white/60 dark:bg-dark-surface/60 border border-silk-rose/25 text-[11px] font-medium text-light-textSecondary hover:text-silk-rose transition-colors"
            >
              {language === "bn" ? "বাদ দিন" : "Dismiss"}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <Link
          to="/tools/cv-builder"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {t.common.back}
        </Link>
        <div className="flex items-center gap-2 text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          {language === "bn" ? template.nameBn : template.name}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 lg:gap-6 items-start">
        <aside className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const active = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all",
                    active
                      ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-silk-soft"
                      : "bg-silk-rose/8 border border-silk-rose/25 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/50"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {language === "bn" ? s.labelBn : s.labelEn}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setActiveSection("save")}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all ml-auto",
                activeSection === "save"
                  ? "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white shadow-silk-soft"
                  : "bg-silk-rose/8 border border-silk-rose/25 text-light-textSecondary dark:text-dark-textSecondary hover:border-silk-rose/50"
              )}
            >
              {language === "bn" ? "সেভ" : "Save"}
            </button>
          </div>

          <div className="pt-1">
            {activeSection === "personal" && (
              <PersonalForm
                personal={data.personal}
                onChange={(patch) => setData((d) => updatePersonal(d, patch))}
              />
            )}
            {activeSection === "summary" && (
              <SummaryForm
                value={data.summary}
                onChange={(v) => setData((d) => updateSummary(d, v))}
              />
            )}
            {activeSection === "experience" && (
              <ExperienceForm
                items={data.experience}
                onChange={(next: CVExperience[]) =>
                  setData((d) => ({ ...d, experience: next }))
                }
              />
            )}
            {activeSection === "education" && (
              <EducationForm
                items={data.education}
                onChange={(next: CVEducation[]) =>
                  setData((d) => ({ ...d, education: next }))
                }
              />
            )}
            {activeSection === "skills" && (
              <SkillsForm
                items={data.skills}
                onChange={(next: CVSkill[]) =>
                  setData((d) => ({ ...d, skills: next }))
                }
              />
            )}
            {activeSection === "projects" && (
              <ProjectsForm
                items={data.projects}
                onChange={(next: CVProject[]) =>
                  setData((d) => ({ ...d, projects: next }))
                }
              />
            )}
            {activeSection === "design" && (
              <DesignPanel
                data={data}
                onSettingsChange={updateSettings}
                onPersonalPhotoChange={updatePhoto}
                onError={setError}
              />
            )}
            {activeSection === "save" && (
              <SavePanel
                data={data}
                cvId={cvId}
                cvName={cvName}
                onChangeName={setCvName}
                onCvIdChange={setCvId}
                onDataChange={setData}
                onError={setError}
              />
            )}
          </div>
        </aside>

        <main className="space-y-4">
          <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/15 p-3 sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60">
                {language === "bn" ? "লাইভ প্রিভিউ" : "Live preview"}
              </span>
              <span className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary">
                {data.settings.pageSize} · {data.settings.fontFamily} · {data.settings.fontSize}pt
              </span>
            </div>
            <CVPreview Template={template.Component} data={data} scale={0.72} />
          </div>

          <ExportPanel data={data} />
        </main>
      </div>

      <PrintRoot Template={template.Component} data={data} />

      {error && (
        <div
          role="alert"
          onClick={() => setError(null)}
          className={cn(
            "fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-xl flex items-start gap-2 cursor-pointer",
            "bg-silk-rose text-white text-xs font-medium shadow-silk-deep max-w-xs"
          )}
        >
          <span className="flex-1">{error}</span>
          <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        </div>
      )}
    </div>
  );
}
