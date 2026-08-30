import type { SaveState } from "./useSettingsForm";

/**
 * Passive status pill for the settings editors. Edits publish as they're
 * typed, so this reports what already happened rather than offering a button.
 *
 * Deliberately a plain conditional render: an AnimatePresence swap keyed on
 * the state could strand a half-finished exit animation and leave the pill
 * reading "Saving…" after the write had already landed.
 */
export default function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "idle") return null;

  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "Saved · live" : "Couldn't save";

  const tone =
    state === "error"
      ? "border-brand-orangeDeep/30 bg-brand-orange/10 text-brand-orangeDeep"
      : state === "saved"
        ? "border-brand-green/30 bg-brand-green/10 text-brand-greenDeep"
        : "border-ink-900/10 bg-paper-50 text-ink-500";

  const dot =
    state === "saving"
      ? "animate-pulse bg-brand-orange"
      : state === "error"
        ? "bg-brand-orangeDeep"
        : "bg-brand-green";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 ${tone}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
