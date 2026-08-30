interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const STARS = [1, 2, 3, 4, 5];

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div className="inline-flex items-center gap-1">
      {STARS.map((star) => {
        const active = star <= value;
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="p-0.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-5 w-5 transition-colors ${
                active ? "text-brand-orange" : "text-ink-300"
              }`}
            >
              <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
