import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Music, Video, Scissors } from "lucide-react";

interface SectionTabsProps {
  lessonContent: React.ReactNode;
}

const SectionTabs = ({ lessonContent }: SectionTabsProps) => {
  return (
    <Tabs defaultValue="lesson" dir="rtl" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-xl p-1 h-auto">
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
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <Video className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">فيديوهات الدرس</h3>
          <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الفيديوهات قريباً</p>
        </div>
      </TabsContent>

      <TabsContent value="crafts" className="mt-6">
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <Scissors className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">أشغال يدوية</h3>
          <p className="mt-2 text-sm text-muted-foreground/60">سيتم إضافة الأشغال اليدوية قريباً</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SectionTabs;
