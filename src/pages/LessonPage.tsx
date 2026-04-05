import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Target, MessageCircle, Heart, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import SectionTabs from "@/components/SectionTabs";
import { getCurriculumById } from "@/data/curricula";

const lessonColors = [
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
];

const sectionAnim = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
});

const SectionHeader = ({ icon: Icon, emoji, title, className = "" }: { icon?: any; emoji: string; title: string; className?: string }) => (
  <div className={`flex items-center gap-3 mb-5 ${className}`}>
    {Icon && <Icon className="h-6 w-6 text-primary" />}
    <h3 className="text-xl font-bold text-foreground">{emoji} {title}</h3>
  </div>
);

const LessonPage = () => {
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const curriculum = getCurriculumById(id || "");
  const lesson = curriculum?.lessons.find((l) => l.id === Number(lessonId));

  if (!curriculum || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">الدرس غير موجود</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const lessonIndex = curriculum.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = curriculum.lessons[lessonIndex - 1];
  const nextLesson = curriculum.lessons[lessonIndex + 1];
  const colorClass = lessonColors[lessonIndex % lessonColors.length];

  const lessonContent = (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Objective */}
      <motion.div {...sectionAnim(0.1)} className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-7 shadow-card">
        <SectionHeader icon={Target} emoji="🎯" title="الهدف" />
        <ul className="space-y-3 pr-2">
          {lesson.objective.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/70" />
              <span className="text-base leading-relaxed text-foreground/85">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Verse */}
      <motion.div {...sectionAnim(0.2)} className="rounded-2xl bg-gradient-warm p-8 text-center shadow-warm">
        <p className="text-xl font-bold leading-loose text-primary-foreground">
          📖 {lesson.verse}
        </p>
        {lesson.verseSmall && (
          <p className="text-base leading-relaxed text-primary-foreground/80 mt-4">
            {lesson.verseSmall}
          </p>
        )}
      </motion.div>

      {/* Entry Activities */}
      {lesson.entryActivities && lesson.entryActivities.length > 0 && (
        <motion.div {...sectionAnim(0.25)} className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-7 shadow-card">
          <SectionHeader emoji="🎭" title="المدخل التشويقي" />
          <div className="space-y-7">
            {lesson.entryActivities.map((activity, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-base text-accent-foreground border-r-4 border-accent pr-3">{activity.title}</h4>
                {activity.content.map((line, j) => (
                  <p key={j} className="text-base leading-relaxed text-foreground/80 pr-6">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lesson Content */}
      <motion.div {...sectionAnim(0.3)} className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <SectionHeader icon={BookOpen} emoji="📝" title="الدرس" />
        <div className="space-y-5">
          {lesson.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-[2] text-foreground/85">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Teacher Notes */}
      {lesson.teacherNotes && lesson.teacherNotes.length > 0 && (
        <motion.div {...sectionAnim(0.35)} className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-7 shadow-card">
          <SectionHeader icon={Lightbulb} emoji="📚" title="معلومات للمدرس" />
          <div className="space-y-4">
            {lesson.teacherNotes.map((note, i) => (
              <p key={i} className="text-base leading-[1.9] text-foreground/80">
                {note}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Discussion */}
      <motion.div {...sectionAnim(0.4)} className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <SectionHeader icon={MessageCircle} emoji="💬" title="التطبيق والمناقشة" />
        <ol className="space-y-4 list-decimal list-inside">
          {lesson.discussion.map((q, i) => (
            <li key={i} className="text-base leading-relaxed text-foreground/85 marker:font-bold marker:text-primary">
              {q}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Prayer */}
      <motion.div {...sectionAnim(0.5)} className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-7">
        <SectionHeader icon={Heart} emoji="🙏" title="الصلاة" />
        {lesson.prayerGuide && (
          <div className="space-y-5">
            <div>
              <h4 className="text-base font-bold text-primary mb-2">شجّع الأطفال:</h4>
              <p className="text-lg leading-loose text-foreground/85">{lesson.prayerGuide.encourage}</p>
            </div>
            <div>
              <h4 className="text-base font-bold text-primary mb-2">قُد الأطفال:</h4>
              <p className="text-lg leading-loose text-foreground/85">{lesson.prayerGuide.guide}</p>
            </div>
            <div>
              <h4 className="text-base font-bold text-primary mb-2">اختم الصلاة:</h4>
              <p className="text-lg leading-loose text-foreground/85 italic">{lesson.prayerGuide.closing}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 gap-4">
        {prevLesson ? (
          <Link
            to={`/curriculum/${curriculum.id}/lesson/${prevLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-base font-medium text-foreground shadow-card transition-all hover:shadow-warm hover:-translate-y-0.5"
          >
            <ChevronRight className="h-5 w-5" />
            الدرس السابق: {prevLesson.title}
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link
            to={`/curriculum/${curriculum.id}/lesson/${nextLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-base font-medium text-foreground shadow-card transition-all hover:shadow-warm hover:-translate-y-0.5"
          >
            الدرس التالي: {nextLesson.title}
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className={`bg-gradient-to-l ${colorClass}`}>
        <div className="container py-12">
          <Link
            to={`/curriculum/${curriculum.id}`}
            className="mb-5 inline-flex items-center gap-1 text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
            {curriculum.title}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm">
                <span className="text-3xl font-bold text-primary-foreground">{lesson.id}</span>
              </div>
              <div>
                <p className="text-base text-primary-foreground/70">الدرس {lesson.id}</p>
                <h1 className="text-4xl font-bold text-primary-foreground">
                  {lesson.title}
                </h1>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="rounded-full bg-background/20 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
                ❌ الفكرة الخطأ: {lesson.wrongIdea}
              </span>
              <span className="rounded-full bg-background/20 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
                📖 {lesson.bibleReference}
              </span>
              <span className="rounded-full bg-background/20 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
                📚 {lesson.bibleStories}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content with Tabs */}
      <section className="container py-10">
        <SectionTabs lessonContent={lessonContent} />
      </section>
    </div>
  );
};

export default LessonPage;
