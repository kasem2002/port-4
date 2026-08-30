import { motion } from "framer-motion";
import ProjectImage from "@/components/ProjectImage";
import Reveal from "@/components/Reveal";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Projects() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();

  const settings = content?.settings;
  const projects = content?.projects ?? [];
  const parts = splitHeadline(l(settings, "projectsHeading"));
  const accent = settings?.projectsAccentLine ?? -1;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-p4">
        <div className="mb-16 grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t("sections.projects")}
            </span>
            <h2 className="display-2 mt-4">
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
          <Reveal className="col-span-12 self-end md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="max-w-sm text-[15.5px] text-ink-600">{l(settings, "projectsBlurb")}</p>
          </Reveal>
        </div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => {
            const alignRight = i % 2 === 1;
            return (
              <Reveal key={project.id} delay={0.05}>
                <article className="grid grid-cols-12 items-center gap-6 lg:gap-10">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`col-span-12 lg:col-span-7 ${alignRight ? "lg:order-2" : ""}`}
                  >
                    <div className="group relative aspect-[5/4] overflow-hidden rounded-2xl border border-ink-900/10 shadow-panel">
                      <ProjectImage
                        image={project.image}
                        fallbackId={project.slug}
                        alt={l(project, "name")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="chip absolute top-4 bg-paper-50/95 ltr:left-4 rtl:right-4">
                        {l(project, "category")}
                      </span>
                      <div className="absolute bottom-4 flex items-center gap-2 rounded-full bg-paper-50/95 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-800 opacity-0 transition-opacity group-hover:opacity-100 ltr:right-4 rtl:left-4">
                        {t("projects.viewProject")}
                        <svg
                          viewBox="0 0 16 16"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 13L13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  <div
                    className={`col-span-12 lg:col-span-5 ${
                      alignRight
                        ? "lg:order-1 lg:ltr:pr-8 lg:rtl:pl-8"
                        : "lg:ltr:pl-8 lg:rtl:pr-8"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                      <span>{project.indexLabel}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[2.4rem] leading-[1.06] tracking-tighter2 text-ink-950 md:text-[3rem]">
                      {l(project, "name")}
                    </h3>
                    <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700">
                      {l(project, "summary")}
                    </p>
                    <div className="mt-6 border-t border-ink-900/10 pt-5">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                        {t("projects.result")}
                      </p>
                      <p className="mt-2 text-[15px] text-ink-900">{l(project, "result")}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors hover:text-brand-orange"
                    >
                      <span className="link-underline">{t("projects.caseStudy")}</span>
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
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
          <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-ink-900/10 pt-10 md:flex-row md:items-center">
            <p className="max-w-md text-[15px] text-ink-600">{t("projects.ndaNote")}</p>
            <a href="#contact" className="btn-primary">
              {t("projects.discuss")}
              <span className="btn-primary-icon">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 rtl:-scale-x-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
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
