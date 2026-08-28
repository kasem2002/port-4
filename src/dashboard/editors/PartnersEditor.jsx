import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, Segmented, ListEditor, useBind } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';

export default function PartnersEditor() {
  const partners = useSelector((s) => s.content.partners);
  const bind = useBind('partners');
  const dispatch = useDispatch();

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

      <Panel title="Partner names">
        <ListEditor
          path="partners.items"
          items={partners.items}
          itemLabel={(i) => partners.items[i]?.en || `Partner ${i + 1}`}
          makeEmpty={() => ({ en: '', ar: '' })}
          renderItem={(item, i) => (
            <LocalizedText
              label="Name"
              value={item}
              onChange={(v) => dispatch(setField({ path: `partners.items.${i}`, value: v }))}
            />
          )}
        />
      </Panel>
    </>
  );
}
