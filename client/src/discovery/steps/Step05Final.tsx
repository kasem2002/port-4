import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { CheckboxGroup, RadioGroup } from "../components/ChoiceGroups";
import ConditionalReveal from "../components/ConditionalReveal";
import DynamicList from "../components/DynamicList";
import { MultiUpload, SingleUpload } from "../components/FileUpload";
import { TextArea, TextInput } from "../components/Inputs";
import Question from "../components/Question";
import StarRating from "../components/StarRating";
import WeekSchedule from "../components/WeekSchedule";
import { useDT } from "../data/i18n";
import {
  CONTENT_AVAILABILITY,
  PHOTO_AVAILABILITY,
  TRUST_FACTORS,
  VIDEO_AVAILABILITY,
  YES_NO,
} from "../data/options";
import {
  addAsset,
  addReview,
  addTeamMember,
  removeAsset,
  removeReview,
  removeTeamMember,
  updateKeyword,
  updateReview,
  updateTeamMember,
} from "../store/discoverySlice";
import { useBind, useErrors, useField } from "../useBind";

export default function Step05Final() {
  const dispatch = useAppDispatch();
  const { set, toggle } = useBind();
  const errors = useErrors();
  const t = useDT();

  const availability = useField<string>("content.availability");
  const photos = useField<string>("content.photos");
  const videos = useField<string>("content.videos");

  const differentiators = useField<string>("trust.differentiators");
  const advantage = useField<string>("trust.competitiveAdvantage");
  const trustFactors = useField<string[]>("trust.trustFactors") ?? [];
  const trustFactorOther = useField<string>("trust.trustFactorOther");
  const hasReviews = useField<string>("trust.hasReviews");
  const reviews = useAppSelector((s) => s.discovery.form.trust.reviews);

  const showTeam = useField<string>("team.showTeam");
  const members = useAppSelector((s) => s.discovery.form.team.members);

  const contact = useAppSelector((s) => s.discovery.form.contact);
  const assets = useAppSelector((s) => s.discovery.form.assets);
  const keywords = useField<string[]>("final.keywords") ?? ["", "", ""];
  const primaryAction = useField<string>("final.primaryAction");
  const mustInclude = useField<string>("final.mustInclude");
  const mustAvoid = useField<string>("final.mustAvoid");
  const additionalNotes = useField<string>("final.additionalNotes");

  return (
    <div className="space-y-2">
      {/* ── Content ─────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.content")} title={t("group.content.title")} first />

      <Question number="Q1" label={t("s4.q1.label")} optional>
        <RadioGroup
          options={CONTENT_AVAILABILITY}
          value={availability}
          onChange={(v) => set("content.availability", v)}
          columns={2}
        />
      </Question>

      <Question number="Q2" label={t("s4.q2.label")} optional>
        <RadioGroup
          options={PHOTO_AVAILABILITY}
          value={photos}
          onChange={(v) => set("content.photos", v)}
        />
      </Question>

      <Question number="Q3" label={t("s4.q3.label")} optional>
        <RadioGroup
          options={VIDEO_AVAILABILITY}
          value={videos}
          onChange={(v) => set("content.videos", v)}
        />
      </Question>

      {/* ── Trust ───────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.trust")} title={t("group.trust.title")} />

      <Question number="Q4" label={t("s4.q4.label")} optional>
        <TextArea
          value={differentiators}
          onChange={(v) => set("trust.differentiators", v)}
          placeholder={t("s4.q4.placeholder")}
          rows={4}
        />
      </Question>

      <Question number="Q5" label={t("s4.q5.label")} optional>
        <TextArea
          value={advantage}
          onChange={(v) => set("trust.competitiveAdvantage", v)}
          placeholder={t("s4.q5.placeholder")}
          rows={4}
        />
      </Question>

      <Question number="Q6" label={t("s4.q6.label")} optional>
        <CheckboxGroup
          options={TRUST_FACTORS}
          value={trustFactors}
          onToggle={(v) => toggle("trust.trustFactors", v)}
          columns={3}
          dense
        />
        <ConditionalReveal show={trustFactors.includes("Other")}>
          <TextInput
            value={trustFactorOther}
            onChange={(v) => set("trust.trustFactorOther", v)}
            placeholder={t("s4.q6.otherPlaceholder")}
          />
        </ConditionalReveal>
      </Question>

      <Question number="Q7" label={t("s4.q7.label")} optional>
        <RadioGroup
          options={YES_NO}
          value={hasReviews}
          onChange={(v) => set("trust.hasReviews", v)}
        />
        <ConditionalReveal show={hasReviews === "Yes"}>
          <DynamicList
            items={reviews}
            onAdd={() => dispatch(addReview())}
            onRemove={(id) => dispatch(removeReview(id))}
            itemLabel={(i) => t("s4.q7.itemLabel", { n: String(i + 1).padStart(2, "0") })}
            addLabel={t("s4.q7.add")}
            renderItem={(review) => (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <FieldLabel>{t("s4.q7.customerName")}</FieldLabel>
                    <TextInput
                      value={review.customerName}
                      onChange={(v) =>
                        dispatch(updateReview({ id: review.id, patch: { customerName: v } }))
                      }
                      placeholder={t("s4.q7.customerNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <FieldLabel>{t("s4.q7.rating")}</FieldLabel>
                    <div className="flex h-[46px] items-center">
                      <StarRating
                        value={review.rating}
                        onChange={(v) =>
                          dispatch(updateReview({ id: review.id, patch: { rating: v } }))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <FieldLabel>{t("s4.q7.review")}</FieldLabel>
                  <TextArea
                    value={review.text}
                    onChange={(v) => dispatch(updateReview({ id: review.id, patch: { text: v } }))}
                    placeholder={t("s4.q7.reviewPlaceholder")}
                    rows={3}
                  />
                </div>
              </div>
            )}
          />
        </ConditionalReveal>
      </Question>

      {/* ── Team ────────────────────────────────────────────────────────── */}
      <Question number="Q8" label={t("s4.q8.label")} optional>
        <RadioGroup options={YES_NO} value={showTeam} onChange={(v) => set("team.showTeam", v)} />
        <ConditionalReveal show={showTeam === "Yes"}>
          <DynamicList
            items={members}
            onAdd={() => dispatch(addTeamMember())}
            onRemove={(id) => dispatch(removeTeamMember(id))}
            itemLabel={(i) => t("s4.q8.itemLabel", { n: String(i + 1).padStart(2, "0") })}
            addLabel={t("s4.q8.add")}
            renderItem={(member) => (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-3 md:col-span-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>{t("s4.q8.name")}</FieldLabel>
                      <TextInput
                        value={member.name}
                        onChange={(v) =>
                          dispatch(updateTeamMember({ id: member.id, patch: { name: v } }))
                        }
                        placeholder={t("s4.q8.namePlaceholder")}
                      />
                    </div>
                    <div>
                      <FieldLabel>{t("s4.q8.position")}</FieldLabel>
                      <TextInput
                        value={member.position}
                        onChange={(v) =>
                          dispatch(updateTeamMember({ id: member.id, patch: { position: v } }))
                        }
                        placeholder={t("s4.q8.positionPlaceholder")}
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>{t("s4.q8.bio")}</FieldLabel>
                    <TextArea
                      value={member.bio}
                      onChange={(v) =>
                        dispatch(updateTeamMember({ id: member.id, patch: { bio: v } }))
                      }
                      placeholder={t("s4.q8.bioPlaceholder")}
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>{t("s4.q8.photo")}</FieldLabel>
                  <SingleUpload
                    value={member.photo}
                    onChange={(file) =>
                      dispatch(updateTeamMember({ id: member.id, patch: { photo: file } }))
                    }
                    compact
                  />
                </div>
              </div>
            )}
          />
        </ConditionalReveal>
      </Question>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.contact")} title={t("group.contact.title")} />

      {errors["contact.__any"] && (
        <div className="mt-2 rounded-xl border border-brand-orangeDeep/30 bg-brand-orange/8 px-4 py-3 text-[13.5px] text-brand-orangeDeep md:mx-8">
          {errors["contact.__any"]}
        </div>
      )}

      <div className="border-b border-ink-900/8 py-8">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-4">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
              {t("s4.q9.number")}
            </span>
            <h3 className="mt-1.5 font-display text-[1.5rem] leading-[1.15] tracking-tighter2 text-ink-950 md:text-[1.75rem]">
              {t("s4.q9.label")}
            </h3>
            <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-ink-600">
              {t("s4.q9.desc")}
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-3 md:col-span-8 md:grid-cols-2">
            <ContactField
              label={t("s4.q9.whatsapp")}
              value={contact.whatsapp}
              onChange={(v) => set("contact.whatsapp", v)}
              error={errors["contact.whatsapp"]}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label={t("s4.q9.phone")}
              value={contact.phone}
              onChange={(v) => set("contact.phone", v)}
              error={errors["contact.phone"]}
              placeholder="+964 750 000 0000"
            />
            <ContactField
              label={t("s4.q9.email")}
              value={contact.email}
              onChange={(v) => set("contact.email", v)}
              error={errors["contact.email"]}
              placeholder={t("s4.q9.emailPh")}
              type="email"
            />
            <ContactField
              label={t("s4.q9.instagram")}
              value={contact.instagram}
              onChange={(v) => set("contact.instagram", v)}
              placeholder={t("s4.q9.instagramPh")}
            />
            <ContactField
              label={t("s4.q9.facebook")}
              value={contact.facebook}
              onChange={(v) => set("contact.facebook", v)}
              placeholder={t("s4.q9.facebookPh")}
            />
            <ContactField
              label={t("s4.q9.other")}
              value={contact.otherSocial}
              onChange={(v) => set("contact.otherSocial", v)}
              placeholder={t("s4.q9.otherPh")}
            />
            <ContactField
              label={t("s4.q9.maps")}
              value={contact.maps}
              onChange={(v) => set("contact.maps", v)}
              placeholder={t("s4.q9.mapsPh")}
              wide
            />
            <ContactField
              label={t("s4.q9.address")}
              value={contact.address}
              onChange={(v) => set("contact.address", v)}
              placeholder={t("s4.q9.addressPh")}
              wide
            />
          </div>
        </div>
      </div>

      <Question number="Q10" label={t("s4.q10.label")} description={t("s4.q10.desc")} optional>
        <WeekSchedule />
      </Question>

      <Question number="Q11" label={t("s4.q11.label")} description={t("s4.q11.desc")} optional>
        <MultiUpload
          files={assets}
          onAdd={(file) => dispatch(addAsset(file))}
          onRemove={(id) => dispatch(removeAsset(id))}
        />
      </Question>

      {/* ── Final ───────────────────────────────────────────────────────── */}
      <GroupHeading eyebrow={t("group.final")} title={t("group.final.title")} />

      <Question
        number="Q12"
        label={t("s4.q12.label")}
        description={t("s4.q12.desc")}
        required
        error={errors["final.primaryAction"]}
      >
        <TextInput
          value={primaryAction}
          onChange={(v) => set("final.primaryAction", v)}
          placeholder={t("s4.q12.placeholder")}
        />
      </Question>

      <Question number="Q13" label={t("s4.q13.label")} description={t("s4.q13.desc")} optional>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <TextInput
              key={index}
              value={keywords[index] ?? ""}
              onChange={(value) => dispatch(updateKeyword({ index, value }))}
              placeholder={t("s4.q13.word", { n: index + 1 })}
            />
          ))}
        </div>
      </Question>

      <Question number="Q14" label={t("s4.q14.label")} optional>
        <TextArea
          value={mustInclude}
          onChange={(v) => set("final.mustInclude", v)}
          placeholder={t("s4.q14.placeholder")}
          rows={4}
        />
      </Question>

      <Question number="Q15" label={t("s4.q15.label")} optional>
        <TextArea
          value={mustAvoid}
          onChange={(v) => set("final.mustAvoid", v)}
          placeholder={t("s4.q15.placeholder")}
          rows={4}
        />
      </Question>

      <Question number="Q16" label={t("s4.q16.label")} optional>
        <TextArea
          value={additionalNotes}
          onChange={(v) => set("final.additionalNotes", v)}
          placeholder={t("s4.q16.placeholder")}
          rows={4}
        />
      </Question>
    </div>
  );
}

function GroupHeading({
  eyebrow,
  title,
  first = false,
}: {
  eyebrow: string;
  title: string;
  first?: boolean;
}) {
  return (
    <div className={first ? "" : "pt-8"}>
      <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-brand-orange">
        {eyebrow}
      </p>
      <h3 className="font-display text-[1.75rem] tracking-tighter2 text-ink-950">{title}</h3>
    </div>
  );
}

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
      {children}
    </label>
  );
}

interface ContactFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: "text" | "email";
  wide?: boolean;
}

function ContactField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  wide = false,
}: ContactFieldProps) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
        {label}
      </span>
      <TextInput value={value} onChange={onChange} placeholder={placeholder} type={type} />
      {error && <span className="mt-1.5 block text-[12.5px] text-brand-orangeDeep">{error}</span>}
    </label>
  );
}
