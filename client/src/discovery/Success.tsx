import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useDT, useLang } from "./data/i18n";
import { resetDiscovery } from "./store/discoverySlice";

export default function Success() {
  const dispatch = useAppDispatch();
  const businessName = useAppSelector((s) => s.discovery.form.business.name);
  const submittedAt = useAppSelector((s) => s.discovery.submittedAt);
  const t = useDT();
  const lang = useLang();

  const timestamp = submittedAt
    ? new Date(submittedAt).toLocaleString(lang === "ar" ? "ar" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Arabic uses a vocative particle rather than a comma before the name.
  const namePart = businessName ? (lang === "ar" ? ` يا ${businessName}` : `, ${businessName}`) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-ink-950 p-8 text-paper-50 md:p-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 h-[520px] w-[520px] rounded-full bg-brand-orange/25 blur-3xl ltr:-right-40 rtl:-left-40" />
      <div className="pointer-events-none absolute -bottom-40 h-[420px] w-[420px] rounded-full bg-brand-green/15 blur-3xl ltr:-left-40 rtl:-right-40" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-orange text-paper-50">
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-orange">
            {t("success.eyebrow")}
          </span>
        </div>

        <h1 className="display-1 mt-8 text-paper-50">
          {t("success.title.a")}
          <span className="block font-normal italic text-brand-orange">
            {t("success.title.b")}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-[16.5px] leading-relaxed text-paper-50/75">
          {t("success.body", { name: namePart })}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <NextStep
            number="01"
            title={t("success.next.internal.title")}
            body={t("success.next.internal.body")}
          />
          <NextStep
            number="02"
            title={t("success.next.call.title")}
            body={t("success.next.call.body")}
          />
          <NextStep
            number="03"
            title={t("success.next.proposal.title")}
            body={t("success.next.proposal.body")}
          />
        </div>

        {timestamp && (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/45">
            {t("success.submittedAt", { when: timestamp })}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-paper-50 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-brand-orange hover:text-paper-50 ltr:pl-5 ltr:pr-2 rtl:pl-2 rtl:pr-5"
          >
            {t("success.back")}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-950 text-paper-50">
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 rtl:-scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => dispatch(resetDiscovery())}
            className="link-underline text-sm text-paper-50/60 transition-colors hover:text-paper-50"
          >
            {t("success.startAnother")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NextStep({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/45">
        {number}
      </p>
      <h4 className="mt-2 font-display text-[1.35rem] tracking-tighter2 text-paper-50">{title}</h4>
      <p className="mt-2 text-[13.5px] leading-relaxed text-paper-50/70">{body}</p>
    </div>
  );
}
