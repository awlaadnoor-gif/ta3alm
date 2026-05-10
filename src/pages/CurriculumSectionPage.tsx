import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Theater, Music, FileText, Flag, Link2, Check, Minus, Plus, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import { getCurriculumById } from "@/data/curricula";
import { curriculumSections } from "@/data/curriculumSections";
import { toast } from "sonner";

const sectionIcons: Record<string, any> = {
  sketches: Theater,
  hymns: Music,
  bulletin: FileText,
  conclusion: Flag,
};

const sectionOrder = ["sketches", "hymns", "bulletin", "conclusion"];

const FONT_OPTIONS = [
  { key: "tajawal", label: "Tajawal", stack: "'Tajawal', system-ui, sans-serif" },
  { key: "cairo", label: "Cairo", stack: "'Cairo', system-ui, sans-serif" },
  { key: "naskh", label: "نسخ", stack: "'Noto Naskh Arabic', serif" },
  { key: "amiri", label: "Amiri", stack: "'Amiri', serif" },
];

const PREFS_KEY = "curriculum-reading-prefs-v1";
type ReadingPrefs = { font: string; lineHeight: number; fontSize: number };
const DEFAULT_PREFS: ReadingPrefs = { font: "tajawal", lineHeight: 2, fontSize: 17 };

const SPEAKER_RE = /^([^:：،.!؟?\n]{1,30})\s*[:：]\s*(.+)$/s;
const STAGE_RE = /^\(.+\)$/s;

const renderParagraph = (raw: string, i: number) => {
  const p = raw.trim();
  if (!p) return null;

  if (p.startsWith("•")) {
    return (
      <div key={i} className="flex items-start gap-3 pr-2">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
        <p className="text-foreground/85 flex-1">
          {p.replace(/^•\s*/, "")}
        </p>
      </div>
    );
  }

  const numMatch = p.match(/^(\d{1,2})\.\s+(.+)$/s);
  if (numMatch) {
    return (
      <div key={i} className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {numMatch[1]}
        </span>
        <p className="text-foreground/85 flex-1 pt-0.5">
          {numMatch[2]}
        </p>
      </div>
    );
  }

  if (STAGE_RE.test(p)) {
    return (
      <p
        key={i}
        className="text-sm italic text-muted-foreground text-center bg-muted/30 rounded-lg px-4 py-2 mx-2"
      >
        {p}
      </p>
    );
  }

  if (p.endsWith(":") && p.length < 80) {
    return (
      <h3
        key={i}
        className="text-xl font-bold text-primary border-r-4 border-primary pr-4 pt-4 pb-1 mt-2"
      >
        {p.replace(/:$/, "")}
      </h3>
    );
  }

  const sp = p.match(SPEAKER_RE);
  if (sp && sp[1].split(/\s+/).length <= 4 && sp[2].length > 0) {
    return (
      <div key={i} className="flex items-start gap-3">
        <span className="shrink-0 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent-foreground">
          {sp[1].trim()}
        </span>
        <p className="text-foreground/85 flex-1 pt-0.5 whitespace-pre-line">
          {sp[2].trim()}
        </p>
      </div>
    );
  }

  return (
    <p
      key={i}
      className="text-foreground/85 whitespace-pre-line"
    >
      {p}
    </p>
  );
};

const CurriculumSectionPage = () => {
  const { id, sectionKey } = useParams<{ id: string; sectionKey: string }>();
  const curriculum = getCurriculumById(id || "");
  const allSections = id ? curriculumSections[id] : undefined;
  const navItems = allSections
    ? sectionOrder.filter((k) => allSections[k])
    : [];

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string>(sectionKey || navItems[0] || "");
  const [progress, setProgress] = useState(0);

  // Reading preferences (font, line-height, font-size) — persisted in localStorage
  const [prefs, setPrefs] = useState<ReadingPrefs>(() => {
    if (typeof window === "undefined") return DEFAULT_PREFS;
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return DEFAULT_PREFS;
      return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_PREFS;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs]);
  const fontStack =
    FONT_OPTIONS.find((f) => f.key === prefs.font)?.stack || FONT_OPTIONS[0].stack;
  const readingStyle: React.CSSProperties = {
    fontFamily: fontStack,
    fontSize: `${prefs.fontSize}px`,
    lineHeight: prefs.lineHeight,
  };

  // Smooth-scroll to the requested section on mount/param change
  useEffect(() => {
    if (!sectionKey) return;
    const el = document.getElementById(`section-${sectionKey}`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [sectionKey]);

  // Scroll-spy: detect active section based on viewport position
  useEffect(() => {
    if (navItems.length === 0) return;
    const onScroll = () => {
      // Progress bar: percentage of document scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);

      // Active section: the one whose top is closest to the nav line (~140px from viewport top)
      const probe = 160;
      let current = navItems[0];
      for (const key of navItems) {
        const el = document.getElementById(`section-${key}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - probe <= 0) {
          current = key;
        } else {
          break;
        }
      }
      setActiveKey((prev) => (prev === current ? prev : current));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navItems.join("|")]);

  if (!curriculum || !allSections) {
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

  const handleNavClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    const el = document.getElementById(`section-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/curriculum/${curriculum.id}/section/${key}`);
    }
  };

  const handleCopyLink = async (key: string) => {
    const url = `${window.location.origin}/curriculum/${curriculum.id}/section/${key}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      toast.success("تم نسخ رابط القسم");
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  return (
    <div className="min-h-screen bg-background" style={{ scrollBehavior: "smooth" }}>
      <Header />

      {/* Hero */}
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
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              أقسام المنهج
            </h1>
            <p className="mt-2 max-w-2xl text-primary-foreground/85 leading-relaxed">
              تنقّل بين الاسكتشات وفرص الترانيم والنشرة اليومية والخاتمة
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky in-page nav with progress bar */}
      <nav className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {navItems.map((key) => {
              const Icon = sectionIcons[key];
              const item = allSections[key];
              const isActive = activeKey === key;
              return (
                <a
                  key={key}
                  href={`#section-${key}`}
                  onClick={(e) => handleNavClick(e, key)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-warm"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.title}
                </a>
              );
            })}
          </div>
        </div>
        {/* Reading progress bar */}
        <div
          className="h-1 bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </nav>

      {/* All sections rendered on one page */}
      <div className="container py-10 space-y-12" dir="rtl">
        {navItems.map((key) => {
          const item = allSections[key];
          const Icon = sectionIcons[key];
          return (
            <section
              key={key}
              id={`section-${key}`}
              className="scroll-mt-32"
            >
              <div className="mx-auto max-w-3xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(key)}
                    aria-label="نسخ رابط القسم"
                    title="نسخ رابط القسم"
                    className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-muted hover:text-foreground hover:shadow-card"
                  >
                    {copiedKey === key ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="hidden sm:inline">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4" />
                        <span className="hidden sm:inline">نسخ الرابط</span>
                      </>
                    )}
                  </button>
                </div>

                <article
                  className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-card"
                  style={readingStyle}
                >
                  <div className="space-y-5">
                    {item.paragraphs.map((p, i) => renderParagraph(p, i))}
                  </div>
                </article>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CurriculumSectionPage;
