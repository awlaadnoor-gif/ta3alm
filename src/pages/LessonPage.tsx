import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Target, MessageCircle, Heart, ChevronLeft, ChevronRight, Lightbulb, Theater } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import Header from "@/components/Header";
import SectionTabs from "@/components/SectionTabs";
import SceneDisplay from "@/components/SceneDisplay";
import BibleReferenceViewer from "@/components/BibleReferenceViewer";
import ReadingPrefsBar from "@/components/ReadingPrefsBar";
import { useReadingPrefs } from "@/hooks/useReadingPrefs";
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
  const { prefs, setPrefs, readingStyle } = useReadingPrefs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

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

  // Detect if a paragraph contains a heading (text before "—" that's short enough)
  const parseContentParagraph = (text: string): { heading: string | null; body: string } => {
    const dashIndex = text.indexOf('—');
    if (dashIndex > 0 && dashIndex < 100) {
      const beforeDash = text.substring(0, dashIndex).trim();
      const afterDash = text.substring(dashIndex + 1).trim();
      if (beforeDash.length < 100 && afterDash.length > 0) {
        return { heading: beforeDash, body: afterDash };
      }
    }
    // Check for المشهد patterns
    const sceneMatch = text.match(/^(المشهد\s+[^:]+):\s*(.+)/s);
    if (sceneMatch) {
      return { heading: sceneMatch[1], body: sceneMatch[2] };
    }
    return { heading: null, body: text };
  };

  const lessonContent = (
    <div className="space-y-10 max-w-4xl mx-auto" style={readingStyle}>
      {/* Reading preferences (font / size / line-spacing) */}
      <div className="rounded-2xl border border-border bg-card/60 px-4 py-3 shadow-sm">
        <ReadingPrefsBar prefs={prefs} setPrefs={setPrefs} />
      </div>

      {/* Objective */}
      <motion.div {...sectionAnim(0.1)} className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-7 shadow-card">
        <SectionHeader icon={Target} emoji="🎯" title="الهدف" />
        <div className="space-y-3 pr-2">
          {lesson.objective.map((point, i) => {
            if (point.startsWith('::section::')) {
              const title = point.replace('::section::', '').trim();
              return (
                <h4 key={i} className="text-lg font-bold text-primary border-r-4 border-primary pr-3 pt-4">
                  {title}
                </h4>
              );
            }
            if (point.startsWith('::bold::')) {
              const text = point.replace('::bold::', '').trim();
              return (
                <p key={i} className="text-base font-bold leading-relaxed text-foreground/90 pr-4 pt-2">
                  {text}
                </p>
              );
            }
            return (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/70" />
                <span className="text-foreground/85">{point}</span>
              </div>
            );
          })}
        </div>
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

      {/* Teacher Notes - FIRST */}
      {lesson.teacherNotes && lesson.teacherNotes.length > 0 && (
        <motion.div {...sectionAnim(0.25)} className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-7 shadow-card">
          <SectionHeader icon={Lightbulb} emoji="📚" title="معلومات للمدرس" />
          <div className="space-y-5">
            {lesson.teacherNotes.map((note, i) => {
              // Section header
              if (note.startsWith('::section::')) {
                const title = note.replace('::section::', '').trim();
                return (
                  <h4 key={i} className="text-lg font-bold text-primary border-r-4 border-primary pr-3 pt-4">
                    {title}
                  </h4>
                );
              }
              // Q&A question
              if (note.startsWith('::qa::')) {
                const question = note.replace('::qa::', '').trim();
                return (
                  <div key={i} className="rounded-xl bg-primary/10 border border-primary/20 px-5 py-3 mt-4">
                    <p className="text-base font-bold text-primary">{question}</p>
                  </div>
                );
              }
              // Note/warning
              if (note.startsWith('::note::')) {
                const text = note.replace('::note::', '').trim();
                return (
                  <div key={i} className="rounded-xl bg-accent/10 border border-accent/30 px-5 py-3">
                    <p className="text-sm font-medium text-accent-foreground">⚠️ {text}</p>
                  </div>
                );
              }
              // Highlight
              if (note.startsWith('::highlight::')) {
                const text = note.replace('::highlight::', '').trim();
                return (
                  <div key={i} className="rounded-xl bg-gradient-warm p-5 text-center mt-2">
                    <p className="text-lg font-bold text-primary-foreground leading-loose">{text}</p>
                  </div>
                );
              }
              // Bullet points
              if (note.startsWith('•')) {
                return (
                  <div key={i} className="flex items-start gap-3 pr-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/70" />
                    <span className="text-foreground/85 font-medium">{note.substring(1).trim()}</span>
                  </div>
                );
              }
              // Regular paragraph
              return (
                <p key={i} className="text-foreground/80">
                  {note}
                </p>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Entry Activities - AFTER Teacher Notes */}
      {lesson.entryActivities && lesson.entryActivities.length > 0 && (
        <motion.div {...sectionAnim(0.3)} className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-7 shadow-card">
          <SectionHeader emoji="🎭" title="المدخل التشويقي" />
          <div className="space-y-7">
            {lesson.entryActivities.map((activity, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-base text-accent-foreground border-r-4 border-accent pr-3">{activity.title}</h4>
                {activity.content.map((line, j) => (
                  <p key={j} className="text-foreground/80 pr-6">
                    {line}
                  </p>
                ))}
                {activity.videoUrl && (
                  <div className="mt-4">
                    <VideoPlayer
                      title={activity.title}
                      description=""
                      url={activity.videoUrl}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scenes (Dramatic) */}
      {lesson.scenes && lesson.scenes.length > 0 && (
        <motion.div {...sectionAnim(0.32)} className="rounded-2xl border-2 border-violet-200 bg-violet-50/30 p-7 shadow-card">
          <SectionHeader icon={Theater} emoji="🎭" title="الاسكتش التمثيلي — مفيبوشث" />
          <SceneDisplay scenes={lesson.scenes} />
        </motion.div>
      )}

      {/* Lesson Content */}
      <motion.div {...sectionAnim(0.35)} className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <SectionHeader icon={BookOpen} emoji="📝" title="الدرس" />
        <div className="space-y-5">
          {lesson.content.map((paragraph, i) => {
            // Section header
            if (paragraph.startsWith('::section::')) {
              const title = paragraph.replace('::section::', '').trim();
              return (
                <h4 key={i} className="text-lg font-bold text-primary border-r-4 border-primary pr-3 pt-4">
                  {title}
                </h4>
              );
            }
            
            const { heading, body } = parseContentParagraph(paragraph);
            const isVerse = paragraph.startsWith('«') || paragraph.startsWith('"') || paragraph.startsWith('\"');
            
            if (isVerse) {
              return (
                <div key={i} className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center">
                  <p className="text-lg font-bold leading-loose text-foreground/90">{paragraph}</p>
                </div>
              );
            }
            
            if (heading) {
              return (
                <div key={i} className="space-y-3">
                  <h4 className="text-lg font-bold text-primary border-r-4 border-primary pr-3 pt-4">
                    {heading}
                  </h4>
                  <p className="text-foreground/85">{body}</p>
                </div>
              );
            }
            
            return (
              <p key={i} className="text-foreground/85">
                {paragraph}
              </p>
            );
          })}
        </div>
      </motion.div>

      {/* Discussion */}
      <motion.div {...sectionAnim(0.4)} className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <SectionHeader icon={MessageCircle} emoji="💬" title="التطبيق والمناقشة" />
        <div className="space-y-4">
          {(() => {
            let questionNumber = 0;
            return lesson.discussion.map((q, i) => {
              if (q.endsWith(':')) {
                return (
                  <h4 key={i} className="text-lg font-bold text-primary border-r-4 border-primary pr-3 pt-4">
                    {q.replace(/:$/, '')}
                  </h4>
                );
              }
              if (q.includes('→')) {
                return (
                  <div key={i} className="flex items-start gap-3 pr-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/70" />
                    <span className="text-foreground/85 font-medium">{q}</span>
                  </div>
                );
              }
              if (q.startsWith('يمكن للمعلم')) {
                return (
                  <div key={i} className="rounded-xl bg-accent/10 border border-accent/30 px-5 py-3 mt-4">
                    <p className="text-sm font-medium text-accent-foreground">💡 {q}</p>
                  </div>
                );
              }
              questionNumber++;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{questionNumber}</span>
                  <span className="text-foreground/85 pt-0.5">{q}</span>
                </div>
              );
            });
          })()}
        </div>
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
                <p className="text-base text-primary-foreground/70">اليوم {lesson.id}</p>
                {curriculum.id === "find-truth-2025" || !lesson.wrongIdea ? (
                  <h1 className="text-4xl font-bold text-primary-foreground mb-1">
                    {lesson.title}
                  </h1>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-primary-foreground mb-1">
                      ❌ {lesson.wrongIdea}
                    </h1>
                    <p className="text-xl text-primary-foreground/70">
                      ✅ {lesson.title}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <BibleReferenceViewer reference={lesson.bibleReference} />
              <span className="rounded-full bg-background/20 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
                📚 {lesson.bibleStories}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content with Tabs */}
      <section className="container py-10">
        <SectionTabs lessonContent={lessonContent} videos={lesson.videos} craft={lesson.craft} hymns={lesson.hymns} quizzes={lesson.quizzes} />
      </section>
    </div>
  );
};

export default LessonPage;
