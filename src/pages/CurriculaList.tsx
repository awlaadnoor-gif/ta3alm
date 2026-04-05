import { motion } from "framer-motion";
import Header from "@/components/Header";
import CurriculumCard from "@/components/CurriculumCard";
import { curricula } from "@/data/curricula";
import { Clock } from "lucide-react";

const CurriculaList = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground">جميع المناهج</h1>
          <p className="mt-2 text-muted-foreground">تصفح مناهج مدارس الأحد لجميع السنوات</p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curricula.map((c, i) => (
            <CurriculumCard key={c.id} curriculum={c} index={i} />
          ))}
        </div>

        {/* Placeholder for future curricula */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center"
        >
          <Clock className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-lg font-semibold text-muted-foreground">مناهج سابقة</h3>
          <p className="mt-1 text-sm text-muted-foreground/60">
            سيتم إضافة مناهج السنوات السابقة هنا تباعاً
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default CurriculaList;
