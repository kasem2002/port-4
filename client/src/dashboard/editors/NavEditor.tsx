import {
  useCreateNavItemMutation,
  useDeleteNavItemMutation,
  useGetNavQuery,
  useReorderNavMutation,
  useUpdateNavItemMutation,
} from "@/services/api";
import type { NavItem } from "@/types";
import CollectionEditor from "../CollectionEditor";
import { LocalizedText, Panel, TextField } from "../fields";

export default function NavEditor() {
  const { data: items = [] } = useGetNavQuery();
  const [create] = useCreateNavItemMutation();
  const [update] = useUpdateNavItemMutation();
  const [remove] = useDeleteNavItemMutation();
  const [reorder] = useReorderNavMutation();

  return (
    <Panel
      title="Navigation"
      description="Links in the header and footer. Use #section anchors to jump within the page."
    >
      <CollectionEditor<NavItem>
        items={items}
        makeEmpty={() => ({ labelEn: "New link", labelAr: "رابط جديد", href: "#top" })}
        onCreate={(body) => create(body).unwrap()}
        onUpdate={({ id, body }) => update({ id, body }).unwrap()}
        onDelete={(id) => remove(id).unwrap()}
        onReorder={(ids) => reorder(ids).unwrap()}
        itemLabel={(item) => item.labelEn || "Untitled"}
        addLabel="Add link"
        emptyLabel="No navigation links yet."
        renderFields={(item, set) => (
          <>
            <LocalizedText
              label="Label"
              en={item.labelEn}
              ar={item.labelAr}
              onChangeEn={(value) => set("labelEn", value)}
              onChangeAr={(value) => set("labelAr", value)}
            />
            <TextField
              label="Target"
              hint="#anchor or full URL"
              value={item.href}
              onChange={(value) => set("href", value)}
            />
          </>
        )}
      />
    </Panel>
  );
}
