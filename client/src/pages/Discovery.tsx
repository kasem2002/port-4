import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import LangToggle from "@/components/LangToggle";
import Logo from "@/components/Logo";
import ProgressBar from "@/discovery/ProgressBar";
import Review from "@/discovery/Review";
import StepNavigation from "@/discovery/StepNavigation";
import Success from "@/discovery/Success";
import { useDT, useLang } from "@/discovery/data/i18n";
import { STEPS } from "@/discovery/data/options";
import { buildErrors } from "@/discovery/data/validation";
import {
  markStepTouched,
  setErrors,
  setLocale,
  setStep,
} from "@/discovery/store/discoverySlice";
import Step01Business from "@/discovery/steps/Step01Business";
import Step02Goals from "@/discovery/steps/Step02Goals";
import Step03Services from "@/discovery/steps/Step03Services";
import Step04Design from "@/discovery/steps/Step04Design";
import Step05Final from "@/discovery/steps/Step05Final";

const STEP_COMPONENTS = [
  Step01Business,
  Step02Goals,
  Step03Services,
  Step04Design,
  Step05Final,
];

const REVIEW_STEP = STEPS.length; // 5
const SUCCESS_STEP = STEPS.length + 1; // 6

export default function Discovery() {
  const dispatch = useAppDispatch();
  const step = useAppSelector((s) => s.discovery.step);
  const furthest = useAppSelector((s) => s.discovery.furthestStep);
  const form = useAppSelector((s) => s.discovery.form);
  const t = useDT();
  const lang = useLang();

  // Record which language the client is filling the form in, so the dashboard
  // can show the brief the way they wrote it.
  useEffect(() => {
    dispatch(setLocale(lang));
  }, [dispatch, lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const isReview = step === REVIEW_STEP;
  const isSuccess = step === SUCCESS_STEP;

  const handleNext = () => {
    if (isReview || isSuccess) return;

    const errors = buildErrors(step, form, t);
    dispatch(markStepTouched(step));

    if (Object.keys(errors).length > 0) {
      dispatch(setErrors(errors));
      // Bring the first failing question into view rather than leaving the
      // client to hunt for the red text.
      setTimeout(() => {
        document
          .querySelector('[data-error="true"]')
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    dispatch(setErrors({}));
    dispatch(setStep(step === STEPS.length - 1 ? REVIEW_STEP : step + 1));
  };

  const handleBack = () => {
    if (step > 0) dispatch(setStep(step - 1));
  };

  const CurrentStep = step < STEPS.length ? STEP_COMPONENTS[step] : null;
  const titleKey = isReview ? "review" : String(step);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper-100/60 text-ink-900 antialiased">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,24,21,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,24,21,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <header className="relative border-b border-ink-900/8 bg-paper-50/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {t("chrome.discovery")}
            </span>
          </div>
          <LangToggle />
        </div>
      </header>

      <main className="relative mx-auto max-w-[1160px] px-4 pb-24 pt-8 md:px-8 md:pt-12">
        {!isSuccess && (
          <>
            <div className="mb-8 md:mb-12">
              <div className="mb-4 flex items-center gap-2">
                <span className="eyebrow-dot" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-700">
                  {t("chrome.brand")}
                </span>
              </div>
              <h1 className="display-2">
                {t(`step.title.${titleKey}.a`)}{" "}
                <span className="font-normal italic text-brand-orange">
                  {t(`step.title.${titleKey}.b`)}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-600">
                {t(`step.subtitle.${titleKey}`)}
              </p>
            </div>

            <div className="mb-8 md:mb-10">
              <ProgressBar
                current={Math.min(step, STEPS.length - 1)}
                furthest={furthest}
                onJump={(target) => dispatch(setStep(target))}
              />
            </div>
          </>
        )}

        <div className="rounded-3xl border border-ink-900/10 bg-paper-50 shadow-panel">
          <div className="p-4 md:p-8">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {CurrentStep ? <CurrentStep /> : isReview ? <Review /> : <Success />}
            </motion.div>

            {/* The review screen owns its own submit button. */}
            {!isSuccess && !isReview && (
              <StepNavigation
                step={Math.min(step, STEPS.length - 1)}
                total={STEPS.length}
                onBack={handleBack}
                onNext={handleNext}
                hideBack={step === 0}
                nextLabel={step === STEPS.length - 1 ? t("nav.review") : t("nav.continue")}
              />
            )}

            {isReview && (
              <div className="mt-8 flex justify-start">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-[13px] font-medium text-ink-900 transition-colors hover:border-ink-900/30"
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
                  {t("nav.backToEditing")}
                </button>
              </div>
            )}
          </div>
        </div>

        {!isSuccess && (
          <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
            {t("chrome.rail")}
          </p>
        )}
      </main>
    </div>
  );
}
