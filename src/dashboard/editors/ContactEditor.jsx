import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, Segmented, CommaList, ListEditor, useBind } from '../fields.jsx';
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
        <LocalizedArea
          label="Section blurb"
          value={contact.blurb}
          onChange={(v) => bind.set('blurb', v)}
          rows={3}
        />
      </Panel>

      <Panel title="Form copy" description="Labels above/around the form.">
        <LocalizedText label="Form intro (small label above form)" value={contact.formIntro} onChange={(v) => bind.set('formIntro', v)} />
        <LocalizedText label="Encrypted badge" value={contact.formEncrypted} onChange={(v) => bind.set('formEncrypted', v)} />
        <LocalizedText label="Submit button label" value={contact.submitLabel} onChange={(v) => bind.set('submitLabel', v)} />
        <LocalizedText label="Submit button — sending state" value={contact.submitSending} onChange={(v) => bind.set('submitSending', v)} />
        <LocalizedArea label="Privacy note (below form)" value={contact.privacyNote} onChange={(v) => bind.set('privacyNote', v)} rows={2} />
        <LocalizedArea label="Success message (after submit)" value={contact.successMessage} onChange={(v) => bind.set('successMessage', v)} rows={2} />
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
