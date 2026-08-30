import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useUploadFileMutation, useUploadFilesMutation } from "@/services/api";
import type { FileRef } from "@/types";
import { useDT } from "../data/i18n";

/**
 * Files upload to the server the moment they're chosen and the brief stores
 * the returned URL. Nothing is held as base64, so a client can attach a
 * 12 MB photo, close the tab, and still have it when they come back.
 */

function formatSize(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// ─── Single file ─────────────────────────────────────────────────────────────

interface SingleUploadProps {
  value: FileRef | null | undefined;
  onChange: (file: FileRef | null) => void;
  accept?: string;
  label?: string;
  compact?: boolean;
}

export function SingleUpload({
  value,
  onChange,
  accept = "image/*",
  label,
  compact = false,
}: SingleUploadProps) {
  const t = useDT();
  const [dragging, setDragging] = useState(false);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [failed, setFailed] = useState(false);
  const resolvedLabel = label ?? t("upload.single");

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setFailed(false);
      try {
        const uploaded = await uploadFile(file).unwrap();
        onChange({
          url: uploaded.url,
          originalName: uploaded.originalName,
          mimeType: uploaded.mimeType,
          size: uploaded.size,
        });
      } catch {
        setFailed(true);
      }
    },
    [onChange, uploadFile],
  );

  if (value?.url) {
    return (
      <div
        className={`flex items-center gap-4 rounded-xl border border-ink-900/12 bg-paper-50 p-3 ${
          compact ? "max-w-md" : ""
        }`}
      >
        <div
          className="h-16 w-16 shrink-0 rounded-lg border border-ink-900/10 bg-cover bg-center"
          style={{ backgroundImage: `url(${value.url})` }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-ink-950">{value.originalName}</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
            {formatSize(value.size)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label={t("list.remove")}
          className="grid h-8 w-8 place-items-center rounded-full border border-ink-900/10 text-ink-500 transition-colors hover:border-brand-orangeDeep hover:text-brand-orangeDeep"
        >
          ×
        </button>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        void handleFile(e.dataTransfer.files?.[0]);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 transition-all ${
        dragging
          ? "border-brand-orange bg-brand-orange/5"
          : "border-ink-900/15 bg-paper-100/40 hover:border-ink-900/30 hover:bg-paper-100"
      }`}
    >
      <input
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      {isLoading ? (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-orange">
          {t("upload.uploading")}
        </span>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-ink-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[13.5px] text-ink-700">{resolvedLabel}</p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
            {t("upload.dropSingle")}
          </p>
        </>
      )}

      {failed && (
        <p className="mt-1 text-[12.5px] text-brand-orangeDeep">{t("upload.failed")}</p>
      )}
    </label>
  );
}

// ─── Many files ──────────────────────────────────────────────────────────────

export interface UploadedAsset extends FileRef {
  id: string;
}

interface MultiUploadProps {
  files: UploadedAsset[];
  onAdd: (file: FileRef) => void;
  onRemove: (id: string) => void;
  accept?: string;
}

export function MultiUpload({
  files,
  onAdd,
  onRemove,
  accept = "image/*,video/*,.pdf",
}: MultiUploadProps) {
  const t = useDT();
  const [dragging, setDragging] = useState(false);
  const [failed, setFailed] = useState(false);
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (list: FileList | null) => {
      const selected = Array.from(list ?? []);
      if (selected.length === 0) return;
      setFailed(false);
      try {
        const uploaded = await uploadFiles(selected).unwrap();
        uploaded.forEach((file) =>
          onAdd({
            url: file.url,
            originalName: file.originalName,
            mimeType: file.mimeType,
            size: file.size,
          }),
        );
      } catch {
        setFailed(true);
      } finally {
        // Let the same file be re-picked after a failure.
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [onAdd, uploadFiles],
  );

  return (
    <div className="space-y-4">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all ${
          dragging
            ? "border-brand-orange bg-brand-orange/5"
            : "border-ink-900/15 bg-paper-100/40 hover:border-ink-900/30 hover:bg-paper-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
        />

        <div className="grid h-12 w-12 place-items-center rounded-full bg-ink-950 text-paper-50">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="font-display text-xl tracking-tighter2 text-ink-950">
          {isLoading ? t("upload.uploading") : t("upload.drop")}
        </p>
        <p className="max-w-sm text-[13.5px] text-ink-600">{t("upload.body")}</p>
        <span className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
          {t("upload.browse")}
        </span>

        {failed && <p className="text-[12.5px] text-brand-orangeDeep">{t("upload.failed")}</p>}
      </label>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative overflow-hidden rounded-xl border border-ink-900/10 bg-paper-50"
            >
              <div className="grid aspect-[4/3] place-items-center bg-paper-100">
                {file.mimeType.startsWith("image") ? (
                  <img
                    src={file.url}
                    alt={file.originalName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FileTypeIcon mimeType={file.mimeType} />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-[12.5px] font-medium text-ink-950">
                  {file.originalName}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(file.id)}
                aria-label={t("list.remove")}
                className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink-950/70 text-paper-50 opacity-0 transition-all hover:bg-brand-orangeDeep group-hover:opacity-100"
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

function FileTypeIcon({ mimeType }: { mimeType: string }) {
  const isVideo = mimeType.startsWith("video");
  const isPdf = mimeType.includes("pdf");
  return (
    <div className="flex flex-col items-center gap-2 text-ink-500">
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {isVideo ? (
          <path d="M15 10l4-2v8l-4-2M3 6h12v12H3z" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path
            d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6zM14 3v6h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
        {isVideo ? "video" : isPdf ? "pdf" : "file"}
      </span>
    </div>
  );
}
