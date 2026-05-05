import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Loader2 } from "lucide-react";
import { parseReferences, fetchPassage, type ParsedRef, type BollsVerse } from "@/lib/bibleBooks";

interface PassageResult {
  ref: ParsedRef;
  chapters: { chapter: number; verses: BollsVerse[] }[];
  error?: string;
}

interface Props {
  reference: string;
  className?: string;
}

const BibleReferenceViewer = ({ reference, className = "" }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PassageResult[]>([]);

  const handleOpen = async () => {
    setOpen(true);
    if (results.length > 0) return;
    setLoading(true);
    const refs = parseReferences(reference);
    const data: PassageResult[] = await Promise.all(
      refs.map(async (r) => {
        try {
          const chapters = await fetchPassage(r);
          return { ref: r, chapters };
        } catch (e: any) {
          return { ref: r, chapters: [], error: e?.message || "خطأ في تحميل النص" };
        }
      })
    );
    setResults(data);
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm transition-all hover:bg-background/30 hover:shadow-warm cursor-pointer ${className}`}
        title="اضغط لقراءة النص الكتابي - ترجمة فاندايك"
      >
        <BookOpen className="h-4 w-4" />
        📖 {reference}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">
              {reference}
              <span className="block text-sm font-normal text-muted-foreground mt-1">
                ترجمة فاندايك (الكتاب المقدس)
              </span>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[65vh] pr-2">
            {loading && (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin ml-2" />
                جارٍ تحميل النص...
              </div>
            )}

            {!loading && results.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                تعذّر تحليل المرجع الكتابي.
              </p>
            )}

            <div className="space-y-8 py-4">
              {results.map((r, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-lg font-bold text-primary border-r-4 border-primary pr-3">
                    {r.ref.bookName} {r.ref.chapter}
                    {r.ref.endChapter ? `-${r.ref.endChapter}` : ""}
                    {r.ref.verses && !r.ref.endChapter
                      ? `: ${r.ref.verses[0]}${r.ref.verses.length > 1 ? `-${r.ref.verses[r.ref.verses.length - 1]}` : ""}`
                      : ""}
                  </h3>
                  {r.error && <p className="text-sm text-destructive">{r.error}</p>}
                  {r.chapters.map((c, j) => (
                    <div key={j} className="space-y-2">
                      {r.chapters.length > 1 && (
                        <h4 className="text-base font-semibold text-foreground/80">
                          الإصحاح {c.chapter}
                        </h4>
                      )}
                      <p className="text-base leading-[2.2] text-foreground/90">
                        {c.verses.map((v) => (
                          <span key={v.pk}>
                            <sup className="text-primary font-bold mx-1">{v.verse}</sup>
                            {v.text}{" "}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BibleReferenceViewer;
