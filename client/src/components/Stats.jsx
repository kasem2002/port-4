import { usePublicContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';
import CountUp from './CountUp.jsx';

export default function Stats() {
  const { data: trust, l } = usePublicContent('trust');
  const t = useT();
  const parts = splitHeadline(l(trust.heading));
  const accent = trust.accentLine ?? -1;

  return (
    <section className="relative py-24 md:py-28">
      <div className="container-p4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t('sections.trust')}
              </span>
              <h2 className="display-3 mt-4">
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
            </div>
            <p className="max-w-sm text-[15px] text-ink-600">{l(trust.blurb)}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-ink-900/10 rounded-2xl overflow-hidden bg-paper-100/40">
          {trust.items.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="border-r border-b border-ink-900/10 p-6 md:p-8 h-full flex flex-col">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {String(i + 1).padStart(2, '0')} / {String(trust.items.length).padStart(2, '0')}
                </span>
                <p className="mt-4 font-display text-5xl md:text-6xl text-ink-950 leading-none tracking-tightest">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-4 text-[15px] font-medium text-ink-900">{l(s.label)}</p>
                <p className="mt-1 text-[13px] text-ink-500">{l(s.hint)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
