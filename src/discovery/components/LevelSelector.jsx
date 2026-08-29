import { motion } from 'framer-motion';

// 1–5 level selector for animation intensity.
export default function LevelSelector({ levels, value, onChange }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {levels.map((lv) => {
          const active = value === lv.level;
          return (
            <button
              key={lv.level}
              type="button"
              onClick={() => onChange(lv.level)}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl border py-4 px-2 transition-all ${
                active
                  ? 'border-ink-950 bg-ink-950 text-paper-50 shadow-panel'
                  : 'border-ink-900/12 bg-paper-50 text-ink-700 hover:border-ink-900/25'
              }`}
            >
              <span
                className={`font-display text-2xl md:text-3xl leading-none transition-colors ${
                  active ? 'text-brand-orange' : 'text-ink-500'
                }`}
              >
                {lv.level}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                active ? 'text-paper-50/80' : 'text-ink-500'
              }`}>
                {lv.label}
              </span>
              {active && (
                <motion.span
                  layoutId="level-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-brand-orange"
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl bg-paper-100/60 border border-ink-900/8 px-4 py-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-orange mb-1">
          Level {value}
        </p>
        <p className="text-[14px] text-ink-700">
          {levels.find((l) => l.level === value)?.hint}
        </p>
      </div>
    </div>
  );
}
