import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import Logo from "@/components/Logo";
import { useGetSubmissionStatsQuery } from "@/services/api";
import { logout } from "@/store/authSlice";

interface Section {
  path: string;
  label: string;
  group: string;
  /** Renders the unread-submission count beside the label. */
  badge?: boolean;
}

const SECTIONS: Section[] = [
  { path: "", label: "Overview", group: "Home" },
  { path: "submissions", label: "Submissions", group: "Home", badge: true },
  { path: "inquiries", label: "Inquiries", group: "Home" },

  { path: "brand", label: "Brand", group: "Identity" },
  { path: "nav", label: "Navigation", group: "Identity" },
  { path: "footer", label: "Footer", group: "Identity" },

  { path: "hero", label: "Hero", group: "Sections" },
  { path: "marquee", label: "Marquee", group: "Sections" },
  { path: "trust", label: "Trust & Stats", group: "Sections" },
  { path: "about", label: "About & Team", group: "Sections" },
  { path: "services", label: "Services", group: "Sections" },
  { path: "process", label: "Process", group: "Sections" },
  { path: "projects", label: "Projects", group: "Sections" },
  { path: "partners", label: "Partners", group: "Sections" },
  { path: "contact", label: "Contact", group: "Sections" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  // Polls so a brief submitted from anywhere shows up without a manual refresh.
  const { data: stats } = useGetSubmissionStatsQuery(undefined, { pollingInterval: 30_000 });
  const unread = stats?.unread ?? 0;

  const groups = Array.from(new Set(SECTIONS.map((section) => section.group)));

  return (
    <div className="min-h-screen bg-paper-100/70 text-ink-900" dir="ltr">
      <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-paper-50/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Logo />
            </Link>
            <span className="hidden truncate font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500 md:inline">
              / Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-brand-greenDeep md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Live
            </span>
            <Link
              to="/"
              className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1.5 text-[12.5px] transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              View site →
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="rounded-full bg-ink-950 px-3 py-1.5 text-[12.5px] text-paper-50 transition-colors hover:bg-brand-orange"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-4 py-6 md:px-6 md:py-8">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="sticky top-20 space-y-6">
            {groups.map((group) => (
              <div key={group}>
                <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                  {group}
                </p>
                <ul className="space-y-0.5">
                  {SECTIONS.filter((section) => section.group === group).map((section) => (
                    <li key={section.path}>
                      <NavLink
                        to={`/dashboard/${section.path}`}
                        end={section.path === ""}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-2.5 py-2 text-[13.5px] transition-colors ${
                            isActive
                              ? "bg-ink-950 text-paper-50"
                              : "text-ink-700 hover:bg-paper-50 hover:text-ink-950"
                          }`
                        }
                      >
                        <span>{section.label}</span>
                        {section.badge && unread > 0 && (
                          <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-orange px-1.5 font-mono text-[10px] tracking-normal text-paper-50">
                            {unread}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="col-span-12 min-w-0 pb-24 md:col-span-9 lg:col-span-10">{children}</main>
      </div>
    </div>
  );
}
