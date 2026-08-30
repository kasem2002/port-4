import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Overview() {
  const content = useSelector((s) => s.content);
  const stats = [
    { label: 'Services', value: content.services.items.length },
    { label: 'Projects', value: content.projects.items.length },
    { label: 'Process steps', value: content.process.steps.length },
    { label: 'Team roles', value: content.about.team.length },
    { label: 'Partners', value: content.partners.items.length },
    { label: 'Nav links', value: content.nav.length },
    { label: 'Marquee words', value: content.marquee.length },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
          Welcome back
        </p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tighter2 text-ink-950 mt-2">
          PORT-4 content, at a glance.
        </h1>
        <p className="mt-3 text-[14.5px] text-ink-600 max-w-xl">
          Every piece of copy, list and label on the public site is editable
          from here in both English and Arabic. Changes save to your browser
          instantly and appear the moment you refresh the site.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-900/10 bg-paper-50 p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">{s.label}</p>
            <p className="mt-2 font-display text-4xl text-ink-950 tracking-tightest leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/dashboard/hero" className="group rounded-2xl border border-ink-900/10 bg-ink-950 text-paper-50 p-6 hover:border-brand-orange transition-colors">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-orange">Suggested</p>
          <p className="mt-2 font-display text-2xl leading-tight">Edit the hero headline in both languages →</p>
        </Link>
        <Link to="/dashboard/projects" className="group rounded-2xl border border-ink-900/10 bg-paper-50 p-6 hover:border-brand-orange transition-colors">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">Portfolio</p>
          <p className="mt-2 font-display text-2xl leading-tight text-ink-950">Update selected work →</p>
        </Link>
      </div>
    </div>
  );
}
