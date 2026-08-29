import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetDiscovery } from './store/discoverySlice.js';
import { clearDiscovery } from './store/discoveryPersist.js';

export default function Success() {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.discovery.form);
  const submittedAt = form.meta.submittedAt
    ? new Date(form.meta.submittedAt).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

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
            Brief received
          </span>
        </div>

        <h1 className="mt-8 display-1 text-paper-50">
          Project brief
          <span className="block italic font-normal text-brand-orange">received.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-paper-50/75">
          Thank you{form.business.name ? `, ${form.business.name}` : ''}. We've received your project
          information. Our team now has everything needed to understand your requirements and
          begin planning your digital experience.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <NextStep number="01" title="Internal review">
            Our team reads your brief and prepares questions within one business day.
          </NextStep>
          <NextStep number="02" title="Discovery call">
            We schedule a 30-minute call to walk through your goals and align on scope.
          </NextStep>
          <NextStep number="03" title="Proposal">
            You'll receive a written proposal covering approach, timeline, and investment.
          </NextStep>
        </div>

        {submittedAt && (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/45">
            Submitted · {submittedAt}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-paper-50 ltr:pl-5 ltr:pr-2 rtl:pr-5 rtl:pl-2 py-2 text-sm font-medium text-ink-950 hover:bg-brand-orange hover:text-paper-50 transition-colors"
          >
            Back to PORT-4
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
            Start another brief
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NextStep({ number, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/45">
        {number}
      </p>
      <h4 className="mt-2 font-display text-[1.35rem] tracking-tighter2 text-paper-50">{title}</h4>
      <p className="mt-2 text-[13.5px] text-paper-50/70 leading-relaxed">{children}</p>
    </div>
  );
}
