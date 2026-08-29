import Question from '../components/Question.jsx';
import { TextInput, TextArea, NumberInput } from '../components/Inputs.jsx';
import { RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import {
  BUSINESS_TYPES,
  BUSINESS_DURATIONS,
  YES_NO,
} from '../data/options.js';

export default function Step01Business() {
  const { set } = useBind();
  const errors = useErrors();

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
      <Question
        number="Q1"
        label="What's your business called?"
        required
        error={errors['business.name']}
      >
        <TextInput
          value={name}
          onChange={(v) => set('business.name', v)}
          placeholder="e.g. Anwar Auto Services"
        />
      </Question>

      <Question
        number="Q2"
        label="Which best describes your business?"
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
            placeholder="Tell us what type of business this is"
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q3"
        label="How long have you been operating?"
        optional
      >
        <RadioGroup
          options={BUSINESS_DURATIONS}
          value={duration}
          onChange={(v) => set('business.duration', v)}
          columns={2}
        />
      </Question>

      <Question
        number="Q4"
        label="Where are you based?"
        description="City and country is enough — this helps us think about map integrations and language."
        optional
      >
        <TextInput
          value={location}
          onChange={(v) => set('business.location', v)}
          placeholder="e.g. Erbil, Kurdistan"
        />
      </Question>

      <Question
        number="Q5"
        label="Do you have multiple branches?"
        optional
      >
        <RadioGroup
          options={YES_NO}
          value={hasBranches}
          onChange={(v) => set('business.hasBranches', v)}
        />
        <ConditionalReveal show={hasBranches === 'Yes'}>
          <div>
            <label className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600 mb-2">
              How many branches?
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
        label="Tell us briefly about your business"
        description="A few sentences so we understand what you do, who you serve, and anything important about your history or personality."
        required
        error={errors['business.description']}
      >
        <TextArea
          value={description}
          onChange={(v) => set('business.description', v)}
          placeholder="Tell us what your business does, what you offer, and anything important we should know."
          rows={6}
          maxLength={2000}
        />
        <div className="mt-2 flex justify-end">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
            {description?.length || 0} / 2000
          </span>
        </div>
      </Question>
    </div>
  );
}
