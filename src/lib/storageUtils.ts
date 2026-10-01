export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch { return fallback; }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },

  getString(key: string, fallback = ""): string {
    if (typeof window === "undefined") return fallback;
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  },

  setString(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(key, value); } catch {}
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try { localStorage.removeItem(key); } catch {}
  },

  clear(prefix = "ahadex-"): void {
    if (typeof window === "undefined") return;
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) keys.push(k);
      }
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {}
  },
};
