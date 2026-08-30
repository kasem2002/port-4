import ConditionalReveal from "../components/ConditionalReveal";
import { RadioGroup } from "../components/ChoiceGroups";
import { NumberInput, TextArea, TextInput } from "../components/Inputs";
import Question from "../components/Question";
import { useDT } from "../data/i18n";
import { BUSINESS_DURATIONS, BUSINESS_TYPES, YES_NO } from "../data/options";
import { useBind, useErrors, useField } from "../useBind";

export default function Step01Business() {
  const { set } = useBind();
  const errors = useErrors();
  const t = useDT();

  const name = useField<string>("business.name");
  const type = useField<string>("business.type");
  const typeOther = useField<string>("business.typeOther");
  const duration = useField<string>("business.duration");
  const location = useField<string>("business.location");
  const hasBranches = useField<string>("business.hasBranches");
  const branchCount = useField<number>("business.branchCount");
  const description = useField<string>("business.description");

  return (
    <div className="space-y-2">
      <Question number="Q1" label={t("s0.q1.label")} required error={errors["business.name"]}>
        <TextInput
          value={name}
          onChange={(v) => set("business.name", v)}
          placeholder={t("s0.q1.placeholder")}
        />
      </Question>

      <Question
        number="Q2"
        label={t("s0.q2.label")}
        required
        error={errors["business.type"] ?? errors["business.typeOther"]}
      >
        <RadioGroup
          options={BUSINESS_TYPES}
          value={type}
          onChange={(v) => set("business.type", v)}
          columns={3}
        />
        <ConditionalReveal show={type === "Other"}>
          <TextInput
            value={typeOther}
            onChange={(v) => set("business.typeOther", v)}
            placeholder={t("s0.q2.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q3" label={t("s0.q3.label")} optional>
        <RadioGroup
          options={BUSINESS_DURATIONS}
          value={duration}
          onChange={(v) => set("business.duration", v)}
          columns={2}
        />
      </Question>

      <Question number="Q4" label={t("s0.q4.label")} description={t("s0.q4.desc")} optional>
        <TextInput
          value={location}
          onChange={(v) => set("business.location", v)}
          placeholder={t("s0.q4.placeholder")}
        />
      </Question>

      <Question number="Q5" label={t("s0.q5.label")} optional>
        <RadioGroup
          options={YES_NO}
          value={hasBranches}
          onChange={(v) => set("business.hasBranches", v)}
        />
        <ConditionalReveal show={hasBranches === "Yes"}>
          <div>
            <label className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600">
              {t("s0.q5.count")}
            </label>
            <NumberInput
              value={branchCount}
              onChange={(v) => set("business.branchCount", v)}
              min={2}
            />
          </div>
        </ConditionalReveal>
      </Question>

      <Question
        number="Q6"
        label={t("s0.q6.label")}
        description={t("s0.q6.desc")}
        required
        error={errors["business.description"]}
      >
        <TextArea
          value={description}
          onChange={(v) => set("business.description", v)}
          placeholder={t("s0.q6.placeholder")}
          rows={6}
          maxLength={2000}
        />
        <div className="mt-2 flex justify-end">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
            {t("question.characters", { n: description?.length ?? 0, max: 2000 })}
          </span>
        </div>
      </Question>
    </div>
  );
}
