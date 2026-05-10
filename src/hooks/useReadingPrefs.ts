import { useEffect, useState } from "react";

export type ReadingPrefs = {
  lineHeight: number;
  fontSize: number;
};

export const DEFAULT_PREFS: ReadingPrefs = {
  lineHeight: 2,
  fontSize: 17,
};

const STORAGE_KEY = "curriculum-reading-prefs-v2";

export function useReadingPrefs() {
  const [prefs, setPrefs] = useState<ReadingPrefs>(() => {
    if (typeof window === "undefined") return DEFAULT_PREFS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PREFS;
      return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_PREFS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs]);

  const readingStyle: React.CSSProperties = {
    fontSize: `${prefs.fontSize}px`,
    lineHeight: prefs.lineHeight,
  };

  return { prefs, setPrefs, readingStyle };
}
