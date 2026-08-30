import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, CommaList, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { useDispatch } from 'react-redux';
import { setField } from '../../store/contentSlice.js';

export default function ServicesEditor() {
  const services = useSelector((s) => s.content.services);
  const bind = useBind('services');
  const setItem = useItemUpdater('services.items');
  const dispatch = useDispatch();

  return (
    <>
      <Panel title="Services — header">
        <LocalizedText label="Heading" value={services.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={services.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }]}
        />
      </Panel>

      <Panel title="Services">
        <ListEditor
          path="services.items"
          items={services.items}
          itemLabel={(i) => services.items[i]?.title?.en || `Service ${i + 1}`}
          makeEmpty={() => ({
            id: `svc-${Date.now()}`,
            tag: '00',
            title: { en: 'New service', ar: '' },
            description: { en: '', ar: '' },
            outcomes: [{ en: '', ar: '' }],
            stack: [],
          })}
          renderItem={(item, i) => (
            <>
              <TextField label="Tag (e.g. 01)" value={item.tag} onChange={(v) => setItem(i, 'tag', v)} />
              <TextField label="ID (unique)" value={item.id} onChange={(v) => setItem(i, 'id', v)} />
              <LocalizedText label="Title" value={item.title} onChange={(v) => setItem(i, 'title', v)} />
              <LocalizedArea label="Description" value={item.description} onChange={(v) => setItem(i, 'description', v)} rows={3} />
              <NestedLocalizedList
                label="Outcomes"
                items={item.outcomes || []}
                path={`services.items.${i}.outcomes`}
                dispatch={dispatch}
              />
              <CommaList label="Stack (comma separated)" value={item.stack || []} onChange={(v) => setItem(i, 'stack', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}

function NestedLocalizedList({ label, items, path, dispatch }) {
  const updateOne = (index, v) => dispatch(setField({ path: `${path}.${index}`, value: v }));
  const add = () => dispatch(setField({ path, value: [...items, { en: '', ar: '' }] }));
  const remove = (index) => dispatch(setField({ path, value: items.filter((_, i) => i !== index) }));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">{label}</p>
        <button type="button" onClick={add} className="rounded-full bg-ink-950 text-paper-50 px-3 py-1 text-[11px] font-medium hover:bg-brand-orange transition-colors">
          + Add
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
