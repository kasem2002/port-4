// The official PORT-4 mark: rounded orange square with three circles connected
// by a diagonal line (top-right node → bottom-left node, with a floating dot).
export function LogoMark({ className = 'h-8 w-8', bg = '#D85A30', ink = '#F7F6F2', rounded = 6 }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-label="PORT-4">
      <rect width="48" height="48" rx={rounded} ry={rounded} fill={bg} />
      <path
        d="M39.5,12c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5h0Z"
        fill={ink}
        fillRule="evenodd"
      />
      <path
        d="M15.5,36c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5,3.5-1.57,3.5-3.5h0Z"
        fill={ink}
        fillRule="evenodd"
      />
      <path
        d="M39.5,36c0,1.94-1.57,3.5-3.5,3.5s-3.5-1.56-3.5-3.5c0-.75.23-1.44.64-2.01L14.01,14.86c-.57.4-1.26.64-2.01.64-1.93,0-3.5-1.56-3.5-3.5s1.57-3.5,3.5-3.5,3.5,1.57,3.5,3.5c0,.75-.23,1.45-.64,2.01l19.13,19.13c.57-.4,1.26-.64,2.01-.64,1.93,0,3.5,1.57,3.5,3.5Z"
        fill={ink}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function Logo({ className = 'h-8', mark = false, invert = false }) {
  if (mark) {
    // Full-square mark, sized by className.
    return (
      <LogoMark
        className={className}
        bg={invert ? '#F7F6F2' : '#D85A30'}
        ink={invert ? '#D85A30' : '#F7F6F2'}
      />
    );
  }
  // Wordmark: brand mark + "PORT-4" typography.
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7" rounded={5} />
      <span
        className={`font-display text-[1.35rem] font-medium tracking-tight leading-none ${
          invert ? 'text-paper-50' : 'text-ink-950'
        }`}
      >
        PORT<span className="text-brand-orange">-</span>4
      </span>
    </div>
  );
}
