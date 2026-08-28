import { useSelector } from 'react-redux';
import { Panel, LocalizedText, TextField, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { useT } from '../../hooks/useLocalized.js';

export default function BrandEditor() {
  const brand = useSelector((s) => s.content.brand);
  const bind = useBind('brand');
  const setSocial = useItemUpdater('brand.social');
  const t = useT();

  return (
    <>
      <Panel title="Brand" description="Identity strings shown across the entire site.">
        <LocalizedText label={t('dash.name')} value={brand.name} onChange={(v) => bind.set('name', v)} />
        <LocalizedText label={`Tagline`} value={brand.tagline} onChange={(v) => bind.set('tagline', v)} />
        <TextField label="Email" value={brand.email} onChange={(v) => bind.set('email', v)} />
        <TextField label="Phone" value={brand.phone} onChange={(v) => bind.set('phone', v)} />
        <LocalizedText label="Location" value={brand.location} onChange={(v) => bind.set('location', v)} />
      </Panel>

      <Panel title="Social links" description="Shown in the footer and contact section.">
        <ListEditor
          path="brand.social"
          items={brand.social}
          itemLabel={(i) => `Link ${String(i + 1).padStart(2, '0')}`}
          makeEmpty={() => ({ label: { en: '', ar: '' }, href: '#', abbr: '' })}
          renderItem={(item, i) => (
            <>
              <LocalizedText label={t('dash.label')} value={item.label} onChange={(v) => setSocial(i, 'label', v)} />
              <TextField label="Abbreviation (badge)" value={item.abbr} onChange={(v) => setSocial(i, 'abbr', v)} />
              <TextField label={t('dash.href')} value={item.href} onChange={(v) => setSocial(i, 'href', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}
