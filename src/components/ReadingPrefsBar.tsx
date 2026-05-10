import { Minus, Plus, RotateCcw } from "lucide-react";
import { DEFAULT_PREFS, ReadingPrefs } from "@/hooks/useReadingPrefs";

type Props = {
  prefs: ReadingPrefs;
  setPrefs: React.Dispatch<React.SetStateAction<ReadingPrefs>>;
  className?: string;
};

const ReadingPrefsBar = ({ prefs, setPrefs, className = "" }: Props) => {
  return (
    <div
      dir="rtl"
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/70 ${className}`}
    >
      <div className="flex items-center gap-1">
        <span className="font-medium text-foreground/80">حجم النص:</span>
        <button
          type="button"
          aria-label="تصغير"
          onClick={() =>
            setPrefs((p) => ({ ...p, fontSize: Math.max(13, p.fontSize - 1) }))
          }
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center tabular-nums">{prefs.fontSize}</span>
        <button
          type="button"
          aria-label="تكبير"
          onClick={() =>
            setPrefs((p) => ({ ...p, fontSize: Math.min(24, p.fontSize + 1) }))
          }
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground/80">تباعد الأسطر:</span>
        <input
          type="range"
          min={1.4}
          max={2.6}
          step={0.1}
          value={prefs.lineHeight}
          onChange={(e) =>
            setPrefs((p) => ({ ...p, lineHeight: Number(e.target.value) }))
          }
          className="h-1 w-28 cursor-pointer accent-primary"
          aria-label="تباعد الأسطر"
        />
        <span className="w-8 text-center tabular-nums">
          {prefs.lineHeight.toFixed(1)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setPrefs(DEFAULT_PREFS)}
        className="ms-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 hover:bg-muted"
        title="إعادة الضبط"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        إعادة الضبط
      </button>
    </div>
  );
};

export default ReadingPrefsBar;
