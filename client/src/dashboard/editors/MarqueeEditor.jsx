import { useDispatch, useSelector } from 'react-redux';
import { Panel, LocalizedText, ListEditor } from '../fields.jsx';
import { setField } from '../../store/contentSlice.js';

export default function MarqueeEditor() {
  const words = useSelector((s) => s.content.marquee);
  const dispatch = useDispatch();

  return (
    <Panel title="Marquee" description="Words scrolling under the hero.">
      <ListEditor
        path="marquee"
        items={words}
        itemLabel={(i) => `Word ${String(i + 1).padStart(2, '0')}`}
        makeEmpty={() => ({ en: '', ar: '' })}
        renderItem={(item, i) => (
          <LocalizedText
            label="Text"
            value={item}
            onChange={(v) => dispatch(setField({ path: `marquee.${i}`, value: v }))}
          />
        )}
      />
    </Panel>
  );
}
