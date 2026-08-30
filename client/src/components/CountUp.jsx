import { useEffect, useRef, useState } from 'react';

// Parses "40+", "24h", "2.1x", "12" — animates the numeric portion.
export default function CountUp({ value, duration = 1400 }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const isFloat = num.includes('.');
    setDisplay(`${prefix}0${suffix}`);

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              const current = target * eased;
              const formatted = isFloat ? current.toFixed(1) : Math.round(current).toString();
              setDisplay(`${prefix}${formatted}${suffix}`);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
