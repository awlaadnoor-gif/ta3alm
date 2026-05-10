import React from "react";

const SPEAKER_RE = /^([^:：،.!؟?\n]{1,30})\s*[:：]\s*(.+)$/s;
const STAGE_RE = /^\(.+\)$/s;

export const renderRichParagraph = (raw: string, i: number): React.ReactNode => {
  const p = raw.trim();
  if (!p) return null;

  if (p.startsWith("•")) {
    return (
      <div key={i} className="flex items-start gap-3 pr-2">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary/70" />
        <p className="text-foreground/85 flex-1">{p.replace(/^•\s*/, "")}</p>
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
        <p className="text-foreground/85 flex-1 pt-0.5">{numMatch[2]}</p>
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
    <p key={i} className="text-foreground/85 whitespace-pre-line">
      {p}
    </p>
  );
};
