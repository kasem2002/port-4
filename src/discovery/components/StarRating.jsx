// Compact star rating (1–5).
export default function StarRating({ value = 5, onChange }) {
  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="p-0.5"
            aria-label={`${n} star${n === 1 ? '' : 's'}`}
          >
            <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-colors ${active ? 'text-brand-orange' : 'text-ink-300'}`} fill="currentColor">
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
