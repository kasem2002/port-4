import { useAppDispatch } from "@/app/hooks";
import { useLang } from "@/hooks/useLocalized";
import { setLang } from "@/store/languageSlice";
import type { Lang } from "@/types";

const LANGS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ar", label: "ع" },
];

interface LangToggleProps {
  variant?: "light" | "dark";
}

export default function LangToggle({ variant = "light" }: LangToggleProps) {
  const lang = useLang();
  const dispatch = useAppDispatch();
  const dark = variant === "dark";

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark ? "border-white/15 bg-white/5" : "border-ink-900/10 bg-paper-50/70"
      }`}
    >
      {LANGS.map(({ value, label }) => {
        const active = lang === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => dispatch(setLang(value))}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
              active
                ? dark
                  ? "bg-brand-orange text-paper-50"
                  : "bg-ink-950 text-paper-50"
                : dark
                  ? "text-paper-50/60 hover:text-paper-50"
                  : "text-ink-600 hover:text-ink-900"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
