// Renders a partner logo. Handles three input shapes for `logo`:
//   1. Inline SVG markup starting with `<svg` — rendered as-is.
//   2. Any URL (http, https, data:) — rendered as an <img>.
//   3. Empty / missing — renders a stylized wordmark from `name` so the
//      grid always has something visually consistent to show.

export default function PartnerLogo({ logo, name, className = '' }) {
  const trimmed = (logo || '').trim();

  // Case 1: inline SVG paste from the dashboard.
  if (trimmed.startsWith('<svg')) {
    return (
      <div
        className={`partner-logo-svg flex items-center justify-center ${className}`}
        // The dashboard is admin-only content, so this HTML is trusted.
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  // Case 2: image URL or data: URI.
  if (trimmed) {
    return (
      <img
        src={trimmed}
        alt={name || 'Partner logo'}
        className={`max-h-10 md:max-h-12 w-auto object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // Case 3: wordmark fallback — clean, always-legible.
  return (
    <span
      className={`font-display text-xl md:text-2xl text-ink-700 group-hover:text-ink-950 transition-colors tracking-tight ${className}`}
    >
      {name}
    </span>
  );
}
