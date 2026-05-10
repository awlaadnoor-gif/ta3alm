import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ArrowRight, Theater, Music, FileText, BookmarkCheck } from "lucide-react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { getCurriculumById } from "@/data/curricula";
import { curriculumSections } from "@/data/curriculumSections";

const SECTION_ICONS: Record<string, typeof Theater> = {
  sketches: Theater,
  hymns: Music,
  bulletin: FileText,
  conclusion: BookmarkCheck,
};

const SECTION_GRADIENTS: Record<string, string> = {
  sketches: "from-fuchsia-500 to-purple-600",
  hymns: "from-amber-500 to-rose-500",
  bulletin: "from-sky-500 to-cyan-600",
  conclusion: "from-emerald-500 to-teal-600",
};

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
              <h1 className="text-4xl font-bold text-primary-foreground">
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
          className="rounded-2xl border border-border bg-card p-8 shadow-card space-y-8"
        >
          <h2 className="text-2xl font-bold text-foreground text-center">نظرة عامة عن المنهج</h2>

          {curriculum.id === "play-and-learn-2026" ? (
            <>
              {/* Intro paragraphs */}
              <div className="space-y-4 max-w-3xl mx-auto">
                <p className="text-base leading-[2] text-foreground/85">
                  في كل جيل، ومنذ بداية وجود الإنسان، يحاول إبليس أن يزرع داخل الفكر البشري صورًا مشوَّهة عن الله. لم تكن حربه يومًا ضد وجود الله ذاته، بل ضد تصوراتنا عنه. لأن إبليس يدرك أن الإنسان إن رأى الله كما هو حقًا، سيقترب إليه، أما إن تشوّهت الصورة، فيبتعد عنه خوفًا أو شكًا أو يأسًا. لذلك كان هدفه الأول دائمًا أن يفصل الإنسان عن الله، لا بالقوة، بل بالفكر.
                </p>
                <p className="text-base leading-[2] text-foreground/85">
                  ومن هنا تنطلق فكرة هذا المنهج. فهذه الدروس لا تهدف فقط إلى تقديم معلومات كتابية، بل إلى إعادة تصحيح صورة الله في أذهاننا وقلوبنا. نقترب من الله كما أعلن عن نفسه، لا كما تصوّره مخاوفنا أو خبراتنا المؤلمة أو أفكار العالم من حولنا. يهدف هذا المنهج إلى معالجة صور مشوّهة شائعة عن الله، واستبدالها بالإعلان الكتابي الصحيح، بحيث ينتقل المتعلم من معرفة ذهنية إلى علاقة حيّة واختبار عملي مع الله.
                </p>
              </div>

              {/* Goals Title */}
              <div className="text-center">
                <h3 className="inline-block text-xl font-bold text-primary bg-primary/10 px-6 py-2 rounded-full">
                  أهداف المنهج – تصحيح أفكار خاطئة عن الله
                </h3>
              </div>

              {/* Goals Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {[
                  { emoji: "1️⃣", title: "الله موجود وحقيقي", body: "نواجه فكرة إنكار وجود الله، ونؤكد أن الإيمان بالله لا يتعارض مع العلم، بل يعطي للحياة معنى وغاية. الهدف هو أن يتحول الإيمان من مجرد فكرة في الذهن إلى علاقة مُعاشة واختبار يومي." },
                  { emoji: "2️⃣", title: "الله قريب ومهتم وأب محب", body: "نصحح صورة الله البعيد أو غير المهتم أو المتأخر، ونعلن أبوة الله واهتمامه الدائم. الهدف هو بناء ثقة حقيقية في الله، وفهم الصلاة كلقاء مع أب محب لا مجرد وسيلة لتحقيق مطالب." },
                  { emoji: "3️⃣", title: "الله قوي ومنتصر دائمًا", body: "نواجه فكرة ضعف الله، ونعلن أن قوة الله لا تُقاس بمعايير العالم، وأن الصليب ليس فشلًا بل قمة الانتصار. الهدف هو ترسيخ الإيمان بأن عمل الله محسوم، وليس مرتبطًا بظروف أو أعداد." },
                  { emoji: "4️⃣", title: "الله للجميع بلا تحيز", body: "نصحح فكرة أن الله منحاز لفئة دون أخرى، ونؤكد أن محبته وخلاصه مقدمان لكل إنسان. الهدف هو التمييز بين رفض الخطية وقبول الخاطئ، وكسر أي شعور بالاستعلاء أو الامتياز الروحي." },
                  { emoji: "5️⃣", title: "الله يقبلني بنعمته لا باستحقاقي", body: "نواجه الشعور بالرفض وعدم القبول، ونعلن حقيقة النعمة والضمان الأبدي. الهدف هو مساعدة المتعلم على فهم الفرق بين السقوط المتكرر واستباحة الخطية، والعيش بثقة في قبول الله الدائم." },
                ].map((goal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-border bg-background p-5 shadow-sm hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{goal.emoji}</span>
                      <h4 className="text-base font-bold text-foreground">{goal.title}</h4>
                    </div>
                    <p className="text-sm leading-[1.9] text-muted-foreground">{goal.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Closing */}
              <div className="rounded-xl bg-gradient-warm p-6 text-center max-w-3xl mx-auto">
                <p className="text-base leading-[2] text-primary-foreground font-medium">
                  ➡️ هذا المنهج هو رحلة روحية، نتحرر فيها من الأكاذيب، ونستبدلها بالحق الكتابي. رحلة تعيد تشكيل نظرتنا إلى الله، فتقودنا من الخوف إلى الثقة، ومن الشك إلى الإيمان، ومن الشعور بالرفض إلى اليقين بأننا أبناء محبوبون.
                </p>
                <p className="mt-4 text-lg font-bold text-primary-foreground">
                  وفي كل درس، سيظل السؤال حاضرًا أمامنا:
                </p>
                <p className="mt-2 text-xl font-bold text-primary-foreground">
                  هل نعرف الله كما هو فعلًا، أم كما صُوِّر لنا؟
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {curriculum.overview.split(/\n+/).filter(Boolean).map((para, i) => (
                <p key={i} className="text-base leading-[2] text-foreground/85 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Lessons */}
      <section className="container pb-16">
        <h2 className="mb-6 text-2xl font-bold text-foreground">البرنامج</h2>
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

      {/* Extra Sections (sketches, hymns, bulletin, conclusion) */}
      {curriculum.sections && curriculum.sections.length > 0 && (
        <section className="container pb-20">
          <h2 className="mb-6 text-2xl font-bold text-foreground">أقسام إضافية</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {curriculum.sections.map((key, i) => {
              const sec = curriculumSections[curriculum.id]?.[key];
              if (!sec) return null;
              const Icon = SECTION_ICONS[key] ?? FileText;
              const gradient = SECTION_GRADIENTS[key] ?? "from-primary to-accent";
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/curriculum/${curriculum.id}/section/${key}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
                  >
                    <div className={`bg-gradient-to-l ${gradient} p-5`}>
                      <div className="flex items-center justify-between">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                        <ChevronLeft className="h-5 w-5 text-primary-foreground/80 transition-transform group-hover:-translate-x-1" />
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-primary-foreground">{sec.title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-[1.9] text-muted-foreground line-clamp-3">
                        {sec.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default CurriculumPage;
