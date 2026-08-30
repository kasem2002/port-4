import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Lightweight modal used by ListEditor for the "add new item" flow.
// Fixed-position overlay + backdrop; Escape and backdrop click cancel.
export default function Modal({ open, title, subtitle, onCancel, onConfirm, confirmLabel = 'Add', cancelLabel = 'Cancel', children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    document.addEventListener('keydown', onKey);
    // Lock body scroll while modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[3px]"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative flex w-full max-w-2xl max-h-[90vh] flex-col rounded-2xl bg-paper-50 shadow-panel border border-ink-900/10 overflow-hidden"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="flex items-start justify-between gap-4 px-6 py-4 border-b border-ink-900/10">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                  New entry
                </p>
                <h3 className="mt-1 font-display text-2xl tracking-tighter2 text-ink-950 leading-tight">
                  {title}
                </h3>
                {subtitle && <p className="mt-1 text-[13px] text-ink-600">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onCancel}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-600 hover:bg-paper-100 hover:text-ink-950 transition-colors shrink-0"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {children}
            </div>

            <footer className="flex items-center justify-end gap-2 px-6 py-4 border-t border-ink-900/10 bg-paper-100/40">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-ink-900/12 bg-paper-50 text-ink-800 px-4 py-2 text-[13px] font-medium hover:bg-paper-100 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-full bg-brand-orange text-paper-50 px-4 py-2 text-[13px] font-medium hover:bg-ink-950 transition-colors shadow-soft"
              >
                {confirmLabel}
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
