import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice.js';
import { resetAll } from '../store/contentSlice.js';
import { setLang } from '../store/i18nSlice.js';
import { useT, useLang } from '../hooks/useLocalized.js';
import Logo from '../components/Logo.jsx';

const sections = [
  { path: '', label: 'Overview', group: 'Home' },
  { path: 'brand', label: 'Brand', group: 'Identity' },
  { path: 'nav', label: 'Navigation', group: 'Identity' },
  { path: 'footer', label: 'Footer', group: 'Identity' },
  { path: 'hero', label: 'Hero', group: 'Sections' },
  { path: 'marquee', label: 'Marquee', group: 'Sections' },
  { path: 'trust', label: 'Trust & Stats', group: 'Sections' },
  { path: 'about', label: 'About & Team', group: 'Sections' },
  { path: 'services', label: 'Services', group: 'Sections' },
  { path: 'process', label: 'Process', group: 'Sections' },
  { path: 'projects', label: 'Projects', group: 'Sections' },
  { path: 'partners', label: 'Partners', group: 'Sections' },
  { path: 'journal', label: 'Journal', group: 'Sections' },
  { path: 'contact', label: 'Contact', group: 'Sections' },
];

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const t = useT();
  const lang = useLang();
  const [savedTick, setSavedTick] = useState(false);
  const location = useLocation();

  // A soft "saved" pip that flashes when the pathname or state serialization changes.
  // (We piggy-back on any route change; every Redux edit is already auto-persisted.)
  useSelector((s) => s.content); // force subscription
  useSelector((s) => s.i18n.lang);

  const doReset = () => {
    if (window.confirm(t('dash.confirmReset'))) {
      dispatch(resetAll());
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1200);
    }
  };

  const groups = Array.from(new Set(sections.map((s) => s.group)));

  return (
    <div className="min-h-screen bg-paper-100/70 text-ink-900" dir="ltr">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-paper-50/80 backdrop-blur border-b border-ink-900/10">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo />
            </Link>
            <span className="hidden md:inline font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              / {t('dash.brand')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SavePip />
            <div className="hidden md:inline-flex items-center gap-0.5 rounded-full border border-ink-900/10 bg-paper-50 p-0.5">
              {['en', 'ar'].map((l) => (
                <button
                  key={l}
                  onClick={() => dispatch(setLang(l))}
                  className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors ${
                    lang === l ? 'bg-ink-950 text-paper-50' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {l === 'en' ? 'EN' : 'ع'}
                </button>
              ))}
            </div>
            <button
              onClick={doReset}
              className="hidden md:inline text-[12.5px] text-ink-600 hover:text-red-700 transition-colors px-2 py-1"
            >
              {t('dash.reset')}
            </button>
            <Link
              to="/"
              className="text-[12.5px] rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1.5 hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              {t('dash.viewSite')} →
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="text-[12.5px] rounded-full bg-ink-950 text-paper-50 px-3 py-1.5 hover:bg-brand-orange transition-colors"
            >
              {t('dash.logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="sticky top-20 space-y-6">
            {groups.map((g) => (
              <div key={g}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400 mb-2 px-2">{g}</p>
                <ul className="space-y-0.5">
                  {sections.filter((s) => s.group === g).map((s) => (
                    <li key={s.path}>
                      <NavLink
                        to={`/dashboard/${s.path}`}
                        end={s.path === ''}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? 'bg-ink-950 text-paper-50'
                              : 'text-ink-700 hover:bg-paper-50 hover:text-ink-950'
                          }`
                        }
                      >
                        <span>{s.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

// Small "saved locally" pip.
function SavePip() {
  const t = useT();
  return (
    <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
      {t('dash.saved')}
    </span>
  );
}
