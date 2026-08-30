import Question from '../components/Question.jsx';
import { TextInput, TextArea } from '../components/Inputs.jsx';
import { CheckboxGroup, RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { useDT } from '../data/i18n.js';
import { REASONS, PRIMARY_GOALS, AUDIENCES } from '../data/options.js';

export default function Step02Goals() {
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

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
        label={t('s1.q1.label')}
        description={t('s1.q1.desc')}
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
            placeholder={t('s1.q1.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q2"
        label={t('s1.q2.label')}
        description={t('s1.q2.desc')}
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
            placeholder={t('s1.q2.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q3"
        label={t('s1.q3.label')}
        description={t('s1.q3.desc')}
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
            placeholder={t('s1.q3.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q4"
        label={t('s1.q4.label')}
        description={t('s1.q4.desc')}
        optional
      >
        <TextArea
          value={audienceDescription}
          onChange={(v) => set('goals.audienceDescription', v)}
          placeholder={t('s1.q4.placeholder')}
          rows={5}
        />
      </Question>
    </div>
  );
}
