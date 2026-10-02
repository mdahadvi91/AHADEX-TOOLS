import type { CVData } from "../types";

/* ============================================================
 * CV Storage — localStorage
 * ------------------------------------------------------------
 * Storage keys:
 *   ahadex-cv-index         → list of saved CV metadata
 *   ahadex-cv-<id>          → full CVData JSON
 *   ahadex-cv-draft         → current unsaved draft (recovery)
 * ============================================================ */

const INDEX_KEY = "ahadex-cv-index";
const CV_KEY_PREFIX = "ahadex-cv-";
const DRAFT_KEY = "ahadex-cv-draft";

export interface SavedCVMeta {
  id: string;
  name: string;
  templateId: string;
  updatedAt: number;
  createdAt: number;
}

/* ============================================================
 * INDEX (list of saved CVs)
 * ============================================================ */

export function getSavedCVs(): SavedCVMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as SavedCVMeta[]).sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

function writeIndex(list: SavedCVMeta[]): void {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(list));
  } catch {
    /* quota exceeded or unavailable */
  }
}

/* ============================================================
 * CREATE / SAVE / LOAD / DELETE
 * ============================================================ */

function makeId(): string {
  return `cv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createCV(data: CVData, name?: string): SavedCVMeta {
  const id = makeId();
  const now = Date.now();
  const cvName = name || data.personal.fullName || "Untitled CV";
  const meta: SavedCVMeta = {
    id,
    name: cvName,
    templateId: data.settings.templateId,
    createdAt: now,
    updatedAt: now,
  };

  try {
    localStorage.setItem(`${CV_KEY_PREFIX}${id}`, JSON.stringify(data));
    writeIndex([meta, ...getSavedCVs()]);
  } catch {
    /* ignore */
  }

  return meta;
}

export function saveCV(id: string, data: CVData, name?: string): void {
  const now = Date.now();
  const list = getSavedCVs();
  const idx = list.findIndex((m) => m.id === id);

  const meta: SavedCVMeta = {
    id,
    name: name || data.personal.fullName || "Untitled CV",
    templateId: data.settings.templateId,
    createdAt: idx >= 0 ? list[idx].createdAt : now,
    updatedAt: now,
  };

  try {
    localStorage.setItem(`${CV_KEY_PREFIX}${id}`, JSON.stringify(data));
    if (idx >= 0) {
      list[idx] = meta;
    } else {
      list.unshift(meta);
    }
    writeIndex(list);
  } catch {
    /* ignore */
  }
}

export function loadCV(id: string): CVData | null {
  try {
    const raw = localStorage.getItem(`${CV_KEY_PREFIX}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as CVData;
  } catch {
    return null;
  }
}

export function deleteCV(id: string): void {
  try {
    localStorage.removeItem(`${CV_KEY_PREFIX}${id}`);
    const list = getSavedCVs().filter((m) => m.id !== id);
    writeIndex(list);
  } catch {
    /* ignore */
  }
}

export function duplicateCV(id: string): SavedCVMeta | null {
  const data = loadCV(id);
  if (!data) return null;
  const original = getSavedCVs().find((m) => m.id === id);
  const copyName = original ? `${original.name} (copy)` : "Untitled CV (copy)";
  return createCV(data, copyName);
}

export function renameCV(id: string, name: string): void {
  const list = getSavedCVs();
  const idx = list.findIndex((m) => m.id === id);
  if (idx < 0) return;
  list[idx] = { ...list[idx], name, updatedAt: Date.now() };
  writeIndex(list);
}

/* ============================================================
 * DRAFT (auto-recovery)
 * ============================================================ */

export interface DraftData {
  cvId: string | null;
  data: CVData;
  savedAt: number;
}

export function saveDraft(draft: DraftData): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

export function loadDraft(): DraftData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DraftData;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/* ============================================================
 * EXPORT / IMPORT JSON
 * ============================================================ */

export function exportCVJson(data: CVData): Blob {
  return new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseImportedCV(json: string): CVData | null {
  try {
    const parsed = JSON.parse(json) as CVData;
    // Basic validation
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.personal || typeof parsed.personal !== "object") return null;
    if (!parsed.settings || typeof parsed.settings !== "object") return null;
    if (!Array.isArray(parsed.experience)) return null;
    if (!Array.isArray(parsed.education)) return null;
    return parsed;
  } catch {
    return null;
  }
}
