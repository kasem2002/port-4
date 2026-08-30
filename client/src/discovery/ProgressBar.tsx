import { motion } from "framer-motion";
import { useDT } from "./data/i18n";
import { STEPS } from "./data/options";

interface ProgressBarProps {
  /** Zero-based index of the step being edited. */
  current: number;
  /** Highest step reached, which is how far back navigation is allowed. */
  furthest: number;
  onJump: (step: number) => void;
}

export default function ProgressBar({ current, furthest, onJump }: ProgressBarProps) {
  const t = useDT();

  return (
    <div className="w-full">
      {/* Desktop: one labelled track per step. */}
      <div className="hidden items-center gap-2 md:flex">
        {STEPS.map((step, i) => {
          const active = i === current;
          const reached = i <= furthest;
          const done = i < current;

          return (
            <div key={step.id} className="min-w-0 flex-1">
              <button
                type="button"
                disabled={!reached}
                onClick={() => reached && onJump(i)}
                className="group w-full text-left disabled:cursor-not-allowed"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors ${
                      active ? "text-brand-orange" : done ? "text-ink-700" : "text-ink-400"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span
                    className={`truncate font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? "text-ink-950"
                        : reached
                          ? "text-ink-700 group-hover:text-ink-950"
                          : "text-ink-400"
                    }`}
                  >
                    {t(`step.short.${i}`)}
                  </span>
                </div>

                <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-ink-900/8">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={false}
                    animate={{
                      width: done ? "100%" : active ? "55%" : "0%",
                      background: active ? "#D85A30" : "#1A1815",
                    }}
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile: a single bar with a step counter. */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-orange">
            {STEPS[Math.min(current, STEPS.length - 1)]?.id ?? "—"}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
            {t("chrome.stepOf", { n: Math.min(current + 1, STEPS.length), total: STEPS.length })}
          </span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink-900/8">
          <motion.span
            className="block h-full rounded-full bg-brand-orange"
            initial={false}
            animate={{
              width: `${((Math.min(current, STEPS.length - 1) + 1) / STEPS.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
