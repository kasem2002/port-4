import { useRef, useState, type ReactNode } from "react";
import { useUploadFileMutation } from "@/services/api";
import { FieldRow, inputBase } from "./fields";

interface MediaUploaderProps {
  label?: string;
  hint?: string;
  /** Current source: an uploaded URL, an external URL, or inline SVG markup. */
  value: string;
  onChange: (value: string) => void;
  /** Draws whatever preview belongs here — a partner logo, a project shot. */
  preview?: (value: string) => ReactNode;
  previewClassName?: string;
  accept?: string;
  uploadLabel?: string;
  replaceLabel?: string;
}

/**
 * Image picker for content that can be uploaded, linked, or pasted as inline
 * SVG. Uploads go to the server and the field stores the returned URL — the
 * old base64-into-localStorage path is gone.
 */
export default function MediaUploader({
  label = "Image",
  hint = "upload a file, or paste a URL / inline <svg…>",
  value,
  onChange,
  preview,
  previewClassName = "grid h-20 w-32 place-items-center rounded bg-paper-100 overflow-hidden",
  accept = "image/svg+xml,image/png,image/jpeg,image/webp,image/gif,.svg",
  uploadLabel = "Upload image",
  replaceLabel = "Replace",
}: MediaUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [error, setError] = useState("");

  const onPickFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    try {
      const uploaded = await uploadFile(file).unwrap();
      onChange(uploaded.url);
    } catch {
      setError("That file couldn't be uploaded. Check the size and format, then try again.");
    }
  };

  const trimmed = (value || "").trim();
  const hasValue = trimmed.length > 0;

  const describe = () => {
    if (trimmed.startsWith("<svg")) return `Inline SVG · ${trimmed.length} chars`;
    if (trimmed.startsWith("/uploads/")) return `Uploaded · ${trimmed.split("/").pop()}`;
    return trimmed;
  };

  return (
    <>
      <div className="flex items-center gap-4 rounded-lg border border-ink-900/10 bg-paper-50 p-4">
        <div className={`${previewClassName} shrink-0`}>{preview ? preview(value) : null}</div>

        <div className="min-w-0 flex-1 text-[12.5px] text-ink-600">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            Preview
          </p>
          <p className="truncate text-ink-500">
            {hasValue ? describe() : "No media set — the site shows a styled fallback."}
          </p>
          {error && <p className="mt-1 text-[12px] text-brand-orangeDeep">{error}</p>}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={(e) => void onPickFile(e)}
            className="hidden"
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={() => fileRef.current?.click()}
            className="rounded-full bg-ink-950 px-3.5 py-1.5 text-[12px] font-medium text-paper-50 transition-colors hover:bg-brand-orange disabled:opacity-60"
          >
            {isLoading ? "Uploading…" : hasValue ? replaceLabel : uploadLabel}
          </button>
          {hasValue && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full border border-ink-900/10 px-3 py-1.5 text-[12px] text-ink-700 transition-colors hover:border-red-300 hover:text-red-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <FieldRow label={`${label} (advanced)`} hint={hint}>
        <textarea
          rows={2}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or <svg xmlns=…>"
          className={`${inputBase} resize-none font-mono text-[13px]`}
        />
      </FieldRow>
    </>
  );
}
