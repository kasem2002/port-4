import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Convert a File → { name, size, type, dataUrl } (base64 preview).
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, size: file.size, type: file.type, dataUrl: reader.result });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// Single-file upload area (logo, member photo, product image).
export function SingleUpload({ value, onChange, accept = 'image/*', label = 'Upload image', compact = false }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    const parsed = await readFile(file);
    onChange(parsed);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  if (value?.dataUrl) {
    return (
      <div className={`flex items-center gap-4 rounded-xl border border-ink-900/12 bg-paper-50 p-3 ${compact ? 'max-w-md' : ''}`}>
        <div
          className="h-16 w-16 rounded-lg bg-cover bg-center border border-ink-900/10 shrink-0"
          style={{ backgroundImage: `url(${value.dataUrl})` }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-ink-950">{value.name}</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
            {formatSize(value.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="grid h-8 w-8 place-items-center rounded-full border border-ink-900/10 text-ink-500 hover:border-brand-orangeDeep hover:text-brand-orangeDeep transition-colors"
          aria-label="Remove"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all py-8 px-6 ${
        dragging
          ? 'border-brand-orange bg-brand-orange/5'
          : 'border-ink-900/15 bg-paper-100/40 hover:border-ink-900/30 hover:bg-paper-100'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink-500" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-[13.5px] text-ink-700">{label}</p>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
        Drop or click to browse
      </p>
    </label>
  );
}

// Multi-file drop zone with categorized preview grid.
export function MultiUpload({ files, onAdd, onRemove, accept = 'image/*,video/*,.pdf,.doc,.docx' }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    async (fileList) => {
      const arr = Array.from(fileList || []);
      for (const f of arr) {
        const parsed = await readFile(f);
        onAdd(parsed);
      }
    },
    [onAdd],
  );

  return (
    <div className="space-y-4">
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-14 px-6 text-center ${
          dragging
            ? 'border-brand-orange bg-brand-orange/5'
            : 'border-ink-900/15 bg-paper-100/40 hover:border-ink-900/30 hover:bg-paper-100'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="grid h-12 w-12 place-items-center rounded-full bg-ink-950 text-paper-50">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl tracking-tighter2 text-ink-950">Drop files here</p>
        <p className="text-[13.5px] text-ink-600 max-w-sm">
          Logos, photos, videos, before/after shots, certificates — anything that helps us
          understand your brand.
        </p>
        <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
          or click to browse
        </span>
      </label>

      {files?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {files.map((f) => (
            <motion.div
              key={f.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="group relative rounded-xl border border-ink-900/10 bg-paper-50 overflow-hidden"
            >
              <div className="aspect-[4/3] bg-paper-100 grid place-items-center">
                {f.type?.startsWith('image') && f.dataUrl ? (
                  <img src={f.dataUrl} alt={f.name} className="h-full w-full object-cover" />
                ) : (
                  <FileTypeIcon type={f.type} />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-[12.5px] font-medium text-ink-950">{f.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 mt-0.5">
                  {formatSize(f.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(f.id)}
                className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-ink-950/70 text-paper-50 opacity-0 group-hover:opacity-100 hover:bg-brand-orangeDeep transition-all"
                aria-label="Remove file"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function FileTypeIcon({ type }) {
  const isVideo = type?.startsWith('video');
  const isPdf = type?.includes('pdf');
  return (
    <div className="flex flex-col items-center gap-2 text-ink-500">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
        {isVideo ? (
          <path d="M15 10l4-2v8l-4-2M3 6h12v12H3z" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6zM14 3v6h6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
        {isVideo ? 'video' : isPdf ? 'pdf' : 'file'}
      </span>
    </div>
  );
}
