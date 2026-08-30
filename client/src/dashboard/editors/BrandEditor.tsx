import {
  useCreateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  useGetSocialQuery,
  useReorderSocialMutation,
  useUpdateSocialLinkMutation,
} from "@/services/api";
import type { SocialLink } from "@/types";
import { SOCIAL_ICONS } from "@/components/SocialIcon";
import CollectionEditor from "../CollectionEditor";
import { FieldRow, LocalizedText, Panel, TextField, inputBase } from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function BrandEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: social = [] } = useGetSocialQuery();
  const [createSocial] = useCreateSocialLinkMutation();
  const [updateSocial] = useUpdateSocialLinkMutation();
  const [deleteSocial] = useDeleteSocialLinkMutation();
  const [reorderSocial] = useReorderSocialMutation();

  return (
    <>
      <Panel
        title="Brand"
        description="Identity and contact details, used across the site and the footer."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText label="Brand name" {...bindLocalized("brandName")} />
        <LocalizedText label="Tagline" {...bindLocalized("tagline")} />
        <TextField
          label="Email"
          value={draft.email}
          onChange={(value) => setField("email", value)}
          placeholder="hello@port-4.dev"
        />
        <TextField
          label="Phone"
          value={draft.phone}
          onChange={(value) => setField("phone", value)}
          hint="shown in the footer and contact section"
        />
        <LocalizedText label="Location" {...bindLocalized("location")} />
      </Panel>

      <Panel
        title="Social links"
        description="Shown in the contact section and the footer, in this order."
      >
        <CollectionEditor<SocialLink>
          items={social}
          makeEmpty={() => ({
            icon: "globe",
            labelEn: "New link",
            labelAr: "رابط جديد",
            href: "https://example.com",
            abbr: "",
          })}
          onCreate={(body) => createSocial(body).unwrap()}
          onUpdate={({ id, body }) => updateSocial({ id, body }).unwrap()}
          onDelete={(id) => deleteSocial(id).unwrap()}
          onReorder={(ids) => reorderSocial(ids).unwrap()}
          itemLabel={(item) => item.labelEn || "Untitled link"}
          addLabel="Add social link"
          emptyLabel="No social links yet."
          renderFields={(item, set) => (
            <>
              <LocalizedText
                label="Label"
                en={item.labelEn}
                ar={item.labelAr}
                onChangeEn={(value) => set("labelEn", value)}
                onChangeAr={(value) => set("labelAr", value)}
              />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <FieldRow label="Icon">
                  <select
                    value={item.icon}
                    onChange={(e) => set("icon", e.target.value)}
                    className={inputBase}
                  >
                    {SOCIAL_ICONS.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </FieldRow>
                <TextField
                  label="Abbreviation"
                  hint="fallback when no icon matches"
                  value={item.abbr}
                  onChange={(value) => set("abbr", value)}
                />
              </div>
              <TextField
                label="URL"
                value={item.href}
                onChange={(value) => set("href", value)}
                placeholder="https://…"
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}
