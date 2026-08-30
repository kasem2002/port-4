import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/SocialIcon";
import { splitHeadline, useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useCreateInquiryMutation } from "@/services/api";

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [createInquiry, { isLoading, error }] = useCreateInquiryMutation();

  const settings = content?.settings;
  const social = content?.social ?? [];
  const projectTypes = content?.projectTypes ?? [];
  const budgets = content?.budgets ?? [];
  const parts = splitHeadline(l(settings, "contactHeading"));
  const accent = settings?.contactAccentLine ?? -1;

  const set = (field: keyof typeof EMPTY_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /** Chips toggle off when the already-selected value is clicked again. */
  const toggleChip = (field: "projectType" | "budget", value: string) =>
    setForm((prev) => ({ ...prev, [field]: prev[field] === value ? "" : value }));

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createInquiry(form).unwrap();
      setSent(true);
      setForm(EMPTY_FORM);
      setTimeout(() => setSent(false), 6000);
    } catch {
      // The error branch renders from the mutation's own `error` state.
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink-950 py-24 text-paper-50 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-3xl ltr:-right-40 rtl:-left-40" />
      <div className="pointer-events-none absolute -bottom-40 h-[520px] w-[520px] rounded-full bg-brand-green/15 blur-3xl ltr:-left-40 rtl:-right-40" />

      <div className="container-p4 relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-14">
          <Reveal className="col-span-12 lg:col-span-5">
            <span className="eyebrow text-paper-50/60">
              <span className="eyebrow-dot" />
              {t("sections.contact")}
            </span>
            <h2 className="display-1 mt-4 text-paper-50">
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

            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-paper-50/75">
              {l(settings, "contactBlurb")}
            </p>

            <div className="mt-10 space-y-5">
              <ContactLine
                label={t("contact.emailLabel")}
                value={settings?.email ?? ""}
                href={settings?.email ? `mailto:${settings.email}` : undefined}
              />
              <ContactLine label={t("contact.phoneLabel")} value={settings?.phone ?? ""} />
              <ContactLine label={t("contact.studioLabel")} value={l(settings, "location")} />
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {social.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <SocialIcon
                    icon={link.icon}
                    className="h-4 w-4 text-paper-50/70 transition-colors group-hover:text-brand-orange"
                    fallback={
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/60 group-hover:text-brand-orange">
                        {link.abbr}
                      </span>
                    }
                  />
                  {l(link, "label")}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
            >
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
                  {l(settings, "contactFormIntro")}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-green">
                  {l(settings, "contactFormEncrypted")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={t("contact.name")} required requiredLabel={t("contact.required")}>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder={t("contact.namePlaceholder")}
                    className="input-dark"
                  />
                </Field>

                <Field label={t("contact.email")} required requiredLabel={t("contact.required")}>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder={t("contact.emailPlaceholder")}
                    className="input-dark"
                  />
                </Field>

                <Field label={t("contact.company")} hint={t("contact.optional")}>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder={t("contact.companyPlaceholder")}
                    className="input-dark"
                  />
                </Field>

                <Field label={t("contact.budget")} hint={t("contact.budgetHint")}>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {budgets.map((budget) => (
                      <Chip
                        key={budget.id}
                        label={budget.label}
                        selected={form.budget === budget.label}
                        onClick={() => toggleChip("budget", budget.label)}
                      />
                    ))}
                  </div>
                </Field>

                <Field label={t("contact.projectType")} className="md:col-span-2">
                  <div className="flex flex-wrap gap-2 pt-1">
                    {projectTypes.map((type) => {
                      const label = l(type, "label");
                      return (
                        <Chip
                          key={type.id}
                          label={label}
                          selected={form.projectType === label}
                          onClick={() => toggleChip("projectType", label)}
                        />
                      );
                    })}
                  </div>
                </Field>

                <Field
                  label={t("contact.message")}
                  required
                  requiredLabel={t("contact.required")}
                  className="md:col-span-2"
                >
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder={t("contact.messagePlaceholder")}
                    className="input-dark resize-none"
                  />
                </Field>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-md text-[12.5px] text-paper-50/50">
                  {l(settings, "contactPrivacyNote")}
                </p>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-orange py-2 text-sm font-medium text-paper-50 transition-colors hover:bg-paper-50 hover:text-ink-950 disabled:opacity-60 ltr:pl-5 ltr:pr-2 rtl:pl-2 rtl:pr-5"
                >
                  {isLoading
                    ? l(settings, "contactSubmitSending")
                    : l(settings, "contactSubmitLabel")}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-paper-50 transition-colors group-hover:bg-brand-orange">
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
                </button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl border border-brand-green/40 bg-brand-green/10 px-4 py-3 text-[13.5px] text-paper-50"
                  >
                    {l(settings, "contactSuccessMessage")}
                  </motion.div>
                )}
                {error && !sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl border border-brand-orange/40 bg-brand-orange/10 px-4 py-3 text-[13.5px] text-paper-50"
                  >
                    {t("contact.error")}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .input-dark {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14.5px;
          color: #FBF8F3;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .input-dark::placeholder { color: rgba(251,248,243,0.35); }
        .input-dark:focus { outline: none; border-color: #D85A30; }
      `}</style>
    </section>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  requiredLabel?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, required, hint, className = "", children }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/60">
          {label} {required && <span className="text-brand-orange">*</span>}
        </span>
        {hint && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/35">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
        selected
          ? "border-brand-orange bg-brand-orange text-paper-50"
          : "border-white/15 text-paper-50/70 hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  if (!value) return null;
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="group flex items-baseline justify-between border-b border-white/10 pb-4 transition-colors hover:border-brand-orange"
    >
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
        {label}
      </span>
      <span className="font-display text-lg text-paper-50 transition-colors group-hover:text-brand-orange md:text-xl">
        {value}
      </span>
    </Wrapper>
  );
}
