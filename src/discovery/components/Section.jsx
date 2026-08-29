// A card that groups a few related questions inside a step.
export function GroupCard({ eyebrow, title, description, children }) {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-paper-50 p-6 md:p-8 shadow-soft">
      {eyebrow && (
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange mb-2">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="font-display text-[2rem] md:text-[2.4rem] tracking-tighter2 leading-[1.1] text-ink-950">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600 max-w-2xl">
          {description}
        </p>
      )}
      <div className="mt-6 md:mt-8 divide-y divide-transparent">{children}</div>
    </div>
  );
}
