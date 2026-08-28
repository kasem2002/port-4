import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { updateField, setStatus, resetForm } from '../store/contactSlice.js';
import { useContent, useT, splitHeadline } from '../hooks/useLocalized.js';
import Reveal from './Reveal.jsx';

export default function Contact() {
  const form = useSelector((s) => s.contact.form);
  const status = useSelector((s) => s.contact.status);
  const dispatch = useDispatch();
  const t = useT();
  const { data: contact, l } = useContent('contact');
  const { data: brand } = useContent('brand');
  const parts = splitHeadline(l(contact.heading));
  const accent = contact.accentLine ?? -1;

  const onChange = (field) => (e) =>
    dispatch(updateField({ field, value: e.target.value }));

  const onPickChip = (field, value) =>
    dispatch(updateField({ field, value: form[field] === value ? '' : value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setStatus('submitting'));
    setTimeout(() => {
      dispatch(setStatus('success'));
      setTimeout(() => dispatch(resetForm()), 4000);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-ink-950 text-paper-50 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[520px] w-[520px] rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 ltr:-left-40 rtl:-right-40 h-[520px] w-[520px] rounded-full bg-brand-green/15 blur-3xl pointer-events-none" />

      <div className="container-p4 relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-14">
          <Reveal className="col-span-12 lg:col-span-5">
            <span className="eyebrow text-paper-50/60">
              <span className="eyebrow-dot" />
              {t('sections.contact')}
            </span>
            <h2 className="display-1 mt-4 text-paper-50">
              {parts.map((p, i) => (
                <span key={i} className="block">
                  {i === accent ? (
                    <span className="italic font-normal text-brand-orange">{p}</span>
                  ) : (
                    p
                  )}
                </span>
              ))}
            </h2>

            <p className="mt-8 text-[16px] leading-relaxed text-paper-50/75 max-w-md">
              {t('contact.blurb')}
            </p>

            <div className="mt-10 space-y-5">
              <ContactLine label={t('contact.emailLabel')} value={brand.email} href={`mailto:${brand.email}`} />
              <ContactLine label={t('contact.phoneLabel')} value={brand.phone} />
              <ContactLine label={t('contact.studioLabel')} value={l(brand.location)} />
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {brand.social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/60 group-hover:text-brand-orange">{s.abbr}</span>
                  {l(s.label)}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
                  {t('contact.newProject')}
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-green">
                  {t('contact.encrypted')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label={t('contact.name')} required requiredLabel={t('contact.required')}>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={onChange('name')}
                    placeholder={t('contact.namePlaceholder')}
                    className="input-dark"
                  />
                </Field>
                <Field label={t('contact.email')} required requiredLabel={t('contact.required')}>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder={t('contact.emailPlaceholder')}
                    className="input-dark"
                  />
                </Field>
                <Field label={t('contact.company')} hint={t('contact.optional')}>
                  <input
                    type="text"
                    value={form.company}
                    onChange={onChange('company')}
                    placeholder={t('contact.companyPlaceholder')}
                    className="input-dark"
                  />
                </Field>
                <Field label={t('contact.budget')} hint={t('contact.budgetHint')}>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {contact.budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => onPickChip('budget', b)}
                        className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
                          form.budget === b
                            ? 'border-brand-orange bg-brand-orange text-paper-50'
                            : 'border-white/15 text-paper-50/70 hover:border-white/30'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label={t('contact.projectType')} className="md:col-span-2">
                  <div className="flex flex-wrap gap-2 pt-1">
                    {contact.projectTypes.map((p, i) => {
                      const label = l(p);
                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={() => onPickChip('projectType', label)}
                          className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
                            form.projectType === label
                              ? 'border-brand-orange bg-brand-orange text-paper-50'
                              : 'border-white/15 text-paper-50/70 hover:border-white/30'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label={t('contact.message')} required requiredLabel={t('contact.required')} className="md:col-span-2">
                  <textarea
                    required
                    value={form.message}
                    onChange={onChange('message')}
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    className="input-dark resize-none"
                  />
                </Field>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 justify-between">
                <p className="text-[12.5px] text-paper-50/50 max-w-md">
                  {t('contact.privacy')}
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-orange text-paper-50 ltr:pl-5 ltr:pr-2 rtl:pr-5 rtl:pl-2 py-2 text-sm font-medium hover:bg-paper-50 hover:text-ink-950 transition-colors disabled:opacity-60"
                >
                  {status === 'submitting' ? t('contact.sending') : t('contact.submit')}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-paper-50 transition-colors group-hover:bg-brand-orange">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-xl border border-brand-green/40 bg-brand-green/10 px-4 py-3 text-[13.5px] text-paper-50"
                  >
                    {t('contact.success')}
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
        .input-dark:focus {
          outline: none;
          border-color: #D85A30;
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, requiredLabel, hint, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-center justify-between mb-2">
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

function ContactLine({ label, value, href }) {
  const Body = href ? 'a' : 'div';
  return (
    <Body
      {...(href ? { href } : {})}
      className="group flex items-baseline justify-between border-b border-white/10 pb-4 hover:border-brand-orange transition-colors"
    >
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
        {label}
      </span>
      <span className="font-display text-lg md:text-xl text-paper-50 group-hover:text-brand-orange transition-colors">
        {value}
      </span>
    </Body>
  );
}
