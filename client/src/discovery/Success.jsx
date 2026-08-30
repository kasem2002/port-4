import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetDiscovery } from './store/discoverySlice.js';
import { clearDiscovery } from './store/discoveryPersist.js';
import { useDT, useLang } from './data/i18n.js';
import {
  buildBrief,
  downloadBrief,
  briefSummary,
  whatsappUrl,
  mailtoUrl,
} from './data/briefFile.js';
import { isConfigured, submitBrief } from '../lib/firestore.js';

export default function Success() {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.discovery.form);
  const brand = useSelector((s) => s.content?.brand) || {};
  const t = useDT();
  const lang = useLang();

  // Build the brief ONCE per success mount so id/timestamp stays stable across
  // re-renders of the share buttons.
  const brief = useMemo(() => buildBrief(form), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Delivery status — reflected in the delivery card.
  //   'idle'   → nothing tried yet
  //   'sending'→ Firestore write in flight
  //   'live'   → written to Firestore successfully
  //   'local'  → Firestore not configured, .port4brief download only
  //   'error'  → Firestore write failed, downloaded file as fallback
  const [delivery, setDelivery] = useState('idle');

  // On mount: always download the .port4brief file as a robust fallback, then
  // attempt Firestore submit if a config exists. Runs exactly once.
  const doneRef = useRef(false);
  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    try { downloadBrief(brief); } catch { /* noop */ }
    if (isConfigured()) {
      setDelivery('sending');
      submitBrief(brief)
        .then(() => setDelivery('live'))
        .catch(() => setDelivery('error'));
    } else {
      setDelivery('local');
    }
  }, [brief]);

  const submittedAt = form.meta.submittedAt
    ? new Date(form.meta.submittedAt).toLocaleString(lang === 'ar' ? 'ar' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const namePart = form.business.name
    ? lang === 'ar'
      ? ` يا ${form.business.name}`
      : `, ${form.business.name}`
    : '';

  const summary = briefSummary(brief);
  const waHref = brand.phone ? whatsappUrl(brand.phone, summary) : null;
  const mailHref = brand.email
    ? mailtoUrl(brand.email, `PORT-4 brief — ${brief.businessName}`, summary)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 text-paper-50 p-8 md:p-14"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute -top-40 ltr:-right-40 rtl:-left-40 h-[520px] w-[520px] rounded-full bg-brand-orange/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 ltr:-left-40 rtl:-right-40 h-[420px] w-[420px] rounded-full bg-brand-green/15 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-orange text-paper-50">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-orange">
            {t('success.eyebrow')}
          </span>
        </div>

        <h1 className="mt-8 display-1 text-paper-50">
          {t('success.title.a')}
          <span className="block italic font-normal text-brand-orange">{t('success.title.b')}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-paper-50/75">
          {t('success.body', { name: namePart })}
        </p>

        {/* Delivery block — copy + actions switch based on whether Firestore
            live-delivery succeeded (live), failed (error), or isn't configured
            at all (local). */}
        <div className="mt-10 rounded-2xl border border-white/12 bg-white/[0.04] p-5 md:p-6">
          {delivery === 'live' ? (
            <>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-green flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-green text-ink-950">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t('success.deliver.liveTitle')}
              </p>
              <p className="mt-3 text-[14.5px] text-paper-50/80 leading-relaxed max-w-2xl">
                {t('success.deliver.liveBody')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => downloadBrief(brief)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-paper-50/80 hover:border-white/40 hover:text-paper-50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('success.deliver.redownload')}
                </button>
              </div>
            </>
          ) : delivery === 'sending' ? (
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/70 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              {t('success.deliver.sending')}
            </p>
          ) : (
            <>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
                {delivery === 'error' ? t('success.deliver.errorTitle') : t('success.deliver.title')}
              </p>
              <p className="mt-2 text-[14.5px] text-paper-50/80 leading-relaxed max-w-2xl">
                {delivery === 'error' ? t('success.deliver.errorBody') : t('success.deliver.body')}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {waHref && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-green text-paper-50 px-4 py-2 text-[13px] font-medium hover:bg-brand-greenSoft transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                      <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.01c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.5-.5-5-1.4l-.3-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 18.1-5.1c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.3z" />
                    </svg>
                    {t('success.deliver.whatsapp')}
                  </a>
                )}
                {mailHref && (
                  <a
                    href={mailHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[13px] font-medium text-paper-50 hover:border-brand-orange hover:text-brand-orange transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 6.5L12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t('success.deliver.email')}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => downloadBrief(brief)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-paper-50/80 hover:border-white/40 hover:text-paper-50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('success.deliver.redownload')}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <NextStep number="01" title={t('success.next.internal.title')} body={t('success.next.internal.body')} />
          <NextStep number="02" title={t('success.next.call.title')} body={t('success.next.call.body')} />
          <NextStep number="03" title={t('success.next.proposal.title')} body={t('success.next.proposal.body')} />
        </div>

        {submittedAt && (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/45">
            {t('success.submittedAt', { when: submittedAt })}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-paper-50 ltr:pl-5 ltr:pr-2 rtl:pr-5 rtl:pl-2 py-2 text-sm font-medium text-ink-950 hover:bg-brand-orange hover:text-paper-50 transition-colors"
          >
            {t('success.back')}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-paper-50 transition-colors group-hover:bg-ink-950">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => {
              clearDiscovery();
              dispatch(resetDiscovery());
            }}
            className="link-underline text-sm text-paper-50/60 hover:text-paper-50 transition-colors"
          >
            {t('success.startAnother')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NextStep({ number, title, body }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/45">
        {number}
      </p>
      <h4 className="mt-2 font-display text-[1.35rem] tracking-tighter2 text-paper-50">{title}</h4>
      <p className="mt-2 text-[13.5px] text-paper-50/70 leading-relaxed">{body}</p>
    </div>
  );
}
