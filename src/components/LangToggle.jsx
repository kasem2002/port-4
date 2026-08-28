import { useDispatch } from 'react-redux';
import { setLang } from '../store/i18nSlice.js';
import { useLang } from '../hooks/useLocalized.js';

export default function LangToggle({ variant = 'light' }) {
  const lang = useLang();
  const dispatch = useDispatch();
  const dark = variant === 'dark';
  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark ? 'border-white/15 bg-white/5' : 'border-ink-900/10 bg-paper-50/70'
      }`}
    >
      {['en', 'ar'].map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => dispatch(setLang(l))}
            className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
              active
                ? dark
                  ? 'bg-brand-orange text-paper-50'
                  : 'bg-ink-950 text-paper-50'
                : dark
                  ? 'text-paper-50/60 hover:text-paper-50'
                  : 'text-ink-600 hover:text-ink-900'
            }`}
            aria-pressed={active}
          >
            {l === 'en' ? 'EN' : 'ع'}
          </button>
        );
      })}
    </div>
  );
}
