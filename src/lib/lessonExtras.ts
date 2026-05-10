import { curriculumSections } from "@/data/curriculumSections";

export interface LessonExtra {
  title: string;
  paragraphs: string[];
}

export interface LessonExtras {
  sketch?: LessonExtra;
  hymn?: LessonExtra;
  bulletin?: LessonExtra;
}

/**
 * Splits a long text into segments at the start of each match of `marker`.
 * The match itself stays at the beginning of the corresponding segment.
 * Returns segments WITHOUT the leading intro (text before the first marker).
 */
const splitAtMarkers = (text: string, marker: RegExp, minGap = 0): string[] => {
  const re = new RegExp(marker.source, marker.flags.includes("g") ? marker.flags : marker.flags + "g");
  const indices: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (indices.length === 0 || m.index - indices[indices.length - 1] >= minGap) {
      indices.push(m.index);
    }
    if (m.index === re.lastIndex) re.lastIndex++;
  }
  const parts: string[] = [];
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1] : text.length;
    parts.push(text.slice(start, end).trim());
  }
  return parts;
};

const toParagraphs = (segment: string): string[] =>
  segment
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

let cache: Record<number, LessonExtras> | null = null;

const buildFindTruth2025 = (): Record<number, LessonExtras> => {
  const sections = curriculumSections["find-truth-2025"];
  if (!sections) return {};

  const result: Record<number, LessonExtras> = {};

  // ---- Hymns: 8 opportunities → 8 lessons ----
  const hymnsAll = sections.hymns?.paragraphs.join("\n\n") ?? "";
  const hymnMarker = /الفرصة\s+(?:الأولي|الأولى|الثانية|الثلاثة|الثالثة|الرابعة|الخامسة|السادسة|السابعة|الثامنة)/;
  const hymnParts = splitAtMarkers(hymnsAll, hymnMarker);

  // ---- Sketches: 4 episodes (Bible) + 4 episodes (God) = 8 ----
  const sketchAll = sections.sketches?.paragraphs.join("\n\n") ?? "";
  const sketchMarker = /الحلقة\s+(?:الأولى|الأولي|الثانية|الثلاثة|الثالثة|الرابعة)/;
  const sketchParts = splitAtMarkers(sketchAll, sketchMarker);

  // ---- Bulletin: 8 days ----
  const bulletinAll = sections.bulletin?.paragraphs.join("\n\n") ?? "";
  const bulletinMarker = /اليوم\s+(?:الأول|الثاني|الثالث|الثلاث|الرابع|الخامس|السادس|السابع|الثامن)\s*[:：]/;
  const bulletinParts = splitAtMarkers(bulletinAll, bulletinMarker);

  for (let day = 1; day <= 8; day++) {
    const idx = day - 1;
    result[day] = {
      hymn: hymnParts[idx]
        ? { title: `فرصة الترانيم — اليوم ${day}`, paragraphs: toParagraphs(hymnParts[idx]) }
        : undefined,
      sketch: sketchParts[idx]
        ? { title: `الاسكتش التمثيلي — اليوم ${day}`, paragraphs: toParagraphs(sketchParts[idx]) }
        : undefined,
      bulletin: bulletinParts[idx]
        ? { title: `النشرة اليومية — اليوم ${day}`, paragraphs: toParagraphs(bulletinParts[idx]) }
        : undefined,
    };
  }
  return result;
};

export const getLessonExtras = (curriculumId: string, lessonId: number): LessonExtras => {
  if (curriculumId !== "find-truth-2025") return {};
  if (!cache) cache = buildFindTruth2025();
  return cache[lessonId] ?? {};
};
