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
          Content
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          What do you already have?
        </h3>
      </div>

      <Question number="Q1" label="Do you already have website content?" optional>
        <RadioGroup
          options={CONTENT_AVAILABILITY}
          value={availability}
          onChange={(v) => set('content.availability', v)}
          columns={2}
        />
      </Question>

      <Question number="Q2" label="Do you have professional photos?" optional>
        <RadioGroup
          options={PHOTO_AVAILABILITY}
          value={photos}
          onChange={(v) => set('content.photos', v)}
        />
      </Question>

      <Question number="Q3" label="Do you have videos?" optional>
        <RadioGroup
          options={VIDEO_AVAILABILITY}
          value={videos}
          onChange={(v) => set('content.videos', v)}
        />
      </Question>

      {/* ---------- TRUST ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          Trust
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          Why customers choose you
        </h3>
      </div>

      <Question number="Q4" label="What makes your business different?" optional>
        <TextArea
          value={differentiators}
          onChange={(v) => set('trust.differentiators', v)}
          placeholder="The one or two things nobody else in your market does the way you do."
          rows={4}
        />
      </Question>

      <Question
        number="Q5"
        label="Why should customers choose you over a competitor?"
        optional
      >
        <TextArea
          value={advantage}
          onChange={(v) => set('trust.competitiveAdvantage', v)}
          placeholder="Be honest — this becomes the argument the website makes to every visitor."
          rows={4}
        />
      </Question>

      <Question number="Q6" label="What builds customer trust?" optional>
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
            placeholder="Any other trust signal we should highlight"
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q7" label="Do you have customer reviews?" optional>
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
                      Customer name
                    </label>
                    <TextInput
                      value={r.customerName}
                      onChange={(v) => dispatch(updateReview({ id: r.id, patch: { customerName: v } }))}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                      Rating
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
                    Review
                  </label>
                  <TextArea
                    value={r.text}
                    onChange={(v) => dispatch(updateReview({ id: r.id, patch: { text: v } }))}
                    placeholder="Paste or type the review here."
                    rows={3}
                  />
                </div>
              </div>
            )}
            itemLabel={(i) => `Review ${String(i + 1).padStart(2, '0')}`}
            addLabel="Add another review"
          />
        </ConditionalReveal>
      </Question>

      {/* ---------- TEAM ---------- */}
      <Question number="Q8" label="Do you want to show your team?" optional>
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
                        Name
                      </label>
                      <TextInput
                        value={m.name}
                        onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { name: v } }))}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                        Position
                      </label>
                      <TextInput
                        value={m.position}
                        onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { position: v } }))}
                        placeholder="e.g. Founder"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                      Short bio
                    </label>
                    <TextArea
                      value={m.bio}
                      onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { bio: v } }))}
                      placeholder="A sentence or two."
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 block mb-1.5">
                    Photo
                  </label>
                  <SingleUpload
                    value={m.photo}
                    onChange={(v) => dispatch(updateTeamMember({ id: m.id, patch: { photo: v } }))}
                    label="Upload photo"
                    compact
                  />
                </div>
              </div>
            )}
            itemLabel={(i) => `Member ${String(i + 1).padStart(2, '0')}`}
            addLabel="Add another team member"
          />
        </ConditionalReveal>
      </Question>

      {/* ---------- CONTACT ---------- */}
      <div className="pt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange mb-2">
          Contact
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          How can visitors reach you?
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
              Q9
            </span>
            <h3 className="mt-1.5 font-display text-[1.5rem] md:text-[1.75rem] tracking-tighter2 leading-[1.15] text-ink-950">
              Contact channels
            </h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-ink-600 max-w-sm">
              At least one of WhatsApp, phone or email is required so we can reach you.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ContactField
              label="WhatsApp"
              value={contact.whatsapp}
              onChange={(v) => set('contact.whatsapp', v)}
              error={errors['contact.whatsapp']}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label="Phone"
              value={contact.phone}
              onChange={(v) => set('contact.phone', v)}
              error={errors['contact.phone']}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label="Email"
              value={contact.email}
              onChange={(v) => set('contact.email', v)}
              error={errors['contact.email']}
              placeholder="hello@yourbusiness.com"
              type="email"
            />
            <ContactField
              label="Instagram"
              value={contact.instagram}
              onChange={(v) => set('contact.instagram', v)}
              placeholder="@handle or full URL"
            />
            <ContactField
              label="Facebook"
              value={contact.facebook}
              onChange={(v) => set('contact.facebook', v)}
              placeholder="Page URL"
            />
            <ContactField
              label="Other social"
              value={contact.otherSocial}
              onChange={(v) => set('contact.otherSocial', v)}
              placeholder="TikTok, LinkedIn, etc."
            />
            <ContactField
              label="Google Maps / Waze"
              value={contact.maps}
              onChange={(v) => set('contact.maps', v)}
              placeholder="Map link"
              wide
            />
            <ContactField
              label="Business address"
              value={contact.address}
              onChange={(v) => set('contact.address', v)}
              placeholder="Street, city, country"
              wide
            />
          </div>
        </div>
      </div>

      {/* ---------- BUSINESS HOURS ---------- */}
      <Question
        number="Q10"
        label="Weekly business hours"
        description="Skip any day you're closed. Times shown on the site match your local timezone."
        optional
      >
        <WeekSchedule />
      </Question>

      {/* ---------- ASSETS ---------- */}
      <Question
        number="Q11"
        label="Assets"
        description="Drop any files you want us to have — logos, product photos, videos, certificates. You can send more later if needed."
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
          Final Details
        </p>
        <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">
          A few last things
        </h3>
      </div>

      <Question
        number="Q12"
        label="What is the ONE action you want visitors to take?"
        description="This becomes the primary call-to-action across every page."
        required
        error={errors['final.primaryAction']}
      >
        <TextInput
          value={primaryAction}
          onChange={(v) => set('final.primaryAction', v)}
          placeholder='e.g. "Send us a WhatsApp message"'
        />
      </Question>

      <Question
        number="Q13"
        label="Three words that describe your business"
        description="These often end up shaping the hero, the tone, and the visual direction."
        optional
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <TextInput
              key={i}
              value={keywords[i] || ''}
              onChange={(v) => dispatch(updateKeyword({ index: i, value: v }))}
              placeholder={`Word ${i + 1}`}
            />
          ))}
        </div>
      </Question>

      <Question number="Q14" label="Anything you specifically want included?" optional>
        <TextArea
          value={mustInclude}
          onChange={(v) => set('final.mustInclude', v)}
          placeholder="A section, an animation, a feature — anything we should make sure to add."
          rows={4}
        />
      </Question>

      <Question number="Q15" label="Anything you absolutely DON'T want?" optional>
        <TextArea
          value={mustAvoid}
          onChange={(v) => set('final.mustAvoid', v)}
          placeholder="Colors, patterns, technologies, phrases — whatever's off the table."
          rows={4}
        />
      </Question>

      <Question number="Q16" label="Anything else we should know?" optional>
        <TextArea
          value={additionalNotes}
          onChange={(v) => set('final.additionalNotes', v)}
          placeholder="Deadlines, competitors, previous attempts, internal politics — anything at all."
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
