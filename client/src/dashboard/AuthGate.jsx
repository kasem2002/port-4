import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin } from '../store/authSlice.js';
import { useT } from '../hooks/useLocalized.js';
import Logo from '../components/Logo.jsx';

export default function AuthGate({ children }) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s) => s.auth.loggedIn);
  const error = useSelector((s) => s.auth.error);
  const t = useT();
  const [value, setValue] = useState('');

  if (loggedIn) return children;

  return (
    <div className="min-h-screen bg-ink-950 text-paper-50 flex items-center justify-center px-6" dir="ltr">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-16 h-64 w-64 rounded-full bg-brand-green/15 blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Logo mark className="h-10 w-10" />
            <span className="font-display text-2xl">
              PORT<span className="text-brand-orange">-</span>4
            </span>
          </div>

          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
            {t('dash.brand')}
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tighter2 text-paper-50">
            {t('dash.gate.title')}
          </h1>
          <p className="mt-3 text-[14px] text-paper-50/70">{t('dash.gate.desc')}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(attemptLogin(value));
            }}
            className="mt-6 flex flex-col gap-3"
          >
            <input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('dash.gate.placeholder')}
              className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-paper-50 placeholder:text-paper-50/40 focus:border-brand-orange outline-none transition-colors"
            />
            {error && (
              <p className="text-[13px] text-red-300">Incorrect passcode. Try again.</p>
            )}
            <button
              type="submit"
              className="mt-1 group inline-flex items-center justify-center gap-3 rounded-full bg-brand-orange text-paper-50 py-3 text-sm font-medium hover:bg-paper-50 hover:text-ink-950 transition-colors"
            >
              {t('dash.gate.submit')} →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
