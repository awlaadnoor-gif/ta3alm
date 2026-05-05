// Map Arabic book names (Van Dyke) to bolls.life book IDs
export const BIBLE_BOOKS: { id: number; names: string[] }[] = [
  { id: 1, names: ["تكوين", "تك"] },
  { id: 2, names: ["خروج", "خر"] },
  { id: 3, names: ["لاويين", "لا"] },
  { id: 4, names: ["عدد", "عد"] },
  { id: 5, names: ["تثنية", "تث"] },
  { id: 6, names: ["يشوع", "يش"] },
  { id: 7, names: ["قضاة", "قض"] },
  { id: 8, names: ["راعوث", "را"] },
  { id: 9, names: ["1 صموئيل", "1صموئيل", "1 صم", "1صم", "صموئيل الأول", "صموئيل الاول"] },
  { id: 10, names: ["2 صموئيل", "2صموئيل", "2 صم", "2صم", "صموئيل الثاني"] },
  { id: 11, names: ["1 ملوك", "1ملوك", "1 مل", "1مل", "ملوك الأول", "ملوك الاول"] },
  { id: 12, names: ["2 ملوك", "2ملوك", "2 مل", "2مل", "ملوك الثاني"] },
  { id: 13, names: ["1 أخبار", "1أخبار", "1 اخبار", "1 أيام", "1أيام", "1 أخ", "1أخ", "أخبار الأيام الأول"] },
  { id: 14, names: ["2 أخبار", "2أخبار", "2 اخبار", "2 أيام", "2أيام", "2 أخ", "2أخ", "أخبار الأيام الثاني"] },
  { id: 15, names: ["عزرا", "عز"] },
  { id: 16, names: ["نحميا", "نح"] },
  { id: 17, names: ["أستير", "استير", "أس"] },
  { id: 18, names: ["أيوب", "ايوب", "أي"] },
  { id: 19, names: ["مزامير", "المزامير", "مز"] },
  { id: 20, names: ["أمثال", "امثال", "أم"] },
  { id: 21, names: ["جامعة", "الجامعة", "جا"] },
  { id: 22, names: ["نشيد الأنشاد", "نشيد", "نش"] },
  { id: 23, names: ["إشعياء", "اشعياء", "إش", "اش"] },
  { id: 24, names: ["إرميا", "ارميا", "إر", "ار"] },
  { id: 25, names: ["مراثي", "مراثي إرميا", "مرا"] },
  { id: 26, names: ["حزقيال", "حز"] },
  { id: 27, names: ["دانيال", "دا"] },
  { id: 28, names: ["هوشع", "هو"] },
  { id: 29, names: ["يوئيل", "يوء"] },
  { id: 30, names: ["عاموس", "عا"] },
  { id: 31, names: ["عوبديا", "عو"] },
  { id: 32, names: ["يونان", "يون"] },
  { id: 33, names: ["ميخا", "مي"] },
  { id: 34, names: ["ناحوم", "نا"] },
  { id: 35, names: ["حبقوق", "حب"] },
  { id: 36, names: ["صفنيا", "صف"] },
  { id: 37, names: ["حجي", "حج"] },
  { id: 38, names: ["زكريا", "زك"] },
  { id: 39, names: ["ملاخي", "ملا"] },
  { id: 40, names: ["متى", "مت"] },
  { id: 41, names: ["مرقس", "مر"] },
  { id: 42, names: ["لوقا", "لو"] },
  { id: 43, names: ["يوحنا", "يو"] },
  { id: 44, names: ["أعمال", "اعمال", "أعمال الرسل", "أع", "اع"] },
  { id: 45, names: ["رومية", "رو"] },
  { id: 46, names: ["1 كورنثوس", "1كورنثوس", "1 كو", "1كو", "كورنثوس الأولى"] },
  { id: 47, names: ["2 كورنثوس", "2كورنثوس", "2 كو", "2كو", "كورنثوس الثانية"] },
  { id: 48, names: ["غلاطية", "غل"] },
  { id: 49, names: ["أفسس", "افسس", "أف", "اف"] },
  { id: 50, names: ["فيلبي", "في"] },
  { id: 51, names: ["كولوسي", "كو"] },
  { id: 52, names: ["1 تسالونيكي", "1تسالونيكي", "1 تس", "1تس"] },
  { id: 53, names: ["2 تسالونيكي", "2تسالونيكي", "2 تس", "2تس"] },
  { id: 54, names: ["1 تيموثاوس", "1تيموثاوس", "1 تي", "1تي"] },
  { id: 55, names: ["2 تيموثاوس", "2تيموثاوس", "2 تي", "2تي"] },
  { id: 56, names: ["تيطس", "تي"] },
  { id: 57, names: ["فليمون", "فل"] },
  { id: 58, names: ["عبرانيين", "العبرانيين", "عب"] },
  { id: 59, names: ["يعقوب", "يع"] },
  { id: 60, names: ["1 بطرس", "1بطرس", "1 بط", "1بط"] },
  { id: 61, names: ["2 بطرس", "2بطرس", "2 بط", "2بط"] },
  { id: 62, names: ["1 يوحنا", "1يوحنا", "1 يو", "1يو"] },
  { id: 63, names: ["2 يوحنا", "2يوحنا", "2 يو", "2يو"] },
  { id: 64, names: ["3 يوحنا", "3يوحنا", "3 يو", "3يو"] },
  { id: 65, names: ["يهوذا", "يه"] },
  { id: 66, names: ["رؤيا", "الرؤيا", "رؤ"] },
];

const normalize = (s: string) =>
  s
    .replace(/[\u064B-\u0652]/g, "") // diacritics
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim();

export interface ParsedRef {
  bookId: number;
  bookName: string;
  chapter: number;
  endChapter?: number;
  verses?: number[]; // explicit verse range, when provided
  raw: string;
}

const findBook = (text: string): { id: number; name: string; rest: string } | null => {
  const norm = normalize(text);
  let best: { id: number; name: string; len: number } | null = null;
  for (const b of BIBLE_BOOKS) {
    for (const n of b.names) {
      const nn = normalize(n);
      if (norm.startsWith(nn) && (!best || nn.length > best.len)) {
        best = { id: b.id, name: b.names[0], len: nn.length };
      }
    }
  }
  if (!best) return null;
  // find rest by mapping length back roughly
  const rest = norm.slice(best.len).trim();
  return { id: best.id, name: best.name, rest };
};

const arabicToInt = (s: string): number => {
  const map: Record<string, string> = { "٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9" };
  return parseInt(s.replace(/[٠-٩]/g, d => map[d]), 10);
};

const parseSegment = (raw: string): ParsedRef | null => {
  // Strip parentheses content boundaries but keep inner
  const cleaned = raw.replace(/[()]/g, " ").trim();
  if (!cleaned) return null;
  const found = findBook(cleaned);
  if (!found) return null;
  const rest = found.rest;
  // Patterns: "4", "4-5", "4:1-10", "4: 40", "1: 40"
  const m = rest.match(/^([٠-٩\d]+)\s*(?::\s*([٠-٩\d]+)(?:\s*-\s*([٠-٩\d]+))?)?(?:\s*-\s*([٠-٩\d]+))?/);
  if (!m) return null;
  const chapter = arabicToInt(m[1]);
  const v1 = m[2] ? arabicToInt(m[2]) : undefined;
  const v2 = m[3] ? arabicToInt(m[3]) : undefined;
  const ch2 = m[4] ? arabicToInt(m[4]) : undefined;
  const ref: ParsedRef = { bookId: found.id, bookName: found.name, chapter, raw };
  if (v1 !== undefined) {
    const end = v2 ?? v1;
    ref.verses = [];
    for (let i = v1; i <= end; i++) ref.verses.push(i);
  } else if (ch2 !== undefined) {
    ref.endChapter = ch2;
  }
  return ref;
};

export const parseReferences = (input: string): ParsedRef[] => {
  // Split by separators: / , ، -  but not inside ranges. Use / , ، as primary separators.
  const parts = input.split(/[\/،,]+/).map(s => s.trim()).filter(Boolean);
  const refs: ParsedRef[] = [];
  for (const p of parts) {
    const r = parseSegment(p);
    if (r) refs.push(r);
  }
  return refs;
};

export interface BollsVerse {
  pk: number;
  verse: number;
  text: string;
}

export const fetchPassage = async (ref: ParsedRef): Promise<{ chapter: number; verses: BollsVerse[] }[]> => {
  const chapters: number[] = [];
  const start = ref.chapter;
  const end = ref.endChapter ?? ref.chapter;
  for (let c = start; c <= end; c++) chapters.push(c);

  const results = await Promise.all(
    chapters.map(async (c) => {
      const url = `https://bolls.life/get-text/SVD/${ref.bookId}/${c}/`;
      const res = await fetch(url);
      const data: BollsVerse[] = await res.json();
      let verses = data;
      if (ref.verses && c === ref.chapter && !ref.endChapter) {
        const set = new Set(ref.verses);
        verses = data.filter(v => set.has(v.verse));
      }
      // Strip HTML tags from text
      verses = verses.map(v => ({ ...v, text: v.text.replace(/<[^>]+>/g, "").trim() }));
      return { chapter: c, verses };
    })
  );
  return results;
};
