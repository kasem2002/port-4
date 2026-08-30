import type { LocalizedEntry } from "@/types";
import { FieldRow, inputBase } from "./fields";

interface LocalizedListFieldProps {
  label: string;
  hint?: string;
  value: LocalizedEntry[];
  onChange: (value: LocalizedEntry[]) => void;
  addLabel?: string;
}

/**
 * Editor for the `{ en, ar }[]` JSON columns — a service's outcome bullets and
 * a process step's chips.
 */
export default function LocalizedListField({
  label,
  hint,
  value,
  onChange,
  addLabel = "Add entry",
}: LocalizedListFieldProps) {
  const entries = value ?? [];

  const setAt = (index: number, patch: Partial<LocalizedEntry>) =>
    onChange(entries.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)));

  const removeAt = (index: number) => onChange(entries.filter((_, i) => i !== index));

  return (
    <FieldRow label={label} hint={hint}>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              dir="ltr"
              value={entry.en}
              placeholder="English"
              onChange={(e) => setAt(index, { en: e.target.value })}
              className={inputBase}
            />
            <input
              type="text"
              dir="rtl"
              value={entry.ar}
              placeholder="العربية"
              onChange={(e) => setAt(index, { ar: e.target.value })}
              className={`${inputBase} text-right`}
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              title="Remove"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-500 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => onChange([...entries, { en: "", ar: "" }])}
          className="rounded-full border border-ink-900/15 px-3 py-1.5 text-[12px] font-medium text-ink-800 transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          + {addLabel}
        </button>
      </div>
    </FieldRow>
  );
}
