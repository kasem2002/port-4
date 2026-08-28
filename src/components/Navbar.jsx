import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileMenu, closeMobileMenu } from '../store/uiSlice.js';
import { useContent, useT, useL, useLang } from '../hooks/useLocalized.js';
import Logo from './Logo.jsx';
import LangToggle from './LangToggle.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.mobileMenuOpen);
  const { data: nav } = useContent('nav');
  const { data: brand } = useContent('brand');
  const t = useT();
  const l = useL();
  const lang = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
      >
        <motion.nav
          className="mt-3 md:mt-5 flex w-[calc(100%-1.5rem)] max-w-[1360px] items-center justify-between rounded-full border transition-all duration-500"
          animate={{
            paddingLeft: scrolled ? 14 : 24,
            paddingRight: scrolled ? 10 : 12,
            paddingTop: scrolled ? 8 : 12,
            paddingBottom: scrolled ? 8 : 12,
            backgroundColor: scrolled ? 'rgba(251, 248, 243, 0.85)' : 'rgba(251, 248, 243, 0.55)',
            borderColor: scrolled ? 'rgba(26,24,21,0.10)' : 'rgba(26,24,21,0.06)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <ul className="hidden lg:flex items-center gap-1">
            {nav.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className="link-underline rounded-full px-3.5 py-1.5 text-[13.5px] text-ink-800 hover:text-ink-950 transition-colors"
                >
                  {l(item.label)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <span className="hidden md:inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green" />
              </span>
              {t('nav.openForQ4')}
            </span>
            <LangToggle />
            <a href="#contact" className="hidden md:inline-flex btn-primary">
              {t('nav.startProject')}
              <span className="btn-primary-icon">
                <ArrowIcon dir={lang === 'ar' ? 'rtl' : 'ltr'} />
              </span>
            </a>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label={t('nav.toggleMenu')}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-900"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M4 8h16" strokeLinecap="round" />
                    <path d="M4 16h10" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-paper-50 pt-24 px-6 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="flex flex-col divide-y hairline border-t border-b border-ink-900/10">
              {nav.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    onClick={() => dispatch(closeMobileMenu())}
                    className="flex items-center justify-between py-5 font-display text-2xl text-ink-950"
                  >
                    {l(item.label)}
                    <ArrowIcon dir={lang === 'ar' ? 'rtl' : 'ltr'} className="h-4 w-4 text-brand-orange" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 text-sm text-ink-700">
              <p>{brand.email}</p>
              <p>{l(brand.location)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowIcon({ dir = 'ltr', className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }}>
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
