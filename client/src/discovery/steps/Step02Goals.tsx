import { CheckboxGroup, RadioGroup } from "../components/ChoiceGroups";
import ConditionalReveal from "../components/ConditionalReveal";
import { TextArea, TextInput } from "../components/Inputs";
import Question from "../components/Question";
import { useDT } from "../data/i18n";
import { AUDIENCES, PRIMARY_GOALS, REASONS } from "../data/options";
import { useBind, useErrors, useField } from "../useBind";

export default function Step02Goals() {
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

  const reasons = useField<string[]>("goals.reasons") ?? [];
  const reasonOther = useField<string>("goals.reasonOther");
  const primaryGoal = useField<string>("goals.primaryGoal");
  const primaryGoalOther = useField<string>("goals.primaryGoalOther");
  const targetAudience = useField<string[]>("goals.targetAudience") ?? [];
  const audienceOther = useField<string>("goals.audienceOther");
  const audienceDescription = useField<string>("goals.audienceDescription");

  return (
    <div className="space-y-2">
      <Question
        number="Q1"
        label={t("s1.q1.label")}
        description={t("s1.q1.desc")}
        required
        error={errors["goals.reasons"]}
      >
        <CheckboxGroup
          options={REASONS}
          value={reasons}
          onToggle={(v) => toggle("goals.reasons", v)}
          columns={3}
        />
        <ConditionalReveal show={reasons.includes("Other")}>
          <TextInput
            value={reasonOther}
            onChange={(v) => set("goals.reasonOther", v)}
            placeholder={t("s1.q1.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q2"
        label={t("s1.q2.label")}
        description={t("s1.q2.desc")}
        required
        error={errors["goals.primaryGoal"]}
      >
        <RadioGroup
          options={PRIMARY_GOALS}
          value={primaryGoal}
          onChange={(v) => set("goals.primaryGoal", v)}
          columns={3}
        />
        <ConditionalReveal show={primaryGoal === "Other"}>
          <TextInput
            value={primaryGoalOther}
            onChange={(v) => set("goals.primaryGoalOther", v)}
            placeholder={t("s1.q2.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q3"
        label={t("s1.q3.label")}
        description={t("s1.q3.desc")}
        required
        error={errors["goals.targetAudience"]}
      >
        <CheckboxGroup
          options={AUDIENCES}
          value={targetAudience}
          onToggle={(v) => toggle("goals.targetAudience", v)}
          columns={3}
        />
        <ConditionalReveal show={targetAudience.includes("Other")}>
          <TextInput
            value={audienceOther}
            onChange={(v) => set("goals.audienceOther", v)}
            placeholder={t("s1.q3.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q4" label={t("s1.q4.label")} description={t("s1.q4.desc")} optional>
        <TextArea
          value={audienceDescription}
          onChange={(v) => set("goals.audienceDescription", v)}
          placeholder={t("s1.q4.placeholder")}
          rows={5}
        />
      </Question>
    </div>
  );
}
