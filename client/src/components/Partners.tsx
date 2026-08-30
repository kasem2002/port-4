import PartnerLogo from "@/components/PartnerLogo";
import Reveal from "@/components/Reveal";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Partners() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const settings = content?.settings;
  const partners = content?.partners ?? [];
  const parts = splitHeadline(l(settings, "partnersHeading"));
  const accent = settings?.partnersAccentLine ?? -1;

  return (
    <section className="relative border-y border-ink-900/10 bg-paper-100/50 py-20 md:py-24">
      <div className="container-p4">
        <div className="mb-10 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-6">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t("sections.partners")}
            </span>
            <h2 className="display-3 mt-4">
              {parts.map((part, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="font-normal italic text-brand-green">{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 self-end md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="max-w-sm text-[15px] text-ink-600">{t("partners.blurb")}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-paper-50">
            <div className="grid grid-cols-2 divide-x divide-y divide-ink-900/8 sm:grid-cols-3 md:grid-cols-6">
              {partners.map((partner, i) => (
                <div
                  key={partner.id}
                  className="group relative flex h-24 items-center justify-center px-4 transition-colors hover:bg-paper-100"
                >
                  <PartnerLogo
                    logo={partner.logo}
                    name={l(partner, "name")}
                    className="opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <span className="absolute top-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400 ltr:left-2 rtl:right-2">
                    {String(i + 1).padStart(2, "0")}
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
