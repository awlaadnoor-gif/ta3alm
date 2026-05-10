import { useEffect, useState } from "react";

export const FONT_OPTIONS = [
  { key: "tajawal", label: "Tajawal", stack: "'Tajawal', system-ui, sans-serif" },
  { key: "cairo", label: "Cairo", stack: "'Cairo', system-ui, sans-serif" },
  { key: "naskh", label: "نسخ", stack: "'Noto Naskh Arabic', serif" },
  { key: "amiri", label: "Amiri", stack: "'Amiri', serif" },
] as const;

export type ReadingPrefs = {
  font: string;
  lineHeight: number;
  fontSize: number;
};

export const DEFAULT_PREFS: ReadingPrefs = {
  font: "tajawal",
  lineHeight: 2,
  fontSize: 17,
};

const STORAGE_KEY = "curriculum-reading-prefs-v1";

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

  const fontStack =
    FONT_OPTIONS.find((f) => f.key === prefs.font)?.stack ?? FONT_OPTIONS[0].stack;

  const readingStyle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `${prefs.fontSize}px`,
    lineHeight: prefs.lineHeight,
  };

  return { prefs, setPrefs, readingStyle };
}
