import { useState } from "react";
import {
  useDeleteInquiryMutation,
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
} from "@/services/api";
import { Panel, inputBase } from "../fields";

/** Messages from the short "start a project" form on the public site. */
export default function InquiriesView() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: inquiries = [], isLoading } = useGetInquiriesQuery(
    { search: search || undefined },
    { pollingInterval: 30_000 },
  );
  const [updateInquiry] = useUpdateInquiryMutation();
  const [deleteInquiry] = useDeleteInquiryMutation();

  const toggle = (id: string, isRead: boolean) => {
    setExpandedId((current) => (current === id ? null : id));
    if (!isRead) void updateInquiry({ id, isRead: true });
  };

  return (
    <Panel
      title="Inquiries"
      description="Messages sent through the contact section of the public site."
      actions={
        <span className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-600">
          {inquiries.length} total
        </span>
      }
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter by name, email or company…"
        className={`${inputBase} max-w-sm`}
      />

      {isLoading ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">Loading…</p>
      ) : inquiries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 px-4 py-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
          No inquiries yet
        </p>
      ) : (
        <ul className="space-y-2">
          {inquiries.map((inquiry) => {
            const expanded = expandedId === inquiry.id;
            return (
              <li
                key={inquiry.id}
                className="rounded-xl border border-ink-900/10 bg-paper-50 transition-colors hover:border-ink-900/25"
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggle(inquiry.id, inquiry.isRead)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    {!inquiry.isRead && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-brand-orange"
                        aria-label="Unread"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-ink-950">
                        {inquiry.name}
                        {inquiry.company && (
                          <span className="text-ink-500"> · {inquiry.company}</span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-ink-600">
                        {inquiry.email}
                        {inquiry.projectType && ` · ${inquiry.projectType}`}
                        {inquiry.budget && ` · ${inquiry.budget}`}
                      </p>
                    </div>
                  </button>

                  <span className="hidden shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500 md:inline">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    title="Delete inquiry"
                    onClick={() => {
                      if (window.confirm(`Delete the message from ${inquiry.name}?`)) {
                        void deleteInquiry(inquiry.id);
                      }
                    }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-transparent text-ink-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>

                {expanded && (
                  <div className="border-t border-ink-900/8 px-4 py-4">
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink-800">
                      {inquiry.message}
                    </p>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2 text-[12.5px] font-medium text-paper-50 transition-colors hover:bg-brand-orange"
                    >
                      Reply by email →
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}
