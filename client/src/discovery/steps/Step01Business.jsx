import Question from '../components/Question.jsx';
import { TextInput, TextArea, NumberInput } from '../components/Inputs.jsx';
import { RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { useDT } from '../data/i18n.js';
import {
  BUSINESS_TYPES,
  BUSINESS_DURATIONS,
  YES_NO,
} from '../data/options.js';

export default function Step01Business() {
  const { set } = useBind();
  const errors = useErrors();
  const t = useDT();

  const name = useField('business.name');
  const type = useField('business.type');
  const typeOther = useField('business.typeOther');
  const duration = useField('business.duration');
  const location = useField('business.location');
  const hasBranches = useField('business.hasBranches');
  const branchCount = useField('business.branchCount');
  const description = useField('business.description');

  return (
    <div className="space-y-2">
      <Question number="Q1" label={t('s0.q1.label')} required error={errors['business.name']}>
        <TextInput
          value={name}
          onChange={(v) => set('business.name', v)}
          placeholder={t('s0.q1.placeholder')}
        />
      </Question>

      <Question
        number="Q2"
        label={t('s0.q2.label')}
        required
        error={errors['business.type'] || errors['business.typeOther']}
      >
        <RadioGroup
          options={BUSINESS_TYPES}
          value={type}
          onChange={(v) => set('business.type', v)}
          columns={3}
        />
        <ConditionalReveal show={type === 'Other'}>
          <TextInput
            value={typeOther}
            onChange={(v) => set('business.typeOther', v)}
            placeholder={t('s0.q2.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q3" label={t('s0.q3.label')} optional>
        <RadioGroup
          options={BUSINESS_DURATIONS}
          value={duration}
          onChange={(v) => set('business.duration', v)}
          columns={2}
        />
      </Question>

      <Question
        number="Q4"
        label={t('s0.q4.label')}
        description={t('s0.q4.desc')}
        optional
      >
        <TextInput
          value={location}
          onChange={(v) => set('business.location', v)}
          placeholder={t('s0.q4.placeholder')}
        />
      </Question>

      <Question number="Q5" label={t('s0.q5.label')} optional>
        <RadioGroup
          options={YES_NO}
          value={hasBranches}
          onChange={(v) => set('business.hasBranches', v)}
        />
        <ConditionalReveal show={hasBranches === 'Yes'}>
          <div>
            <label className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600 mb-2">
              {t('s0.q5.count')}
            </label>
            <NumberInput
              value={branchCount}
              onChange={(v) => set('business.branchCount', v)}
              min={2}
            />
          </div>
        </ConditionalReveal>
      </Question>

      <Question
        number="Q6"
        label={t('s0.q6.label')}
        description={t('s0.q6.desc')}
        required
        error={errors['business.description']}
      >
        <TextArea
          value={description}
          onChange={(v) => set('business.description', v)}
          placeholder={t('s0.q6.placeholder')}
          rows={6}
          maxLength={2000}
        />
        <div className="mt-2 flex justify-end">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
            {t('question.characters', { n: description?.length || 0, max: 2000 })}
          </span>
        </div>
      </Question>
    </div>
  );
}
