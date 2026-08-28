import { useSelector } from 'react-redux';
import { Panel, LocalizedText, TextField, ListEditor, useItemUpdater } from '../fields.jsx';
import { useT } from '../../hooks/useLocalized.js';

export default function NavEditor() {
  const nav = useSelector((s) => s.content.nav);
  const set = useItemUpdater('nav');
  const t = useT();

  return (
    <Panel title="Navigation" description="Top-nav and mobile drawer entries.">
      <ListEditor
        path="nav"
        items={nav}
        itemLabel={(i) => `Link ${String(i + 1).padStart(2, '0')}`}
        makeEmpty={() => ({ label: { en: '', ar: '' }, href: '#' })}
        renderItem={(item, i) => (
          <>
            <LocalizedText label={t('dash.label')} value={item.label} onChange={(v) => set(i, 'label', v)} />
            <TextField label={t('dash.href')} value={item.href} onChange={(v) => set(i, 'href', v)} />
          </>
        )}
      />
    </Panel>
  );
}
