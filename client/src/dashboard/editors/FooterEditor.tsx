import { LocalizedArea, Panel } from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function FooterEditor() {
  const { bindLocalized, saveState } = useSettingsForm();

  return (
    <Panel
      title="Footer"
      description="The short description beside the footer logo."
      actions={<SaveIndicator state={saveState} />}
    >
      <LocalizedArea label="About blurb" rows={4} {...bindLocalized("footerAboutBlurb")} />
    </Panel>
  );
}
