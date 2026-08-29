import Question from '../components/Question.jsx';
import { TextInput, TextArea } from '../components/Inputs.jsx';
import { CheckboxGroup, RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { REASONS, PRIMARY_GOALS, AUDIENCES } from '../data/options.js';

export default function Step02Goals() {
  const { set, toggle } = useBind();
  const errors = useErrors();

  const reasons = useField('goals.reasons') || [];
  const reasonOther = useField('goals.reasonOther');
  const primaryGoal = useField('goals.primaryGoal');
  const primaryGoalOther = useField('goals.primaryGoalOther');
  const targetAudience = useField('goals.targetAudience') || [];
  const audienceOther = useField('goals.audienceOther');
  const audienceDescription = useField('goals.audienceDescription');

  return (
    <div className="space-y-2">
      <Question
        number="Q1"
        label="Why do you want a website?"
        description="Pick all that apply. This shapes the sections we plan and the tone we set."
        required
        error={errors['goals.reasons']}
      >
        <CheckboxGroup
          options={REASONS}
          value={reasons}
          onToggle={(v) => toggle('goals.reasons', v)}
          columns={3}
        />
        <ConditionalReveal show={reasons.includes('Other')}>
          <TextInput
            value={reasonOther}
            onChange={(v) => set('goals.reasonOther', v)}
            placeholder="Tell us the other reason"
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q2"
        label="What is the ONE most important result?"
        description="Just one — the outcome that matters most. This becomes your website's primary call-to-action."
        required
        error={errors['goals.primaryGoal']}
      >
        <RadioGroup
          options={PRIMARY_GOALS}
          value={primaryGoal}
          onChange={(v) => set('goals.primaryGoal', v)}
          columns={3}
        />
        <ConditionalReveal show={primaryGoal === 'Other'}>
          <TextInput
            value={primaryGoalOther}
            onChange={(v) => set('goals.primaryGoalOther', v)}
            placeholder="Describe the most important result"
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q3"
        label="Who is your ideal customer?"
        description="Pick every group you serve today or want to serve tomorrow."
        required
        error={errors['goals.targetAudience']}
      >
        <CheckboxGroup
          options={AUDIENCES}
          value={targetAudience}
          onToggle={(v) => toggle('goals.targetAudience', v)}
          columns={3}
        />
        <ConditionalReveal show={targetAudience.includes('Other')}>
          <TextInput
            value={audienceOther}
            onChange={(v) => set('goals.audienceOther', v)}
            placeholder="Describe the other audience"
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q4"
        label="Paint us a picture of that customer"
        description="Age, lifestyle, where they live, what they care about — whatever will help us design for them."
        optional
      >
        <TextArea
          value={audienceDescription}
          onChange={(v) => set('goals.audienceDescription', v)}
          placeholder="e.g. Young families in Erbil looking for reliable, honest car servicing — they value clear pricing and no upselling."
          rows={5}
        />
      </Question>
    </div>
  );
}
