import { motion } from "framer-motion";
import { useDT, useOL } from "../data/i18n";

/**
 * Choices are stored as their canonical English strings and rendered through
 * the option-label map, so a brief filled in Arabic still reaches the
 * dashboard with stable, machine-readable values.
 */

type Columns = "auto" | 2 | 3;

function gridClass(columns: Columns): string {
  if (columns === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-2.5";
  if (columns === 3) return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5";
  return "flex flex-wrap gap-2.5";
}

interface RadioGroupProps {
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  columns?: Columns;
  dense?: boolean;
}

export function RadioGroup({
  options,
  value,
  onChange,
  columns = "auto",
  dense = false,
}: RadioGroupProps) {
  const ol = useOL();

  return (
    <div className={gridClass(columns)}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={selected}
            className={`group relative flex items-center gap-3 rounded-xl border ${
              dense ? "px-3.5 py-2.5" : "px-4 py-3"
            } text-start text-[14.5px] transition-all duration-200 ${
              selected
                ? "border-ink-950 bg-ink-950 text-paper-50 shadow-panel"
                : "border-ink-900/12 bg-paper-50 text-ink-900 hover:border-ink-900/25 hover:bg-paper-100"
            }`}
          >
            <span
              className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                selected ? "border-brand-orange bg-brand-orange" : "border-ink-900/25"
              }`}
            >
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-1.5 w-1.5 rounded-full bg-paper-50"
                />
              )}
            </span>
            <span className="leading-tight">{ol(option)}</span>
          </button>
        );
      })}
    </div>
  );
}

interface CheckboxGroupProps {
  options: string[];
  value: string[];
  onToggle: (value: string) => void;
  columns?: Columns;
  /** Caps how many can be selected; the rest disable once reached. */
  max?: number;
  dense?: boolean;
}

export function CheckboxGroup({
  options,
  value,
  onToggle,
  columns = "auto",
  max,
  dense = false,
}: CheckboxGroupProps) {
  const ol = useOL();
  const t = useDT();

  return (
    <div>
      <div className={gridClass(columns)}>
        {options.map((option) => {
          const selected = value.includes(option);
          const atMax = max !== undefined && !selected && value.length >= max;
          return (
            <button
              type="button"
              key={option}
              disabled={atMax}
              onClick={() => onToggle(option)}
              aria-pressed={selected}
              className={`group relative flex items-center gap-3 rounded-xl border ${
                dense ? "px-3.5 py-2.5" : "px-4 py-3"
              } text-start text-[14.5px] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                selected
                  ? "border-brand-orange bg-brand-orange/8 text-ink-950"
                  : "border-ink-900/12 bg-paper-50 text-ink-900 hover:border-ink-900/25 hover:bg-paper-100"
              }`}
            >
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border-2 transition-colors ${
                  selected ? "border-brand-orange bg-brand-orange" : "border-ink-900/25"
                }`}
              >
                {selected && (
                  <svg
                    viewBox="0 0 10 10"
                    className="h-2.5 w-2.5 text-paper-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1.5 5.5L4 8L8.5 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="leading-tight">{ol(option)}</span>
            </button>
          );
        })}
      </div>

      {max !== undefined && (
        <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
          {t("checkbox.selected", { n: value.length, max })}
        </p>
      )}
    </div>
  );
}
