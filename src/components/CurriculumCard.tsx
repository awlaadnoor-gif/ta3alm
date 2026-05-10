import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronLeft, Clock } from "lucide-react";
import type { Curriculum } from "@/data/curricula";
import { renderColoredMarks } from "@/lib/colorMarks";

interface CurriculumCardProps {
  curriculum: Curriculum;
  index: number;
}

const CurriculumCard = ({ curriculum, index }: CurriculumCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Link
        to={`/curriculum/${curriculum.id}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
      >
        <div className="bg-gradient-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground font-amiri">
                {renderColoredMarks(curriculum.title)}
              </h3>
              <span className="text-sm text-primary-foreground/80">{curriculum.year}</span>
            </div>
            {curriculum.isActive && (
              <span className="rounded-full bg-background/20 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                المنهج الحالي ✨
              </span>
            )}
          </div>
        </div>
        <div className="p-5">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {curriculum.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {curriculum.lessons.length} دروس
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              عرض المنهج
              <ChevronLeft className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CurriculumCard;
