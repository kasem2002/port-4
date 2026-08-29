import { usePublicContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';
import PartnerLogo from './PartnerLogo.jsx';

// Legacy shape (early defaults / older localStorage) stored an item as
// { en, ar } directly. New shape is { name: { en, ar }, logo: '' }.
// Normalize on read so both work without a migration step.
function normalize(item) {
  if (item && typeof item === 'object' && 'name' in item) return item;
  return { name: item, logo: '' };
}

export default function Partners() {
  const { data: partners, l } = usePublicContent('partners');
  const t = useT();
  const parts = splitHeadline(l(partners.heading));
  const accent = partners.accentLine ?? -1;
  const items = (partners.items || []).map(normalize);

  return (
    <section className="relative py-20 md:py-24 border-y border-ink-900/10 bg-paper-100/50">
      <div className="container-p4">
        <div className="grid grid-cols-12 gap-8 mb-10">
          <Reveal className="col-span-12 md:col-span-6">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t('sections.partners')}
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
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9 self-end" delay={0.1}>
            <p className="text-[15px] text-ink-600 max-w-sm">{t('partners.blurb')}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-2xl border border-ink-900/10 bg-paper-50 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-y divide-ink-900/8">
              {items.map((p, i) => (
                <div
                  key={i}
                  className="group relative flex h-24 items-center justify-center px-4 hover:bg-paper-100 transition-colors"
                >
                  <PartnerLogo
                    logo={p.logo}
                    name={l(p.name)}
                    className="grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="absolute top-2 ltr:left-2 rtl:right-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
