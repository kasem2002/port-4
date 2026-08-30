import Question from '../components/Question.jsx';
import { TextInput } from '../components/Inputs.jsx';
import { CheckboxGroup, RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import { SingleUpload } from '../components/FileUpload.jsx';
import ColorList from '../components/ColorList.jsx';
import LevelSelector from '../components/LevelSelector.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { useDT } from '../data/i18n.js';
import {
  SECTIONS,
  FEATURES,
  LANGUAGES,
  YES_NO,
  YES_NO_UNSURE,
  VISUAL_STYLES,
  FEELINGS,
  ANIMATION_LEVELS,
  THREE_D_LEVELS,
  INTERACTIONS,
  AVOID,
} from '../data/options.js';
import { useDispatch, useSelector } from 'react-redux';
import { addReference, removeReference, updateReference } from '../store/discoverySlice.js';

export default function Step04Design() {
  const dispatch = useDispatch();
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

  const sections = useField('website.sections') || [];
  const sectionOther = useField('website.sectionOther');
  const features = useField('website.features') || [];
  const featureOther = useField('website.featureOther');
  const languages = useField('website.languages') || [];
  const languageOther = useField('website.languageOther');
  const rtl = useField('website.rtl');

  const hasLogo = useField('brand.hasLogo');
  const logo = useField('brand.logo');
  const hasColors = useField('brand.hasColors');
  const colors = useField('brand.colors') || ['#D85A30'];
  const visualStyle = useField('brand.visualStyle') || [];
  const desiredFeeling = useField('brand.desiredFeeling') || [];
  const feelingOther = useField('brand.feelingOther');

  const animationLevel = useField('design.animationLevel');
  const threeDLevel = useField('design.threeDLevel');
  const interactions = useField('design.interactions') || [];
  const interactionOther = useField('design.interactionOther');
  const avoid = useField('design.avoid') || [];
  const avoidOther = useField('design.avoidOther');
  const references = useSelector((s) => s.discovery.form.design.references);

  return (
    <div className="space-y-2">
      {/* ---------- SECTIONS ---------- */}
      <Question number="Q1" label={t('s3.q1.label')} description={t('s3.q1.desc')}>
        <CheckboxGroup
          options={SECTIONS}
          value={sections}
          onToggle={(v) => toggle('website.sections', v)}
          columns={3}
        />
        <ConditionalReveal show={sections.includes('Other')}>
          <TextInput
            value={sectionOther}
            onChange={(v) => set('website.sectionOther', v)}
            placeholder={t('s3.q1.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q2" label={t('s3.q2.label')} description={t('s3.q2.desc')}>
        <CheckboxGroup
          options={FEATURES}
          value={features}
          onToggle={(v) => toggle('website.features', v)}
          columns={3}
        />
        <ConditionalReveal show={features.includes('Other')}>
          <TextInput
            value={featureOther}
            onChange={(v) => set('website.featureOther', v)}
            placeholder={t('s3.q2.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q3" label={t('s3.q3.label')} required error={errors['website.languages']}>
        <CheckboxGroup
          options={LANGUAGES}
          value={languages}
          onToggle={(v) => toggle('website.languages', v)}
        />
        <ConditionalReveal show={languages.includes('Other')}>
          <TextInput
            value={languageOther}
            onChange={(v) => set('website.languageOther', v)}
            placeholder={t('s3.q3.otherPlaceholder')}
          />
        </ConditionalReveal>
        <ConditionalReveal show={languages.includes('Arabic')}>
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-600 mb-2">
              {t('s3.q3.rtl')}
            </p>
            <RadioGroup
              options={YES_NO}
              value={rtl}
              onChange={(v) => set('website.rtl', v)}
            />
            {errors['website.rtl'] && (
              <p className="mt-2 text-[13px] text-brand-orangeDeep">{errors['website.rtl']}</p>
            )}
          </div>
        </ConditionalReveal>
      </Question>

      {/* ---------- BRAND ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.brand')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.brand.title')}
        </h3>
      </div>

      <Question number="Q4" label={t('s3.q4.label')} optional>
        <RadioGroup
          options={YES_NO}
          value={hasLogo}
          onChange={(v) => set('brand.hasLogo', v)}
        />
        <ConditionalReveal show={hasLogo === 'Yes'}>
          <SingleUpload
            value={logo}
            onChange={(v) => set('brand.logo', v)}
            label={t('s3.q4.upload')}
            accept="image/*,.svg"
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q5" label={t('s3.q5.label')} optional>
        <RadioGroup
          options={YES_NO_UNSURE}
          value={hasColors}
          onChange={(v) => set('brand.hasColors', v)}
        />
        <ConditionalReveal show={hasColors === 'Yes'}>
          <ColorList colors={colors} onChange={(v) => set('brand.colors', v)} />
        </ConditionalReveal>
      </Question>

      <Question number="Q6" label={t('s3.q6.label')} description={t('s3.q6.desc')} optional>
        <CheckboxGroup
          options={VISUAL_STYLES}
          value={visualStyle}
          onToggle={(v) => toggle('brand.visualStyle', v)}
          max={5}
          columns={3}
          dense
        />
      </Question>

      <Question number="Q7" label={t('s3.q7.label')} optional>
        <CheckboxGroup
          options={FEELINGS}
          value={desiredFeeling}
          onToggle={(v) => toggle('brand.desiredFeeling', v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={desiredFeeling.includes('Other')}>
          <TextInput
            value={feelingOther}
            onChange={(v) => set('brand.feelingOther', v)}
            placeholder={t('s3.q7.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      {/* ---------- MOTION & 3D ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.motion')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.motion.title')}
        </h3>
      </div>

      <Question
        number="Q8"
        label={t('s3.q8.label')}
        description={t('s3.q8.desc')}
        optional
      >
        <LevelSelector
          levels={ANIMATION_LEVELS}
          value={animationLevel}
          onChange={(v) => set('design.animationLevel', v)}
        />
      </Question>

      <Question number="Q9" label={t('s3.q9.label')} optional>
        <RadioGroup
          options={THREE_D_LEVELS}
          value={threeDLevel}
          onChange={(v) => set('design.threeDLevel', v)}
          columns={2}
        />
      </Question>

      <Question number="Q10" label={t('s3.q10.label')} optional>
        <CheckboxGroup
          options={INTERACTIONS}
          value={interactions}
          onToggle={(v) => toggle('design.interactions', v)}
          columns={3}
        />
        <ConditionalReveal show={interactions.includes('Other')}>
          <TextInput
            value={interactionOther}
            onChange={(v) => set('design.interactionOther', v)}
            placeholder={t('s3.q10.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q11"
        label={t('s3.q11.label')}
        description={t('s3.q11.desc')}
        optional
      >
        <CheckboxGroup
          options={AVOID}
          value={avoid}
          onToggle={(v) => toggle('design.avoid', v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={avoid.includes('Other')}>
          <TextInput
            value={avoidOther}
            onChange={(v) => set('design.avoidOther', v)}
            placeholder={t('s3.q11.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question
        number="Q12"
        label={t('s3.q12.label')}
        description={t('s3.q12.desc')}
        optional
        error={references.map((_, i) => errors[`design.references.${i}`]).find(Boolean)}
      >
        <div className="space-y-2.5">
          {references.map((ref, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                value={ref}
                onChange={(v) => dispatch(updateReference({ index: i, value: v }))}
                placeholder={t('s3.q12.placeholder')}
              />
              {references.length > 1 && (
                <button
                  type="button"
                  onClick={() => dispatch(removeReference(i))}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-ink-900/10 text-ink-500 hover:border-brand-orangeDeep hover:text-brand-orangeDeep transition-colors shrink-0"
                  aria-label="Remove reference"
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
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-3.5 py-2 text-[12.5px] font-medium text-ink-900 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          <span className="text-[14px]">+</span> {t('s3.q12.add')}
        </button>
      </Question>
    </div>
  );
}
