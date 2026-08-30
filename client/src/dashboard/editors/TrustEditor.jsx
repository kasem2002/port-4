import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';

export default function TrustEditor() {
  const trust = useSelector((s) => s.content.trust);
  const bind = useBind('trust');
  const setItem = useItemUpdater('trust.items');

  return (
    <>
      <Panel title="Trust / stats — header">
        <LocalizedText label="Heading" value={trust.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={trust.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }, { value: 2, label: 'L3' }]}
        />
        <LocalizedArea label="Blurb" value={trust.blurb} onChange={(v) => bind.set('blurb', v)} rows={3} />
      </Panel>

      <Panel title="Stat cards">
        <ListEditor
          path="trust.items"
          items={trust.items}
          itemLabel={(i) => `Stat ${String(i + 1).padStart(2, '0')}`}
          makeEmpty={() => ({ value: '0+', label: { en: 'Label', ar: '' }, hint: { en: '', ar: '' } })}
          renderItem={(item, i) => (
            <>
              <TextField label='Value (e.g. "40+", "24h")' value={item.value} onChange={(v) => setItem(i, 'value', v)} />
              <LocalizedText label="Label" value={item.label} onChange={(v) => setItem(i, 'label', v)} />
              <LocalizedText label="Hint" value={item.hint} onChange={(v) => setItem(i, 'hint', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}
