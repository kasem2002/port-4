import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

/**
 * Copies text to the clipboard with inline confirmation.
 *
 * `navigator.clipboard` needs a secure context, which a plain-HTTP deployment
 * won't have, so there's a `execCommand` fallback — otherwise the button would
 * silently do nothing the day this is served over HTTP.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path.
    }
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

interface CopyButtonProps {
  /** Built lazily so a large payload isn't serialized on every render. */
  getText: () => string;
  label?: string;
  copiedLabel?: string;
  title?: string;
  className?: string;
}

export default function CopyButton({
  getText,
  label = "Copy",
  copiedLabel = "Copied",
  title,
  className = "",
}: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const onClick = async () => {
    const ok = await writeToClipboard(getText());
    setState(ok ? "copied" : "error");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("idle"), 2000);
  };

  const tone =
    state === "copied"
      ? "border-brand-green/40 bg-brand-green/10 text-brand-greenDeep"
      : state === "error"
        ? "border-brand-orangeDeep/40 bg-brand-orange/10 text-brand-orangeDeep"
        : "border-ink-900/10 bg-paper-50 text-ink-700 hover:border-brand-orange hover:text-brand-orange";

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      title={title ?? label}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors ${tone} ${className}`}
    >
      {state === "copied" ? (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8.5l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
        </svg>
      )}
      {state === "copied" ? copiedLabel : state === "error" ? "Copy failed" : label}
    </button>
  );
}
