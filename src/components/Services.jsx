import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveService } from '../store/servicesSlice.js';
import { usePublicContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';

export default function Services() {
  const active = useSelector((s) => s.services.activeIndex);
  const dispatch = useDispatch();
  const { data: services, l } = usePublicContent('services');
  const t = useT();
  const items = services.items;
  const activeIndex = Math.min(active, items.length - 1);
  const current = items[activeIndex] || items[0];
  const parts = splitHeadline(l(services.heading));
  const accent = services.accentLine ?? -1;

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-p4">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <Reveal className="col-span-12 md:col-span-6">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('sections.services')}
            </span>
            <h2 className="display-2 mt-4">
              {parts.map((p, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="italic font-normal">{p}</span>
                  ) : (
                    p
                  )}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-5 md:col-start-8 self-end" delay={0.1}>
            <p className="text-[15.5px] text-ink-600 max-w-md">{t('services.hoverHint')}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid grid-cols-12 gap-6 lg:gap-10 rounded-3xl border border-ink-900/10 bg-paper-100/40 p-3 md:p-4">
            <ul className="col-span-12 lg:col-span-7 flex flex-col">
              {items.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={s.id || i}>
                    <button
                      onMouseEnter={() => dispatch(setActiveService(i))}
                      onFocus={() => dispatch(setActiveService(i))}
                      onClick={() => dispatch(setActiveService(i))}
                      className={`group w-full text-start px-5 md:px-7 py-5 md:py-6 border-b border-ink-900/8 last:border-b-0 flex items-center gap-5 md:gap-8 transition-colors ${
                        isActive ? 'bg-paper-50' : 'hover:bg-paper-50/60'
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                          isActive ? 'text-brand-orange' : 'text-ink-500'
                        }`}
                      >
                        {s.tag}
                      </span>
                      <span
                        className={`flex-1 font-display text-2xl md:text-[2rem] tracking-tighter2 leading-tight transition-colors ${
                          isActive ? 'text-ink-950' : 'text-ink-700 group-hover:text-ink-950'
                        }`}
                      >
                        {l(s.title)}
                      </span>
                      <motion.span
                        aria-hidden
                        className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/10 shrink-0"
                        animate={{
                          background: isActive ? '#D85A30' : 'transparent',
                          color: isActive ? '#FBF8F3' : '#26231F',
                          borderColor: isActive ? 'transparent' : 'rgba(26,24,21,0.10)',
                        }}
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-24 h-full">
              <div className="relative h-full rounded-2xl bg-ink-950 text-paper-50 overflow-hidden p-7 md:p-8 min-h-[420px]">
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                <div className="relative flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
                    {t('services.service')} · {current.tag}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
                    {t('services.live')}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id || activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="relative mt-6"
                  >
                    <h3 className="font-display text-4xl md:text-5xl tracking-tighter2 leading-[1.08]">
                      {l(current.title)}
                    </h3>
                    <p className="mt-5 text-[15px] leading-relaxed text-paper-50/80 max-w-md">
                      {l(current.description)}
                    </p>

                    <div className="mt-8">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/45">
                        {t('services.deliver')}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {current.outcomes.map((o, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-[14.5px]">
                            <span className="h-1 w-4 bg-brand-orange" />
                            {l(o)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/45">
                        {t('services.stack')}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.stack.map((tItem) => (
                          <span
                            key={tItem}
                            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper-50/80"
                          >
                            {tItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
