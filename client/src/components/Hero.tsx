import { motion } from "framer-motion";
import HeroVisual from "@/components/HeroVisual";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 1.7 } },
};

const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

/** Swatches under the trust line — the brand palette, not real avatars. */
const PALETTE = ["#0F0E0C", "#D85A30", "#47704C", "#3A3630"];

export default function Hero() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const settings = content?.settings;
  const parts = splitHeadline(l(settings, "heroHeadline"));
  const accent = settings?.heroAccentLine ?? -1;

  return (
    <section id="top" className="relative pb-20 pt-32 md:pt-36 lg:pb-28 lg:pt-40">
      <div className="container-p4 mb-10 grid grid-cols-2 gap-6 md:mb-14 md:grid-cols-12">
        <div className="col-span-1 md:col-span-3">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t("hero.badge")}
          </span>
        </div>
        <div className="hidden md:col-span-6 md:block" />
        <div className="col-span-1 flex md:col-span-3 md:justify-end">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t("hero.disciplines")}
          </span>
        </div>
      </div>

      <div className="container-p4 grid grid-cols-12 gap-6 lg:gap-10">
        <motion.div
          className="col-span-12 lg:col-span-7"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={rise} className="display-1">
            {parts.map((part, i) => (
              <span key={i} className="block">
                {i === accent ? (
                  <span className="font-normal italic text-brand-orange">{part}</span>
                ) : (
                  part
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-700"
          >
            {l(settings, "heroSubcopy")}
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              {t("nav.startProject")}
              <span className="btn-primary-icon">
                <ArrowIcon />
              </span>
            </a>
            <a href="#projects" className="btn-ghost">
              <span className="link-underline">{t("hero.seeWork")}</span>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 13L13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink-900/10 pt-6"
          >
            <div className="flex items-center -space-x-2 rtl:space-x-reverse">
              {PALETTE.map((color) => (
                <span
                  key={color}
                  className="h-8 w-8 rounded-full border-2 border-paper-50"
                  style={{ background: color }}
                />
              ))}
            </div>
            <div className="text-sm text-ink-700">
              <p className="font-medium text-ink-900">{l(settings, "heroTrustTitle")}</p>
              <p className="text-[13px] text-ink-500">{l(settings, "heroTrustSub")}</p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-600 ltr:ml-auto rtl:mr-auto">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              {t("hero.slotsOpen")}
            </div>
          </motion.div>
        </motion.div>

        <div className="col-span-12 lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <div className="container-p4 mt-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-ink-500 md:mt-20">
        <span>{t("hero.scrollCue")}</span>
        <span className="hidden md:inline">{t("hero.section")}</span>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
