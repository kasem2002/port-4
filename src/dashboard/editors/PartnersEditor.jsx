import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, TextArea, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';
import PartnerLogo from '../../components/PartnerLogo.jsx';

// Legacy compat: older saved data stored items as {en, ar}. Migrate on the
// fly so the editor always sees {name, logo}.
function normalize(item) {
  if (item && typeof item === 'object' && 'name' in item) return item;
  return { name: item || { en: '', ar: '' }, logo: '' };
}

const MAX_UPLOAD_BYTES = 400 * 1024; // 400 KB — beyond that we'd bloat localStorage.

export default function PartnersEditor() {
  const partners = useSelector((s) => s.content.partners);
  const bind = useBind('partners');
  const setItem = useItemUpdater('partners.items');
  const dispatch = useDispatch();
  const items = (partners.items || []).map(normalize);

  return (
    <>
      <Panel title="Partners — header">
        <LocalizedText label="Heading" value={partners.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={partners.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }]}
        />
      </Panel>

      <Panel
        title="Partner logos"
        description="Upload a logo file (SVG recommended, or PNG / JPG up to 400 KB), paste an image URL, or paste inline SVG markup. Leave everything blank to fall back to a wordmark."
      >
        <ListEditor
          path="partners.items"
          items={items}
          itemLabel={(i) => items[i]?.name?.en || `Partner ${i + 1}`}
          makeEmpty={() => ({ name: { en: '', ar: '' }, logo: '' })}
          renderItem={(item, i) => {
            // On first edit, migrate any legacy {en, ar} item to the new shape.
            const val = normalize(item);
            const patch = (patchVal) => {
              if (!('name' in (item || {}))) {
                dispatch(setField({ path: `partners.items.${i}`, value: { ...val, ...patchVal } }));
              } else {
                Object.entries(patchVal).forEach(([k, v]) => setItem(i, k, v));
              }
            };
            return (
              <PartnerItemFields index={i} value={val} onPatch={patch} />
            );
          }}
        />
      </Panel>
    </>
  );
}

function PartnerItemFields({ index, value, onPatch }) {
  const fileRef = useRef(null);

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file
    if (!file) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      alert(`This file is ${(file.size / 1024).toFixed(0)} KB. Please upload under 400 KB (SVG recommended).`);
      return;
    }
    const reader = new FileReader();
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    reader.onload = () => onPatch({ logo: String(reader.result || '') });
    reader.onerror = () => alert('Could not read that file.');
    if (isSvg) reader.readAsText(file);
    else reader.readAsDataURL(file);
  };

  const clear = () => onPatch({ logo: '' });
  const hasLogo = !!(value.logo || '').trim();

  return (
    <>
      <div className="flex items-center gap-4 mb-2 rounded-lg border border-ink-900/10 bg-paper-50 p-4">
        <div className="grid h-16 w-24 place-items-center rounded bg-paper-100 shrink-0">
          <PartnerLogo logo={value.logo} name={value.name?.en || 'Preview'} />
        </div>
        <div className="flex-1 min-w-0 text-[12.5px] text-ink-600">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-1">Preview</p>
          <p>Desaturated on the live grid until hover.</p>
          {hasLogo && (
            <p className="text-ink-500 truncate mt-0.5">
              {value.logo.startsWith('<svg') ? 'Inline SVG · ' + value.logo.length + ' chars' :
                value.logo.startsWith('data:') ? 'Uploaded file · ' + Math.round(value.logo.length / 1024) + ' KB' :
                  value.logo}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            ref={fileRef}
            type="file"
            accept="image/svg+xml,image/png,image/jpeg,image/webp,image/gif,.svg,.png,.jpg,.jpeg,.webp,.gif"
            onChange={onPickFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-full bg-ink-950 text-paper-50 px-3.5 py-1.5 text-[12px] font-medium hover:bg-brand-orange transition-colors"
          >
            {hasLogo ? 'Replace' : 'Upload logo'}
          </button>
          {hasLogo && (
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

      <LocalizedText label="Name" value={value.name} onChange={(v) => onPatch({ name: v })} />
      <TextArea
        label="Logo (advanced)"
        hint="paste image URL or <svg…> markup — the upload button above sets this"
        value={value.logo}
        onChange={(v) => onPatch({ logo: v })}
        rows={2}
      />
    </>
  );
}
