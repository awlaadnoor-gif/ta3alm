import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, Sparkles } from "lucide-react";

interface LessonCardProps {
  lessonId: number;
  title: string;
  wrongIdea?: string;
  bibleStories: string;
  curriculumId: string;
  index: number;
  variant?: "default" | "positive";
}

const lessonColors = [
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-blue-700",
  "from-fuchsia-500 to-purple-700",
  "from-cyan-500 to-teal-600",
];

const lessonTextColors = [
  "text-orange-600",
  "text-blue-600",
  "text-teal-600",
  "text-purple-600",
  "text-pink-600",
  "text-indigo-600",
  "text-fuchsia-600",
  "text-cyan-600",
];

const LessonCard = ({ lessonId, title, wrongIdea, bibleStories, curriculumId, index, variant = "default" }: LessonCardProps) => {
  const isPositive = variant === "positive" || !wrongIdea;
  const gradient = lessonColors[index % lessonColors.length];
  const textColor = lessonTextColors[index % lessonTextColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link
        to={`/curriculum/${curriculumId}/lesson/${lessonId}`}
        className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
      >
        <div className={`bg-gradient-to-l ${gradient} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/20 backdrop-blur-sm">
                <span className="text-lg font-bold text-primary-foreground">{lessonId}</span>
              </div>
              <span className="text-sm font-medium text-primary-foreground/80">اليوم</span>
            </div>
            {isPositive ? (
              <Sparkles className="h-5 w-5 text-primary-foreground/90" />
            ) : (
              <div className="rounded-full bg-background/20 px-3 py-1 backdrop-blur-sm">
                <span className="text-xs font-medium text-primary-foreground">
                  ✅ {title}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          {isPositive ? (
            <h3 className={`mb-3 text-xl font-bold leading-tight ${textColor}`}>
              {title}
            </h3>
          ) : (
            <h3 className={`mb-2 text-2xl font-bold ${textColor}`}>
              ❌ {wrongIdea}
            </h3>
          )}
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
