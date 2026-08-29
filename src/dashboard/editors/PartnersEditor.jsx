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
        description="Paste an image URL (https://…), a data: URI, or inline SVG markup (starting with <svg …>). Leave the logo blank to fall back to a wordmark of the name."
      >
        <ListEditor
          path="partners.items"
          items={items}
          itemLabel={(i) => items[i]?.name?.en || `Partner ${i + 1}`}
          makeEmpty={() => ({ name: { en: '', ar: '' }, logo: '' })}
          renderItem={(item, i) => {
            // If the incoming item is legacy shape, migrate it in-store on first edit.
            const val = normalize(item);
            const setName = (v) => {
              if (!('name' in (item || {}))) {
                // Migrate the whole item at once.
                dispatch(setField({ path: `partners.items.${i}`, value: { name: v, logo: val.logo || '' } }));
              } else {
                setItem(i, 'name', v);
              }
            };
            const setLogo = (v) => {
              if (!('name' in (item || {}))) {
                dispatch(setField({ path: `partners.items.${i}`, value: { name: val.name, logo: v } }));
              } else {
                setItem(i, 'logo', v);
              }
            };
            return (
              <>
                <div className="flex items-center gap-4 mb-2 rounded-lg border border-ink-900/10 bg-paper-50 p-4">
                  <div className="grid h-16 w-24 place-items-center rounded bg-paper-100">
                    <PartnerLogo logo={val.logo} name={val.name?.en || 'Preview'} />
                  </div>
                  <div className="text-[12.5px] text-ink-600">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-1">Preview</p>
                    <p>Shown at ~4rem wide.</p>
                    <p className="text-ink-500 mt-0.5">On the live grid the logo is desaturated until hover.</p>
                  </div>
                </div>
                <LocalizedText label="Name" value={val.name} onChange={setName} />
                <TextArea
                  label="Logo"
                  hint="image URL, data: URI, or inline <svg…>"
                  value={val.logo}
                  onChange={setLogo}
                  rows={3}
                />
              </>
            );
          }}
        />
      </Panel>
    </>
  );
}
