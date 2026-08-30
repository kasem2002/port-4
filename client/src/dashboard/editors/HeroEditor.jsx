import { useSelector } from 'react-redux';
import { Panel, LocalizedText, LocalizedArea, Segmented, useBind } from '../fields.jsx';
import { useT } from '../../hooks/useLocalized.js';

export default function HeroEditor() {
  const hero = useSelector((s) => s.content.hero);
  const bind = useBind('hero');
  const t = useT();

  return (
    <Panel
      title="Hero"
      description={'Headline uses "||" as a line break. Pick which line gets the accent color.'}
    >
      <LocalizedText
        label={t('dash.headline')}
        value={hero.headline}
        onChange={(v) => bind.set('headline', v)}
        hint='use " || " to separate lines'
      />
      <Segmented
        label="Accent line"
        value={hero.accentLine ?? -1}
        onChange={(v) => bind.set('accentLine', v)}
        options={[
          { value: -1, label: 'None' },
          { value: 0, label: 'Line 1' },
          { value: 1, label: 'Line 2' },
          { value: 2, label: 'Line 3' },
        ]}
      />
      <LocalizedArea label="Subcopy" value={hero.subcopy} onChange={(v) => bind.set('subcopy', v)} rows={4} />
      <LocalizedText label="Trust — title" value={hero.trustTitle} onChange={(v) => bind.set('trustTitle', v)} />
      <LocalizedText label="Trust — subtitle" value={hero.trustSub} onChange={(v) => bind.set('trustSub', v)} />
    </Panel>
  );
}
