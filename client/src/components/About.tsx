import Reveal from "@/components/Reveal";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function About() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const settings = content?.settings;
  const bullets = content?.aboutBullets ?? [];
  const teamRoles = content?.teamRoles ?? [];
  const parts = splitHeadline(l(settings, "aboutHeading"));
  const accent = settings?.aboutAccentLine ?? -1;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-ink-950 py-24 text-paper-50 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(216,90,48,0.18), transparent 60%)" }}
      />

      <div className="container-p4 relative">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-4">
            <span className="eyebrow text-paper-50/60">
              <span className="eyebrow-dot" />
              {t("sections.about")}
            </span>
            <h2 className="display-2 mt-4 text-paper-50">
              {parts.map((part, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="font-normal italic text-brand-orange">{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8" delay={0.1}>
            <div className="max-w-2xl space-y-6 md:ltr:pl-8 md:rtl:pr-8 lg:ltr:pl-16 lg:rtl:pr-16">
              <p className="text-[17px] leading-relaxed text-paper-50/80">
                {l(settings, "aboutBody")}
              </p>
              <p className="text-[17px] leading-relaxed text-paper-50/70">
                {l(settings, "aboutBodyTwo")}
              </p>

              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 pt-4 text-[14.5px] text-paper-50/80 sm:grid-cols-2">
                {bullets.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 h-3 w-3 shrink-0 text-brand-orange"
                      fill="currentColor"
                    >
                      <circle cx="8" cy="8" r="4" />
                    </svg>
                    <span>{l(bullet, "text")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/50">
                {l(settings, "aboutTopologyTitle")}
              </p>
              <p className="text-[13px] text-paper-50/50">{l(settings, "aboutTopologySub")}</p>
            </div>

            <div className="relative mt-10">
              <div className="flex justify-center">
                <div className="rounded-2xl border border-brand-orange/40 bg-brand-orange/10 px-6 py-4 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-orange">
                    {l(settings, "aboutCoreLabel")}
                  </p>
                  <p className="mt-1 font-display text-2xl leading-none text-paper-50">PORT-4</p>
                </div>
              </div>

              <svg
                className="absolute left-1/2 top-[86px] hidden -translate-x-1/2 md:block"
                width="820"
                height="60"
                viewBox="0 0 820 60"
                fill="none"
                aria-hidden="true"
              >
                <path d="M410,0 L410,20 L60,20 L60,60" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M410,0 L410,20 L230,20 L230,60" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M410,0 L410,60" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M410,0 L410,20 L590,20 L590,60" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M410,0 L410,20 L760,20 L760,60" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              </svg>

              <div className="mt-8 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-5 md:gap-4">
                {teamRoles.map((role) => (
                  <div
                    key={role.id}
                    className="rounded-xl border border-white/10 bg-ink-900/60 px-4 py-4 transition-colors hover:border-brand-orange/40"
                  >
                    <div className="flex items-baseline justify-between">
                      <p className="font-medium text-paper-50">{l(role, "role")}</p>
                      <span className="font-mono text-[11px] text-brand-orange">×{role.count}</span>
                    </div>
                    <p className="mt-1 text-[12.5px] text-paper-50/55">{l(role, "note")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
