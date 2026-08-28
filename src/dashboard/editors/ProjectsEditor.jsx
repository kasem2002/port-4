import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, CommaList, ListEditor, useBind, useItemUpdater } from '../fields.jsx';

const PROJECT_IDS = [
  { value: 'northline', label: 'Northline visual' },
  { value: 'ember', label: 'Ember visual' },
  { value: 'kiln', label: 'Kiln visual' },
  { value: 'atlas', label: 'Atlas visual' },
];

export default function ProjectsEditor() {
  const projects = useSelector((s) => s.content.projects);
  const bind = useBind('projects');
  const setItem = useItemUpdater('projects.items');

  return (
    <>
      <Panel title="Projects — header">
        <LocalizedText label="Heading" value={projects.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={projects.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }, { value: 2, label: 'L3' }]}
        />
        <LocalizedArea label="Blurb" value={projects.blurb} onChange={(v) => bind.set('blurb', v)} rows={3} />
      </Panel>

      <Panel title="Projects" description="Each project can pick one of the built-in abstract visuals via its ID.">
        <ListEditor
          path="projects.items"
          items={projects.items}
          itemLabel={(i) => projects.items[i]?.name?.en || `Project ${i + 1}`}
          makeEmpty={() => ({
            id: 'northline',
            index: '',
            year: '2026',
            name: { en: 'New project', ar: '' },
            category: { en: '', ar: '' },
            summary: { en: '', ar: '' },
            result: { en: '', ar: '' },
            stack: [],
          })}
          renderItem={(item, i) => (
            <>
              <Segmented
                label="Visual (ID)"
                value={item.id}
                onChange={(v) => setItem(i, 'id', v)}
                options={PROJECT_IDS}
              />
              <TextField label='Index (e.g. "01 / 06")' value={item.index} onChange={(v) => setItem(i, 'index', v)} />
              <TextField label="Year" value={item.year} onChange={(v) => setItem(i, 'year', v)} />
              <LocalizedText label="Name" value={item.name} onChange={(v) => setItem(i, 'name', v)} />
              <LocalizedText label="Category" value={item.category} onChange={(v) => setItem(i, 'category', v)} />
              <LocalizedArea label="Summary" value={item.summary} onChange={(v) => setItem(i, 'summary', v)} rows={3} />
              <LocalizedArea label="Result" value={item.result} onChange={(v) => setItem(i, 'result', v)} rows={2} />
              <CommaList label="Stack (comma separated)" value={item.stack} onChange={(v) => setItem(i, 'stack', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}
