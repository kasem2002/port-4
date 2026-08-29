import { motion } from 'framer-motion';

// Single-choice option card. Renders as a large tappable pill.
export function RadioGroup({ options, value, onChange, columns = 'auto', dense = false }) {
  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
      : columns === 3
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'
      : 'flex flex-wrap gap-2.5';
  return (
    <div className={gridClass}>
      {options.map((opt) => {
        const label = typeof opt === 'string' ? opt : opt.label;
        const val = typeof opt === 'string' ? opt : opt.value ?? opt.label;
        const selected = value === val;
        return (
          <button
            type="button"
            key={val}
            onClick={() => onChange(val)}
            className={`group relative flex items-center gap-3 rounded-xl border ${
              dense ? 'px-3.5 py-2.5' : 'px-4 py-3'
            } text-start text-[14.5px] transition-all duration-200 ${
              selected
                ? 'border-ink-950 bg-ink-950 text-paper-50 shadow-panel'
                : 'border-ink-900/12 bg-paper-50 text-ink-900 hover:border-ink-900/25 hover:bg-paper-100'
            }`}
          >
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border-2 shrink-0 transition-colors ${
                selected ? 'border-brand-orange bg-brand-orange' : 'border-ink-900/25'
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
            <span className="leading-tight">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Multi-choice group. Same visual language, checkbox indicator.
export function CheckboxGroup({
  options,
  value = [],
  onToggle,
  columns = 'auto',
  max,
  dense = false,
}) {
  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
      : columns === 3
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'
      : 'flex flex-wrap gap-2.5';
  return (
    <div>
      <div className={gridClass}>
        {options.map((opt) => {
          const label = typeof opt === 'string' ? opt : opt.label;
          const val = typeof opt === 'string' ? opt : opt.value ?? opt.label;
          const selected = value.includes(val);
          const atMax = max && !selected && value.length >= max;
          return (
            <button
              type="button"
              key={val}
              disabled={atMax}
              onClick={() => onToggle(val)}
              className={`group relative flex items-center gap-3 rounded-xl border ${
                dense ? 'px-3.5 py-2.5' : 'px-4 py-3'
              } text-start text-[14.5px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                selected
                  ? 'border-brand-orange bg-brand-orange/8 text-ink-950'
                  : 'border-ink-900/12 bg-paper-50 text-ink-900 hover:border-ink-900/25 hover:bg-paper-100'
              }`}
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-[5px] border-2 shrink-0 transition-colors ${
                  selected ? 'border-brand-orange bg-brand-orange' : 'border-ink-900/25'
                }`}
              >
                {selected && (
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-paper-50" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1.5 5.5L4 8L8.5 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
      {max && (
        <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
          {value.length}/{max} selected
        </p>
      )}
    </div>
  );
}
