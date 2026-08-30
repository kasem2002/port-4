import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { Lang, WeekDay } from "@/types";
import { useDT, useLang } from "../data/i18n";
import { updateHours } from "../store/discoverySlice";
import { TimeInput } from "./Inputs";

/** Weekday names live here rather than in options.ts — they're pure chrome. */
const DAY_LABELS: Record<WeekDay, Record<Lang, string>> = {
  sat: { en: "Saturday", ar: "السبت" },
  sun: { en: "Sunday", ar: "الأحد" },
  mon: { en: "Monday", ar: "الاثنين" },
  tue: { en: "Tuesday", ar: "الثلاثاء" },
  wed: { en: "Wednesday", ar: "الأربعاء" },
  thu: { en: "Thursday", ar: "الخميس" },
  fri: { en: "Friday", ar: "الجمعة" },
};

export default function WeekSchedule() {
  const hours = useAppSelector((s) => s.discovery.form.businessHours);
  const dispatch = useAppDispatch();
  const t = useDT();
  const lang = useLang();

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-paper-50">
      {hours.map((row, index) => (
        <div
          key={row.day}
          className={`grid grid-cols-12 items-center gap-2 px-4 py-3.5 md:px-5 ${
            index > 0 ? "border-t border-ink-900/8" : ""
          } ${row.closed ? "bg-paper-100/40" : ""}`}
        >
          <div className="col-span-4 md:col-span-3">
            <p className="font-display text-[17px] tracking-tighter2 text-ink-950">
              {DAY_LABELS[row.day][lang]}
            </p>
          </div>

          <div className="col-span-8 flex flex-wrap items-center justify-end gap-2 md:col-span-9 md:gap-3">
            <div className="flex items-center gap-2">
              <TimeInput
                value={row.open}
                disabled={row.closed}
                onChange={(value) => dispatch(updateHours({ day: row.day, patch: { open: value } }))}
              />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                →
              </span>
              <TimeInput
                value={row.close}
                disabled={row.closed}
                onChange={(value) =>
                  dispatch(updateHours({ day: row.day, patch: { close: value } }))
                }
              />
            </div>

            <button
              type="button"
              onClick={() => dispatch(updateHours({ day: row.day, patch: { closed: !row.closed } }))}
              aria-pressed={row.closed}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
                row.closed
                  ? "border-brand-orange bg-brand-orange text-paper-50"
                  : "border-ink-900/15 text-ink-600 hover:border-ink-900/30"
              }`}
            >
              {row.closed ? t("s4.q10.closed") : t("s4.q10.markClosed")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
