import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, NumberField, Segmented, ListEditor, useBind, useItemUpdater } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';

export default function AboutEditor() {
  const about = useSelector((s) => s.content.about);
  const bind = useBind('about');
  const setTeam = useItemUpdater('about.team');
  const dispatch = useDispatch();

  return (
    <>
      <Panel title="About — copy">
        <LocalizedText label="Heading" value={about.heading} onChange={(v) => bind.set('heading', v)} hint='use "||" for line breaks' />
        <Segmented
          label="Accent line"
          value={about.accentLine ?? -1}
          onChange={(v) => bind.set('accentLine', v)}
          options={[{ value: -1, label: 'None' }, { value: 0, label: 'L1' }, { value: 1, label: 'L2' }, { value: 2, label: 'L3' }]}
        />
        <LocalizedArea label="Body — paragraph 1" value={about.body} onChange={(v) => bind.set('body', v)} rows={4} />
        <LocalizedArea label="Body — paragraph 2" value={about.bodyTwo} onChange={(v) => bind.set('bodyTwo', v)} rows={3} />
      </Panel>

      <Panel title="Bullet list">
        <ListEditor
          path="about.bullets"
          items={about.bullets}
          itemLabel={(i) => `Bullet ${i + 1}`}
          makeEmpty={() => ({ en: '', ar: '' })}
          renderItem={(item, i) => (
            <LocalizedText
              label="Text"
              value={item}
              onChange={(v) => dispatch(setField({ path: `about.bullets.${i}`, value: v }))}
            />
          )}
        />
      </Panel>

      <Panel title="Team topology">
        <LocalizedText label="Topology title" value={about.topologyTitle} onChange={(v) => bind.set('topologyTitle', v)} />
        <LocalizedText label="Topology subtitle" value={about.topologySub} onChange={(v) => bind.set('topologySub', v)} />
        <LocalizedText label="Core label" value={about.coreLabel} onChange={(v) => bind.set('coreLabel', v)} />
        <ListEditor
          path="about.team"
          items={about.team}
          itemLabel={(i) => `Role ${i + 1}`}
          makeEmpty={() => ({ role: { en: 'Role', ar: '' }, count: 1, note: { en: '', ar: '' } })}
          renderItem={(item, i) => (
            <>
              <LocalizedText label="Role" value={item.role} onChange={(v) => setTeam(i, 'role', v)} />
              <NumberField label="Count" value={item.count} onChange={(v) => setTeam(i, 'count', v)} min={0} />
              <LocalizedText label="Note" value={item.note} onChange={(v) => setTeam(i, 'note', v)} />
            </>
          )}
        />
      </Panel>
    </>
  );
}
