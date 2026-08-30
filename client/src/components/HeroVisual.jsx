import { motion } from 'framer-motion';

// An abstract "product environment": interconnected UI panels + code + system nodes.
export default function HeroVisual() {
  const fadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="relative aspect-[5/6] w-full max-w-[560px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.9, duration: 0.9, ease: 'easeOut' }}
    >
      {/* soft grid backdrop */}
      <div
        className="absolute inset-0 rounded-[28px] bg-paper-100 border border-ink-900/8 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(26,24,21,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,24,21,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-orange/12 blur-3xl" />
        <div className="absolute -bottom-16 -left-20 h-56 w-56 rounded-full bg-brand-green/10 blur-3xl" />
      </div>

      {/* Panel: product screen */}
      <motion.div
        className="absolute top-[7%] left-[6%] w-[64%] rounded-2xl bg-paper-50 border border-ink-900/10 shadow-panel overflow-hidden"
        {...fadeUp}
        transition={{ delay: 2.05, duration: 0.7 }}
      >
        <div className="flex items-center gap-1.5 border-b border-ink-900/8 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-ink-300" />
          <span className="h-2 w-2 rounded-full bg-ink-300" />
          <span className="h-2 w-2 rounded-full bg-ink-300" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
            port-4 / dashboard
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">Active project</p>
              <p className="font-display text-lg text-ink-950 leading-tight mt-0.5">Northline · v2.3</p>
            </div>
            <span className="chip">on staging</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'Sprint', v: '12/16' },
              { k: 'PRs', v: '38' },
              { k: 'Lighthouse', v: '98' },
            ].map((s) => (
              <div key={s.k} className="rounded-lg bg-paper-100 px-2.5 py-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-500">{s.k}</p>
                <p className="font-display text-lg text-ink-950 leading-none mt-1">{s.v}</p>
              </div>
            ))}
          </div>
          {/* Faux chart */}
          <div className="relative h-14 rounded-lg bg-paper-100 overflow-hidden">
            <svg viewBox="0 0 200 60" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D85A30" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D85A30" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 C25,38 40,20 60,25 C80,30 95,50 115,42 C135,34 150,10 175,18 L200,15 L200,60 L0,60 Z"
                fill="url(#g1)"
              />
              <path
                d="M0,45 C25,38 40,20 60,25 C80,30 95,50 115,42 C135,34 150,10 175,18 L200,15"
                fill="none"
                stroke="#D85A30"
                strokeWidth="1.4"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Panel: code snippet */}
      <motion.div
        className="absolute top-[38%] right-[4%] w-[52%] rounded-2xl bg-ink-950 text-paper-50 border border-ink-900/60 shadow-panel overflow-hidden"
        {...fadeUp}
        transition={{ delay: 2.2, duration: 0.7 }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-50/60">
            deploy.ts
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-blink" />
            live
          </span>
        </div>
        <pre className="px-3.5 py-3 font-mono text-[11px] leading-[1.55] text-paper-50/90">
{`export const ship = async () => {
  const build = await bundle();
  const url   = await deploy(build);
  return { ok: true, url };
};`}
        </pre>
      </motion.div>

      {/* Panel: system node card */}
      <motion.div
        className="absolute bottom-[6%] left-[10%] w-[50%] rounded-2xl bg-paper-50 border border-ink-900/10 shadow-panel p-4"
        {...fadeUp}
        transition={{ delay: 2.35, duration: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">Team</p>
          <span className="font-mono text-[10px] text-ink-700">4 online</span>
        </div>
        <div className="mt-3 flex items-center">
          {['IA', 'RK', 'MO', 'DL'].map((initials, i) => (
            <div
              key={initials}
              className="grid h-8 w-8 place-items-center rounded-full border-2 border-paper-50 font-mono text-[10px] font-medium text-paper-50"
              style={{
                background: ['#0F0E0C', '#D85A30', '#47704C', '#3A3630'][i],
                marginLeft: i === 0 ? 0 : -8,
                zIndex: 10 - i,
              }}
            >
              {initials}
            </div>
          ))}
          <div
            className="grid h-8 w-8 place-items-center rounded-full border-2 border-paper-50 bg-paper-100 font-mono text-[10px] text-ink-700 -ml-2"
            style={{ zIndex: 5 }}
          >
            +8
          </div>
        </div>
        <div className="mt-3 h-1 w-full rounded-full bg-paper-200 overflow-hidden">
          <div className="h-full w-[68%] bg-brand-green" />
        </div>
        <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-500">
          Sprint velocity · 68%
        </p>
      </motion.div>

      {/* Floating orange accent tag */}
      <motion.div
        className="absolute top-[3%] right-[7%] flex items-center gap-2 rounded-full bg-brand-orange text-paper-50 px-3 py-1.5 shadow-panel"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3">
          <circle cx="6" cy="6" r="4" fill="currentColor" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em]">shipping</span>
      </motion.div>

      {/* Connectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 120" preserveAspectRatio="none">
        <motion.path
          d="M40,32 C55,32 60,55 62,60"
          fill="none"
          stroke="#0F0E0C"
          strokeOpacity="0.12"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
        />
        <motion.path
          d="M35,90 C50,88 62,85 78,72"
          fill="none"
          stroke="#0F0E0C"
          strokeOpacity="0.12"
          strokeWidth="0.3"
          strokeDasharray="1 1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.75, duration: 1 }}
        />
      </svg>
    </motion.div>
  );
}
