import { motion } from 'framer-motion';
import { usePublicContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';
import ProjectVisual from './ProjectVisual.jsx';
import ProjectImage from './ProjectImage.jsx';

export default function Projects() {
  const { data: projects, l } = usePublicContent('projects');
  const t = useT();
  const parts = splitHeadline(l(projects.heading));
  const accent = projects.accentLine ?? -1;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-p4">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('sections.projects')}
            </span>
            <h2 className="display-2 mt-4">
              {parts.map((p, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="italic font-normal text-brand-orange">{p}</span>
                  ) : (
                    p
                  )}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 self-end" delay={0.1}>
            <p className="text-[15.5px] text-ink-600 max-w-sm">{l(projects.blurb)}</p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.items.map((p, i) => {
            const alignRight = i % 2 === 1;
            return (
              <Reveal key={p.id || i} delay={0.05}>
                <article className="grid grid-cols-12 gap-6 lg:gap-10 items-center">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`col-span-12 lg:col-span-7 ${alignRight ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-ink-900/10 shadow-panel aspect-[5/4] group">
                      <ProjectImage image={p.image} fallbackId={p.id} alt={l(p.name)} />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-4 ltr:left-4 rtl:right-4 chip bg-paper-50/95">
                        {l(p.category)}
                      </span>
                      <div className="absolute bottom-4 ltr:right-4 rtl:left-4 flex items-center gap-2 rounded-full bg-paper-50/95 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-800 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('projects.viewProject')}
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 13L13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  <div className={`col-span-12 lg:col-span-5 ${alignRight ? 'lg:order-1 lg:ltr:pr-8 lg:rtl:pl-8' : 'lg:ltr:pl-8 lg:rtl:pr-8'}`}>
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                      <span>{p.index}</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[2.4rem] md:text-[3rem] tracking-tighter2 leading-[1.06] text-ink-950">
                      {l(p.name)}
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700">
                      {l(p.summary)}
                    </p>
                    <div className="mt-6 pt-5 border-t border-ink-900/10">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                        {t('projects.result')}
                      </p>
                      <p className="mt-2 text-[15px] text-ink-900">{l(p.result)}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-brand-orange transition-colors group"
                    >
                      <span className="link-underline">{t('projects.caseStudy')}</span>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-ink-900/10">
            <p className="max-w-md text-[15px] text-ink-600">{t('projects.ndaNote')}</p>
            <a href="#contact" className="btn-primary">
              {t('projects.discuss')}
              <span className="btn-primary-icon">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
