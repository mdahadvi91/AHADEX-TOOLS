import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) setStored(JSON.parse(item) as T);
    } catch {
      /* ignore */
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStored((prev) => {
          const next =
            typeof value === "function"
              ? (value as (p: T) => T)(prev)
              : value;
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
          return next;
        });
      } catch {
        /* ignore */
      }
    },
    [key]
  );

  return [stored, setValue];
}
