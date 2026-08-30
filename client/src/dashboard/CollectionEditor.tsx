import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The editing surface shared by every ordered collection — navigation items,
 * services, projects, partners and the rest. Each editor supplies the fields
 * for one row; add, remove, reorder and debounced saving live here.
 */

interface Identifiable {
  id: string;
  order: number;
}

const DEBOUNCE_MS = 700;

interface CollectionEditorProps<T extends Identifiable> {
  items: T[];
  /** Blank row used when "Add" is pressed. */
  makeEmpty: () => Partial<T>;
  onCreate: (body: Partial<T>) => Promise<unknown>;
  onUpdate: (args: { id: string; body: Partial<T> }) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  onReorder?: (ids: string[]) => Promise<unknown>;
  /** Heading shown on each row's card. */
  itemLabel: (item: T, index: number) => string;
  renderFields: (item: T, set: <K extends keyof T>(key: K, value: T[K]) => void) => ReactNode;
  addLabel?: string;
  emptyLabel?: string;
}

export default function CollectionEditor<T extends Identifiable>({
  items,
  makeEmpty,
  onCreate,
  onUpdate,
  onDelete,
  onReorder,
  itemLabel,
  renderFields,
  addLabel = "Add",
  emptyLabel = "Nothing here yet.",
}: CollectionEditorProps<T>) {
  // Local mirror so typing stays responsive while writes are debounced.
  const [drafts, setDrafts] = useState<Record<string, Partial<T>>>({});
  const pendingRef = useRef<Record<string, Partial<T>>>({});
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Drop drafts for rows that no longer exist.
  useEffect(() => {
    const ids = new Set(items.map((item) => item.id));
    setDrafts((current) => {
      const next: Record<string, Partial<T>> = {};
      for (const [id, draft] of Object.entries(current)) {
        if (ids.has(id)) next[id] = draft;
      }
      return next;
    });
  }, [items]);

  const flush = useCallback(
    async (id: string) => {
      const patch = pendingRef.current[id];
      if (!patch || Object.keys(patch).length === 0) return;
      delete pendingRef.current[id];
      try {
        await onUpdate({ id, body: patch });
      } catch {
        // Restore so the next keystroke retries the failed fields.
        pendingRef.current[id] = { ...patch, ...pendingRef.current[id] };
      }
    },
    [onUpdate],
  );

  const setValue = useCallback(
    <K extends keyof T>(id: string, key: K, value: T[K]) => {
      setDrafts((current) => ({ ...current, [id]: { ...current[id], [key]: value } }));
      pendingRef.current[id] = { ...pendingRef.current[id], [key]: value };

      const existing = timersRef.current[id];
      if (existing) clearTimeout(existing);
      timersRef.current[id] = setTimeout(() => void flush(id), DEBOUNCE_MS);
    },
    [flush],
  );

  // Same reasoning as `useSettingsForm`: keep the unmount cleanup free of
  // `flush` so a new RTK Query trigger identity can't re-fire it mid-edit.
  const flushRef = useRef(flush);
  flushRef.current = flush;

  // Flush everything still pending when the editor unmounts.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach(clearTimeout);
      Object.keys(pendingRef.current).forEach((id) => void flushRef.current(id));
    };
  }, []);

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (!onReorder || target < 0 || target >= items.length) return;
    const ids = items.map((item) => item.id);
    const [moved] = ids.splice(index, 1);
    if (moved) ids.splice(target, 0, moved);
    await onReorder(ids);
  };

  /** Rows render draft values layered over the server row. */
  const merged = (item: T): T => ({ ...item, ...drafts[item.id] });

  return (
    <div>
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
          {emptyLabel}
        </p>
      )}

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="rounded-xl border border-ink-900/10 bg-paper-100/40 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="truncate font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {itemLabel(merged(item), index)}
                </p>
                <div className="flex shrink-0 items-center gap-1.5">
                  {onReorder && (
                    <>
                      <IconButton
                        onClick={() => void move(index, -1)}
                        title="Move up"
                        disabled={index === 0}
                      >
                        ↑
                      </IconButton>
                      <IconButton
                        onClick={() => void move(index, 1)}
                        title="Move down"
                        disabled={index === items.length - 1}
                      >
                        ↓
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    onClick={() => {
                      if (window.confirm("Delete this item? This cannot be undone.")) {
                        void onDelete(item.id);
                      }
                    }}
                    title="Delete"
                    danger
                  >
                    ×
                  </IconButton>
                </div>
              </div>

              <div className="space-y-3">
                {renderFields(merged(item), (key, value) => setValue(item.id, key, value))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => void onCreate(makeEmpty())}
        className="mt-4 rounded-full bg-ink-950 px-4 py-2 text-[13px] font-medium text-paper-50 transition-colors hover:bg-brand-orange"
      >
        + {addLabel}
      </button>
    </div>
  );
}

function IconButton({
  onClick,
  children,
  title,
  danger = false,
  disabled = false,
}: {
  onClick: () => void;
  children: ReactNode;
  title: string;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`grid h-7 w-7 place-items-center rounded-md border text-[13px] transition-colors disabled:opacity-30 ${
        danger
          ? "border-transparent text-ink-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          : "border-ink-900/10 text-ink-600 hover:bg-paper-50 hover:text-ink-900"
      }`}
    >
      {children}
    </button>
  );
}
