import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { getCurriculumById } from "@/data/curricula";
import { curriculumSections } from "@/data/curriculumSections";

const CurriculumSectionPage = () => {
  const { id, sectionKey } = useParams<{ id: string; sectionKey: string }>();
  const curriculum = getCurriculumById(id || "");
  const section = id && sectionKey ? curriculumSections[id]?.[sectionKey] : undefined;

  if (!curriculum || !section) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">القسم غير موجود</h1>
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

      <section className="bg-gradient-warm">
        <div className="container py-10">
          <Link
            to={`/curriculum/${curriculum.id}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            {curriculum.title}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">{section.title}</h1>
            <p className="mt-2 max-w-2xl text-primary-foreground/85 leading-relaxed">
              {section.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container py-10">
        <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-10 shadow-card space-y-5">
          {section.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
              className="text-[15px] leading-[2] text-foreground/85 whitespace-pre-line"
            >
              {p}
            </motion.p>
          ))}
        </article>
      </section>
    </div>
  );
};

export default CurriculumSectionPage;
