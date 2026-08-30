import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDT } from "../data/i18n";

interface Identifiable {
  id: string;
}

interface DynamicListProps<T extends Identifiable> {
  items: T[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, index: number) => ReactNode;
  itemLabel?: (index: number) => string;
  addLabel?: string;
  emptyLabel?: string;
}

/** Add/remove wrapper shared by the product, review and team-member builders. */
export default function DynamicList<T extends Identifiable>({
  items,
  onAdd,
  onRemove,
  renderItem,
  itemLabel = (i) => `Item ${i + 1}`,
  addLabel,
  emptyLabel,
}: DynamicListProps<T>) {
  const t = useDT();
  const resolvedAdd = addLabel ?? t("list.addAnother");

  return (
    <div>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.length === 0 && emptyLabel && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500"
            >
              {emptyLabel}
            </motion.p>
          )}

          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-2xl border border-ink-900/10 bg-paper-50 p-4 md:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {itemLabel(index)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500 transition-colors hover:border-brand-orangeDeep hover:text-brand-orangeDeep"
                >
                  <span className="text-[13px] leading-none">×</span> {t("list.remove")}
                </button>
              </div>
              {renderItem(item, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="group mt-4 inline-flex items-center gap-3 rounded-full border border-ink-900/15 bg-paper-50 px-4 py-2.5 text-[13px] font-medium text-ink-900 transition-colors hover:border-brand-orange hover:text-brand-orange"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-950 text-paper-50 transition-colors group-hover:bg-brand-orange">
          +
        </span>
        {resolvedAdd}
      </button>
    </div>
  );
}
