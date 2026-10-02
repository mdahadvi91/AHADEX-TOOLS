/* ============================================================
 * Repeatable sections — CRUD + reorder helpers
 * Works for experience, education, skills, projects, etc.
 * ============================================================ */

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addItem<T extends { id: string }>(
  list: T[],
  defaultItem: Omit<T, "id">,
  prefix = "item"
): T[] {
  const newItem = { ...defaultItem, id: makeId(prefix) } as T;
  return [...list, newItem];
}

export function removeItem<T extends { id: string }>(
  list: T[],
  id: string
): T[] {
  return list.filter((item) => item.id !== id);
}

export function duplicateItem<T extends { id: string }>(
  list: T[],
  id: string,
  prefix = "item"
): T[] {
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) return list;
  const original = list[idx];
  const copy = { ...original, id: makeId(prefix) } as T;
  const next = [...list];
  next.splice(idx + 1, 0, copy);
  return next;
}

export function updateItem<T extends { id: string }>(
  list: T[],
  id: string,
  patch: Partial<T>
): T[] {
  return list.map((item) =>
    item.id === id ? { ...item, ...patch } : item
  );
}

export function moveItem<T extends { id: string }>(
  list: T[],
  id: string,
  direction: "up" | "down"
): T[] {
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) return list;
  const target = direction === "up" ? idx - 1 : idx + 1;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[idx], next[target]] = [next[target], next[idx]];
  return next;
}
