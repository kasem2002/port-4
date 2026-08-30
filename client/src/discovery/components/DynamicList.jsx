import { AnimatePresence, motion } from 'framer-motion';
import { useDT } from '../data/i18n.js';

// Generic dynamic list wrapper: renders items with add/remove chrome.
export default function DynamicList({
  items,
  onAdd,
  onRemove,
  renderItem,
  itemLabel = (i) => `Item ${i + 1}`,
  addLabel,
  emptyLabel = 'Nothing added yet.',
}) {
  const t = useDT();
  const resolvedAdd = addLabel || t('list.addAnother');
  return (
    <div>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500"
            >
              {emptyLabel}
            </motion.p>
          )}
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-2xl border border-ink-900/10 bg-paper-50 p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {itemLabel(i)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500 hover:border-brand-orangeDeep hover:text-brand-orangeDeep transition-colors"
                >
                  <span className="text-[13px] leading-none">×</span> {t('list.remove')}
                </button>
              </div>
              {renderItem(item, i)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 group inline-flex items-center gap-3 rounded-full border border-ink-900/15 bg-paper-50 px-4 py-2.5 text-[13px] font-medium text-ink-900 hover:border-brand-orange hover:text-brand-orange transition-colors"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950 text-paper-50 group-hover:bg-brand-orange transition-colors">
          +
        </span>
        {resolvedAdd}
      </button>
    </div>
  );
}
