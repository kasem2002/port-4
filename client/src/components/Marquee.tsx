import { useL } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Marquee() {
  const { content } = useSiteContent();
  const l = useL();
  const items = content?.marquee ?? [];
  if (items.length === 0) return null;

  // The track is duplicated so the CSS animation can loop seamlessly.
  const track = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-ink-900/10 bg-paper-100/60 py-6"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            className="mx-6 inline-flex items-center gap-6 font-display text-2xl font-light text-ink-900 md:mx-10 md:gap-10 md:text-4xl"
          >
            {l(item, "text")}
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-orange">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}
