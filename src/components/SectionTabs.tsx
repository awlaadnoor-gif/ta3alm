import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Music, Video, Scissors, Trophy, Maximize2, Download } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

interface Video {
  title: string;
  description: string;
  url: string;
}

interface Craft {
  title: string;
  idea: string;
  image: string;
  tools: string[];
  steps: string[];
}

interface Hymn {
  title: string;
  lines?: string[];
  image?: string;
}

interface Quiz {
  title: string;
  image: string;
}

interface SectionTabsProps {
  lessonContent: React.ReactNode;
  videos?: Video[];
  craft?: Craft;
  hymns?: Hymn[];
  quizzes?: Quiz[];
}

const SectionTabs = ({ lessonContent, videos = [], craft, hymns = [], quizzes = [] }: SectionTabsProps) => {
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  const downloadFile = (src: string, name: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = name + (src.match(/\.[a-z0-9]+$/i)?.[0] || "");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  return (
    <>
    <Tabs defaultValue="lesson" dir="rtl" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-muted/50 rounded-xl p-1 h-auto">
        <TabsTrigger value="lesson" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-card">
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">الدرس</span>
        </TabsTrigger>
        <TabsTrigger value="hymns" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-card">
          <Music className="h-4 w-4" />
          <span className="hidden sm:inline">ترانيم</span>
        </TabsTrigger>
        <TabsTrigger value="videos" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-card">
          <Video className="h-4 w-4" />
          <span className="hidden sm:inline">فيديوهات</span>
        </TabsTrigger>
        <TabsTrigger value="crafts" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-card">
          <Scissors className="h-4 w-4" />
          <span className="hidden sm:inline">أشغال</span>
        </TabsTrigger>
        <TabsTrigger value="quizzes" className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-card">
          <Trophy className="h-4 w-4" />
          <span className="hidden sm:inline">مسابقات</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="lesson" className="mt-6">
        {lessonContent}
      </TabsContent>

      <TabsContent value="hymns" className="mt-6">
        {hymns.length > 0 ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            {hymns.map((h, i) => (
              <div key={i} className="rounded-3xl border border-border bg-gradient-to-br from-card to-muted/20 overflow-hidden shadow-card">
                <div className="flex items-center justify-between gap-3 px-7 py-5 bg-primary/5 border-b border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Music className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground truncate">{h.title}</h3>
                  </div>
                  {h.image && (
                    <button
                      type="button"
                      onClick={() => downloadFile(h.image!, h.title)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                      تنزيل
                    </button>
                  )}
                </div>
                {h.image && (
                  <button
                    type="button"
                    onClick={() => setZoomImage({ src: h.image!, title: h.title })}
                    className="group relative block w-full bg-background"
                  >
                    <img src={h.image} alt={h.title} className="w-full object-contain max-h-[1400px] mx-auto" loading="lazy" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow-card opacity-80 group-hover:opacity-100 transition">
                      <Maximize2 className="h-3.5 w-3.5" />
                      تكبير
                    </div>
                  </button>
                )}
                {h.lines && (
                  <div className="space-y-3 p-7">
                    {h.lines.map((line, j) => (
                      <p key={j} className="text-base leading-[2] text-foreground/85">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Music className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-muted-foreground">ترانيم الدرس</h3>
            <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الترانيم قريباً</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="videos" className="mt-6">
        {videos.length > 0 ? (
          <div className="space-y-6">
            {videos.map((video, i) => (
              <VideoPlayer key={i} title={video.title} description={video.description} url={video.url} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Video className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-muted-foreground">فيديوهات الدرس</h3>
            <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الفيديوهات قريباً</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="crafts" className="mt-6">
        {craft ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-gradient-warm p-8 text-center shadow-warm">
              <p className="text-sm text-primary-foreground/80 mb-2">الشغل اليدوي</p>
              <h3 className="text-3xl font-bold text-primary-foreground">{craft.title}</h3>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card relative">
              <button
                type="button"
                onClick={() => downloadFile(craft.image, craft.title)}
                className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition shadow-card"
              >
                <Download className="h-3.5 w-3.5" />
                تنزيل
              </button>
              <img src={craft.image} alt={craft.title} className="w-full rounded-xl object-contain max-h-[700px] mx-auto" />
            </div>

            <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-7 shadow-card">
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2">💡 فكرة النشاط</h4>
              <p className="text-base leading-[1.9] text-foreground/85">{craft.idea}</p>
            </div>

            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-7 shadow-card">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">✂️ الأدوات</h4>
              <div className="flex flex-wrap gap-3">
                {craft.tools.map((tool, i) => (
                  <span key={i} className="rounded-full bg-background px-4 py-2 text-sm font-medium border border-border shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h4 className="text-xl font-bold mb-5 flex items-center gap-2">⚙️ طريقة العمل</h4>
              <ol className="space-y-4">
                {craft.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-base leading-[1.9] text-foreground/85 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Scissors className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-muted-foreground">أشغال يدوية</h3>
            <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الأشغال اليدوية قريباً</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="quizzes" className="mt-6">
        {quizzes.length > 0 ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            {quizzes.map((q, i) => (
              <div key={i} className="rounded-3xl border border-border bg-gradient-to-br from-card to-muted/20 overflow-hidden shadow-card">
                <div className="flex items-center justify-between gap-3 px-7 py-5 bg-accent/10 border-b border-border">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20">
                      <Trophy className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground truncate">{q.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadFile(q.image, q.title)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-background border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    تنزيل
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomImage({ src: q.image, title: q.title })}
                  className="group relative block w-full bg-background"
                >
                  <img src={q.image} alt={q.title} className="w-full object-contain max-h-[1400px] mx-auto" loading="lazy" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow-card opacity-80 group-hover:opacity-100 transition">
                    <Maximize2 className="h-3.5 w-3.5" />
                    تكبير
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-semibold text-muted-foreground">مسابقات الدرس</h3>
            <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة المسابقات قريباً</p>
          </div>
        )}
      </TabsContent>
    </Tabs>

    <Dialog open={!!zoomImage} onOpenChange={(open) => !open && setZoomImage(null)}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 overflow-auto" dir="rtl">
        <DialogTitle className="sr-only">{zoomImage?.title}</DialogTitle>
        {zoomImage && (
          <img src={zoomImage.src} alt={zoomImage.title} className="w-full h-auto object-contain" />
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default SectionTabs;
