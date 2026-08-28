import { useContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';

export default function Journal() {
  const { data: journal, l } = useContent('journal');
  const t = useT();
  const items = journal.items || [];
  const featured = items.find((a) => a.featured) || items[0];
  const rest = items.filter((a) => a !== featured);
  const parts = splitHeadline(l(journal.heading));
  const accent = journal.accentLine ?? -1;

  return (
    <section id="journal" className="relative py-24 md:py-32">
      <div className="container-p4">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('sections.journal')}
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
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 self-end" delay={0.1}>
            <p className="text-[15.5px] text-ink-600 max-w-sm">{t('journal.blurb')}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {featured && (
            <Reveal className="col-span-12 lg:col-span-7">
              <a href="#" className="group block">
                <article className="rounded-2xl border border-ink-900/10 bg-paper-50 overflow-hidden hover:shadow-panel transition-shadow">
                  <div className="relative h-64 md:h-80 bg-ink-950 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <div className="absolute -bottom-20 ltr:-right-16 rtl:-left-16 h-80 w-80 rounded-full bg-brand-orange/30 blur-3xl" />
                    <div className="absolute inset-0 flex items-end p-8">
                      <div className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/70">
                        <span className="rounded-full border border-white/20 px-2.5 py-1">{t('journal.featured')}</span>
                        <span>{l(featured.category)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-7 md:p-8">
                    <h3 className="font-display text-3xl md:text-4xl tracking-tighter2 leading-tight text-ink-950 group-hover:text-brand-orange transition-colors">
                      {l(featured.title)}
                    </h3>
                    <p className="mt-4 text-[15.5px] text-ink-700 leading-relaxed max-w-xl">
                      {l(featured.excerpt)}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-[13px] text-ink-500">
                      <span>{l(featured.author)} · {l(featured.date)}</span>
                      <span>{l(featured.read)}</span>
                    </div>
                  </div>
                </article>
              </a>
            </Reveal>
          )}

          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            {rest.map((a, i) => (
              <Reveal key={a.id || i} delay={i * 0.05}>
                <a
                  href="#"
                  className="group block rounded-2xl border border-ink-900/10 bg-paper-50 p-6 md:p-7 hover:bg-paper-100 transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                    <span>{l(a.category)}</span>
                    <span>{l(a.read)}</span>
                  </div>
                  <h4 className="mt-3 font-display text-xl md:text-2xl tracking-tight leading-snug text-ink-950 group-hover:text-brand-orange transition-colors">
                    {l(a.title)}
                  </h4>
                  <p className="mt-2 text-[14px] text-ink-600 line-clamp-2">{l(a.excerpt)}</p>
                  <div className="mt-4 flex items-center justify-between text-[12.5px] text-ink-500">
                    <span>{l(a.author)} · {l(a.date)}</span>
                    <span className="text-brand-orange">→</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
