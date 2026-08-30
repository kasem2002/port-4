import {
  useCreateMarqueeItemMutation,
  useDeleteMarqueeItemMutation,
  useGetMarqueeQuery,
  useReorderMarqueeMutation,
  useUpdateMarqueeItemMutation,
} from "@/services/api";
import type { MarqueeItem } from "@/types";
import CollectionEditor from "../CollectionEditor";
import { LocalizedText, Panel } from "../fields";

export default function MarqueeEditor() {
  const { data: items = [] } = useGetMarqueeQuery();
  const [create] = useCreateMarqueeItemMutation();
  const [update] = useUpdateMarqueeItemMutation();
  const [remove] = useDeleteMarqueeItemMutation();
  const [reorder] = useReorderMarqueeMutation();

  return (
    <Panel
      title="Marquee"
      description="The scrolling band of capabilities under the hero. Short phrases read best."
    >
      <CollectionEditor<MarqueeItem>
        items={items}
        makeEmpty={() => ({ textEn: "New capability", textAr: "قدرة جديدة" })}
        onCreate={(body) => create(body).unwrap()}
        onUpdate={({ id, body }) => update({ id, body }).unwrap()}
        onDelete={(id) => remove(id).unwrap()}
        onReorder={(ids) => reorder(ids).unwrap()}
        itemLabel={(item) => item.textEn || "Untitled"}
        addLabel="Add phrase"
        emptyLabel="No marquee phrases yet."
        renderFields={(item, set) => (
          <LocalizedText
            label="Phrase"
            en={item.textEn}
            ar={item.textAr}
            onChangeEn={(value) => set("textEn", value)}
            onChangeAr={(value) => set("textAr", value)}
          />
        )}
      />
    </Panel>
  );
}
