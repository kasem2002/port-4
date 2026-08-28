import { useContent } from '../hooks/useLocalized.js';

export default function Marquee() {
  const { data: words, l } = useContent('marquee');
  const line = [...words, ...words];
  return (
    <section aria-hidden="true" className="border-y border-ink-900/10 bg-paper-100/60 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {line.map((w, i) => (
          <span
            key={i}
            className="mx-6 md:mx-10 inline-flex items-center gap-6 md:gap-10 font-display text-2xl md:text-4xl font-light text-ink-900"
          >
            {l(w)}
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-orange">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}
