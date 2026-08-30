import { motion, AnimatePresence } from 'framer-motion';
import { useDT } from '../data/i18n.js';

const hexRe = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export default function ColorList({ colors, onChange }) {
  const t = useDT();
  const set = (i, val) => {
    const next = [...colors];
    next[i] = val;
    onChange(next);
  };
  const remove = (i) => {
    const next = [...colors];
    next.splice(i, 1);
    onChange(next.length ? next : ['#D85A30']);
  };
  const add = () => onChange([...colors, '#000000']);

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {colors.map((c, i) => {
          const valid = hexRe.test(c);
          return (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-paper-50 p-2.5"
            >
              <label
                className="relative h-11 w-11 rounded-lg border border-ink-900/10 overflow-hidden cursor-pointer shrink-0"
                style={{ background: valid ? c : '#F5F0E8' }}
              >
                <input
                  type="color"
                  value={valid ? c : '#000000'}
                  onChange={(e) => set(i, e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              <input
                type="text"
                value={c}
                onChange={(e) => set(i, e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-transparent font-mono text-[13px] uppercase tracking-[0.14em] text-ink-950 outline-none"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-500 hover:bg-brand-orangeDeep/10 hover:text-brand-orangeDeep transition-colors"
                aria-label="Remove color"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-3.5 py-2 text-[12.5px] font-medium text-ink-900 hover:border-brand-orange hover:text-brand-orange transition-colors"
      >
        <span className="text-[14px]">+</span> {t('color.add')}
      </button>
    </div>
  );
}
