import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Stats() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const settings = content?.settings;
  const stats = content?.stats ?? [];
  const parts = splitHeadline(l(settings, "trustHeading"));
  const accent = settings?.trustAccentLine ?? -1;

  return (
    <section className="relative py-24 md:py-28">
      <div className="container-p4">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                {t("sections.trust")}
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
            </div>
            <p className="max-w-sm text-[15px] text-ink-600">{l(settings, "trustBlurb")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-ink-900/10 bg-paper-100/40 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.05}>
              <div className="flex h-full flex-col border-b border-r border-ink-900/10 p-6 md:p-8">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {String(i + 1).padStart(2, "0")} / {String(stats.length).padStart(2, "0")}
                </span>
                <p className="mt-4 font-display text-5xl leading-none tracking-tightest text-ink-950 md:text-6xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-4 text-[15px] font-medium text-ink-900">{l(stat, "label")}</p>
                <p className="mt-1 text-[13px] text-ink-500">{l(stat, "hint")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
