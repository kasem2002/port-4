import {
  useCreateAboutBulletMutation,
  useCreateTeamRoleMutation,
  useDeleteAboutBulletMutation,
  useDeleteTeamRoleMutation,
  useGetAboutBulletsQuery,
  useGetTeamRolesQuery,
  useReorderAboutBulletsMutation,
  useReorderTeamRolesMutation,
  useUpdateAboutBulletMutation,
  useUpdateTeamRoleMutation,
} from "@/services/api";
import type { AboutBullet, TeamRole } from "@/types";
import CollectionEditor from "../CollectionEditor";
import {
  ACCENT_OPTIONS,
  LocalizedArea,
  LocalizedText,
  NumberField,
  Panel,
  Segmented,
} from "../fields";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function AboutEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: bullets = [] } = useGetAboutBulletsQuery();
  const [createBullet] = useCreateAboutBulletMutation();
  const [updateBullet] = useUpdateAboutBulletMutation();
  const [deleteBullet] = useDeleteAboutBulletMutation();
  const [reorderBullets] = useReorderAboutBulletsMutation();

  const { data: roles = [] } = useGetTeamRolesQuery();
  const [createRole] = useCreateTeamRoleMutation();
  const [updateRole] = useUpdateTeamRoleMutation();
  const [deleteRole] = useDeleteTeamRoleMutation();
  const [reorderRoles] = useReorderTeamRolesMutation();

  return (
    <>
      <Panel
        title="About — header"
        description="The dark section introducing the team."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("aboutHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.aboutAccentLine ?? -1}
          onChange={(value) => setField("aboutAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Body — first paragraph" rows={4} {...bindLocalized("aboutBody")} />
        <LocalizedArea
          label="Body — second paragraph"
          rows={3}
          {...bindLocalized("aboutBodyTwo")}
        />
      </Panel>

      <Panel title="Bullets" description="The checklist beside the About copy.">
        <CollectionEditor<AboutBullet>
          items={bullets}
          makeEmpty={() => ({ textEn: "New point", textAr: "نقطة جديدة" })}
          onCreate={(body) => createBullet(body).unwrap()}
          onUpdate={({ id, body }) => updateBullet({ id, body }).unwrap()}
          onDelete={(id) => deleteBullet(id).unwrap()}
          onReorder={(ids) => reorderBullets(ids).unwrap()}
          itemLabel={(item) => item.textEn || "Untitled"}
          addLabel="Add bullet"
          emptyLabel="No bullets yet."
          renderFields={(item, set) => (
            <LocalizedText
              label="Text"
              en={item.textEn}
              ar={item.textAr}
              onChangeEn={(value) => set("textEn", value)}
              onChangeAr={(value) => set("textAr", value)}
            />
          )}
        />
      </Panel>

      <Panel
        title="Team topology"
        description="The disciplines diagram and the headcount cards beneath it."
      >
        <LocalizedText label="Topology title" {...bindLocalized("aboutTopologyTitle")} />
        <LocalizedText label="Topology subtitle" {...bindLocalized("aboutTopologySub")} />
        <LocalizedText label="Core label" {...bindLocalized("aboutCoreLabel")} />

        <CollectionEditor<TeamRole>
          items={roles}
          makeEmpty={() => ({
            roleEn: "New discipline",
            roleAr: "تخصص جديد",
            count: 1,
            noteEn: "",
            noteAr: "",
          })}
          onCreate={(body) => createRole(body).unwrap()}
          onUpdate={({ id, body }) => updateRole({ id, body }).unwrap()}
          onDelete={(id) => deleteRole(id).unwrap()}
          onReorder={(ids) => reorderRoles(ids).unwrap()}
          itemLabel={(item) => `${item.roleEn || "Untitled"} ×${item.count}`}
          addLabel="Add discipline"
          emptyLabel="No disciplines yet."
          renderFields={(item, set) => (
            <>
              <LocalizedText
                label="Discipline"
                en={item.roleEn}
                ar={item.roleAr}
                onChangeEn={(value) => set("roleEn", value)}
                onChangeAr={(value) => set("roleAr", value)}
              />
              <NumberField
                label="Headcount"
                value={item.count}
                onChange={(value) => set("count", value)}
                min={0}
              />
              <LocalizedText
                label="Note"
                en={item.noteEn}
                ar={item.noteAr}
                onChangeEn={(value) => set("noteEn", value)}
                onChangeAr={(value) => set("noteAr", value)}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}
