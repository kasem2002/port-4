import { useDispatch, useSelector } from 'react-redux';
import { setStep, setStatus } from './store/discoverySlice.js';

// ---------- helpers ----------
function orDash(v, fallback = '—') {
  if (v == null) return fallback;
  if (typeof v === 'string') return v.trim() ? v : fallback;
  return v;
}
function joinList(arr, fallback = 'Not specified') {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;
  return arr.join(', ');
}

// A single displayable row. Handles arrays gracefully.
function Row({ label, value }) {
  const isEmpty =
    value == null ||
    (typeof value === 'string' && !value.trim()) ||
    (Array.isArray(value) && value.length === 0);
  return (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-ink-900/6 last:border-b-0">
      <div className="col-span-12 md:col-span-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
          {label}
        </p>
      </div>
      <div className="col-span-12 md:col-span-8">
        {isEmpty ? (
          <p className="text-[14.5px] text-ink-400 italic">Not provided</p>
        ) : Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1.5">
            {value.map((v, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-700"
              >
                {typeof v === 'string' ? v : v?.name || v?.label || JSON.stringify(v)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[14.5px] text-ink-900 whitespace-pre-wrap">{value}</p>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, step, onEdit, children }) {
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-paper-50 p-6 md:p-7 shadow-soft">
      <header className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-ink-900/8">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
            Step 0{step + 1}
          </p>
          <h3 className="mt-1 font-display text-[1.6rem] tracking-tighter2 text-ink-950">{title}</h3>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/12 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M11 2l3 3L5 14H2v-3L11 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit
        </button>
      </header>
      <div>{children}</div>
    </div>
  );
}

export default function Review() {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.discovery.form);

  const jump = (step) => dispatch(setStep(step));
  const submit = () => {
    dispatch(setStatus('submitting'));
    setTimeout(() => {
      dispatch(setStatus('success'));
      dispatch(setStep(6));
    }, 900);
  };

  const featuredProducts = form.services.products.filter((p) => p.featured);
  const dayLabel = (d) => ({ sat: 'Sat', sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' }[d]);

  return (
    <div className="space-y-5">
      {/* Business */}
      <SectionCard title="Business" step={0} onEdit={() => jump(0)}>
        <Row label="Business name" value={form.business.name} />
        <Row
          label="Type"
          value={
            form.business.type === 'Other'
              ? `Other — ${orDash(form.business.typeOther, '')}`
              : form.business.type
          }
        />
        <Row label="How long operating" value={form.business.duration} />
        <Row label="Location" value={form.business.location} />
        <Row
          label="Branches"
          value={
            form.business.hasBranches === 'Yes'
              ? `Yes — ${form.business.branchCount} branch${form.business.branchCount === 1 ? '' : 'es'}`
              : form.business.hasBranches
          }
        />
        <Row label="Description" value={form.business.description} />
      </SectionCard>

      {/* Goals */}
      <SectionCard title="Goals & Customers" step={1} onEdit={() => jump(1)}>
        <Row label="Reasons for a website" value={form.goals.reasons} />
        <Row label="Primary result" value={form.goals.primaryGoal === 'Other' ? `Other — ${form.goals.primaryGoalOther}` : form.goals.primaryGoal} />
        <Row label="Ideal customers" value={form.goals.targetAudience} />
        <Row label="Audience description" value={form.goals.audienceDescription} />
      </SectionCard>

      {/* Services */}
      <SectionCard title="Products & Services" step={2} onEdit={() => jump(2)}>
        <Row label="Offering type" value={form.services.offeringType} />
        <Row label="Approximate count" value={form.services.quantity} />
        <Row
          label={`Items (${form.services.products.length})`}
          value={form.services.products.length ? form.services.products.map((p) => p.name || 'Untitled') : []}
        />
        {featuredProducts.length > 0 && (
          <Row label="Featured items" value={featuredProducts.map((p) => p.name || 'Untitled')} />
        )}
        <Row label="Show prices" value={form.services.showPrices} />
        <Row
          label="Packages"
          value={form.services.hasPackages === 'Yes' ? form.services.packageDetails || 'Yes' : form.services.hasPackages}
        />
        <Row
          label="Offers / discounts"
          value={
            form.services.hasOffers === 'Yes' || form.services.hasOffers === 'Sometimes'
              ? `${form.services.hasOffers} — ${form.services.offerDetails || ''}`.trim()
              : form.services.hasOffers
          }
        />
      </SectionCard>

      {/* Website & Design */}
      <SectionCard title="Website & Design" step={3} onEdit={() => jump(3)}>
        <Row label="Sections" value={form.website.sections} />
        <Row label="Features" value={form.website.features} />
        <Row
          label="Languages"
          value={
            form.website.languages.length
              ? [...form.website.languages, form.website.rtl ? `RTL: ${form.website.rtl}` : null].filter(Boolean)
              : []
          }
        />
        <Row label="Has logo" value={form.brand.hasLogo === 'Yes' && form.brand.logo?.name ? `Yes — ${form.brand.logo.name}` : form.brand.hasLogo} />
        <Row label="Brand colors" value={form.brand.hasColors === 'Yes' ? form.brand.colors : form.brand.hasColors} />
        <Row label="Visual style" value={form.brand.visualStyle} />
        <Row label="Desired feeling" value={form.brand.desiredFeeling} />
        <Row label="Animation level" value={`Level ${form.design.animationLevel} / 5`} />
        <Row label="3D importance" value={form.design.threeDLevel} />
        <Row label="Interactions" value={form.design.interactions} />
        <Row label="What to avoid" value={form.design.avoid} />
        <Row label="Reference sites" value={form.design.references.filter(Boolean)} />
      </SectionCard>

      {/* Content, Trust, Team, Contact, Hours, Assets, Final */}
      <SectionCard title="Content, Trust & Final Details" step={4} onEdit={() => jump(4)}>
        <Row label="Content availability" value={form.content.availability} />
        <Row label="Professional photos" value={form.content.photos} />
        <Row label="Videos" value={form.content.videos} />
        <Row label="Differentiators" value={form.trust.differentiators} />
        <Row label="Competitive advantage" value={form.trust.competitiveAdvantage} />
        <Row label="Trust factors" value={form.trust.trustFactors} />
        <Row
          label="Customer reviews"
          value={form.trust.hasReviews === 'Yes' ? `${form.trust.reviews.length} review${form.trust.reviews.length === 1 ? '' : 's'}` : form.trust.hasReviews}
        />
        <Row
          label="Team"
          value={form.team.showTeam === 'Yes' ? `${form.team.members.length} member${form.team.members.length === 1 ? '' : 's'}` : form.team.showTeam}
        />
        <Row label="WhatsApp" value={form.contact.whatsapp} />
        <Row label="Phone" value={form.contact.phone} />
        <Row label="Email" value={form.contact.email} />
        <Row label="Instagram" value={form.contact.instagram} />
        <Row label="Facebook" value={form.contact.facebook} />
        <Row label="Other social" value={form.contact.otherSocial} />
        <Row label="Maps / Waze" value={form.contact.maps} />
        <Row label="Address" value={form.contact.address} />
        <Row
          label="Business hours"
          value={form.businessHours.map((h) =>
            h.closed ? `${dayLabel(h.day)}: Closed` : `${dayLabel(h.day)}: ${h.open}–${h.close}`,
          )}
        />
        <Row
          label="Assets attached"
          value={form.assets.length ? form.assets.map((a) => a.name) : []}
        />
        <Row label="Primary action" value={form.final.primaryAction} />
        <Row label="Three keywords" value={form.final.keywords.filter(Boolean)} />
        <Row label="Must include" value={form.final.mustInclude} />
        <Row label="Must avoid" value={form.final.mustAvoid} />
        <Row label="Additional notes" value={form.final.additionalNotes} />
      </SectionCard>

      {/* Submit */}
      <div className="rounded-3xl border border-ink-900/10 bg-ink-950 text-paper-50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
              Ready to submit
            </p>
            <h3 className="mt-2 font-display text-[1.75rem] tracking-tighter2 leading-[1.15]">
              Send your brief to the PORT-4 team
            </h3>
            <p className="mt-3 text-[14.5px] text-paper-50/70">
              We'll review your project within 24 hours on weekdays and reply with next steps.
              Nothing here is final — we'll walk through it together on the first call.
            </p>
          </div>
          <button
            type="button"
            onClick={submit}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-orange ltr:pl-6 ltr:pr-2 rtl:pr-6 rtl:pl-2 py-2.5 text-[14px] font-medium text-paper-50 hover:bg-paper-50 hover:text-ink-950 transition-colors shrink-0"
          >
            Submit project brief
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-paper-50 transition-colors group-hover:bg-brand-orange">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
