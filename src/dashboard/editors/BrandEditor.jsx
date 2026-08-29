import { useSelector } from 'react-redux';
import { Panel, LocalizedText, TextField, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { useT } from '../../hooks/useLocalized.js';
import { SOCIAL_ICONS } from '../../components/SocialIcon.jsx';
import SocialIcon from '../../components/SocialIcon.jsx';

const iconOptions = SOCIAL_ICONS.map((o) => ({ value: o.value, label: o.label }));

export default function BrandEditor() {
  const brand = useSelector((s) => s.content.brand);
  const bind = useBind('brand');
  const setSocial = useItemUpdater('brand.social');
  const t = useT();

  return (
    <>
      <Panel title="Brand" description="Identity strings shown across the entire site.">
        <LocalizedText label={t('dash.name')} value={brand.name} onChange={(v) => bind.set('name', v)} />
        <LocalizedText label="Tagline" value={brand.tagline} onChange={(v) => bind.set('tagline', v)} />
        <TextField label="Email" value={brand.email} onChange={(v) => bind.set('email', v)} />
        <TextField label="Phone" value={brand.phone} onChange={(v) => bind.set('phone', v)} />
        <LocalizedText label="Location" value={brand.location} onChange={(v) => bind.set('location', v)} />
      </Panel>

      <Panel title="Social links" description="Icon renders in the contact section and footer. Pick an icon per link; falls back to the abbreviation if no icon is chosen.">
        <ListEditor
          path="brand.social"
          items={brand.social}
          itemLabel={(i) => brand.social[i]?.label?.en || `Link ${String(i + 1).padStart(2, '0')}`}
          makeEmpty={() => ({ icon: 'globe', label: { en: '', ar: '' }, href: '#', abbr: '' })}
          renderItem={(item, i) => (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-950 text-paper-50">
                  <SocialIcon icon={item.icon} className="h-4 w-4" fallback={<span className="text-[10px] font-mono">{item.abbr || '?'}</span>} />
                </span>
                <span className="text-[13px] text-ink-600">Preview</span>
              </div>
              <IconPicker value={item.icon} onChange={(v) => setSocial(i, 'icon', v)} />
              <LocalizedText label={t('dash.label')} value={item.label} onChange={(v) => setSocial(i, 'label', v)} />
              <TextField label={t('dash.href')} value={item.href} onChange={(v) => setSocial(i, 'href', v)} />
              <TextField label="Abbreviation (fallback if icon missing)" value={item.abbr} onChange={(v) => setSocial(i, 'abbr', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}

// Grid-style icon picker so users see all options at once.
function IconPicker({ value, onChange }) {
  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600 mb-2">Icon</p>
      <div className="grid grid-cols-6 md:grid-cols-8 gap-1.5">
        {iconOptions.map((o) => (
          <button
            type="button"
            key={o.value}
            onClick={() => onChange(o.value)}
            title={o.label}
            className={`group grid aspect-square place-items-center rounded-md border transition-colors ${
              value === o.value
                ? 'bg-ink-950 text-paper-50 border-ink-950'
                : 'bg-paper-50 text-ink-700 border-ink-900/10 hover:border-ink-950 hover:text-ink-950'
            }`}
          >
            <SocialIcon icon={o.value} className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
