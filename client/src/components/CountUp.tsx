import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Values like "40+", "24h", "2.1x" or "12" — only the number animates. */
  value: string;
  duration?: number;
}

export default function CountUp({ value, duration = 1400 }: CountUpProps) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const prefix = match[1] ?? "";
    const num = match[2] ?? "0";
    const suffix = match[3] ?? "";
    const target = parseFloat(num);
    const isFloat = num.includes(".");
    setDisplay(`${prefix}0${suffix}`);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            const formatted = isFloat ? current.toFixed(1) : Math.round(current).toString();
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
