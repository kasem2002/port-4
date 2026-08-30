import { motion } from 'framer-motion';
import { STEPS } from './data/options.js';
import { useDT } from './data/i18n.js';

export default function ProgressBar({ current, furthest, onJump }) {
  const t = useDT();
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center gap-2">
        {STEPS.map((s, i) => {
          const active = i === current;
          const reached = i <= furthest;
          const done = i < current;
          const clickable = reached;
          return (
            <div key={s.id} className="flex-1 min-w-0">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onJump(i)}
                className="w-full text-left group disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors ${
                      active
                        ? 'text-brand-orange'
                        : done
                        ? 'text-ink-700'
                        : 'text-ink-400'
                    }`}
                  >
                    {s.id}
                  </span>
                  <span
                    className={`truncate font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? 'text-ink-950'
                        : reached
                        ? 'text-ink-700 group-hover:text-ink-950'
                        : 'text-ink-400'
                    }`}
                  >
                    {t(`step.short.${i}`)}
                  </span>
                </div>
                <div className="relative h-[3px] w-full rounded-full bg-ink-900/8 overflow-hidden">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    initial={false}
                    animate={{
                      width: done ? '100%' : active ? '55%' : '0%',
                      background: active ? '#D85A30' : '#1A1815',
                    }}
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-orange">
            {STEPS[Math.min(current, STEPS.length - 1)]?.id ?? '—'}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
            {t('chrome.stepOf', { n: Math.min(current + 1, 5), total: 5 })}
          </span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-ink-900/8 overflow-hidden">
          <motion.span
            className="block h-full rounded-full bg-brand-orange"
            initial={false}
            animate={{ width: `${((Math.min(current, 4) + 1) / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
