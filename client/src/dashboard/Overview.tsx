import { Link } from "react-router-dom";
import { useGetOverviewQuery } from "@/services/api";
import { Panel } from "./fields";

export default function Overview() {
  const { data, isLoading } = useGetOverviewQuery(undefined, { pollingInterval: 30_000 });

  if (isLoading || !data) {
    return (
      <Panel title="Overview">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">Loading…</p>
      </Panel>
    );
  }

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Client briefs"
          value={data.submissions.total}
          badge={data.submissions.unread > 0 ? `${data.submissions.unread} unread` : undefined}
          to="/dashboard/submissions"
        />
        <StatCard
          label="Inquiries"
          value={data.inquiries.total}
          badge={data.inquiries.unread > 0 ? `${data.inquiries.unread} unread` : undefined}
          to="/dashboard/inquiries"
        />
        <StatCard label="Services live" value={data.content.services} to="/dashboard/services" />
        <StatCard label="Projects live" value={data.content.projects} to="/dashboard/projects" />
      </div>

      <Panel
        title="Recent briefs"
        description="The five most recent submissions from the discovery form."
        actions={
          <Link
            to="/dashboard/submissions"
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-600 transition-colors hover:text-brand-orange"
          >
            View all →
          </Link>
        }
      >
        {data.recentSubmissions.length === 0 ? (
          <EmptyRow>No briefs have arrived yet.</EmptyRow>
        ) : (
          <ul className="space-y-2">
            {data.recentSubmissions.map((submission) => (
              <li key={submission.id}>
                <Link
                  to="/dashboard/submissions"
                  className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-paper-100/40 px-4 py-3 transition-colors hover:border-ink-900/25"
                >
                  {!submission.isRead && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-950">
                    {submission.businessName}
                  </span>
                  <span className="hidden text-[12.5px] text-ink-600 sm:inline">
                    {submission.businessType}
                  </span>
                  <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel
        title="Recent inquiries"
        description="Messages from the short form in the contact section."
        actions={
          <Link
            to="/dashboard/inquiries"
            className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-600 transition-colors hover:text-brand-orange"
          >
            View all →
          </Link>
        }
      >
        {data.recentInquiries.length === 0 ? (
          <EmptyRow>No inquiries yet.</EmptyRow>
        ) : (
          <ul className="space-y-2">
            {data.recentInquiries.map((inquiry) => (
              <li
                key={inquiry.id}
                className="flex items-center gap-3 rounded-xl border border-ink-900/10 bg-paper-100/40 px-4 py-3"
              >
                {!inquiry.isRead && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                )}
                <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink-950">
                  {inquiry.name}
                </span>
                <span className="hidden text-[12.5px] text-ink-600 sm:inline">
                  {inquiry.company}
                </span>
                <span className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

function StatCard({
  label,
  value,
  badge,
  to,
}: {
  label: string;
  value: number;
  badge?: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5 shadow-soft transition-colors hover:border-ink-900/25"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">{label}</p>
        {badge && (
          <span className="shrink-0 rounded-full bg-brand-orange px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper-50">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-4xl leading-none tracking-tightest text-ink-950">
        {value}
      </p>
    </Link>
  );
}

function EmptyRow({ children }: { children: string }) {
  return (
    <p className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
      {children}
    </p>
  );
}
