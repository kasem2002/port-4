import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, Segmented, CommaList, ListEditor, useBind } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';

export default function ContactEditor() {
  const contact = useSelector((s) => s.content.contact);
  const bind = useBind('contact');
  const dispatch = useDispatch();

  return (
    <>
      <Panel title="Contact — header">
        <LocalizedText label="Heading" value={contact.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={contact.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }, { value: 2, label: 'L3' }]}
        />
      </Panel>

      <Panel title="Project type chips">
        <ListEditor
          path="contact.projectTypes"
          items={contact.projectTypes}
          itemLabel={(i) => contact.projectTypes[i]?.en || `Type ${i + 1}`}
          makeEmpty={() => ({ en: '', ar: '' })}
          renderItem={(item, i) => (
            <LocalizedText
              label="Label"
              value={item}
              onChange={(v) => dispatch(setField({ path: `contact.projectTypes.${i}`, value: v }))}
            />
          )}
        />
      </Panel>

      <Panel title="Budget chips">
        <CommaList label="Budget ranges (comma separated)" value={contact.budgets} onChange={(v) => bind.set('budgets', v)} />
      </Panel>
    </>
  );
}
