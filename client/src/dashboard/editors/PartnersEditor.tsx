import PartnerLogo from "@/components/PartnerLogo";
import {
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useGetPartnersQuery,
  useReorderPartnersMutation,
  useUpdatePartnerMutation,
} from "@/services/api";
import type { Partner } from "@/types";
import CollectionEditor from "../CollectionEditor";
import { ACCENT_OPTIONS, LocalizedText, Panel, Segmented } from "../fields";
import MediaUploader from "../MediaUploader";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function PartnersEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: partners = [] } = useGetPartnersQuery();
  const [create] = useCreatePartnerMutation();
  const [update] = useUpdatePartnerMutation();
  const [remove] = useDeletePartnerMutation();
  const [reorder] = useReorderPartnersMutation();

  return (
    <>
      <Panel
        title="Partners — header"
        description="Introduces the logo grid."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("partnersHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.partnersAccentLine ?? -1}
          onChange={(value) => setField("partnersAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
      </Panel>

      <Panel
        title="Partners"
        description="A partner with no logo renders as a styled wordmark, so the grid stays even."
      >
        <CollectionEditor<Partner>
          items={partners}
          makeEmpty={() => ({ nameEn: "New partner", nameAr: "شريك جديد", logo: "" })}
          onCreate={(body) => create(body).unwrap()}
          onUpdate={({ id, body }) => update({ id, body }).unwrap()}
          onDelete={(id) => remove(id).unwrap()}
          onReorder={(ids) => reorder(ids).unwrap()}
          itemLabel={(item) => item.nameEn || "Untitled partner"}
          addLabel="Add partner"
          emptyLabel="No partners yet."
          renderFields={(item, set) => (
            <>
              <LocalizedText
                label="Name"
                en={item.nameEn}
                ar={item.nameAr}
                onChangeEn={(value) => set("nameEn", value)}
                onChangeAr={(value) => set("nameAr", value)}
              />
              <MediaUploader
                label="Logo"
                value={item.logo}
                onChange={(value) => set("logo", value)}
                preview={(value) => <PartnerLogo logo={value} name={item.nameEn} />}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}
