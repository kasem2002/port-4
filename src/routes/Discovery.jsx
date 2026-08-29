import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import LangToggle from '../components/LangToggle.jsx';
import ProgressBar from '../discovery/ProgressBar.jsx';
import StepNavigation from '../discovery/StepNavigation.jsx';
import Step01Business from '../discovery/steps/Step01Business.jsx';
import Step02Goals from '../discovery/steps/Step02Goals.jsx';
import Step03Services from '../discovery/steps/Step03Services.jsx';
import Step04Design from '../discovery/steps/Step04Design.jsx';
import Step05Final from '../discovery/steps/Step05Final.jsx';
import Review from '../discovery/Review.jsx';
import Success from '../discovery/Success.jsx';
import {
  setStep,
  markStepTouched,
  setErrors,
} from '../discovery/store/discoverySlice.js';
import { validateStep } from '../discovery/data/validation.js';

const STEP_COMPONENTS = [Step01Business, Step02Goals, Step03Services, Step04Design, Step05Final];

const stepMeta = [
  { title: 'Tell us about your business', subtitle: 'Help us understand what you do and what makes your business unique.' },
  { title: "Let's understand your goals", subtitle: 'What should your website achieve for your business?' },
  { title: 'What do you offer?', subtitle: 'Tell us what visitors should be able to discover or do on your website.' },
  { title: "Let's design the experience", subtitle: 'This helps us create a website that feels like your brand.' },
  { title: 'Almost there', subtitle: 'Give us the final details we need to build the right experience.' },
];

export default function Discovery() {
  const dispatch = useDispatch();
  const step = useSelector((s) => s.discovery?.step ?? 0);
  const furthest = useSelector((s) => s.discovery?.furthestStep ?? 0);
  const form = useSelector((s) => s.discovery?.form);
  if (!form) return null; // during HMR, wait for discovery reducer to register

  // Scroll to top when step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const currentIsReview = step === 5;
  const currentIsSuccess = step === 6;

  const handleNext = () => {
    if (currentIsReview) return;
    if (step >= 0 && step <= 4) {
      const errors = validateStep(step, form);
      dispatch(markStepTouched(step));
      if (Object.keys(errors).length > 0) {
        dispatch(setErrors(errors));
        // Scroll to first error field (soft try).
        setTimeout(() => {
          const first = document.querySelector('[data-error="true"]');
          if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
        return;
      }
      dispatch(setErrors({}));
      if (step === 4) dispatch(setStep(5)); // move to review
      else dispatch(setStep(step + 1));
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    dispatch(setStep(step - 1));
  };

  const CurrentStep = step < 5 ? STEP_COMPONENTS[step] : null;

  return (
    <div className="relative min-h-screen bg-paper-100/60 text-ink-900 antialiased overflow-x-hidden">
      {/* Background gridlines echo the site's language */}
      <div
        aria-hidden
        className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(26,24,21,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,24,21,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Header — echoes the main navbar chrome */}
      <header className="relative border-b border-ink-900/8 bg-paper-50/70 backdrop-blur-md">
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Client Discovery
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500 hidden lg:inline">
              secure · saved as you type
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="relative max-w-[1160px] mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-24">
        {/* Intro */}
        {!currentIsSuccess && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="eyebrow-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-700">
                Project Brief · PORT-4
              </span>
            </div>
            <h1 className="display-2">
              {currentIsReview ? (
                <>
                  Review your <span className="italic font-normal text-brand-orange">brief</span>
                </>
              ) : (
                <>
                  {stepMeta[step].title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="italic font-normal text-brand-orange">
                    {stepMeta[step].title.split(' ').slice(-1)[0]}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-600">
              {currentIsReview
                ? "Take a moment to look everything over. You can edit any section — nothing is submitted yet."
                : stepMeta[step].subtitle}
            </p>
          </div>
        )}

        {/* Progress */}
        {!currentIsSuccess && (
          <div className="mb-8 md:mb-10">
            <ProgressBar
              current={Math.min(step, 4)}
              furthest={furthest}
              onJump={(i) => dispatch(setStep(i))}
            />
          </div>
        )}

        {/* Step body */}
        <div className="rounded-3xl border border-ink-900/10 bg-paper-50 shadow-panel">
          <div className="p-4 md:p-8">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {CurrentStep ? (
                <CurrentStep />
              ) : currentIsReview ? (
                <Review />
              ) : (
                <Success />
              )}
            </motion.div>

            {/* Navigation only for the 5 authoring steps; review screen owns its own submit */}
            {!currentIsSuccess && !currentIsReview && (
              <StepNavigation
                step={Math.min(step, 4)}
                total={5}
                onBack={handleBack}
                onNext={handleNext}
                hideBack={step === 0}
                backLabel="Back"
                nextLabel={step === 4 ? 'Review brief' : 'Continue'}
              />
            )}
            {currentIsReview && (
              <div className="mt-8 flex justify-start">
                <button
                  type="button"
                  onClick={handleBack}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-[13px] font-medium text-ink-900 hover:border-ink-900/30 transition-colors"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to editing
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom rail — mirrors the site footer voice */}
        {!currentIsSuccess && (
          <p className="mt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
            PORT-4 · Client Discovery · v.01
          </p>
        )}
      </main>
    </div>
  );
}
