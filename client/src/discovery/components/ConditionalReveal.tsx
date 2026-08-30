import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ConditionalRevealProps {
  show: boolean;
  children: ReactNode;
}

/** Animates a follow-up field in and out as its condition changes. */
export default function ConditionalReveal({ show, children }: ConditionalRevealProps) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
