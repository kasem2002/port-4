import { useContent, useT } from '../hooks/useLocalized.js';
import LangToggle from './LangToggle.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  const t = useT();
  const { data: brand, l } = useContent('brand');
  const { data: nav } = useContent('nav');
  const { data: services } = useContent('services');
  const { data: footer } = useContent('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-paper-50 border-t border-ink-900/10">
      <div className="container-p4 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <Logo className="h-9" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-600">
              {l(footer.aboutBlurb)}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {brand.social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-[11px] font-mono uppercase tracking-[0.14em] text-ink-800 hover:bg-ink-950 hover:text-paper-50 transition-colors"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500 mb-4">
              {t('footer.navigate')}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              {nav.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="link-underline hover:text-brand-orange transition-colors">
                    {l(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500 mb-4">
              {t('footer.services')}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              {services.items.slice(0, 6).map((s, i) => (
                <li key={i}>
                  <a href="#services" className="link-underline hover:text-brand-orange transition-colors">
                    {l(s.title)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500 mb-4">
              {t('footer.contact')}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              <li>
                <a href={`mailto:${brand.email}`} className="link-underline hover:text-brand-orange transition-colors">
                  {brand.email}
                </a>
              </li>
              <li className="text-ink-600">{brand.phone}</li>
              <li className="text-ink-600">{l(brand.location)}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24 select-none">
          <p className="font-display font-light tracking-[-0.06em] leading-none text-ink-950" style={{ fontSize: 'clamp(4rem, 22vw, 20rem)' }}>
            PORT<span className="text-brand-orange">-</span>4
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-900/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12.5px] text-ink-500">
          <p>© {year} PORT-4. {t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="link-underline hover:text-ink-900">{t('footer.privacy')}</a>
            <a href="#" className="link-underline hover:text-ink-900">{t('footer.terms')}</a>
            <LangToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
