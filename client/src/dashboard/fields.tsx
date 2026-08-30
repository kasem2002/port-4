import type { ReactNode } from "react";

/**
 * Shared form primitives for the dashboard. Everything here is presentational —
 * persistence is handled by the editors, which debounce writes through
 * `useSettingsForm` or the collection mutations.
 */

const inputBase =
  "w-full rounded-lg border border-ink-900/12 bg-paper-100/40 px-3.5 py-2.5 text-[14px] text-ink-950 outline-none transition-colors focus:border-brand-orange focus:bg-paper-50";

export function Panel({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-ink-900/10 bg-paper-50 p-5 shadow-soft md:p-7">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl tracking-tighter2 text-ink-950 md:text-[1.6rem]">
            {title}
          </h2>
          {description && (
            <p className="mt-1 max-w-lg text-[13.5px] text-ink-600">{description}</p>
          )}
        </div>
        {actions}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600">
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  placeholder,
}: {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </FieldRow>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <textarea
        value={value ?? ""}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} resize-none`}
      />
    </FieldRow>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  hint,
  min = 0,
}: {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="number"
        value={value ?? 0}
        min={min}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={`${inputBase} max-w-[140px]`}
      />
    </FieldRow>
  );
}

/**
 * Side-by-side English and Arabic inputs for a `…En` / `…Ar` column pair.
 * The Arabic side is rendered RTL so it reads correctly while typing.
 */
export function LocalizedText({
  label,
  en,
  ar,
  onChangeEn,
  onChangeAr,
  hint,
}: {
  label: string;
  en: string | undefined;
  ar: string | undefined;
  onChangeEn: (value: string) => void;
  onChangeAr: (value: string) => void;
  hint?: string;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="relative">
          <span className="absolute right-2 top-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            EN
          </span>
          <input
            type="text"
            dir="ltr"
            value={en ?? ""}
            onChange={(e) => onChangeEn(e.target.value)}
            className={`${inputBase} pr-10`}
          />
        </div>
        <div className="relative">
          <span className="absolute left-2 top-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            ع
          </span>
          <input
            type="text"
            dir="rtl"
            value={ar ?? ""}
            onChange={(e) => onChangeAr(e.target.value)}
            className={`${inputBase} pl-10 text-right`}
          />
        </div>
      </div>
    </FieldRow>
  );
}

export function LocalizedArea({
  label,
  en,
  ar,
  onChangeEn,
  onChangeAr,
  hint,
  rows = 3,
}: {
  label: string;
  en: string | undefined;
  ar: string | undefined;
  onChangeEn: (value: string) => void;
  onChangeAr: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="relative">
          <span className="absolute right-2 top-1.5 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            EN
          </span>
          <textarea
            dir="ltr"
            rows={rows}
            value={en ?? ""}
            onChange={(e) => onChangeEn(e.target.value)}
            className={`${inputBase} resize-none pr-10`}
          />
        </div>
        <div className="relative">
          <span className="absolute left-2 top-1.5 z-10 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            ع
          </span>
          <textarea
            dir="rtl"
            rows={rows}
            value={ar ?? ""}
            onChange={(e) => onChangeAr(e.target.value)}
            className={`${inputBase} resize-none pl-10 text-right`}
          />
        </div>
      </div>
    </FieldRow>
  );
}

interface SegmentedOption {
  value: number;
  label: string;
}

/** Small enum picker, used for the accent-line selector. */
export function Segmented({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: SegmentedOption[];
  hint?: string;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <div className="inline-flex rounded-lg border border-ink-900/12 bg-paper-100 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              value === option.value
                ? "bg-ink-950 text-paper-50"
                : "text-ink-700 hover:text-ink-950"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </FieldRow>
  );
}

/** Comma-separated editor for plain string arrays (tech stacks). */
export function ChipListField({
  label,
  value,
  onChange,
  hint = "comma separated",
}: {
  label: string;
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  hint?: string;
}) {
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="text"
        value={(value ?? []).join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((entry) => entry.trim())
              .filter(Boolean),
          )
        }
        className={inputBase}
      />
    </FieldRow>
  );
}

/** Standard accent-line options: none, or one of the first three lines. */
export const ACCENT_OPTIONS: SegmentedOption[] = [
  { value: -1, label: "None" },
  { value: 0, label: "L1" },
  { value: 1, label: "L2" },
  { value: 2, label: "L3" },
];

export { inputBase };
