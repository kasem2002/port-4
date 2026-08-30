import { useDispatch, useSelector } from 'react-redux';
import { updateHours } from '../store/discoverySlice.js';
import { DAYS } from '../data/options.js';
import { TimeInput } from './Inputs.jsx';
import { useDT, useLang } from '../data/i18n.js';

const DAY_LABELS = {
  sat: { en: 'Saturday', ar: 'السبت' },
  sun: { en: 'Sunday', ar: 'الأحد' },
  mon: { en: 'Monday', ar: 'الاثنين' },
  tue: { en: 'Tuesday', ar: 'الثلاثاء' },
  wed: { en: 'Wednesday', ar: 'الأربعاء' },
  thu: { en: 'Thursday', ar: 'الخميس' },
  fri: { en: 'Friday', ar: 'الجمعة' },
};

export default function WeekSchedule() {
  const hours = useSelector((s) => s.discovery.form.businessHours);
  const dispatch = useDispatch();
  const byKey = Object.fromEntries(hours.map((h) => [h.day, h]));
  const t = useDT();
  const lang = useLang();

  return (
    <div className="rounded-2xl border border-ink-900/10 bg-paper-50 overflow-hidden">
      {DAYS.map((d, i) => {
        const row = byKey[d.key] || { closed: false, open: '09:00', close: '18:00' };
        return (
          <div
            key={d.key}
            className={`grid grid-cols-12 items-center gap-2 px-4 md:px-5 py-3.5 ${
              i > 0 ? 'border-t border-ink-900/8' : ''
            } ${row.closed ? 'bg-paper-100/40' : ''}`}
          >
            <div className="col-span-4 md:col-span-3">
              <p className="font-display text-[17px] tracking-tighter2 text-ink-950">
                {DAY_LABELS[d.key]?.[lang] || d.label}
              </p>
            </div>
            <div className="col-span-8 md:col-span-9 flex flex-wrap items-center justify-end gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <TimeInput
                  value={row.open}
                  disabled={row.closed}
                  onChange={(v) => dispatch(updateHours({ day: d.key, patch: { open: v } }))}
                />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                  →
                </span>
                <TimeInput
                  value={row.close}
                  disabled={row.closed}
                  onChange={(v) => dispatch(updateHours({ day: d.key, patch: { close: v } }))}
                />
              </div>
              <button
                type="button"
                onClick={() => dispatch(updateHours({ day: d.key, patch: { closed: !row.closed } }))}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
                  row.closed
                    ? 'border-brand-orange bg-brand-orange text-paper-50'
                    : 'border-ink-900/15 text-ink-600 hover:border-ink-900/30'
                }`}
              >
                {row.closed ? t('s4.q10.closed') : t('s4.q10.markClosed')}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
