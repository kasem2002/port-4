import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useDeleteSubmissionMutation,
  useGetSubmissionQuery,
  useGetSubmissionsQuery,
  useUpdateSubmissionMutation,
} from "@/services/api";
import type { SubmissionStatus, SubmissionSummary } from "@/types";
import { Panel, inputBase } from "../fields";
import SubmissionDetail from "./SubmissionDetail";

const STATUSES: { value: SubmissionStatus | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "contacted", label: "Contacted" },
  { value: "archived", label: "Archived" },
];

export default function SubmissionsView() {
  const [status, setStatus] = useState<SubmissionStatus | "">("");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // Polls so a brief submitted anywhere in the world appears without a refresh.
  const { data: submissions = [], isLoading } = useGetSubmissionsQuery(
    { status: status || undefined, search: search || undefined },
    { pollingInterval: 30_000 },
  );

  const [updateSubmission] = useUpdateSubmissionMutation();
  const [deleteSubmission] = useDeleteSubmissionMutation();

  const unread = useMemo(() => submissions.filter((s) => !s.isRead).length, [submissions]);

  const open = (submission: SubmissionSummary) => {
    setOpenId(submission.id);
    if (!submission.isRead) void updateSubmission({ id: submission.id, isRead: true });
  };

  return (
    <>
      <Panel
        title="Client briefs"
        description="Every discovery form submitted from anywhere. New briefs arrive automatically."
        actions={
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <span className="rounded-full bg-brand-orange px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-50">
                {unread} unread
              </span>
            )}
            <span className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-600">
              {submissions.length} total
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by business, type, email or phone…"
            className={`${inputBase} max-w-sm flex-1`}
          />
          <div className="inline-flex rounded-lg border border-ink-900/12 bg-paper-100 p-1">
            {STATUSES.map((option) => (
              <button
                key={option.value || "all"}
                type="button"
                onClick={() => setStatus(option.value)}
                className={`rounded-md px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors ${
                  status === option.value
                    ? "bg-ink-950 text-paper-50"
                    : "text-ink-700 hover:text-ink-950"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">Loading…</p>
        ) : submissions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 p-10 text-center">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
              {search || status ? "No briefs match that filter" : "No briefs yet"}
            </p>
            {!search && !status && (
              <p className="mx-auto mt-3 max-w-md text-[13.5px] text-ink-600">
                Send a client to <span className="font-mono text-ink-950">/discovery</span> and
                their brief will appear here as soon as they submit it.
              </p>
            )}
          </div>
        ) : (
          <ul className="space-y-2">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="rounded-xl border border-ink-900/10 bg-paper-50 transition-colors hover:border-ink-900/25"
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => open(submission)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    {!submission.isRead && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-brand-orange"
                        aria-label="Unread"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-ink-950">
                        {submission.businessName}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-ink-600">
                        {submission.businessType} · {submission.primaryGoal}
                        {submission.contactWhatsapp || submission.contactEmail
                          ? ` · ${submission.contactWhatsapp || submission.contactEmail}`
                          : ""}
                      </p>
                    </div>
                  </button>

                  <StatusPill status={submission.status} />

                  <span className="hidden shrink-0 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500 md:inline">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>

                  <button
                    type="button"
                    title="Delete brief"
                    onClick={() => {
                      if (window.confirm(`Delete the brief from ${submission.businessName}?`)) {
                        void deleteSubmission(submission.id);
                        if (openId === submission.id) setOpenId(null);
                      }
                    }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-transparent text-ink-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <AnimatePresence>
        {openId && <DetailDrawer id={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  );
}

function StatusPill({ status }: { status: SubmissionStatus }) {
  const tone =
    status === "new"
      ? "border-brand-orange/30 bg-brand-orange/10 text-brand-orangeDeep"
      : status === "contacted"
        ? "border-brand-green/30 bg-brand-green/10 text-brand-greenDeep"
        : "border-ink-900/10 bg-paper-100 text-ink-600";

  return (
    <span
      className={`hidden shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] sm:inline ${tone}`}
    >
      {status}
    </span>
  );
}

function DetailDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const { data: submission, isLoading } = useGetSubmissionQuery(id);
  const [updateSubmission] = useUpdateSubmissionMutation();

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="fixed inset-y-4 left-4 right-4 flex flex-col overflow-hidden rounded-3xl border border-ink-900/10 bg-paper-100 shadow-panel md:left-auto md:w-[760px]"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-ink-900/10 bg-paper-100/95 p-5 backdrop-blur">
          <div className="min-w-0">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
              Client brief
            </p>
            <h2 className="mt-1 truncate font-display text-[1.6rem] tracking-tighter2 text-ink-950">
              {submission?.businessName ?? "Loading…"}
            </h2>
            {submission && (
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                {new Date(submission.submittedAt).toLocaleString()} · filled in{" "}
                {submission.locale === "ar" ? "Arabic" : "English"}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {submission && (
              <select
                value={submission.status}
                onChange={(e) =>
                  void updateSubmission({ id: submission.id, status: e.target.value })
                }
                className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-700 outline-none focus:border-brand-orange"
              >
                {STATUSES.filter((s) => s.value).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-600 transition-colors hover:border-ink-900/25 hover:text-ink-950"
            >
              ×
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {isLoading || !submission ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
              Loading brief…
            </p>
          ) : (
            <SubmissionDetail submission={submission} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
