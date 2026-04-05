import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { getActiveCurriculum } from "@/data/curricula";
import heroBg from "@/assets/curriculum-cover.jpg";

const Index = () => {
  const activeCurriculum = getActiveCurriculum();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-contain object-center bg-foreground" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-l from-foreground/70 via-foreground/40 to-foreground/70" />
        </div>
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">منهج {activeCurriculum?.year}</span>
            </div>
            <h1 className="mb-4 font-amiri text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              مدارس الأحد
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              {activeCurriculum?.description}
            </p>
            {activeCurriculum && (
              <Link
                to={`/curriculum/${activeCurriculum.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-warm px-6 py-3 text-base font-semibold text-primary-foreground shadow-warm transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                ابدأ المنهج الحالي: {activeCurriculum.title}
                <ChevronLeft className="h-5 w-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Active Curriculum Lessons */}
      {activeCurriculum && (
        <section className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <h2 className="font-amiri text-3xl font-bold text-foreground">
                {activeCurriculum.title} — دروس المنهج
              </h2>
              <p className="mt-2 text-muted-foreground">
                أفكار خاطئة عن الله نصححها معاً
              </p>
            </div>
            <Link
              to={`/curriculum/${activeCurriculum.id}`}
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all md:flex"
            >
              عرض الكل
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCurriculum.lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lessonId={lesson.id}
                title={lesson.title}
                wrongIdea={lesson.wrongIdea}
                bibleStories={lesson.bibleStories}
                curriculumId={activeCurriculum.id}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Coming Soon */}
      <section className="border-t border-border bg-muted/30">
        <div className="container py-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h2 className="mt-4 font-amiri text-2xl font-bold text-foreground">
              مناهج سابقة
            </h2>
            <p className="mt-2 text-muted-foreground">
              سيتم إضافة مناهج السنوات السابقة قريباً
            </p>
            <Link
              to="/curricula"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-card transition-all hover:shadow-warm hover:-translate-y-0.5"
            >
              تصفح كل المناهج
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-amiri text-base">مدارس الأحد — نتعلم ونلعب مع الله ✝️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
