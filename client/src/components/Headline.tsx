import { splitHeadline } from "@/hooks/useLocalized";

interface HeadlineProps {
  /** A "||"-delimited headline; each segment renders on its own line. */
  text: string;
  /** Which segment gets the accent style; -1 for none. */
  accentIndex?: number;
  className?: string;
  accentClass?: string;
}

export default function Headline({
  text,
  accentIndex = -1,
  className = "",
  accentClass = "italic font-normal text-brand-orange",
}: HeadlineProps) {
  const parts = splitHeadline(text);
  return (
    <h2 className={className}>
      {parts.map((part, i) => (
        <span key={i} className="block">
          {i === accentIndex ? <span className={accentClass}>{part}</span> : part}
        </span>
      ))}
    </h2>
  );
}
