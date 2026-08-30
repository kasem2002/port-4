/** Text-style inputs for the discovery form, in the PORT-4 light palette. */

const base =
  "w-full rounded-xl border border-ink-900/12 bg-paper-50 px-4 py-3 text-[15px] text-ink-950 placeholder:text-ink-400 outline-none transition-all duration-200 focus:border-brand-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(216,90,48,0.08)]";

interface TextInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url";
  maxLength?: number;
  className?: string;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  className = "",
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value ?? ""}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${base} ${className}`}
    />
  );
}

interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function NumberInput({ value, onChange, min = 1, max, className = "" }: NumberInputProps) {
  return (
    <input
      type="number"
      value={value ?? ""}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className={`${base} max-w-[160px] ${className}`}
    />
  );
}

interface TextAreaProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  maxLength,
  className = "",
}: TextAreaProps) {
  return (
    <textarea
      value={value ?? ""}
      rows={rows}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${base} resize-none leading-relaxed ${className}`}
    />
  );
}

interface TimeInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TimeInput({ value, onChange, disabled = false }: TimeInputProps) {
  return (
    <input
      type="time"
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-ink-900/12 bg-paper-50 px-3 py-2 font-mono text-[13.5px] text-ink-900 outline-none transition-colors focus:border-brand-orange disabled:cursor-not-allowed disabled:opacity-40"
    />
  );
}
