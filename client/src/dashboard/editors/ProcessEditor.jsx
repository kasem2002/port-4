import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';

export default function ProcessEditor() {
  const process = useSelector((s) => s.content.process);
  const bind = useBind('process');
  const setStep = useItemUpdater('process.steps');
  const dispatch = useDispatch();

  return (
    <>
      <Panel title="Process — header">
        <LocalizedText label="Heading" value={process.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={process.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }]}
        />
        <LocalizedArea label="Blurb" value={process.blurb} onChange={(v) => bind.set('blurb', v)} rows={3} />
      </Panel>

      <Panel title="Steps">
        <ListEditor
          path="process.steps"
          items={process.steps}
          itemLabel={(i) => process.steps[i]?.title?.en || `Step ${i + 1}`}
          makeEmpty={() => ({
            id: String(process.steps.length + 1).padStart(2, '0'),
            title: { en: 'New step', ar: '' },
            body: { en: '', ar: '' },
            tokens: [],
          })}
          renderItem={(item, i) => (
            <>
              <TextField label='Step number (e.g. "01")' value={item.id} onChange={(v) => setStep(i, 'id', v)} />
              <LocalizedText label="Title" value={item.title} onChange={(v) => setStep(i, 'title', v)} />
              <LocalizedArea label="Body" value={item.body} onChange={(v) => setStep(i, 'body', v)} rows={3} />
              <TokenChips path={`process.steps.${i}.tokens`} items={item.tokens || []} dispatch={dispatch} />
            </>
          )}
        />
      </Panel>
    </>
  );
}

function TokenChips({ path, items, dispatch }) {
  const updateOne = (index, v) => dispatch(setField({ path: `${path}.${index}`, value: v }));
  const add = () => dispatch(setField({ path, value: [...items, { en: '', ar: '' }] }));
  const remove = (index) => dispatch(setField({ path, value: items.filter((_, i) => i !== index) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">Tokens</p>
        <button type="button" onClick={add} className="rounded-full bg-ink-950 text-paper-50 px-3 py-1 text-[11px] font-medium hover:bg-brand-orange transition-colors">
          + Add token
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              <LocalizedText label={`#${i + 1}`} value={item} onChange={(v) => updateOne(i, v)} />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-6 grid h-7 w-7 place-items-center rounded-md text-ink-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              title="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
