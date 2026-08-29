import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';
import MediaUploader from '../MediaUploader.jsx';
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
        description="Upload a logo (SVG recommended for crispness, or PNG/JPG up to 400 KB). Leave the logo blank to fall back to a stylized wordmark of the name."
      >
        <ListEditor
          path="partners.items"
          items={items}
          addLabel="Add partner"
          itemLabel={(i) => items[i]?.name?.en || `Partner ${i + 1}`}
          makeEmpty={() => ({ name: { en: '', ar: '' }, logo: '' })}
          renderItem={(item, i) => {
            const val = normalize(item);
            const patch = (patchVal) => {
              if (!('name' in (item || {}))) {
                dispatch(setField({ path: `partners.items.${i}`, value: { ...val, ...patchVal } }));
              } else {
                Object.entries(patchVal).forEach(([k, v]) => setItem(i, k, v));
              }
            };
            return (
              <>
                <LocalizedText label="Name" value={val.name} onChange={(v) => patch({ name: v })} />
                <MediaUploader
                  label="Logo"
                  hint="paste image URL or inline <svg…>"
                  value={val.logo}
                  onChange={(v) => patch({ logo: v })}
                  uploadLabel="Upload logo"
                  preview={(v) => <PartnerLogo logo={v} name={val.name?.en || 'Preview'} />}
                />
              </>
            );
          }}
        />
      </Panel>
    </>
  );
}
