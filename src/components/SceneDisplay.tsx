import { motion } from "framer-motion";
import type { Scene } from "@/data/curricula";

const speakerColors: Record<string, string> = {
  "مفيبوشث": "bg-amber-100 text-amber-800 border-amber-300",
  "داود": "bg-purple-100 text-purple-800 border-purple-300",
  "خادم": "bg-slate-100 text-slate-700 border-slate-300",
  "الحراس": "bg-red-100 text-red-800 border-red-300",
  "صيبا": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "الراوي": "bg-blue-50 text-blue-700 border-blue-200",
};

const getColorClass = (speaker: string) =>
  speakerColors[speaker] || "bg-muted text-muted-foreground border-border";

const SceneDisplay = ({ scenes }: { scenes: Scene[] }) => {
  return (
    <div className="space-y-8">
      {scenes.map((scene, si) => (
        <div key={si} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {si + 1}
            </span>
            <h4 className="text-lg font-bold text-primary">{scene.title}</h4>
          </div>
          
          {scene.description && (
            <p className="text-sm italic text-muted-foreground pr-11 border-r-2 border-muted mr-4">
              {scene.description}
            </p>
          )}

          <div className="space-y-3 pr-2">
            {scene.dialogue.map((line, li) => {
              const isNarrator = line.speaker === "الراوي";
              
              if (isNarrator) {
                return (
                  <motion.div
                    key={li}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: li * 0.03 }}
                    className="rounded-lg bg-blue-50/50 border border-blue-100 px-4 py-2.5 text-center italic"
                  >
                    <span className="text-sm text-blue-600">{line.text}</span>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: li * 0.03 }}
                  className="flex items-start gap-3"
                >
                  <span className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs font-bold ${getColorClass(line.speaker)}`}>
                    {line.speaker}
                  </span>
                  <div className="flex-1 pt-0.5">
                    {line.stageDirection && !isNarrator && (
                      <span className="text-xs text-muted-foreground italic ml-1">
                        ({line.stageDirection})
                      </span>
                    )}
                    <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                      {line.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SceneDisplay;
