import { useSelector } from 'react-redux';
import { useOL } from '../../discovery/data/i18n.js';

// Read-only mirror of the Review layout — same info, no submit/edit chrome.
// We use the LIVE dashboard language so the owner reads it in their preferred
// language regardless of how the client filled it.
function isEmpty(v) {
  if (v == null) return true;
  if (typeof v === 'string') return v.trim().length === 0;
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

function Row({ label, value, translateList = false, ol }) {
  const empty = isEmpty(value);
  return (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-ink-900/6 last:border-b-0">
      <div className="col-span-12 md:col-span-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">{label}</p>
      </div>
      <div className="col-span-12 md:col-span-8">
        {empty ? (
          <p className="text-[14.5px] text-ink-400 italic">—</p>
        ) : Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1.5">
            {value.map((v, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-700"
              >
                {typeof v === 'string' ? (translateList ? ol(v) : v) : v?.name || JSON.stringify(v)}
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

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-6 shadow-soft">
      <h3 className="font-display text-[1.35rem] tracking-tighter2 text-ink-950 mb-4 pb-3 border-b border-ink-900/8">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export default function SubmissionDetail({ brief }) {
  const ol = useOL();
  const lang = useSelector((s) => s.i18n.lang);
  const f = brief.form;

  const dayLabels = {
    sat: { en: 'Sat', ar: 'السبت' },
    sun: { en: 'Sun', ar: 'الأحد' },
    mon: { en: 'Mon', ar: 'الاثنين' },
    tue: { en: 'Tue', ar: 'الثلاثاء' },
    wed: { en: 'Wed', ar: 'الأربعاء' },
    thu: { en: 'Thu', ar: 'الخميس' },
    fri: { en: 'Fri', ar: 'الجمعة' },
  };
  const dl = (d) => dayLabels[d]?.[lang] || d;
  const tv = (v) => (v ? ol(v) : v);

  const featured = f.services.products.filter((p) => p.featured);

  return (
    <div className="space-y-4">
      <Card title="Business">
        <Row label="Business name" value={f.business.name} ol={ol} />
        <Row
          label="Type"
          value={f.business.type === 'Other' ? `Other — ${f.business.typeOther || ''}` : tv(f.business.type)}
          ol={ol}
        />
        <Row label="How long operating" value={tv(f.business.duration)} ol={ol} />
        <Row label="Location" value={f.business.location} ol={ol} />
        <Row
          label="Branches"
          value={
            f.business.hasBranches === 'Yes'
              ? `Yes — ${f.business.branchCount} branch${f.business.branchCount === 1 ? '' : 'es'}`
              : tv(f.business.hasBranches)
          }
          ol={ol}
        />
        <Row label="Description" value={f.business.description} ol={ol} />
      </Card>

      <Card title="Goals & customers">
        <Row label="Reasons" value={f.goals.reasons} translateList ol={ol} />
        <Row
          label="Primary result"
          value={
            f.goals.primaryGoal === 'Other'
              ? `Other — ${f.goals.primaryGoalOther || ''}`
              : tv(f.goals.primaryGoal)
          }
          ol={ol}
        />
        <Row label="Ideal customers" value={f.goals.targetAudience} translateList ol={ol} />
        <Row label="Audience notes" value={f.goals.audienceDescription} ol={ol} />
      </Card>

      <Card title="Products & services">
        <Row label="Offering type" value={tv(f.services.offeringType)} ol={ol} />
        <Row label="Approximate count" value={f.services.quantity} ol={ol} />
        <Row
          label={`Items (${f.services.products.length})`}
          value={f.services.products.length ? f.services.products.map((p) => p.name || '—') : []}
          ol={ol}
        />
        {featured.length > 0 && (
          <Row label="Featured" value={featured.map((p) => p.name || '—')} ol={ol} />
        )}
        <Row label="Show prices" value={tv(f.services.showPrices)} ol={ol} />
        <Row
          label="Packages"
          value={f.services.hasPackages === 'Yes' ? f.services.packageDetails || 'Yes' : tv(f.services.hasPackages)}
          ol={ol}
        />
        <Row
          label="Offers / discounts"
          value={
            f.services.hasOffers === 'Yes' || f.services.hasOffers === 'Sometimes'
              ? `${ol(f.services.hasOffers)} — ${f.services.offerDetails || ''}`.trim()
              : tv(f.services.hasOffers)
          }
          ol={ol}
        />
      </Card>

      <Card title="Website & design">
        <Row label="Sections" value={f.website.sections} translateList ol={ol} />
        <Row label="Features" value={f.website.features} translateList ol={ol} />
        <Row
          label="Languages"
          value={
            f.website.languages.length
              ? [
                  ...f.website.languages.map((v) => ol(v)),
                  f.website.rtl ? `RTL: ${ol(f.website.rtl)}` : null,
                ].filter(Boolean)
              : []
          }
          ol={ol}
        />
        <Row
          label="Logo"
          value={f.brand.hasLogo === 'Yes' && f.brand.logo?.name ? `Yes — ${f.brand.logo.name}` : tv(f.brand.hasLogo)}
          ol={ol}
        />
        <Row
          label="Brand colors"
          value={f.brand.hasColors === 'Yes' ? f.brand.colors : tv(f.brand.hasColors)}
          ol={ol}
        />
        <Row label="Visual style" value={f.brand.visualStyle} translateList ol={ol} />
        <Row label="Desired feeling" value={f.brand.desiredFeeling} translateList ol={ol} />
        <Row label="Animation level" value={`Level ${f.design.animationLevel} / 5`} ol={ol} />
        <Row label="3D importance" value={tv(f.design.threeDLevel)} ol={ol} />
        <Row label="Interactions" value={f.design.interactions} translateList ol={ol} />
        <Row label="Avoid" value={f.design.avoid} translateList ol={ol} />
        <Row label="Reference sites" value={f.design.references.filter(Boolean)} ol={ol} />
      </Card>

      <Card title="Content & trust">
        <Row label="Content availability" value={tv(f.content.availability)} ol={ol} />
        <Row label="Professional photos" value={tv(f.content.photos)} ol={ol} />
        <Row label="Videos" value={tv(f.content.videos)} ol={ol} />
        <Row label="Differentiators" value={f.trust.differentiators} ol={ol} />
        <Row label="Competitive advantage" value={f.trust.competitiveAdvantage} ol={ol} />
        <Row label="Trust factors" value={f.trust.trustFactors} translateList ol={ol} />
        {f.trust.hasReviews === 'Yes' && f.trust.reviews.length > 0 && (
          <div className="pt-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500 mb-2">
              Customer reviews ({f.trust.reviews.length})
            </p>
            <div className="space-y-2">
              {f.trust.reviews.map((r) => (
                <div key={r.id} className="rounded-lg border border-ink-900/8 bg-paper-100/50 p-3">
                  <p className="text-[13.5px] font-medium text-ink-900">
                    {r.customerName || 'Anonymous'} · {'★'.repeat(r.rating || 0)}
                  </p>
                  <p className="text-[13.5px] text-ink-700 mt-1">{r.text || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {f.team.showTeam === 'Yes' && f.team.members.length > 0 && (
        <Card title={`Team (${f.team.members.length})`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {f.team.members.map((m) => (
              <div key={m.id} className="flex items-start gap-3 rounded-lg border border-ink-900/8 bg-paper-100/50 p-3">
                {m.photo?.dataUrl ? (
                  <img src={m.photo.dataUrl} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-paper-200" />
                )}
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-ink-950 truncate">{m.name || '—'}</p>
                  <p className="text-[12px] text-ink-600 truncate">{m.position || '—'}</p>
                  {m.bio && <p className="text-[12.5px] text-ink-700 mt-1">{m.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card title="Contact">
        <Row label="WhatsApp" value={f.contact.whatsapp} ol={ol} />
        <Row label="Phone" value={f.contact.phone} ol={ol} />
        <Row label="Email" value={f.contact.email} ol={ol} />
        <Row label="Instagram" value={f.contact.instagram} ol={ol} />
        <Row label="Facebook" value={f.contact.facebook} ol={ol} />
        <Row label="Other social" value={f.contact.otherSocial} ol={ol} />
        <Row label="Maps / Waze" value={f.contact.maps} ol={ol} />
        <Row label="Address" value={f.contact.address} ol={ol} />
        <Row
          label="Business hours"
          value={f.businessHours.map((h) =>
            h.closed ? `${dl(h.day)}: Closed` : `${dl(h.day)}: ${h.open}–${h.close}`,
          )}
          ol={ol}
        />
      </Card>

      <Card title="Final details">
        <Row label="Primary action" value={f.final.primaryAction} ol={ol} />
        <Row label="Three words" value={f.final.keywords.filter(Boolean)} ol={ol} />
        <Row label="Must include" value={f.final.mustInclude} ol={ol} />
        <Row label="Must avoid" value={f.final.mustAvoid} ol={ol} />
        <Row label="Additional notes" value={f.final.additionalNotes} ol={ol} />
        <Row
          label={`Assets (${f.assets.length})`}
          value={f.assets.length ? f.assets.map((a) => a.name) : []}
          ol={ol}
        />
      </Card>
    </div>
  );
}
