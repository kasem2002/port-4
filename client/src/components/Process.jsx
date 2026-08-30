import { motion } from 'framer-motion';
import { usePublicContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';

export default function Process() {
  const { data: process, l } = usePublicContent('process');
  const t = useT();
  const parts = splitHeadline(l(process.heading));
  const accent = process.accentLine ?? -1;

  return (
    <section id="process" className="relative py-24 md:py-32 bg-paper-100/60 border-y border-ink-900/10">
      <div className="container-p4">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('sections.process')}
            </span>
            <h2 className="display-2 mt-4">
              {parts.map((p, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="italic font-normal text-brand-green">{p}</span>
                  ) : (
                    p
                  )}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 self-end" delay={0.1}>
            <p className="text-[15.5px] text-ink-600 max-w-sm">{l(process.blurb)}</p>
          </Reveal>
        </div>

        <ol className="relative">
          <div className="absolute ltr:left-6 rtl:right-6 md:ltr:left-1/2 md:rtl:right-1/2 top-0 bottom-0 w-px bg-ink-900/10 md:-translate-x-px" />

          {process.steps.map((step, i) => {
            const alignRight = i % 2 === 1;
            return (
              <li key={i} className="relative mb-10 md:mb-16 last:mb-0">
                <div className="grid md:grid-cols-2 md:gap-16 items-start">
                  <div className={`hidden md:block ${alignRight ? '' : 'md:order-1'}`}>
                    {!alignRight && <StepCard step={step} index={i} l={l} t={t} />}
                  </div>
                  <div className="absolute ltr:left-6 rtl:right-6 md:ltr:left-1/2 md:rtl:right-1/2 top-3 -translate-x-1/2 z-10">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="block h-3 w-3 rounded-full bg-brand-orange ring-4 ring-paper-100"
                    />
                  </div>
                  <div className={`ltr:pl-16 rtl:pr-16 md:ltr:pl-0 md:rtl:pr-0 ${alignRight ? '' : 'md:order-2'}`}>
                    {alignRight ? <StepCard step={step} index={i} l={l} t={t} /> : <StepCard step={step} index={i} l={l} t={t} mobileOnly />}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StepCard({ step, index, l, t, mobileOnly = false }) {
  return (
    <Reveal delay={0.05 * index} className={mobileOnly ? 'md:hidden' : ''}>
      <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-6 md:p-7 shadow-soft">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-orange">
            {step.id}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
            {t('process.stage')}
          </span>
        </div>
        <h3 className="mt-2 font-display text-[2rem] md:text-[2.4rem] tracking-tighter2 leading-[1.1] text-ink-950">
          {l(step.title)}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-700">{l(step.body)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {step.tokens.map((tok, i) => (
            <span key={i} className="chip">{l(tok)}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
