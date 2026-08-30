import { useDispatch, useSelector } from 'react-redux';
import Question from '../components/Question.jsx';
import { TextInput, TextArea } from '../components/Inputs.jsx';
import { CheckboxGroup, RadioGroup } from '../components/ChoiceGroups.jsx';
import ConditionalReveal from '../components/ConditionalReveal.jsx';
import DynamicList from '../components/DynamicList.jsx';
import { SingleUpload, MultiUpload } from '../components/FileUpload.jsx';
import StarRating from '../components/StarRating.jsx';
import WeekSchedule from '../components/WeekSchedule.jsx';
import { useBind, useField, useErrors } from '../useBind.js';
import { useDT } from '../data/i18n.js';
import {
  addReview,
  removeReview,
  updateReview,
  addTeamMember,
  removeTeamMember,
  updateTeamMember,
  updateKeyword,
  addAsset,
  removeAsset,
} from '../store/discoverySlice.js';
import {
  CONTENT_AVAILABILITY,
  PHOTO_AVAILABILITY,
  VIDEO_AVAILABILITY,
  TRUST_FACTORS,
  YES_NO,
} from '../data/options.js';

export default function Step05Final() {
  const dispatch = useDispatch();
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

  const availability = useField('content.availability');
  const photos = useField('content.photos');
  const videos = useField('content.videos');

  const differentiators = useField('trust.differentiators');
  const advantage = useField('trust.competitiveAdvantage');
  const trustFactors = useField('trust.trustFactors') || [];
  const trustFactorOther = useField('trust.trustFactorOther');
  const hasReviews = useField('trust.hasReviews');
  const reviews = useSelector((s) => s.discovery.form.trust.reviews);

  const showTeam = useField('team.showTeam');
  const members = useSelector((s) => s.discovery.form.team.members);

  const contact = useSelector((s) => s.discovery.form.contact);
  const assets = useSelector((s) => s.discovery.form.assets);
  const keywords = useField('final.keywords') || ['', '', ''];
  const primaryAction = useField('final.primaryAction');
  const mustInclude = useField('final.mustInclude');
  const mustAvoid = useField('final.mustAvoid');
  const additionalNotes = useField('final.additionalNotes');

  return (
    <div className="space-y-2">
      {/* ---------- CONTENT ---------- */}
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.content')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.content.title')}
        </h3>
      </div>

      <Question number="Q1" label={t('s4.q1.label')} optional>
        <RadioGroup
          options={CONTENT_AVAILABILITY}
          value={availability}
          onChange={(v) => set('content.availability', v)}
          columns={2}
        />
      </Question>

      <Question number="Q2" label={t('s4.q2.label')} optional>
        <RadioGroup
          options={PHOTO_AVAILABILITY}
          value={photos}
          onChange={(v) => set('content.photos', v)}
        />
      </Question>

      <Question number="Q3" label={t('s4.q3.label')} optional>
        <RadioGroup
          options={VIDEO_AVAILABILITY}
          value={videos}
          onChange={(v) => set('content.videos', v)}
        />
      </Question>

      {/* ---------- TRUST ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.trust')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.trust.title')}
        </h3>
      </div>

      <Question number="Q4" label={t('s4.q4.label')} optional>
        <TextArea
          value={differentiators}
          onChange={(v) => set('trust.differentiators', v)}
          placeholder={t('s4.q4.placeholder')}
          rows={4}
        />
      </Question>

      <Question number="Q5" label={t('s4.q5.label')} optional>
        <TextArea
          value={advantage}
          onChange={(v) => set('trust.competitiveAdvantage', v)}
          placeholder={t('s4.q5.placeholder')}
          rows={4}
        />
      </Question>

      <Question number="Q6" label={t('s4.q6.label')} optional>
        <CheckboxGroup
          options={TRUST_FACTORS}
          value={trustFactors}
          onToggle={(v) => toggle('trust.trustFactors', v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={trustFactors.includes('Other')}>
          <TextInput
            value={trustFactorOther}
            onChange={(v) => set('trust.trustFactorOther', v)}
            placeholder={t('s4.q6.otherPlaceholder')}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q7" label={t('s4.q7.label')} optional>
        <RadioGroup
          options={YES_NO}
          value={hasReviews}
          onChange={(v) => set('trust.hasReviews', v)}
        />
        <ConditionalReveal show={hasReviews === 'Yes'}>
          <DynamicList
            items={reviews}
            onAdd={() => dispatch(addReview())}
            onRemove={(id) => dispatch(removeReview(id))}
            renderItem={(r) => (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                      {t('s4.q7.customerName')}
                    </label>
                    <TextInput
                      value={r.customerName}
                      onChange={(v) => dispatch(updateReview({ id: r.id, patch: { customerName: v } }))}
                      placeholder={t('s4.q7.customerNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                      {t('s4.q7.rating')}
                    </label>
                    <div className="h-[46px] flex items-center">
                      <StarRating
                        value={r.rating}
                        onChange={(v) => dispatch(updateReview({ id: r.id, patch: { rating: v } }))}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                    {t('s4.q7.review')}
                  </label>
                  <TextArea
                    value={r.text}
                    onChange={(v) => dispatch(updateReview({ id: r.id, patch: { text: v } }))}
                    placeholder={t('s4.q7.reviewPlaceholder')}
                    rows={3}
                  />
                </div>
              </div>
            )}
            itemLabel={(i) => t('s4.q7.itemLabel', { n: String(i + 1).padStart(2, '0') })}
            addLabel={t('s4.q7.add')}
          />
        </ConditionalReveal>
      </Question>

      {/* ---------- TEAM ---------- */}
      <Question number="Q8" label={t('s4.q8.label')} optional>
        <RadioGroup
          options={YES_NO}
          value={showTeam}
          onChange={(v) => set('team.showTeam', v)}
        />
        <ConditionalReveal show={showTeam === 'Yes'}>
          <DynamicList
            items={members}
            onAdd={() => dispatch(addTeamMember())}
            onRemove={(id) => dispatch(removeTeamMember(id))}
            renderItem={(m) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                        {t('s4.q8.name')}
                      </label>
                      <TextInput
                        value={m.name}
                        onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { name: v } }))}
                        placeholder={t('s4.q8.namePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                        {t('s4.q8.position')}
                      </label>
                      <TextInput
                        value={m.position}
                        onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { position: v } }))}
                        placeholder={t('s4.q8.positionPlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                      {t('s4.q8.bio')}
                    </label>
                    <TextArea
                      value={m.bio}
                      onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { bio: v } }))}
                      placeholder={t('s4.q8.bioPlaceholder')}
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                    {t('s4.q8.photo')}
                  </label>
                  <SingleUpload
                    value={m.photo}
                    onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { photo: v } }))}
                    compact
                  />
                </div>
              </div>
            )}
            itemLabel={(i) => t('s4.q8.itemLabel', { n: String(i + 1).padStart(2, '0') })}
            addLabel={t('s4.q8.add')}
          />
        </ConditionalReveal>
      </Question>

      {/* ---------- CONTACT ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.contact')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.contact.title')}
        </h3>
      </div>

      {errors['contact.__any'] && (
        <div className="mx-0 md:mx-8 mt-2 rounded-xl border border-brand-orangeDeep/30 bg-brand-orange/8 px-4 py-3 text-[13.5px] text-brand-orangeDeep">
          {errors['contact.__any']}
        </div>
      )}

      <div className="border-b border-ink-900/8 py-8">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
              {t('s4.q9.number')}
            </span>
            <h3 className="mt-1.5 font-display text-[1.5rem] md:text-[1.75rem] tracking-tighter2 leading-[1.15] text-ink-950">
              {t('s4.q9.label')}
            </h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-ink-600 max-w-sm">
              {t('s4.q9.desc')}
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ContactField
              label={t('s4.q9.whatsapp')}
              value={contact.whatsapp}
              onChange={(v) => set('contact.whatsapp', v)}
              error={errors['contact.whatsapp']}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label={t('s4.q9.phone')}
              value={contact.phone}
              onChange={(v) => set('contact.phone', v)}
              error={errors['contact.phone']}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label={t('s4.q9.email')}
              value={contact.email}
              onChange={(v) => set('contact.email', v)}
              error={errors['contact.email']}
              placeholder={t('s4.q9.emailPh')}
              type="email"
            />
            <ContactField
              label={t('s4.q9.instagram')}
              value={contact.instagram}
              onChange={(v) => set('contact.instagram', v)}
              placeholder={t('s4.q9.instagramPh')}
            />
            <ContactField
              label={t('s4.q9.facebook')}
              value={contact.facebook}
              onChange={(v) => set('contact.facebook', v)}
              placeholder={t('s4.q9.facebookPh')}
            />
            <ContactField
              label={t('s4.q9.other')}
              value={contact.otherSocial}
              onChange={(v) => set('contact.otherSocial', v)}
              placeholder={t('s4.q9.otherPh')}
            />
            <ContactField
              label={t('s4.q9.maps')}
              value={contact.maps}
              onChange={(v) => set('contact.maps', v)}
              placeholder={t('s4.q9.mapsPh')}
              wide
            />
            <ContactField
              label={t('s4.q9.address')}
              value={contact.address}
              onChange={(v) => set('contact.address', v)}
              placeholder={t('s4.q9.addressPh')}
              wide
            />
          </div>
        </div>
      </div>

      <Question
        number="Q10"
        label={t('s4.q10.label')}
        description={t('s4.q10.desc')}
        optional
      >
        <WeekSchedule />
      </Question>

      <Question
        number="Q11"
        label={t('s4.q11.label')}
        description={t('s4.q11.desc')}
        optional
      >
        <MultiUpload
          files={assets}
          onAdd={(f) => dispatch(addAsset(f))}
          onRemove={(id) => dispatch(removeAsset(id))}
        />
      </Question>

      {/* ---------- FINAL ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          {t('group.final')}
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          {t('group.final.title')}
        </h3>
      </div>

      <Question
        number="Q12"
        label={t('s4.q12.label')}
        description={t('s4.q12.desc')}
        required
        error={errors['final.primaryAction']}
      >
        <TextInput
          value={primaryAction}
          onChange={(v) => set('final.primaryAction', v)}
          placeholder={t('s4.q12.placeholder')}
        />
      </Question>

      <Question
        number="Q13"
        label={t('s4.q13.label')}
        description={t('s4.q13.desc')}
        optional
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <TextInput
              key={i}
              value={keywords[i] || ''}
              onChange={(v) => dispatch(updateKeyword({ index: i, value: v }))}
              placeholder={t('s4.q13.word', { n: i + 1 })}
            />
          ))}
        </div>
      </Question>

      <Question number="Q14" label={t('s4.q14.label')} optional>
        <TextArea
          value={mustInclude}
          onChange={(v) => set('final.mustInclude', v)}
          placeholder={t('s4.q14.placeholder')}
          rows={4}
        />
      </Question>

      <Question number="Q15" label={t('s4.q15.label')} optional>
        <TextArea
          value={mustAvoid}
          onChange={(v) => set('final.mustAvoid', v)}
          placeholder={t('s4.q15.placeholder')}
          rows={4}
        />
      </Question>

      <Question number="Q16" label={t('s4.q16.label')} optional>
        <TextArea
          value={additionalNotes}
          onChange={(v) => set('final.additionalNotes', v)}
          placeholder={t('s4.q16.placeholder')}
          rows={4}
        />
      </Question>
    </div>
  );
}

function ContactField({ label, value, onChange, placeholder, error, type = 'text', wide = false }) {
  return (
    <label className={`block ${wide ? 'md:col-span-2' : ''}`}>
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-1.5">
        {label}
      </span>
      <TextInput value={value} onChange={onChange} placeholder={placeholder} type={type} />
      {error && (
        <span className="mt-1.5 block text-[12.5px] text-brand-orangeDeep">{error}</span>
      )}
    </label>
  );
}
