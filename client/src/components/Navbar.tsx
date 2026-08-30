import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LangToggle from "@/components/LangToggle";
import Logo from "@/components/Logo";
import { useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";
import { closeMobileMenu, toggleMobileMenu } from "@/store/uiSlice";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.mobileMenuOpen);
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const nav = content?.nav ?? [];
  const settings = content?.settings;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
      >
        <motion.nav
          className="mt-3 flex w-[calc(100%-1.5rem)] max-w-[1360px] items-center justify-between rounded-full border transition-all duration-500 md:mt-5"
          animate={{
            paddingLeft: scrolled ? 14 : 24,
            paddingRight: scrolled ? 10 : 12,
            paddingTop: scrolled ? 8 : 12,
            paddingBottom: scrolled ? 8 : 12,
            backgroundColor: scrolled ? "rgba(251, 248, 243, 0.85)" : "rgba(251, 248, 243, 0.55)",
            borderColor: scrolled ? "rgba(26,24,21,0.10)" : "rgba(26,24,21,0.06)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="link-underline rounded-full px-3.5 py-1.5 text-[13.5px] text-ink-800 transition-colors hover:text-ink-950"
                >
                  {l(item, "label")}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <a href="#contact" className="btn-primary hidden md:inline-flex">
              {t("nav.startProject")}
              <span className="btn-primary-icon">
                <ArrowIcon />
              </span>
            </a>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label={t("nav.toggleMenu")}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-900 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
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
            className="fixed inset-0 z-40 bg-paper-50 px-6 pt-24 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="hairline flex flex-col divide-y border-b border-t border-ink-900/10">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => dispatch(closeMobileMenu())}
                    className="flex items-center justify-between py-5 font-display text-2xl text-ink-950"
                  >
                    {l(item, "label")}
                    <ArrowIcon className="h-4 w-4 text-brand-orange" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 text-sm text-ink-700">
              <p>{settings?.email}</p>
              <p>{l(settings, "location")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className} rtl:-scale-x-100`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
