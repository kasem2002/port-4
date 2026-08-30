import { motion } from "framer-motion";
import type { AnimationLevel } from "../data/options";
import { useDT } from "../data/i18n";

interface LevelSelectorProps {
  levels: AnimationLevel[];
  value: number;
  onChange: (level: number) => void;
}

/** The 1–5 animation-intensity picker. */
export default function LevelSelector({ levels, value, onChange }: LevelSelectorProps) {
  const t = useDT();

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {levels.map((level) => {
          const active = value === level.level;
          return (
            <button
              key={level.level}
              type="button"
              onClick={() => onChange(level.level)}
              aria-pressed={active}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 transition-all ${
                active
                  ? "border-ink-950 bg-ink-950 text-paper-50 shadow-panel"
                  : "border-ink-900/12 bg-paper-50 text-ink-700 hover:border-ink-900/25"
              }`}
            >
              <span
                className={`font-display text-2xl leading-none transition-colors md:text-3xl ${
                  active ? "text-brand-orange" : "text-ink-500"
                }`}
              >
                {level.level}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                  active ? "text-paper-50/80" : "text-ink-500"
                }`}
              >
                {t(`level.${level.level}`)}
              </span>
              {active && (
                <motion.span
                  layoutId="level-dot"
                  className="absolute -bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-orange"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-ink-900/8 bg-paper-100/60 px-4 py-3">
        <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-orange">
          {t("level.label", { n: value })}
        </p>
        <p className="text-[14px] text-ink-700">{t(`level.${value}.hint`)}</p>
      </div>
    </div>
  );
}
