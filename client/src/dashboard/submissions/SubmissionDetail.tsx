import type { ReactNode } from "react";
import { optionLabel } from "@/discovery/data/i18n";
import type { Lang, Submission, WeekDay } from "@/types";
import { useAppSelector } from "@/app/hooks";

/**
 * Read-only rendering of a client brief. Stored option values are canonical
 * English, so they're translated here into whichever language the dashboard
 * is set to — regardless of the language the client filled the form in.
 */

function isEmpty(value: string | string[] | undefined | null): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  return value.length === 0;
}

function Row({
  label,
  value,
  translateList = false,
  lang,
}: {
  label: string;
  value: string | string[] | undefined;
  translateList?: boolean;
  lang: Lang;
}) {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-ink-900/6 py-3 last:border-b-0">
      <div className="col-span-12 md:col-span-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">{label}</p>
      </div>
      <div className="col-span-12 md:col-span-8">
        {isEmpty(value) ? (
          <p className="text-[14.5px] italic text-ink-400">—</p>
        ) : Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1.5">
            {value.map((entry, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-ink-900/10 bg-paper-100 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-700"
              >
                {translateList ? optionLabel(entry, lang) : entry}
              </span>
            ))}
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-[14.5px] text-ink-900">{value}</p>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-6 shadow-soft">
      <h3 className="mb-4 border-b border-ink-900/8 pb-3 font-display text-[1.35rem] tracking-tighter2 text-ink-950">
        {title}
      </h3>
      {children}
    </div>
  );
}

const DAY_SHORT: Record<WeekDay, string> = {
  sat: "Sat",
  sun: "Sun",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
};

export default function SubmissionDetail({ submission }: { submission: Submission }) {
  const lang = useAppSelector((s) => s.language.lang);
  const brief = submission.data;
  const tv = (value: string) => (value ? optionLabel(value, lang) : value);
  const featured = brief.services.products.filter((p) => p.featured);

  return (
    <div className="space-y-4">
      <Card title="Business">
        <Row label="Business name" value={brief.business.name} lang={lang} />
        <Row
          label="Type"
          value={
            brief.business.type === "Other"
              ? `Other — ${brief.business.typeOther}`
              : tv(brief.business.type)
          }
          lang={lang}
        />
        <Row label="How long operating" value={tv(brief.business.duration)} lang={lang} />
        <Row label="Location" value={brief.business.location} lang={lang} />
        <Row
          label="Branches"
          value={
            brief.business.hasBranches === "Yes"
              ? `Yes — ${brief.business.branchCount}`
              : tv(brief.business.hasBranches)
          }
          lang={lang}
        />
        <Row label="Description" value={brief.business.description} lang={lang} />
      </Card>

      <Card title="Goals & customers">
        <Row label="Reasons" value={brief.goals.reasons} translateList lang={lang} />
        <Row
          label="Primary result"
          value={
            brief.goals.primaryGoal === "Other"
              ? `Other — ${brief.goals.primaryGoalOther}`
              : tv(brief.goals.primaryGoal)
          }
          lang={lang}
        />
        <Row label="Ideal customers" value={brief.goals.targetAudience} translateList lang={lang} />
        <Row label="Audience notes" value={brief.goals.audienceDescription} lang={lang} />
      </Card>

      <Card title="Products & services">
        <Row label="Offering type" value={tv(brief.services.offeringType)} lang={lang} />
        <Row label="Approximate count" value={brief.services.quantity} lang={lang} />
        <Row
          label={`Items (${brief.services.products.length})`}
          value={brief.services.products.map((p) => p.name || "—")}
          lang={lang}
        />
        {featured.length > 0 && (
          <Row label="Featured" value={featured.map((p) => p.name || "—")} lang={lang} />
        )}
        <Row label="Show prices" value={tv(brief.services.showPrices)} lang={lang} />
        <Row
          label="Packages"
          value={
            brief.services.hasPackages === "Yes"
              ? brief.services.packageDetails || "Yes"
              : tv(brief.services.hasPackages)
          }
          lang={lang}
        />
        <Row
          label="Offers"
          value={
            brief.services.hasOffers === "Yes" || brief.services.hasOffers === "Sometimes"
              ? `${tv(brief.services.hasOffers)} — ${brief.services.offerDetails}`.trim()
              : tv(brief.services.hasOffers)
          }
          lang={lang}
        />
      </Card>

      <Card title="Website & design">
        <Row label="Sections" value={brief.website.sections} translateList lang={lang} />
        <Row label="Features" value={brief.website.features} translateList lang={lang} />
        <Row
          label="Languages"
          value={[
            ...brief.website.languages.map((l) => optionLabel(l, lang)),
            brief.website.rtl ? `RTL: ${tv(brief.website.rtl)}` : null,
          ].filter((entry): entry is string => Boolean(entry))}
          lang={lang}
        />
        <Row
          label="Logo"
          value={
            brief.brand.logo ? `Yes — ${brief.brand.logo.originalName}` : tv(brief.brand.hasLogo)
          }
          lang={lang}
        />
        <Row
          label="Brand colors"
          value={brief.brand.hasColors === "Yes" ? brief.brand.colors : tv(brief.brand.hasColors)}
          lang={lang}
        />
        <Row label="Visual style" value={brief.brand.visualStyle} translateList lang={lang} />
        <Row label="Desired feeling" value={brief.brand.desiredFeeling} translateList lang={lang} />
        <Row label="Animation level" value={`Level ${brief.design.animationLevel} / 5`} lang={lang} />
        <Row label="3D importance" value={tv(brief.design.threeDLevel)} lang={lang} />
        <Row label="Interactions" value={brief.design.interactions} translateList lang={lang} />
        <Row label="Avoid" value={brief.design.avoid} translateList lang={lang} />
        <Row label="Reference sites" value={brief.design.references.filter(Boolean)} lang={lang} />
      </Card>

      <Card title="Content & trust">
        <Row label="Content availability" value={tv(brief.content.availability)} lang={lang} />
        <Row label="Professional photos" value={tv(brief.content.photos)} lang={lang} />
        <Row label="Videos" value={tv(brief.content.videos)} lang={lang} />
        <Row label="Differentiators" value={brief.trust.differentiators} lang={lang} />
        <Row label="Competitive advantage" value={brief.trust.competitiveAdvantage} lang={lang} />
        <Row label="Trust factors" value={brief.trust.trustFactors} translateList lang={lang} />

        {brief.trust.reviews.length > 0 && (
          <div className="pt-3">
            <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-500">
              Customer reviews ({brief.trust.reviews.length})
            </p>
            <div className="space-y-2">
              {brief.trust.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-ink-900/8 bg-paper-100/50 p-3"
                >
                  <p className="text-[13.5px] font-medium text-ink-900">
                    {review.customerName || "Anonymous"} · {"★".repeat(review.rating)}
                  </p>
                  <p className="mt-1 text-[13.5px] text-ink-700">{review.text || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {brief.team.members.length > 0 && (
        <Card title={`Team (${brief.team.members.length})`}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {brief.team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-start gap-3 rounded-lg border border-ink-900/8 bg-paper-100/50 p-3"
              >
                {member.photo ? (
                  <img
                    src={member.photo.url}
                    alt={member.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-paper-300" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium text-ink-950">
                    {member.name || "—"}
                  </p>
                  <p className="truncate text-[12px] text-ink-600">{member.position || "—"}</p>
                  {member.bio && <p className="mt-1 text-[12.5px] text-ink-700">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card title="Contact">
        <Row label="WhatsApp" value={brief.contact.whatsapp} lang={lang} />
        <Row label="Phone" value={brief.contact.phone} lang={lang} />
        <Row label="Email" value={brief.contact.email} lang={lang} />
        <Row label="Instagram" value={brief.contact.instagram} lang={lang} />
        <Row label="Facebook" value={brief.contact.facebook} lang={lang} />
        <Row label="Other social" value={brief.contact.otherSocial} lang={lang} />
        <Row label="Maps / Waze" value={brief.contact.maps} lang={lang} />
        <Row label="Address" value={brief.contact.address} lang={lang} />
        <Row
          label="Business hours"
          value={brief.businessHours.map((hour) =>
            hour.closed
              ? `${DAY_SHORT[hour.day]}: Closed`
              : `${DAY_SHORT[hour.day]}: ${hour.open}–${hour.close}`,
          )}
          lang={lang}
        />
      </Card>

      <Card title="Final details">
        <Row label="Primary action" value={brief.final.primaryAction} lang={lang} />
        <Row label="Three words" value={brief.final.keywords.filter(Boolean)} lang={lang} />
        <Row label="Must include" value={brief.final.mustInclude} lang={lang} />
        <Row label="Must avoid" value={brief.final.mustAvoid} lang={lang} />
        <Row label="Additional notes" value={brief.final.additionalNotes} lang={lang} />
      </Card>

      {submission.files.length > 0 && (
        <Card title={`Files (${submission.files.length})`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {submission.files.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-ink-900/10 bg-paper-50 transition-colors hover:border-brand-orange"
              >
                <div className="grid aspect-[4/3] place-items-center bg-paper-100">
                  {file.mimeType.startsWith("image") ? (
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
                      {file.mimeType.split("/")[1] ?? "file"}
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="truncate text-[12px] font-medium text-ink-950">
                    {file.originalName}
                  </p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-500">
                    {file.field}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
