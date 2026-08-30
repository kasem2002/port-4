import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { FileRef } from "@/types";
import { CheckboxGroup, RadioGroup } from "../components/ChoiceGroups";
import ColorList from "../components/ColorList";
import ConditionalReveal from "../components/ConditionalReveal";
import { SingleUpload } from "../components/FileUpload";
import { TextInput } from "../components/Inputs";
import LevelSelector from "../components/LevelSelector";
import Question from "../components/Question";
import { useDT } from "../data/i18n";
import {
  ANIMATION_LEVELS,
  AVOID,
  FEATURES,
  FEELINGS,
  INTERACTIONS,
  LANGUAGES,
  SECTIONS,
  THREE_D_LEVELS,
  VISUAL_STYLES,
  YES_NO,
  YES_NO_UNSURE,
} from "../data/options";
import {
  addReference,
  removeReference,
  setLogo,
  updateReference,
} from "../store/discoverySlice";
import { useBind, useErrors, useField } from "../useBind";

export default function Step04Design() {
  const dispatch = useAppDispatch();
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

  const sections = useField<string[]>("website.sections") ?? [];
  const sectionOther = useField<string>("website.sectionOther");
  const features = useField<string[]>("website.features") ?? [];
  const featureOther = useField<string>("website.featureOther");
  const languages = useField<string[]>("website.languages") ?? [];
  const languageOther = useField<string>("website.languageOther");
  const rtl = useField<string>("website.rtl");

  const hasLogo = useField<string>("brand.hasLogo");
  const logo = useField<FileRef | null>("brand.logo");
  const hasColors = useField<string>("brand.hasColors");
  const colors = useField<string[]>("brand.colors") ?? ["#D85A30"];
  const visualStyle = useField<string[]>("brand.visualStyle") ?? [];
  const desiredFeeling = useField<string[]>("brand.desiredFeeling") ?? [];
  const feelingOther = useField<string>("brand.feelingOther");

  const animationLevel = useField<number>("design.animationLevel") ?? 3;
  const threeDLevel = useField<string>("design.threeDLevel");
  const interactions = useField<string[]>("design.interactions") ?? [];
  const interactionOther = useField<string>("design.interactionOther");
  const avoid = useField<string[]>("design.avoid") ?? [];
  const avoidOther = useField<string>("design.avoidOther");
  const references = useAppSelector((s) => s.discovery.form.design.references);

  const referenceError = references
    .map((_, i) => errors[`design.references.${i}`])
    .find(Boolean);

  return (
    <div className="space-y-2">
      {/* ── Sections & features ─────────────────────────────────────────── */}
      <Question number="Q1" label={t("s3.q1.label")} description={t("s3.q1.desc")}>
        <CheckboxGroup
          options={SECTIONS}
          value={sections}
          onToggle={(v) => toggle("website.sections", v)}
          columns={3}
        />
        <ConditionalReveal show={sections.includes("Other")}>
          <TextInput
            value={sectionOther}
            onChange={(v) => set("website.sectionOther", v)}
            placeholder={t("s3.q1.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q2" label={t("s3.q2.label")} description={t("s3.q2.desc")}>
        <CheckboxGroup
          options={FEATURES}
          value={features}
          onToggle={(v) => toggle("website.features", v)}
          columns={3}
        />
        <ConditionalReveal show={features.includes("Other")}>
          <TextInput
            value={featureOther}
            onChange={(v) => set("website.featureOther", v)}
            placeholder={t("s3.q2.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q3" label={t("s3.q3.label")} required error={errors["website.languages"]}>
        <CheckboxGroup
          options={LANGUAGES}
          value={languages}
          onToggle={(v) => toggle("website.languages", v)}
        />
        <ConditionalReveal show={languages.includes("Other")}>
          <TextInput
            value={languageOther}
            onChange={(v) => set("website.languageOther", v)}
            placeholder={t("s3.q3.otherPlaceholder")}
          />
        </ConditionalReveal>
        <ConditionalReveal show={languages.includes("Arabic")}>
          <div>
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">
              {t("s3.q3.rtl")}
            </p>
            <RadioGroup options={YES_NO} value={rtl} onChange={(v) => set("website.rtl", v)} />
            {errors["website.rtl"] && (
              <p className="mt-2 text-[13px] text-brand-orangeDeep">{errors["website.rtl"]}</p>
            )}
          </div>
        </ConditionalReveal>
      </Question>

      {/* ── Brand ───────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.brand")} title={t("group.brand.title")} />

      <Question number="Q4" label={t("s3.q4.label")} optional>
        <RadioGroup options={YES_NO} value={hasLogo} onChange={(v) => set("brand.hasLogo", v)} />
        <ConditionalReveal show={hasLogo === "Yes"}>
          <SingleUpload
            value={logo}
            onChange={(file) => dispatch(setLogo(file))}
            label={t("s3.q4.upload")}
            accept="image/*,.svg"
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q5" label={t("s3.q5.label")} optional>
        <RadioGroup
          options={YES_NO_UNSURE}
          value={hasColors}
          onChange={(v) => set("brand.hasColors", v)}
        />
        <ConditionalReveal show={hasColors === "Yes"}>
          <ColorList colors={colors} onChange={(next) => set("brand.colors", next)} />
        </ConditionalReveal>
      </Question>

      <Question number="Q6" label={t("s3.q6.label")} description={t("s3.q6.desc")} optional>
        <CheckboxGroup
          options={VISUAL_STYLES}
          value={visualStyle}
          onToggle={(v) => toggle("brand.visualStyle", v)}
          max={5}
          columns={3}
          dense
        />
      </Question>

      <Question number="Q7" label={t("s3.q7.label")} optional>
        <CheckboxGroup
          options={FEELINGS}
          value={desiredFeeling}
          onToggle={(v) => toggle("brand.desiredFeeling", v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={desiredFeeling.includes("Other")}>
          <TextInput
            value={feelingOther}
            onChange={(v) => set("brand.feelingOther", v)}
            placeholder={t("s3.q7.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      {/* ── Motion ──────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.motion")} title={t("group.motion.title")} />

      <Question number="Q8" label={t("s3.q8.label")} description={t("s3.q8.desc")} optional>
        <LevelSelector
          levels={ANIMATION_LEVELS}
          value={animationLevel}
          onChange={(level) => set("design.animationLevel", level)}
        />
      </Question>

      <Question number="Q9" label={t("s3.q9.label")} optional>
        <RadioGroup
          options={THREE_D_LEVELS}
          value={threeDLevel}
          onChange={(v) => set("design.threeDLevel", v)}
          columns={2}
        />
      </Question>

      <Question number="Q10" label={t("s3.q10.label")} optional>
        <CheckboxGroup
          options={INTERACTIONS}
          value={interactions}
          onToggle={(v) => toggle("design.interactions", v)}
          columns={3}
        />
        <ConditionalReveal show={interactions.includes("Other")}>
          <TextInput
            value={interactionOther}
            onChange={(v) => set("design.interactionOther", v)}
            placeholder={t("s3.q10.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q11" label={t("s3.q11.label")} description={t("s3.q11.desc")} optional>
        <CheckboxGroup
          options={AVOID}
          value={avoid}
          onToggle={(v) => toggle("design.avoid", v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={avoid.includes("Other")}>
          <TextInput
            value={avoidOther}
            onChange={(v) => set("design.avoidOther", v)}
            placeholder={t("s3.q11.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q12"
        label={t("s3.q12.label")}
        description={t("s3.q12.desc")}
        optional
        error={referenceError}
      >
        <div className="space-y-2.5">
          {references.map((reference, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextInput
                value={reference}
                onChange={(value) => dispatch(updateReference({ index, value }))}
                placeholder={t("s3.q12.placeholder")}
              />
              {references.length > 1 && (
                <button
                  type="button"
                  onClick={() => dispatch(removeReference(index))}
                  aria-label={t("list.remove")}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-900/10 text-ink-500 transition-colors hover:border-brand-orangeDeep hover:text-brand-orangeDeep"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => dispatch(addReference())}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-3.5 py-2 text-[12.5px] font-medium text-ink-900 transition-colors hover:border-brand-orange hover:text-brand-orange"
        >
          <span className="text-[14px]">+</span> {t("s3.q12.add")}
        </button>
      </Question>
    </div>
  );
}

/** Section break inside a step — an eyebrow above a display heading. */
function GroupHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="pt-8">
      <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange">
        {eyebrow}
      </p>
      <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">{title}</h3>
    </div>
  );
}
