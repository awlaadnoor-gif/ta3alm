import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Music, Video, Scissors, Trophy } from "lucide-react";
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

interface SectionTabsProps {
  lessonContent: React.ReactNode;
  videos?: Video[];
  craft?: Craft;
}

const SectionTabs = ({ lessonContent, videos = [], craft }: SectionTabsProps) => {
  return (
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
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <Music className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">ترانيم الدرس</h3>
          <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الترانيم قريباً</p>
        </div>
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

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
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
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <Trophy className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">مسابقات الدرس</h3>
          <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة المسابقات قريباً</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SectionTabs;
