import { useDT } from "./data/i18n";

interface StepNavigationProps {
  onBack: () => void;
  onNext: () => void;
  backLabel?: string;
  nextLabel?: string;
  hideBack?: boolean;
  disabled?: boolean;
  step: number;
  total: number;
}

/** Sticky footer bar carrying Back / step counter / Continue. */
export default function StepNavigation({
  onBack,
  onNext,
  backLabel,
  nextLabel,
  hideBack = false,
  disabled = false,
  step,
  total,
}: StepNavigationProps) {
  const t = useDT();

  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-8 md:-mx-8 md:mt-12">
      <div className="border-t border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
          {hideBack ? (
            <span />
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-[13px] font-medium text-ink-900 transition-colors hover:border-ink-900/30"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 rtl:-scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {backLabel ?? t("nav.back")}
            </button>
          )}

          <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500 sm:block">
            {t("chrome.stepOf", { n: step + 1, total })}
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={disabled}
            className="group inline-flex items-center gap-3 rounded-full bg-ink-950 py-2 text-[13.5px] font-medium text-paper-50 transition-colors hover:bg-brand-orange disabled:cursor-not-allowed disabled:opacity-40 ltr:pl-5 ltr:pr-2 rtl:pl-2 rtl:pr-5"
          >
            {nextLabel ?? t("nav.continue")}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-orange text-paper-50 transition-transform duration-300 group-hover:translate-x-0.5">
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
      </div>
    </div>
  );
}
