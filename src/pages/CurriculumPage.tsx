import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { getCurriculumById } from "@/data/curricula";

const CurriculumPage = () => {
  const { id } = useParams<{ id: string }>();
  const curriculum = getCurriculumById(id || "");

  if (!curriculum) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">المنهج غير موجود</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-warm">
        <div className="container py-12">
          <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowRight className="h-4 w-4" />
            الرئيسية
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-amiri text-4xl font-bold text-primary-foreground">
                {curriculum.title}
              </h1>
              <span className="rounded-full bg-background/20 px-3 py-1 text-sm text-primary-foreground backdrop-blur-sm">
                {curriculum.year}
              </span>
            </div>
            <p className="max-w-2xl text-primary-foreground/80 leading-relaxed">
              {curriculum.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <h2 className="mb-3 font-amiri text-xl font-bold text-foreground">نظرة عامة عن المنهج</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {curriculum.overview}
          </p>
        </motion.div>
      </section>

      {/* Lessons */}
      <section className="container pb-16">
        <h2 className="mb-6 font-amiri text-2xl font-bold text-foreground">الدروس</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              lessonId={lesson.id}
              title={lesson.title}
              wrongIdea={lesson.wrongIdea}
              bibleStories={lesson.bibleStories}
              curriculumId={curriculum.id}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CurriculumPage;
