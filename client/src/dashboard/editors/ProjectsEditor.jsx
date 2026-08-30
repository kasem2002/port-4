import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, TextField, Segmented, CommaList, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import MediaUploader from '../MediaUploader.jsx';
import ProjectImage from '../../components/ProjectImage.jsx';

const FALLBACK_VISUALS = [
  { value: 'northline', label: 'Northline' },
  { value: 'ember', label: 'Ember' },
  { value: 'kiln', label: 'Kiln' },
  { value: 'atlas', label: 'Atlas' },
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

      <Panel title="Projects" description="Upload a screenshot for each project — or leave it blank to keep the built-in illustrated visual selected under 'fallback visual'.">
        <ListEditor
          path="projects.items"
          items={projects.items}
          addLabel="Add project"
          itemLabel={(i) => projects.items[i]?.name?.en || `Project ${i + 1}`}
          makeEmpty={() => ({
            id: 'northline',
            image: '',
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
              <MediaUploader
                label="Project image"
                hint="upload PNG/SVG/JPG (up to 400 KB), or paste an image URL"
                value={item.image}
                onChange={(v) => setItem(i, 'image', v)}
                uploadLabel="Upload image"
                previewClassName="grid h-20 w-32 place-items-center rounded overflow-hidden relative bg-paper-100"
                preview={(v) => (
                  <div className="relative w-full h-full">
                    <ProjectImage image={v} fallbackId={item.id} alt="Preview" />
                  </div>
                )}
              />

              <Segmented
                label="Fallback visual (used when no image is uploaded)"
                value={item.id}
                onChange={(v) => setItem(i, 'id', v)}
                options={FALLBACK_VISUALS}
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
