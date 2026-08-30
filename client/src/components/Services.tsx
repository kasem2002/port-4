import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { splitHeadline, useL, useLE, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Services() {
  const { content } = useSiteContent();
  const l = useL();
  const le = useLE();
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = content?.settings;
  const services = content?.services ?? [];
  const parts = splitHeadline(l(settings, "servicesHeading"));
  const accent = settings?.servicesAccentLine ?? -1;

  const current = services[Math.min(activeIndex, services.length - 1)];

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-p4">
        <div className="mb-14 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-6">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t("sections.services")}
            </span>
            <h2 className="display-2 mt-4">
              {parts.map((part, i) => (
                <span key={i} className="block">
                  {i === accent ? <span className="font-normal italic">{part}</span> : part}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal className="col-span-12 self-end md:col-span-5 md:col-start-8" delay={0.1}>
            <p className="max-w-md text-[15.5px] text-ink-600">{t("services.hoverHint")}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="grid grid-cols-12 gap-6 rounded-3xl border border-ink-900/10 bg-paper-100/40 p-3 md:p-4 lg:gap-10">
            <ul className="col-span-12 flex flex-col lg:col-span-7">
              {services.map((service, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={service.id}>
                    <button
                      onMouseEnter={() => setActiveIndex(i)}
                      onFocus={() => setActiveIndex(i)}
                      onClick={() => setActiveIndex(i)}
                      className={`group flex w-full items-center gap-5 border-b border-ink-900/8 px-5 py-5 text-start transition-colors last:border-b-0 md:gap-8 md:px-7 md:py-6 ${
                        isActive ? "bg-paper-50" : "hover:bg-paper-50/60"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                          isActive ? "text-brand-orange" : "text-ink-500"
                        }`}
                      >
                        {service.tag}
                      </span>
                      <span
                        className={`flex-1 font-display text-2xl leading-tight tracking-tighter2 transition-colors md:text-[2rem] ${
                          isActive ? "text-ink-950" : "text-ink-700 group-hover:text-ink-950"
                        }`}
                      >
                        {l(service, "title")}
                      </span>
                      <motion.span
                        aria-hidden
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-900/10"
                        animate={{
                          background: isActive ? "#D85A30" : "transparent",
                          color: isActive ? "#FBF8F3" : "#26231F",
                          borderColor: isActive ? "transparent" : "rgba(26,24,21,0.10)",
                        }}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3.5 w-3.5 rtl:-scale-x-100"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="col-span-12 h-full lg:sticky lg:top-24 lg:col-span-5">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-ink-950 p-7 text-paper-50 md:p-8">
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="relative flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
                    {t("services.service")} · {current?.tag ?? ""}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
                    {t("services.live")}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current?.id ?? "empty"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="relative mt-6"
                  >
                    <h3 className="font-display text-4xl leading-[1.08] tracking-tighter2 md:text-5xl">
                      {l(current, "title")}
                    </h3>
                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-50/80">
                      {l(current, "description")}
                    </p>

                    <div className="mt-8">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/45">
                        {t("services.deliver")}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {(current?.outcomes ?? []).map((outcome, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-[14.5px]">
                            <span className="h-1 w-4 bg-brand-orange" />
                            {le(outcome)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/45">
                        {t("services.stack")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(current?.stack ?? []).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper-50/80"
                          >
                            {tech}
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
