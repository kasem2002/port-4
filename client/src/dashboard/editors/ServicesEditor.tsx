import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useReorderServicesMutation,
  useUpdateServiceMutation,
} from "@/services/api";
import type { Service } from "@/types";
import CollectionEditor from "../CollectionEditor";
import {
  ACCENT_OPTIONS,
  ChipListField,
  LocalizedArea,
  LocalizedText,
  Panel,
  Segmented,
  TextField,
} from "../fields";
import LocalizedListField from "../LocalizedListField";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

/** URL-safe slug used to key a service's generated artwork. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

export default function ServicesEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: services = [] } = useGetServicesQuery();
  const [create] = useCreateServiceMutation();
  const [update] = useUpdateServiceMutation();
  const [remove] = useDeleteServiceMutation();
  const [reorder] = useReorderServicesMutation();

  return (
    <>
      <Panel
        title="Services — header"
        description="Introduces the services list."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("servicesHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.servicesAccentLine ?? -1}
          onChange={(value) => setField("servicesAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
      </Panel>

      <Panel
        title="Services"
        description="Hovering a row on the site reveals its detail panel. Inactive services stay in the dashboard but disappear from the site."
      >
        <CollectionEditor<Service>
          items={services}
          makeEmpty={() => ({
            slug: `service-${Date.now().toString(36)}`,
            tag: String(services.length + 1).padStart(2, "0"),
            titleEn: "New service",
            titleAr: "خدمة جديدة",
            descriptionEn: "",
            descriptionAr: "",
            outcomes: [],
            stack: [],
            active: true,
          })}
          onCreate={(body) => create(body).unwrap()}
          onUpdate={({ id, body }) => update({ id, body }).unwrap()}
          onDelete={(id) => remove(id).unwrap()}
          onReorder={(ids) => reorder(ids).unwrap()}
          itemLabel={(item) => `${item.tag} — ${item.titleEn || "Untitled"}`}
          addLabel="Add service"
          emptyLabel="No services yet."
          renderFields={(item, set) => (
            <>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <TextField
                  label="Tag"
                  hint="the small number"
                  value={item.tag}
                  onChange={(value) => set("tag", value)}
                />
                <TextField
                  label="Slug"
                  hint="lowercase, hyphens"
                  value={item.slug}
                  onChange={(value) => set("slug", slugify(value))}
                />
              </div>

              <LocalizedText
                label="Title"
                en={item.titleEn}
                ar={item.titleAr}
                onChangeEn={(value) => set("titleEn", value)}
                onChangeAr={(value) => set("titleAr", value)}
              />
              <LocalizedArea
                label="Description"
                rows={3}
                en={item.descriptionEn}
                ar={item.descriptionAr}
                onChangeEn={(value) => set("descriptionEn", value)}
                onChangeAr={(value) => set("descriptionAr", value)}
              />

              <LocalizedListField
                label="What we deliver"
                hint="bullets in the detail panel"
                value={item.outcomes}
                onChange={(value) => set("outcomes", value)}
                addLabel="Add outcome"
              />
              <ChipListField
                label="Stack"
                value={item.stack}
                onChange={(value) => set("stack", value)}
              />

              <label className="flex items-center gap-2 text-[13px] text-ink-700">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) => set("active", e.target.checked)}
                  className="h-4 w-4 accent-brand-orange"
                />
                Show on the public site
              </label>
            </>
          )}
        />
      </Panel>
    </>
  );
}
