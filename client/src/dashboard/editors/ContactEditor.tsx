import {
  useCreateBudgetMutation,
  useCreateProjectTypeMutation,
  useDeleteBudgetMutation,
  useDeleteProjectTypeMutation,
  useGetBudgetsQuery,
  useGetProjectTypesQuery,
  useUpdateBudgetMutation,
  useUpdateProjectTypeMutation,
} from "@/services/api";
import type { BudgetRange, ProjectType } from "@/types";
import CollectionEditor from "../CollectionEditor";
import {
  ACCENT_OPTIONS,
  LocalizedArea,
  LocalizedText,
  Panel,
  Segmented,
  TextField,
} from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function ContactEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: projectTypes = [] } = useGetProjectTypesQuery();
  const [createType] = useCreateProjectTypeMutation();
  const [updateType] = useUpdateProjectTypeMutation();
  const [deleteType] = useDeleteProjectTypeMutation();

  const { data: budgets = [] } = useGetBudgetsQuery();
  const [createBudget] = useCreateBudgetMutation();
  const [updateBudget] = useUpdateBudgetMutation();
  const [deleteBudget] = useDeleteBudgetMutation();

  return (
    <>
      <Panel
        title="Contact — header"
        description="The dark closing section."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("contactHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.contactAccentLine ?? -1}
          onChange={(value) => setField("contactAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Blurb" rows={3} {...bindLocalized("contactBlurb")} />
      </Panel>

      <Panel title="Form copy" description="Labels and messages around the short contact form.">
        <LocalizedText label="Form intro" {...bindLocalized("contactFormIntro")} />
        <LocalizedText label="Encrypted badge" {...bindLocalized("contactFormEncrypted")} />
        <LocalizedText label="Submit button" {...bindLocalized("contactSubmitLabel")} />
        <LocalizedText label="Submit — sending state" {...bindLocalized("contactSubmitSending")} />
        <LocalizedArea label="Privacy note" rows={2} {...bindLocalized("contactPrivacyNote")} />
        <LocalizedArea
          label="Success message"
          rows={2}
          {...bindLocalized("contactSuccessMessage")}
        />
      </Panel>

      <Panel title="Project type chips" description="Options in the form's project-type field.">
        <CollectionEditor<ProjectType>
          items={projectTypes}
          makeEmpty={() => ({ labelEn: "New type", labelAr: "نوع جديد" })}
          onCreate={(body) => createType(body).unwrap()}
          onUpdate={({ id, body }) => updateType({ id, body }).unwrap()}
          onDelete={(id) => deleteType(id).unwrap()}
          itemLabel={(item) => item.labelEn || "Untitled"}
          addLabel="Add project type"
          emptyLabel="No project types yet."
          renderFields={(item, set) => (
            <LocalizedText
              label="Label"
              en={item.labelEn}
              ar={item.labelAr}
              onChangeEn={(value) => set("labelEn", value)}
              onChangeAr={(value) => set("labelAr", value)}
            />
          )}
        />
      </Panel>

      <Panel
        title="Budget chips"
        description="Ranges are shown as written — they aren't translated."
      >
        <CollectionEditor<BudgetRange>
          items={budgets}
          makeEmpty={() => ({ label: "$0 – $0" })}
          onCreate={(body) => createBudget(body).unwrap()}
          onUpdate={({ id, body }) => updateBudget({ id, body }).unwrap()}
          onDelete={(id) => deleteBudget(id).unwrap()}
          itemLabel={(item) => item.label || "Untitled"}
          addLabel="Add budget range"
          emptyLabel="No budget ranges yet."
          renderFields={(item, set) => (
            <TextField
              label="Range"
              value={item.label}
              onChange={(value) => set("label", value)}
            />
          )}
        />
      </Panel>
    </>
  );
}
