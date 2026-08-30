import {
  useCreateProcessStepMutation,
  useDeleteProcessStepMutation,
  useGetProcessStepsQuery,
  useReorderProcessStepsMutation,
  useUpdateProcessStepMutation,
} from "@/services/api";
import type { ProcessStep } from "@/types";
import CollectionEditor from "../CollectionEditor";
import {
  ACCENT_OPTIONS,
  LocalizedArea,
  LocalizedText,
  Panel,
  Segmented,
  TextField,
} from "../fields";
import LocalizedListField from "../LocalizedListField";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function ProcessEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: steps = [] } = useGetProcessStepsQuery();
  const [create] = useCreateProcessStepMutation();
  const [update] = useUpdateProcessStepMutation();
  const [remove] = useDeleteProcessStepMutation();
  const [reorder] = useReorderProcessStepsMutation();

  return (
    <>
      <Panel
        title="Process — header"
        description="Introduces the delivery timeline."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("processHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.processAccentLine ?? -1}
          onChange={(value) => setField("processAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Blurb" rows={3} {...bindLocalized("processBlurb")} />
      </Panel>

      <Panel title="Steps" description="Rendered as an alternating timeline on the site.">
        <CollectionEditor<ProcessStep>
          items={steps}
          makeEmpty={() => ({
            stepId: String(steps.length + 1).padStart(2, "0"),
            titleEn: "New stage",
            titleAr: "مرحلة جديدة",
            bodyEn: "",
            bodyAr: "",
            tokens: [],
          })}
          onCreate={(body) => create(body).unwrap()}
          onUpdate={({ id, body }) => update({ id, body }).unwrap()}
          onDelete={(id) => remove(id).unwrap()}
          onReorder={(ids) => reorder(ids).unwrap()}
          itemLabel={(item) => `${item.stepId} — ${item.titleEn || "Untitled"}`}
          addLabel="Add stage"
          emptyLabel="No process steps yet."
          renderFields={(item, set) => (
            <>
              <TextField
                label="Step number"
                hint="shown on the card"
                value={item.stepId}
                onChange={(value) => set("stepId", value)}
              />
              <LocalizedText
                label="Title"
                en={item.titleEn}
                ar={item.titleAr}
                onChangeEn={(value) => set("titleEn", value)}
                onChangeAr={(value) => set("titleAr", value)}
              />
              <LocalizedArea
                label="Body"
                rows={3}
                en={item.bodyEn}
                ar={item.bodyAr}
                onChangeEn={(value) => set("bodyEn", value)}
                onChangeAr={(value) => set("bodyAr", value)}
              />
              <LocalizedListField
                label="Chips"
                hint="tokens under the card"
                value={item.tokens}
                onChange={(value) => set("tokens", value)}
                addLabel="Add chip"
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}
