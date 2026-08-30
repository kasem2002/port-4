import {
  useCreateStatMutation,
  useDeleteStatMutation,
  useGetStatsQuery,
  useReorderStatsMutation,
  useUpdateStatMutation,
} from "@/services/api";
import type { Stat } from "@/types";
import CollectionEditor from "../CollectionEditor";
import { ACCENT_OPTIONS, LocalizedArea, LocalizedText, Panel, Segmented, TextField } from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function TrustEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: stats = [] } = useGetStatsQuery();
  const [create] = useCreateStatMutation();
  const [update] = useUpdateStatMutation();
  const [remove] = useDeleteStatMutation();
  const [reorder] = useReorderStatsMutation();

  return (
    <>
      <Panel
        title="Trust — header"
        description="Introduces the numbers strip."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("trustHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.trustAccentLine ?? -1}
          onChange={(value) => setField("trustAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Blurb" rows={3} {...bindLocalized("trustBlurb")} />
      </Panel>

      <Panel
        title="Stats"
        description="The numeric value animates on scroll — “40+”, “24h” and “2.1x” all work."
      >
        <CollectionEditor<Stat>
          items={stats}
          makeEmpty={() => ({
            value: "0",
            labelEn: "New stat",
            labelAr: "إحصائية جديدة",
            hintEn: "",
            hintAr: "",
          })}
          onCreate={(body) => create(body).unwrap()}
          onUpdate={({ id, body }) => update({ id, body }).unwrap()}
          onDelete={(id) => remove(id).unwrap()}
          onReorder={(ids) => reorder(ids).unwrap()}
          itemLabel={(item) => `${item.value} — ${item.labelEn || "Untitled"}`}
          addLabel="Add stat"
          emptyLabel="No stats yet."
          renderFields={(item, set) => (
            <>
              <TextField
                label="Value"
                hint="the number that counts up"
                value={item.value}
                onChange={(value) => set("value", value)}
              />
              <LocalizedText
                label="Label"
                en={item.labelEn}
                ar={item.labelAr}
                onChangeEn={(value) => set("labelEn", value)}
                onChangeAr={(value) => set("labelAr", value)}
              />
              <LocalizedText
                label="Hint"
                en={item.hintEn}
                ar={item.hintAr}
                onChangeEn={(value) => set("hintEn", value)}
                onChangeAr={(value) => set("hintAr", value)}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}
