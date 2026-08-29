import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setField,
  setLocalized,
  addListItem,
  removeListItem,
  moveListItem,
  setList,
  setFeatured,
} from '../store/contentSlice.js';
import { useT } from '../hooks/useLocalized.js';
import Modal from './Modal.jsx';

// A section wrapper.
export function Panel({ title, description, children, actions }) {
  return (
    <section className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5 md:p-7 mb-6 shadow-soft">
      <header className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display text-2xl md:text-[1.6rem] tracking-tighter2 text-ink-950">{title}</h2>
          {description && <p className="mt-1 text-[13.5px] text-ink-600 max-w-lg">{description}</p>}
        </div>
        {actions}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function FieldRow({ label, hint, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600">
          {label}
        </label>
        {hint && <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputBase =
  'w-full rounded-lg border border-ink-900/12 bg-paper-100/40 px-3.5 py-2.5 text-[14px] text-ink-950 outline-none transition-colors focus:border-brand-orange focus:bg-paper-50';

// Plain (non-localized) text input.
export function TextField({ label, value, onChange, hint, placeholder }) {
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputBase}
      />
    </FieldRow>
  );
}

// Non-localized textarea.
export function TextArea({ label, value, onChange, hint, rows = 3 }) {
  return (
    <FieldRow label={label} hint={hint}>
      <textarea
        value={value ?? ''}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase + ' resize-none'}
      />
    </FieldRow>
  );
}

// Localized text input pair (EN + AR).
export function LocalizedText({ label, value, onChange, hint }) {
  const v = value || { en: '', ar: '' };
  return (
    <FieldRow label={label} hint={hint}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative">
          <span className="absolute top-1.5 right-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">EN</span>
          <input
            type="text"
            value={v.en ?? ''}
            onChange={(e) => onChange({ ...v, en: e.target.value })}
            className={inputBase + ' pr-10'}
            dir="ltr"
          />
        </div>
        <div className="relative">
          <span className="absolute top-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">ع</span>
          <input
            type="text"
            value={v.ar ?? ''}
            onChange={(e) => onChange({ ...v, ar: e.target.value })}
            className={inputBase + ' pl-10 text-right'}
            dir="rtl"
          />
        </div>
      </div>
    </FieldRow>
  );
}

// Localized multiline pair (EN + AR).
export function LocalizedArea({ label, value, onChange, hint, rows = 3 }) {
  const v = value || { en: '', ar: '' };
  return (
    <FieldRow label={label} hint={hint}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative">
          <span className="absolute top-1.5 right-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400 z-10">EN</span>
          <textarea
            value={v.en ?? ''}
            rows={rows}
            onChange={(e) => onChange({ ...v, en: e.target.value })}
            className={inputBase + ' pr-10 resize-none'}
            dir="ltr"
          />
        </div>
        <div className="relative">
          <span className="absolute top-1.5 left-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400 z-10">ع</span>
          <textarea
            value={v.ar ?? ''}
            rows={rows}
            onChange={(e) => onChange({ ...v, ar: e.target.value })}
            className={inputBase + ' pl-10 resize-none text-right'}
            dir="rtl"
          />
        </div>
      </div>
    </FieldRow>
  );
}

// Number input.
export function NumberField({ label, value, onChange, hint, min = 0 }) {
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="number"
        value={value ?? 0}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputBase + ' max-w-[140px]'}
      />
    </FieldRow>
  );
}

// Segmented control (small enums like accentLine).
export function Segmented({ label, value, onChange, options, hint }) {
  return (
    <FieldRow label={label} hint={hint}>
      <div className="inline-flex rounded-lg border border-ink-900/12 bg-paper-100 p-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              value === o.value
                ? 'bg-ink-950 text-paper-50'
                : 'text-ink-700 hover:text-ink-950'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </FieldRow>
  );
}

// Comma-list for arrays of strings (e.g. stack, budgets).
export function CommaList({ label, value, onChange, hint }) {
  const s = Array.isArray(value) ? value.join(', ') : '';
  return (
    <FieldRow label={label} hint={hint}>
      <input
        type="text"
        value={s}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(',')
              .map((x) => x.trim())
              .filter(Boolean),
          )
        }
        className={inputBase}
      />
    </FieldRow>
  );
}

// A reusable list editor with add / remove / move controls.
// "Add" opens a popup where the new item is filled in before it lands in
// the list — Cancel discards it entirely.
export function ListEditor({
  path,
  items,
  renderItem,
  makeEmpty,
  title = 'Items',
  itemLabel = (i) => `Item ${i + 1}`,
  addLabel,
  allowFeatured = false,
}) {
  const dispatch = useDispatch();
  const t = useT();
  const [pendingIndex, setPendingIndex] = useState(null);
  const isAdding = pendingIndex !== null;

  const openAddModal = () => {
    // The new item lands at the current tail. Capture that index before
    // dispatch so we know which one to hide + which one to discard on cancel.
    const newIndex = items.length;
    dispatch(addListItem({ path, item: makeEmpty() }));
    setPendingIndex(newIndex);
  };

  const confirmAdd = () => setPendingIndex(null);

  const cancelAdd = () => {
    if (pendingIndex != null) {
      dispatch(removeListItem({ path, index: pendingIndex }));
    }
    setPendingIndex(null);
  };

  const pendingItem = pendingIndex != null ? items[pendingIndex] : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">{title}</p>
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-full bg-ink-950 text-paper-50 px-3.5 py-1.5 text-[12px] font-medium hover:bg-brand-orange transition-colors"
        >
          + {addLabel || t('dash.add')}
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => {
          // Hide the pending item from the visible list — it lives only in
          // the modal until confirmed.
          if (i === pendingIndex) return null;
          return (
            <div key={i} className="rounded-xl border border-ink-900/10 bg-paper-100/40 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
                  {itemLabel(i)}
                </p>
                <div className="flex items-center gap-1.5">
                  {allowFeatured && (
                    <button
                      type="button"
                      onClick={() => dispatch(setFeatured({ path, index: i }))}
                      className={`rounded-md px-2 py-1 text-[11px] font-mono uppercase tracking-[0.14em] transition-colors ${
                        item.featured
                          ? 'bg-brand-orange text-paper-50'
                          : 'text-ink-500 border border-ink-900/10 hover:text-ink-900'
                      }`}
                    >
                      ★ {t('dash.featured')}
                    </button>
                  )}
                  <IconBtn onClick={() => dispatch(moveListItem({ path, from: i, to: i - 1 }))} title={t('dash.moveUp')}>↑</IconBtn>
                  <IconBtn onClick={() => dispatch(moveListItem({ path, from: i, to: i + 1 }))} title={t('dash.moveDown')}>↓</IconBtn>
                  <IconBtn onClick={() => dispatch(removeListItem({ path, index: i }))} title={t('dash.remove')} danger>×</IconBtn>
                </div>
              </div>
              <div className="space-y-3">{renderItem(item, i)}</div>
            </div>
          );
        })}
      </div>

      <Modal
        open={isAdding}
        title={addLabel ? `Add · ${addLabel}` : `Add to ${title}`}
        subtitle="Fill in the fields below, then Add to confirm — or Cancel to discard."
        confirmLabel="Add"
        cancelLabel="Cancel"
        onCancel={cancelAdd}
        onConfirm={confirmAdd}
      >
        {isAdding && pendingItem !== undefined && (
          <div className="space-y-3">{renderItem(pendingItem, pendingIndex)}</div>
        )}
      </Modal>
    </div>
  );
}

function IconBtn({ onClick, children, title, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`grid h-7 w-7 place-items-center rounded-md border text-[13px] transition-colors ${
        danger
          ? 'border-transparent text-ink-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
          : 'border-ink-900/10 text-ink-600 hover:bg-paper-50 hover:text-ink-900'
      }`}
    >
      {children}
    </button>
  );
}

// Small helpers to bind directly to state paths.
export function useBind(pathPrefix) {
  const dispatch = useDispatch();
  return {
    // scalar / structured (non-per-lang) field
    set: (path, value) => dispatch(setField({ path: `${pathPrefix}.${path}`, value })),
    // localized {en, ar}
    setL: (path, value) => dispatch(setField({ path: `${pathPrefix}.${path}`, value })),
    // list operations for a nested list
    listSet: (path, list) => dispatch(setList({ path: `${pathPrefix}.${path}`, list })),
    listAdd: (path, item) => dispatch(addListItem({ path: `${pathPrefix}.${path}`, item })),
    listRemove: (path, index) => dispatch(removeListItem({ path: `${pathPrefix}.${path}`, index })),
    listMove: (path, from, to) => dispatch(moveListItem({ path: `${pathPrefix}.${path}`, from, to })),
    // update an item at index in a list — merges the given fields
    updateItem: (path, index, patch) =>
      dispatch(
        setField({
          path: `${pathPrefix}.${path}.${index}`,
          value: patch,
        }),
      ),
  };
}

// Update a single field within a list item.
export function useItemUpdater(basePath) {
  const dispatch = useDispatch();
  return (index, field, value) => {
    dispatch(setField({ path: `${basePath}.${index}.${field}`, value }));
  };
}
