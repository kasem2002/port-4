// Base text-style inputs — subtle, editorial, PORT-4 tokens.

const base =
  'w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-[15px] text-ink-950 placeholder:text-ink-400 outline-none transition-all duration-200 focus:border-brand-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(216,90,48,0.08)]';

export function TextInput({ value, onChange, placeholder, type = 'text', maxLength, className = '' }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={base + ' ' + className}
    />
  );
}

export function NumberInput({ value, onChange, min = 1, max, className = '' }) {
  return (
    <input
      type="number"
      value={value ?? ''}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className={base + ' max-w-[160px] ' + className}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 4, maxLength, className = '' }) {
  return (
    <textarea
      value={value ?? ''}
      rows={rows}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={base + ' resize-none leading-relaxed ' + className}
    />
  );
}

export function TimeInput({ value, onChange, disabled = false }) {
  return (
    <input
      type="time"
      value={value ?? ''}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={
        'rounded-lg border border-ink-900/12 bg-paper-50 px-3 py-2 text-[13.5px] font-mono text-ink-900 outline-none transition-colors focus:border-brand-orange disabled:opacity-40 disabled:cursor-not-allowed'
      }
    />
  );
}
