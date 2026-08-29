import { useRef } from 'react';
import { FieldRow } from './fields.jsx';

const advancedInput =
  'w-full rounded-lg border border-ink-900/12 bg-paper-100/40 px-3.5 py-2.5 text-[13px] text-ink-950 outline-none transition-colors focus:border-brand-orange focus:bg-paper-50 resize-none font-mono';

const DEFAULT_MAX_BYTES = 400 * 1024;

// Reusable media picker used by Partners logos and Projects images.
// Accepts image files (SVG stored as text, others as data: URI) and also
// lets the user paste a URL or raw <svg…> markup as an escape hatch.
//
// - `value` is the current source string.
// - `onChange(next)` fires whenever the source changes.
// - `preview` is a render prop that draws whatever visual belongs here
//   (partner logo, project screenshot fallback, …). It receives `value`.
export default function MediaUploader({
  label = 'Image',
  hint = 'upload a file or paste a URL / inline <svg…>',
  value,
  onChange,
  preview,
  previewClassName = 'grid h-20 w-32 place-items-center rounded bg-paper-100 overflow-hidden',
  accept = 'image/svg+xml,image/png,image/jpeg,image/webp,image/gif,.svg,.png,.jpg,.jpeg,.webp,.gif',
  maxBytes = DEFAULT_MAX_BYTES,
  uploadLabel = 'Upload image',
  replaceLabel = 'Replace',
}) {
  const fileRef = useRef(null);

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > maxBytes) {
      alert(`This file is ${(file.size / 1024).toFixed(0)} KB. Please upload under ${(maxBytes / 1024).toFixed(0)} KB (SVG recommended).`);
      return;
    }
    const reader = new FileReader();
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    reader.onload = () => onChange(String(reader.result || ''));
    reader.onerror = () => alert('Could not read that file.');
    if (isSvg) reader.readAsText(file);
    else reader.readAsDataURL(file);
  };

  const clear = () => onChange('');
  const has = !!(value || '').trim();

  return (
    <>
      <div className="flex items-center gap-4 rounded-lg border border-ink-900/10 bg-paper-50 p-4">
        <div className={previewClassName + ' shrink-0'}>
          {preview ? preview(value) : null}
        </div>
        <div className="flex-1 min-w-0 text-[12.5px] text-ink-600">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-1">Preview</p>
          {has ? (
            <p className="text-ink-500 truncate">
              {value.startsWith('<svg')
                ? `Inline SVG · ${value.length} chars`
                : value.startsWith('data:')
                  ? `Uploaded file · ${Math.round(value.length / 1024)} KB`
                  : value}
            </p>
          ) : (
            <p className="text-ink-500">No media set — a default fallback is shown on the site.</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={onPickFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-full bg-ink-950 text-paper-50 px-3.5 py-1.5 text-[12px] font-medium hover:bg-brand-orange transition-colors"
          >
            {has ? replaceLabel : uploadLabel}
          </button>
          {has && (
            <button
              type="button"
              onClick={clear}
              className="rounded-full border border-ink-900/10 text-ink-700 px-3 py-1.5 text-[12px] hover:border-red-300 hover:text-red-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <FieldRow label={`${label} (advanced)`} hint={hint}>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={advancedInput}
          placeholder="https://… or <svg xmlns=…>"
        />
      </FieldRow>
    </>
  );
}
