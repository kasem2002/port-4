import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { useT } from "@/hooks/useLocalized";

interface LoaderProps {
  visible: boolean;
}

export default function Loader({ visible }: LoaderProps) {
  const t = useT();
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950 text-paper-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Logo mark className="h-12 w-12" />
            <span className="font-display text-4xl tracking-tight">
              PORT<span className="text-brand-orange">-</span>4
            </span>
          </motion.div>

          <motion.div
            className="mt-8 h-px w-40 overflow-hidden bg-paper-50/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-brand-orange"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-paper-50/40">
            {t("loader.boot")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
