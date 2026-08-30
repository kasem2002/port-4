import { splitHeadline } from '../data/defaults.js';

// Render a "||"-delimited headline with an optional italic-orange accent
// on the segment at `accentIndex` (-1 for no accent).
export default function Headline({ text, accentIndex = -1, className = '', accentClass = 'italic font-normal text-brand-orange' }) {
  const parts = splitHeadline(text);
  return (
    <h2 className={className}>
      {parts.map((p, i) => (
        <span key={i} className="block">
          {i === accentIndex ? <span className={accentClass}>{p}</span> : p}
        </span>
      ))}
    </h2>
  );
}
