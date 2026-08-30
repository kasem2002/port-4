import { ACCENT_OPTIONS, LocalizedArea, LocalizedText, Panel, Segmented } from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function HeroEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  return (
    <>
      <Panel
        title="Hero"
        description="The first thing a visitor reads. Use “||” in the headline to break it across lines."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Headline"
          hint='use "||" for line breaks'
          {...bindLocalized("heroHeadline")}
        />
        <Segmented
          label="Accent line"
          hint="which line is italic orange"
          value={draft.heroAccentLine ?? -1}
          onChange={(value) => setField("heroAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Subcopy" rows={4} {...bindLocalized("heroSubcopy")} />
      </Panel>

      <Panel title="Trust line" description="The small proof line beneath the hero buttons.">
        <LocalizedText label="Trust title" {...bindLocalized("heroTrustTitle")} />
        <LocalizedText label="Trust subtitle" {...bindLocalized("heroTrustSub")} />
      </Panel>
    </>
  );
}
