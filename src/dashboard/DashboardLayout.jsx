import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { logout } from '../store/authSlice.js';
import { resetAll, hydrate as hydrateContent } from '../store/contentSlice.js';
import { publish } from '../store/publishedSlice.js';
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
  const draft = useSelector((s) => s.content);
  const published = useSelector((s) => s.published);
  const [justSaved, setJustSaved] = useState(false);

  // Dirty state: draft differs from what's currently published.
  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(published),
    [draft, published],
  );

  const onSave = () => {
    dispatch(publish(draft));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1600);
  };

  const onDiscard = () => {
    if (window.confirm('Discard all unsaved changes and revert to the last saved version?')) {
      dispatch(hydrateContent(published));
    }
  };

  const onReset = () => {
    if (window.confirm(t('dash.confirmReset'))) {
      dispatch(resetAll());
    }
  };

  const groups = Array.from(new Set(sections.map((s) => s.group)));

  return (
    <div className="min-h-screen bg-paper-100/70 text-ink-900" dir="ltr">
      <header className="sticky top-0 z-30 bg-paper-50/85 backdrop-blur border-b border-ink-900/10">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo />
            </Link>
            <span className="hidden md:inline font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500 truncate">
              / {t('dash.brand')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill isDirty={isDirty} justSaved={justSaved} />
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
              onClick={onReset}
              className="hidden md:inline text-[12.5px] text-ink-600 hover:text-red-700 transition-colors px-2 py-1"
              title="Wipe everything back to the defaults shipped in the source"
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

        {/* Main — add bottom padding so the floating save bar doesn't overlap content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 min-w-0 pb-24">
          {children}
        </main>
      </div>

      {/* Floating save bar — appears only when the user has actual changes.
          Sits inside the content viewport, not the topbar. */}
      <SaveBar isDirty={isDirty} justSaved={justSaved} onSave={onSave} onDiscard={onDiscard} />
    </div>
  );
}

// Passive status pill in the topbar. No action — actions live in the floating bar.
function StatusPill({ isDirty, justSaved }) {
  if (justSaved) {
    return (
      <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 text-brand-green px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em]">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 8.5l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Published
      </span>
    );
  }
  return (
    <span
      className={`hidden md:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] ${
        isDirty
          ? 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange'
          : 'border-ink-900/10 bg-paper-50 text-ink-500'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isDirty ? 'bg-brand-orange animate-pulse' : 'bg-brand-green'
        }`}
      />
      {isDirty ? 'Unsaved changes' : 'Live · in sync'}
    </span>
  );
}

// Floating action bar. Only mounts when there are unsaved changes (or when
// we're briefly celebrating a save). Sits above the main content, inside
// the viewport — not in the topbar.
function SaveBar({ isDirty, justSaved, onSave, onDiscard }) {
  const show = isDirty || justSaved;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-4 md:bottom-6 z-40 flex justify-center px-4 pointer-events-none"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-ink-900/10 bg-paper-50 shadow-panel px-2 py-1.5 md:px-3 md:py-2">
            {justSaved ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 text-brand-green px-3 py-1.5 text-[13px] font-medium">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3 8.5l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Changes published to the live site
              </span>
            ) : (
              <>
                <span className="hidden sm:inline-flex items-center gap-2 pl-3 pr-1 text-[13px] text-ink-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                  You have unsaved changes
                </span>
                <button
                  type="button"
                  onClick={onDiscard}
                  className="rounded-full border border-ink-900/12 bg-paper-50 text-ink-800 px-3.5 py-1.5 text-[12.5px] font-medium hover:bg-paper-100 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  className="rounded-full bg-brand-orange text-paper-50 px-4 py-1.5 text-[13px] font-medium hover:bg-ink-950 transition-colors shadow-soft"
                >
                  Save changes
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
