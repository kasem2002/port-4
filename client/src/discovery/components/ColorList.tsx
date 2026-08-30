import { AnimatePresence, motion } from "framer-motion";
import { useDT } from "../data/i18n";

const hexRe = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

interface ColorListProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export default function ColorList({ colors, onChange }: ColorListProps) {
  const t = useDT();

  const setAt = (index: number, value: string) => {
    const next = [...colors];
    next[index] = value;
    onChange(next);
  };

  const removeAt = (index: number) => {
    const next = colors.filter((_, i) => i !== index);
    // Keep one swatch so the control never collapses to nothing.
    onChange(next.length > 0 ? next : ["#D85A30"]);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {colors.map((color, index) => {
          const valid = hexRe.test(color);
          return (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-paper-50 p-2.5"
            >
              <label
                className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-ink-900/10"
                style={{ background: valid ? color : "#F5F0E8" }}
              >
                <input
                  type="color"
                  value={valid ? color : "#000000"}
                  onChange={(e) => setAt(index, e.target.value)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </label>

              <input
                type="text"
                value={color}
                placeholder="#000000"
                onChange={(e) => setAt(index, e.target.value)}
                className="flex-1 bg-transparent font-mono text-[13px] uppercase tracking-[0.14em] text-ink-950 outline-none"
              />

              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={t("list.remove")}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-500 transition-colors hover:bg-brand-orangeDeep/10 hover:text-brand-orangeDeep"
              >
                ×
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => onChange([...colors, "#000000"])}
        className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-3.5 py-2 text-[12.5px] font-medium text-ink-900 transition-colors hover:border-brand-orange hover:text-brand-orange"
      >
        <span className="text-[14px]">+</span> {t("color.add")}
      </button>
    </div>
  );
}
