import ProjectImage from "@/components/ProjectImage";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useReorderProjectsMutation,
  useUpdateProjectMutation,
} from "@/services/api";
import type { Project } from "@/types";
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
import MediaUploader from "../MediaUploader";
import SaveIndicator from "../SaveIndicator";
import { useSettingsForm } from "../useSettingsForm";

export default function ProjectsEditor() {
  const { draft, setField, bindLocalized, saveState } = useSettingsForm();

  const { data: projects = [] } = useGetProjectsQuery();
  const [create] = useCreateProjectMutation();
  const [update] = useUpdateProjectMutation();
  const [remove] = useDeleteProjectMutation();
  const [reorder] = useReorderProjectsMutation();

  return (
    <>
      <Panel
        title="Projects — header"
        description="Introduces the selected work."
        actions={<SaveIndicator state={saveState} />}
      >
        <LocalizedText
          label="Heading"
          hint='use "||" for line breaks'
          {...bindLocalized("projectsHeading")}
        />
        <Segmented
          label="Accent line"
          value={draft.projectsAccentLine ?? -1}
          onChange={(value) => setField("projectsAccentLine", value)}
          options={ACCENT_OPTIONS}
        />
        <LocalizedArea label="Blurb" rows={3} {...bindLocalized("projectsBlurb")} />
      </Panel>

      <Panel
        title="Projects"
        description="A project with no image falls back to generated artwork keyed by its slug."
      >
        <CollectionEditor<Project>
          items={projects}
          makeEmpty={() => ({
            slug: `project-${Date.now().toString(36)}`,
            indexLabel: `${String(projects.length + 1).padStart(2, "0")} / ${String(projects.length + 1).padStart(2, "0")}`,
            year: String(new Date().getFullYear()),
            nameEn: "New project",
            nameAr: "مشروع جديد",
            categoryEn: "",
            categoryAr: "",
            summaryEn: "",
            summaryAr: "",
            resultEn: "",
            resultAr: "",
            image: "",
            stack: [],
            active: true,
          })}
          onCreate={(body) => create(body).unwrap()}
          onUpdate={({ id, body }) => update({ id, body }).unwrap()}
          onDelete={(id) => remove(id).unwrap()}
          onReorder={(ids) => reorder(ids).unwrap()}
          itemLabel={(item) => item.nameEn || "Untitled project"}
          addLabel="Add project"
          emptyLabel="No projects yet."
          renderFields={(item, set) => (
            <>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <TextField
                  label="Index"
                  hint="e.g. 01 / 06"
                  value={item.indexLabel}
                  onChange={(value) => set("indexLabel", value)}
                />
                <TextField
                  label="Year"
                  value={item.year}
                  onChange={(value) => set("year", value)}
                />
                <TextField
                  label="Slug"
                  hint="keys the fallback art"
                  value={item.slug}
                  onChange={(value) => set("slug", value)}
                />
              </div>

              <LocalizedText
                label="Name"
                en={item.nameEn}
                ar={item.nameAr}
                onChangeEn={(value) => set("nameEn", value)}
                onChangeAr={(value) => set("nameAr", value)}
              />
              <LocalizedText
                label="Category"
                en={item.categoryEn}
                ar={item.categoryAr}
                onChangeEn={(value) => set("categoryEn", value)}
                onChangeAr={(value) => set("categoryAr", value)}
              />
              <LocalizedArea
                label="Summary"
                rows={3}
                en={item.summaryEn}
                ar={item.summaryAr}
                onChangeEn={(value) => set("summaryEn", value)}
                onChangeAr={(value) => set("summaryAr", value)}
              />
              <LocalizedArea
                label="Result"
                rows={2}
                en={item.resultEn}
                ar={item.resultAr}
                onChangeEn={(value) => set("resultEn", value)}
                onChangeAr={(value) => set("resultAr", value)}
              />

              <ChipListField
                label="Stack"
                value={item.stack}
                onChange={(value) => set("stack", value)}
              />

              <MediaUploader
                label="Project image"
                value={item.image}
                onChange={(value) => set("image", value)}
                previewClassName="relative grid h-20 w-32 place-items-center overflow-hidden rounded bg-paper-100"
                preview={(value) => (
                  <ProjectImage image={value} fallbackId={item.slug} alt={item.nameEn} />
                )}
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
