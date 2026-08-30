import { useDT } from './data/i18n.js';

// Bottom bar: Back / progress-label / Continue.
export default function StepNavigation({
  onBack,
  onNext,
  backLabel,
  nextLabel,
  hideBack = false,
  disabled = false,
  step = 0,
  total = 5,
}) {
  const t = useDT();
  const back = backLabel || t('nav.back');
  const next = nextLabel || t('nav.continue');
  return (
    <div className="sticky bottom-0 z-30 -mx-4 md:-mx-8 mt-8 md:mt-12">
      <div className="border-t border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {!hideBack ? (
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-[13px] font-medium text-ink-900 hover:border-ink-900/30 transition-colors"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {back}
            </button>
          ) : (
            <span />
          )}
          <span className="hidden sm:block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
            {t('chrome.stepOf', { n: step + 1, total })}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={disabled}
            className="group inline-flex items-center gap-3 rounded-full bg-ink-950 ltr:pl-5 ltr:pr-2 rtl:pr-5 rtl:pl-2 py-2 text-[13.5px] font-medium text-paper-50 hover:bg-brand-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {next}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-paper-50 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
