import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Target, MessageCircle, Heart, ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="space-y-8">
      {/* Objective */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">🎯 الهدف</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{lesson.objective}</p>
      </motion.div>

      {/* Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-gradient-warm p-6 text-center shadow-warm"
      >
        <p className="text-lg font-bold leading-relaxed text-primary-foreground">
          📖 {lesson.verse}
        </p>
        {lesson.verseSmall && (
          <p className="text-sm leading-relaxed text-primary-foreground/80 mt-3">
            {lesson.verseSmall}
          </p>
        )}
      </motion.div>

      {/* Entry Activities */}
      {lesson.entryActivities && lesson.entryActivities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-accent/30 bg-accent/5 p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🎭</span>
            <h3 className="font-bold text-foreground">المدخل التشويقي</h3>
          </div>
          <div className="space-y-6">
            {lesson.entryActivities.map((activity, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-semibold text-sm text-accent-foreground">{activity.title}</h4>
                {activity.content.map((line, j) => (
                  <p key={j} className="text-sm leading-relaxed text-foreground/80 pr-4">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lesson Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">📝 الدرس</h3>
        </div>
        <div className="space-y-4">
          {lesson.content.map((paragraph, i) => (
            <p key={i} className="text-sm leading-loose text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Teacher Notes */}
      {lesson.teacherNotes && lesson.teacherNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📚</span>
            <h3 className="font-bold text-foreground">معلومات للمدرس</h3>
          </div>
          <div className="space-y-3">
            {lesson.teacherNotes.map((note, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/80">
                {note}
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Discussion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-secondary" />
          <h3 className="font-bold text-foreground">💬 التطبيق والمناقشة</h3>
        </div>
        <ol className="space-y-3 list-decimal list-inside">
          {lesson.discussion.map((q, i) => (
            <li key={i} className="text-sm leading-relaxed text-foreground/80">
              {q}
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Prayer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">🙏 الصلاة</h3>
        </div>
        <p className="text-base leading-loose text-foreground/80 italic">
          {lesson.prayer}
        </p>
        {lesson.prayerGuide && (
          <div className="mt-4 space-y-3 border-t border-primary/10 pt-4">
            <div>
              <h4 className="text-xs font-semibold text-primary mb-1">شجّع الأطفال:</h4>
              <p className="text-xs leading-relaxed text-foreground/70">{lesson.prayerGuide.encourage}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-primary mb-1">قُد الأطفال:</h4>
              <p className="text-xs leading-relaxed text-foreground/70">{lesson.prayerGuide.guide}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        {prevLesson ? (
          <Link
            to={`/curriculum/${curriculum.id}/lesson/${prevLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-card transition-all hover:shadow-warm"
          >
            <ChevronRight className="h-4 w-4" />
            الدرس السابق: {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            to={`/curriculum/${curriculum.id}/lesson/${nextLesson.id}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-card transition-all hover:shadow-warm"
          >
            الدرس التالي: {nextLesson.title}
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className={`bg-gradient-to-l ${colorClass}`}>
        <div className="container py-10">
          <Link
            to={`/curriculum/${curriculum.id}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            {curriculum.title}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm">
                <span className="text-2xl font-bold text-primary-foreground">{lesson.id}</span>
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">الدرس {lesson.id}</p>
                <h1 className="text-3xl font-bold text-primary-foreground">
                  {lesson.title}
                </h1>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-background/20 px-3 py-1 text-xs text-primary-foreground backdrop-blur-sm">
                ❌ الفكرة الخطأ: {lesson.wrongIdea}
              </span>
              <span className="rounded-full bg-background/20 px-3 py-1 text-xs text-primary-foreground backdrop-blur-sm">
                📖 {lesson.bibleReference}
              </span>
              <span className="rounded-full bg-background/20 px-3 py-1 text-xs text-primary-foreground backdrop-blur-sm">
                📚 {lesson.bibleStories}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content with Tabs */}
      <section className="container py-8">
        <SectionTabs lessonContent={lessonContent} />
      </section>
    </div>
  );
};

export default LessonPage;
