interface PartnerLogoProps {
  /** Inline SVG markup, an image URL/data URI, or empty for the wordmark. */
  logo: string;
  name: string;
  className?: string;
}

/**
 * Partner logos arrive in three shapes, so all three are handled here rather
 * than at each call site.
 */
export default function PartnerLogo({ logo, name, className = "" }: PartnerLogoProps) {
  const trimmed = (logo || "").trim();

  // Inline SVG pasted through the dashboard, which is admin-only and trusted.
  if (trimmed.startsWith("<svg")) {
    return (
      <div
        className={`partner-logo-svg flex items-center justify-center ${className}`}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  if (trimmed) {
    return (
      <img
        src={trimmed}
        alt={name || "Partner logo"}
        loading="lazy"
        className={`max-h-10 w-auto object-contain md:max-h-12 ${className}`}
      />
    );
  }

  // Nothing uploaded yet — a wordmark keeps the grid visually even.
  return (
    <span
      className={`font-display text-xl tracking-tight text-ink-700 transition-colors group-hover:text-ink-950 md:text-2xl ${className}`}
    >
      {name}
    </span>
  );
}
