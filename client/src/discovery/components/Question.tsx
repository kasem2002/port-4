import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDT } from "../data/i18n";

interface QuestionProps {
  /** Short label like "Q1", shown above the question. */
  number?: string;
  label: string;
  description?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

export default function Question({
  number,
  label,
  description,
  required = false,
  optional = false,
  error,
  children,
}: QuestionProps) {
  const t = useDT();

  return (
    <div className="border-b border-ink-900/8 py-8 first:pt-0 last:border-b-0 last:pb-0">
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-baseline gap-3">
            {number && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
                {number}
              </span>
            )}
            {optional && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                {t("question.optional")}
              </span>
            )}
          </div>

          <h3 className="mt-1.5 font-display text-[1.5rem] leading-[1.15] tracking-tighter2 text-ink-950 md:text-[1.75rem]">
            {label}
            {required && <span className="text-brand-orange ltr:ml-1 rtl:mr-1">*</span>}
          </h3>

          {description && (
            <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-ink-600">
              {description}
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-8" data-error={error ? "true" : undefined}>
          {children}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-start gap-2 text-[13.5px] text-brand-orangeDeep"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orangeDeep" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
