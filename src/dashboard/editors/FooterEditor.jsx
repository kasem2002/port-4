import { useSelector } from 'react-redux';
import { Panel, LocalizedArea, useBind } from '../fields.jsx';

export default function FooterEditor() {
  const footer = useSelector((s) => s.content.footer);
  const bind = useBind('footer');
  return (
    <Panel title="Footer" description="About blurb shown in the footer's left column.">
      <LocalizedArea label="About blurb" value={footer.aboutBlurb} onChange={(v) => bind.set('aboutBlurb', v)} rows={4} />
    </Panel>
  );
}
