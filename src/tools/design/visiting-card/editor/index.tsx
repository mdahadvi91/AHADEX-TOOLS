import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { Canvas } from "./Canvas";
import { TextPanel } from "./panels/TextPanel";
import { LogoPanel } from "./panels/LogoPanel";
import { ExportPanel } from "./panels/ExportPanel";
import { EditorInfo } from "./EditorInfo";
import { getTemplate } from "../templates";
import { DEFAULT_USER_DATA } from "../types";
import type { UserData } from "../types";

export function Editor() {
  const { templateId } = useParams<{ templateId: string }>();
  const { language } = useLanguage();
  const template = getTemplate(templateId ?? "template-01");

  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] px-2.5 sm:px-5 lg:px-8 py-3 sm:py-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-end gap-2 mb-3 sm:mb-5">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-light-textSecondary dark:text-dark-textSecondary">
          <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
          <span className="truncate max-w-[140px] sm:max-w-none">
            {language === "bn" ? template.nameBn : template.name}
          </span>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden grid grid-cols-[38%_1fr] gap-2 items-start">
        <aside className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-2">
          <h2 className="text-[8px] uppercase tracking-wider text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-1.5">
            {language === "bn" ? "তথ্য" : "Details"}
          </h2>
          <TextPanel userData={userData} onChange={setUserData} />
        </aside>

        <main className="space-y-2">
          <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-2">
            <LogoPanel userData={userData} onChange={setUserData} onError={setError} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-silk-rose/5 border border-silk-rose/15 p-1.5">
              <div className="flex items-center gap-1 mb-1 px-0.5">
                <span className="px-1.5 py-0.5 rounded-full bg-silk-rose text-white text-[7px] font-bold uppercase tracking-wider">
                  {language === "bn" ? "সামনে" : "Front"}
                </span>
                <span className="h-px flex-1 bg-silk-rose/20" />
              </div>
              <Canvas template={template} side="front" sizeId="standard" userData={userData} />
            </div>
            <div className="rounded-xl bg-silk-rose/5 border border-silk-rose/15 p-1.5">
              <div className="flex items-center gap-1 mb-1 px-0.5">
                <span className="px-1.5 py-0.5 rounded-full bg-silk-wine-deep text-white text-[7px] font-bold uppercase tracking-wider">
                  {language === "bn" ? "পিছনে" : "Back"}
                </span>
                <span className="h-px flex-1 bg-silk-rose/20" />
              </div>
              <Canvas template={template} side="back" sizeId="standard" userData={userData} />
            </div>
          </div>

          <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-2">
            <ExportPanel template={template} sizeId="standard" userData={userData} />
          </div>
        </main>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-[340px_1fr_260px] gap-5 items-start">
        <aside className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 lg:sticky lg:top-24 space-y-5">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
              {language === "bn" ? "তথ্য" : "Details"}
            </h2>
            <TextPanel userData={userData} onChange={setUserData} />
          </div>
          <div className="h-px bg-silk-rose/15" />
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
              {language === "bn" ? "লোগো" : "Logo"}
            </h2>
            <LogoPanel userData={userData} onChange={setUserData} onError={setError} />
          </div>
        </aside>

        <main className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/15 p-3">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-silk-rose text-white text-[10px] font-bold uppercase tracking-wider">
                  {language === "bn" ? "সামনে" : "Front"}
                </span>
                <span className="h-px flex-1 bg-silk-rose/20" />
              </div>
              <Canvas template={template} side="front" sizeId="standard" userData={userData} />
            </div>
            <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/15 p-3">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-silk-wine-deep text-white text-[10px] font-bold uppercase tracking-wider">
                  {language === "bn" ? "পিছনে" : "Back"}
                </span>
                <span className="h-px flex-1 bg-silk-rose/20" />
              </div>
              <Canvas template={template} side="back" sizeId="standard" userData={userData} />
            </div>
          </div>
        </main>

        <aside className="rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-4 lg:sticky lg:top-24">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold mb-3">
            {language === "bn" ? "ডাউনলোড" : "Download"}
          </h2>
          <ExportPanel template={template} sizeId="standard" userData={userData} />
        </aside>
      </div>

      {/* ─── INFO SECTIONS (below editor) ─── */}
      <div className="px-1 sm:px-0">
        <EditorInfo />
      </div>

      {/* Error toast */}
      {error && (
        <div
          role="alert"
          onClick={() => setError(null)}
          className={cn(
            "fixed bottom-4 right-4 z-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl",
            "bg-silk-rose text-white text-[10px] sm:text-xs font-medium shadow-silk-deep cursor-pointer"
          )}
        >
          {error}
        </div>
      )}
    </div>
  );
}
