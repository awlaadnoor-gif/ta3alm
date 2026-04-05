import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft } from "lucide-react";

interface LessonCardProps {
  lessonId: number;
  title: string;
  wrongIdea: string;
  bibleStories: string;
  curriculumId: string;
  index: number;
}

const lessonColors = [
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
];

const LessonCard = ({ lessonId, title, wrongIdea, bibleStories, curriculumId, index }: LessonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/curriculum/${curriculumId}/lesson/${lessonId}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
      >
        <div className={`bg-gradient-to-l ${lessonColors[index % lessonColors.length]} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/20 backdrop-blur-sm">
                <span className="text-lg font-bold text-primary-foreground">{lessonId}</span>
              </div>
              <span className="text-sm font-medium text-primary-foreground/80">اليوم</span>
            </div>
            <div className="rounded-full bg-background/20 px-3 py-1 backdrop-blur-sm">
              <span className="text-xs font-medium text-primary-foreground">
                ✅ {title}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            <span className="text-base font-medium text-muted-foreground">❌ {wrongIdea}</span>
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{bibleStories}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">اقرأ اليوم</span>
            <ChevronLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LessonCard;
