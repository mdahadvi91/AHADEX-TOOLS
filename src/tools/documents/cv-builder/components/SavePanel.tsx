import { useEffect, useState } from "react";
import {
  Save,
  Copy as CopyIcon,
  Download,
  Upload,
  Trash2,
  Check,
  FolderOpen,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import type { CVData } from "../types";
import {
  saveCV,
  loadCV,
  deleteCV,
  duplicateCV,
  exportCVJson,
  downloadBlob,
  parseImportedCV,
  getSavedCVs,
  createCV,
  type SavedCVMeta,
} from "../logic/cvStorage";

interface SavePanelProps {
  data: CVData;
  cvId: string | null;
  cvName: string;
  onChangeName: (name: string) => void;
  onCvIdChange: (id: string | null) => void;
  onDataChange: (data: CVData) => void;
  onError?: (msg: string) => void;
}

export function SavePanel({
  data,
  cvId,
  cvName,
  onChangeName,
  onCvIdChange,
  onDataChange,
  onError,
}: SavePanelProps) {
  const { language } = useLanguage();
  const bn = language === "bn";

  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState<SavedCVMeta[]>([]);

  const refreshRecent = () => setRecent(getSavedCVs().slice(0, 5));

  useEffect(() => {
    refreshRecent();
  }, [cvId]);

  const handleSave = () => {
    if (cvId) {
      saveCV(cvId, data, cvName);
    } else {
      const meta = saveCVSafe(data, cvName);
      onCvIdChange(meta.id);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
    refreshRecent();
  };

  const saveCVSafe = (d: CVData, name: string): SavedCVMeta => {
    // Small helper using the same public API
    
    return createCV(d, name);
  };

  const handleDuplicate = () => {
    if (!cvId) {
      onError?.(bn ? "আগে সেভ করুন।" : "Please save first.");
      return;
    }
    const meta = duplicateCV(cvId);
    if (meta) {
      onChangeName(meta.name);
      const loaded = loadCV(meta.id);
      if (loaded) onDataChange(loaded);
      onCvIdChange(meta.id);
      refreshRecent();
    }
  };

  const handleLoad = (id: string) => {
    const loaded = loadCV(id);
    if (!loaded) return;
    const meta = getSavedCVs().find((m) => m.id === id);
    onChangeName(meta?.name ?? "Untitled CV");
    onDataChange(loaded);
    onCvIdChange(id);
  };

  const handleDelete = (id: string) => {
    deleteCV(id);
    if (id === cvId) {
      onCvIdChange(null);
    }
    refreshRecent();
  };

  const handleExportJson = () => {
    const blob = exportCVJson(data);
    downloadBlob(blob, `${cvName || "cv"}.json`);
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const parsed = parseImportedCV(reader.result as string);
        if (!parsed) {
          onError?.(
            bn ? "ফাইলটা সঠিক CV JSON নয়।" : "File is not valid CV JSON."
          );
          return;
        }
        onDataChange(parsed);
        onCvIdChange(null);
        onChangeName(parsed.personal.fullName || "Imported CV");
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="space-y-3">
      {/* Name + save */}
      <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-2">
        <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60">
          {bn ? "CV নাম" : "CV name"}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={cvName}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={bn ? "আমার সিভি" : "My CV"}
            className={cn(
              "flex-1 h-9 px-3 rounded-lg text-[12px]",
              "bg-white/80 dark:bg-dark-surface/80",
              "border border-silk-rose/20 focus:border-silk-rose/50",
              "text-light-text dark:text-dark-text",
              "outline-none transition-all"
            )}
          />
          <button
            type="button"
            onClick={handleSave}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg shrink-0",
              "text-[12px] font-semibold transition-all",
              saved
                ? "bg-emerald-500 text-white"
                : "bg-silk-rose text-white hover:bg-silk-wine-deep"
            )}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                {bn ? "সেভ" : "Saved"}
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {bn ? "সেভ" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2">
        <ActionBtn onClick={handleDuplicate} icon={<CopyIcon className="w-3.5 h-3.5" />}>
          {bn ? "ডুপ্লিকেট" : "Duplicate"}
        </ActionBtn>
        <ActionBtn onClick={handleExportJson} icon={<Download className="w-3.5 h-3.5" />}>
          {bn ? "JSON এক্সপোর্ট" : "Export JSON"}
        </ActionBtn>
        <ActionBtn onClick={handleImportJson} icon={<Upload className="w-3.5 h-3.5" />}>
          {bn ? "JSON ইমপোর্ট" : "Import JSON"}
        </ActionBtn>
        <ActionBtn
          onClick={() => refreshRecent()}
          icon={<FolderOpen className="w-3.5 h-3.5" />}
        >
          {bn ? "রিফ্রেশ" : "Refresh"}
        </ActionBtn>
      </div>

      {/* Recent */}
      {recent.length > 0 && (
        <div className="rounded-xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 p-3 space-y-2">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-silk-wine/70 dark:text-silk-rose/60">
            {bn ? "সাম্প্রতিক" : "Recent"}
          </h4>
          <div className="space-y-1.5">
            {recent.map((r) => (
              <div
                key={r.id}
                className={cn(
                  "flex items-center justify-between gap-2 p-2 rounded-lg",
                  r.id === cvId
                    ? "bg-silk-rose/15 border border-silk-rose/40"
                    : "bg-silk-rose/5 border border-silk-rose/15"
                )}
              >
                <button
                  type="button"
                  onClick={() => handleLoad(r.id)}
                  className="flex-1 text-left min-w-0"
                >
                  <p className="text-[11px] font-medium text-light-text dark:text-dark-text truncate">
                    {r.name}
                  </p>
                  <p className="text-[9px] text-lightTextSecondary dark:text-dark-textSecondary">
                    {new Date(r.updatedAt).toLocaleDateString()}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-red-500 hover:bg-red-500/10 shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  onClick, icon, children,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-9 px-2 rounded-lg",
        "bg-silk-rose/8 border border-silk-rose/20",
        "text-[11px] font-medium text-silk-wine dark:text-silk-rose-soft",
        "hover:bg-silk-rose/15 hover:border-silk-rose/40 transition-all"
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
    </button>
  );
}
