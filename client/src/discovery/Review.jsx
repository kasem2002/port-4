import { useDispatch, useSelector } from 'react-redux';
import { setStep, setStatus } from './store/discoverySlice.js';
import { useDT, useOL } from './data/i18n.js';

// Empty-detector for row values.
function isEmpty(v) {
  if (v == null) return true;
  if (typeof v === 'string') return v.trim().length === 0;
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

function Row({ label, value, translateList = false, notProvided }) {
  const ol = useOL();
  const empty = isEmpty(value);
  return (
    <div className="grid grid-cols-12 gap-4 py-3 border-b border-ink-900/6 last:border-b-0">
      <div className="col-span-12 md:col-span-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
          {label}
        </p>
      </div>
      <div className="col-span-12 md:col-span-8">
        {empty ? (
          <p className="text-[14.5px] text-ink-400 italic">{notProvided}</p>
        ) : Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1.5">
            {value.map((v, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-700"
              >
                {typeof v === 'string' ? (translateList ? ol(v) : v) : v?.name || v?.label || JSON.stringify(v)}
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
  const t = useDT();
  return (
    <div className="rounded-3xl border border-ink-900/10 bg-paper-50 p-6 md:p-7 shadow-soft">
      <header className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-ink-900/8">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
            {t('review.step', { n: step + 1 })}
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
          {t('review.edit')}
        </button>
      </header>
      <div>{children}</div>
    </div>
  );
}

export default function Review() {
  const dispatch = useDispatch();
  const form = useSelector((s) => s.discovery.form);
  const t = useDT();
  const ol = useOL();
  const notProvided = t('review.notProvided');

  const jump = (step) => dispatch(setStep(step));
  const submit = () => {
    dispatch(setStatus('submitting'));
    setTimeout(() => {
      dispatch(setStatus('success'));
      dispatch(setStep(6));
    }, 900);
  };

  const featuredProducts = form.services.products.filter((p) => p.featured);

  // Localized weekday label for the hours summary.
  const dayLabels = {
    sat: { en: 'Sat', ar: 'السبت' },
    sun: { en: 'Sun', ar: 'الأحد' },
    mon: { en: 'Mon', ar: 'الاثنين' },
    tue: { en: 'Tue', ar: 'الثلاثاء' },
    wed: { en: 'Wed', ar: 'الأربعاء' },
    thu: { en: 'Thu', ar: 'الخميس' },
    fri: { en: 'Fri', ar: 'الجمعة' },
  };
  const lang = useSelector((s) => s.i18n.lang);
  const dayLabel = (d) => dayLabels[d]?.[lang] || d;

  // Translate a single stored option key for display, gracefully passing
  // through free-text values.
  const tv = (v) => (v ? ol(v) : v);

  return (
    <div className="space-y-5">
      {/* Business */}
      <SectionCard title={t('review.section.business')} step={0} onEdit={() => jump(0)}>
        <Row label={t('review.row.name')} value={form.business.name} notProvided={notProvided} />
        <Row
          label={t('review.row.type')}
          value={
            form.business.type === 'Other'
              ? `${ol('Other')} — ${form.business.typeOther || ''}`.trim()
              : tv(form.business.type)
          }
          notProvided={notProvided}
        />
        <Row label={t('review.row.duration')} value={tv(form.business.duration)} notProvided={notProvided} />
        <Row label={t('review.row.location')} value={form.business.location} notProvided={notProvided} />
        <Row
          label={t('review.row.branches')}
          value={
            form.business.hasBranches === 'Yes'
              ? t('review.row.branchesYes', {
                  n: form.business.branchCount,
                  es: form.business.branchCount === 1 ? '' : 'es',
                })
              : tv(form.business.hasBranches)
          }
          notProvided={notProvided}
        />
        <Row label={t('review.row.description')} value={form.business.description} notProvided={notProvided} />
      </SectionCard>

      {/* Goals */}
      <SectionCard title={t('review.section.goals')} step={1} onEdit={() => jump(1)}>
        <Row label={t('review.row.reasons')} value={form.goals.reasons} translateList notProvided={notProvided} />
        <Row
          label={t('review.row.primary')}
          value={
            form.goals.primaryGoal === 'Other'
              ? `${ol('Other')} — ${form.goals.primaryGoalOther || ''}`.trim()
              : tv(form.goals.primaryGoal)
          }
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.audience')}
          value={form.goals.targetAudience}
          translateList
          notProvided={notProvided}
        />
        <Row label={t('review.row.audienceDesc')} value={form.goals.audienceDescription} notProvided={notProvided} />
      </SectionCard>

      {/* Services */}
      <SectionCard title={t('review.section.services')} step={2} onEdit={() => jump(2)}>
        <Row label={t('review.row.offering')} value={tv(form.services.offeringType)} notProvided={notProvided} />
        <Row label={t('review.row.quantity')} value={form.services.quantity} notProvided={notProvided} />
        <Row
          label={t('review.row.items', { n: form.services.products.length })}
          value={form.services.products.length ? form.services.products.map((p) => p.name || '—') : []}
          notProvided={notProvided}
        />
        {featuredProducts.length > 0 && (
          <Row
            label={t('review.row.featuredItems')}
            value={featuredProducts.map((p) => p.name || '—')}
            notProvided={notProvided}
          />
        )}
        <Row label={t('review.row.prices')} value={tv(form.services.showPrices)} notProvided={notProvided} />
        <Row
          label={t('review.row.packages')}
          value={
            form.services.hasPackages === 'Yes'
              ? form.services.packageDetails || ol('Yes')
              : tv(form.services.hasPackages)
          }
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.offers')}
          value={
            form.services.hasOffers === 'Yes' || form.services.hasOffers === 'Sometimes'
              ? `${ol(form.services.hasOffers)} — ${form.services.offerDetails || ''}`.trim()
              : tv(form.services.hasOffers)
          }
          notProvided={notProvided}
        />
      </SectionCard>

      {/* Website & Design */}
      <SectionCard title={t('review.section.design')} step={3} onEdit={() => jump(3)}>
        <Row label={t('review.row.sections')} value={form.website.sections} translateList notProvided={notProvided} />
        <Row label={t('review.row.features')} value={form.website.features} translateList notProvided={notProvided} />
        <Row
          label={t('review.row.languages')}
          value={
            form.website.languages.length
              ? [
                  ...form.website.languages.map((v) => ol(v)),
                  form.website.rtl ? `${t('review.row.rtl')}: ${ol(form.website.rtl)}` : null,
                ].filter(Boolean)
              : []
          }
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.hasLogo')}
          value={
            form.brand.hasLogo === 'Yes' && form.brand.logo?.name
              ? t('review.row.hasLogoYes', { name: form.brand.logo.name })
              : tv(form.brand.hasLogo)
          }
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.colors')}
          value={form.brand.hasColors === 'Yes' ? form.brand.colors : tv(form.brand.hasColors)}
          notProvided={notProvided}
        />
        <Row label={t('review.row.style')} value={form.brand.visualStyle} translateList notProvided={notProvided} />
        <Row label={t('review.row.feeling')} value={form.brand.desiredFeeling} translateList notProvided={notProvided} />
        <Row
          label={t('review.row.animLevel')}
          value={t('review.row.animLevelValue', { n: form.design.animationLevel })}
          notProvided={notProvided}
        />
        <Row label={t('review.row.threeD')} value={tv(form.design.threeDLevel)} notProvided={notProvided} />
        <Row label={t('review.row.interactions')} value={form.design.interactions} translateList notProvided={notProvided} />
        <Row label={t('review.row.avoid')} value={form.design.avoid} translateList notProvided={notProvided} />
        <Row label={t('review.row.references')} value={form.design.references.filter(Boolean)} notProvided={notProvided} />
      </SectionCard>

      {/* Content, Trust, Team, Contact, Hours, Assets, Final */}
      <SectionCard title={t('review.section.final')} step={4} onEdit={() => jump(4)}>
        <Row label={t('review.row.content')} value={tv(form.content.availability)} notProvided={notProvided} />
        <Row label={t('review.row.photos')} value={tv(form.content.photos)} notProvided={notProvided} />
        <Row label={t('review.row.videos')} value={tv(form.content.videos)} notProvided={notProvided} />
        <Row label={t('review.row.diff')} value={form.trust.differentiators} notProvided={notProvided} />
        <Row label={t('review.row.adv')} value={form.trust.competitiveAdvantage} notProvided={notProvided} />
        <Row label={t('review.row.trustFactors')} value={form.trust.trustFactors} translateList notProvided={notProvided} />
        <Row
          label={t('review.row.reviews')}
          value={
            form.trust.hasReviews === 'Yes'
              ? t('review.row.reviewCount', {
                  n: form.trust.reviews.length,
                  s: form.trust.reviews.length === 1 ? '' : 's',
                })
              : tv(form.trust.hasReviews)
          }
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.team')}
          value={
            form.team.showTeam === 'Yes'
              ? t('review.row.teamCount', {
                  n: form.team.members.length,
                  s: form.team.members.length === 1 ? '' : 's',
                })
              : tv(form.team.showTeam)
          }
          notProvided={notProvided}
        />
        <Row label={t('review.row.whatsapp')} value={form.contact.whatsapp} notProvided={notProvided} />
        <Row label={t('review.row.phone')} value={form.contact.phone} notProvided={notProvided} />
        <Row label={t('review.row.email')} value={form.contact.email} notProvided={notProvided} />
        <Row label={t('review.row.instagram')} value={form.contact.instagram} notProvided={notProvided} />
        <Row label={t('review.row.facebook')} value={form.contact.facebook} notProvided={notProvided} />
        <Row label={t('review.row.otherSocial')} value={form.contact.otherSocial} notProvided={notProvided} />
        <Row label={t('review.row.maps')} value={form.contact.maps} notProvided={notProvided} />
        <Row label={t('review.row.address')} value={form.contact.address} notProvided={notProvided} />
        <Row
          label={t('review.row.hours')}
          value={form.businessHours.map((h) =>
            h.closed
              ? t('review.row.hoursClosed', { day: dayLabel(h.day) })
              : t('review.row.hoursOpen', { day: dayLabel(h.day), open: h.open, close: h.close }),
          )}
          notProvided={notProvided}
        />
        <Row
          label={t('review.row.assets')}
          value={form.assets.length ? form.assets.map((a) => a.name) : []}
          notProvided={notProvided}
        />
        <Row label={t('review.row.primaryAction')} value={form.final.primaryAction} notProvided={notProvided} />
        <Row label={t('review.row.keywords')} value={form.final.keywords.filter(Boolean)} notProvided={notProvided} />
        <Row label={t('review.row.mustInclude')} value={form.final.mustInclude} notProvided={notProvided} />
        <Row label={t('review.row.mustAvoid')} value={form.final.mustAvoid} notProvided={notProvided} />
        <Row label={t('review.row.notes')} value={form.final.additionalNotes} notProvided={notProvided} />
      </SectionCard>

      {/* Submit */}
      <div className="rounded-3xl border border-ink-900/10 bg-ink-950 text-paper-50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
              {t('review.submit.eyebrow')}
            </p>
            <h3 className="mt-2 font-display text-[1.75rem] tracking-tighter2 leading-[1.15]">
              {t('review.submit.title')}
            </h3>
            <p className="mt-3 text-[14.5px] text-paper-50/70">{t('review.submit.desc')}</p>
          </div>
          <button
            type="button"
            onClick={submit}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-orange ltr:pl-6 ltr:pr-2 rtl:pr-6 rtl:pl-2 py-2.5 text-[14px] font-medium text-paper-50 hover:bg-paper-50 hover:text-ink-950 transition-colors shrink-0"
          >
            {t('review.submit.btn')}
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
