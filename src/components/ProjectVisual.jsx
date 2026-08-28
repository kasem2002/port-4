// Distinct abstract SVG "product screenshot" per project id (no external images).

export default function ProjectVisual({ id, className = '' }) {
  const common = 'w-full h-full';
  switch (id) {
    case 'northline':
      return (
        <div className={`relative ${className} bg-[#F1EBDD]`}>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <svg viewBox="0 0 500 400" className={common} preserveAspectRatio="xMidYMid slice">
            <g transform="translate(40,40)">
              <rect x="0" y="0" width="420" height="60" rx="10" fill="#FBF8F3" stroke="#1a1815" strokeOpacity="0.1" />
              <rect x="16" y="20" width="120" height="10" rx="3" fill="#0F0E0C" />
              <rect x="16" y="36" width="80" height="6" rx="2" fill="#77716A" />
              <rect x="300" y="22" width="100" height="22" rx="11" fill="#D85A30" />
              <rect x="0" y="80" width="200" height="220" rx="10" fill="#FBF8F3" stroke="#1a1815" strokeOpacity="0.1" />
              <rect x="16" y="96" width="90" height="8" rx="2" fill="#0F0E0C" />
              <rect x="16" y="112" width="140" height="6" rx="2" fill="#77716A" />
              <g transform="translate(16,140)">
                <path d="M0 60 C20 40 40 45 60 30 C80 15 100 25 120 20 L160 8" stroke="#D85A30" strokeWidth="2" fill="none" />
                <path d="M0 60 C20 40 40 45 60 30 C80 15 100 25 120 20 L160 8 L160 80 L0 80 Z" fill="#D85A30" fillOpacity="0.12" />
              </g>
              <rect x="220" y="80" width="200" height="105" rx="10" fill="#0F0E0C" />
              <rect x="236" y="96" width="60" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.4" />
              <rect x="236" y="112" width="120" height="14" rx="2" fill="#FBF8F3" />
              <rect x="236" y="140" width="168" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.25" />
              <rect x="236" y="152" width="120" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.25" />
              <rect x="236" y="164" width="80" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.25" />
              <rect x="220" y="195" width="200" height="105" rx="10" fill="#FBF8F3" stroke="#1a1815" strokeOpacity="0.1" />
              <g transform="translate(236,215)">
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={i * 32} y={40 - (i + 1) * 6} width="20" height={(i + 1) * 6 + 20} rx="3" fill={i === 4 ? '#D85A30' : '#47704C'} fillOpacity={i === 4 ? 1 : 0.6} />
                ))}
              </g>
            </g>
          </svg>
        </div>
      );
    case 'ember':
      return (
        <div className={`relative ${className} bg-[#2A231D]`}>
          <svg viewBox="0 0 500 400" className={common} preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="ember-glow" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#D85A30" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D85A30" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="500" height="400" fill="url(#ember-glow)" />
            {/* Phone frame */}
            <g transform="translate(180,40)">
              <rect x="0" y="0" width="140" height="320" rx="24" fill="#0F0E0C" stroke="#D85A30" strokeOpacity="0.4" />
              <rect x="10" y="10" width="120" height="300" rx="16" fill="#1A1815" />
              <rect x="55" y="16" width="30" height="4" rx="2" fill="#0F0E0C" />
              <rect x="22" y="40" width="60" height="8" rx="2" fill="#FBF8F3" />
              <rect x="22" y="52" width="40" height="4" rx="2" fill="#FBF8F3" fillOpacity="0.4" />
              {/* card */}
              <rect x="22" y="70" width="96" height="90" rx="10" fill="#26231F" />
              <circle cx="42" cy="100" r="12" fill="#D85A30" />
              <rect x="60" y="88" width="50" height="6" rx="2" fill="#FBF8F3" />
              <rect x="60" y="98" width="36" height="4" rx="2" fill="#FBF8F3" fillOpacity="0.5" />
              <rect x="22" y="126" width="96" height="4" rx="2" fill="#FBF8F3" fillOpacity="0.2" />
              <rect x="22" y="134" width="70" height="4" rx="2" fill="#FBF8F3" fillOpacity="0.2" />
              <rect x="22" y="142" width="80" height="4" rx="2" fill="#FBF8F3" fillOpacity="0.2" />
              {/* waveform */}
              <g transform="translate(22,180)">
                {Array.from({ length: 22 }).map((_, i) => {
                  const h = 6 + Math.abs(Math.sin(i * 0.6)) * 24;
                  return <rect key={i} x={i * 4.5} y={20 - h / 2} width="2" height={h} rx="1" fill="#D85A30" fillOpacity={i > 14 ? 0.35 : 1} />;
                })}
              </g>
              {/* controls */}
              <circle cx="49" cy="245" r="14" fill="#26231F" />
              <circle cx="70" cy="245" r="18" fill="#D85A30" />
              <polygon points="66,239 66,251 76,245" fill="#0F0E0C" />
              <circle cx="91" cy="245" r="14" fill="#26231F" />
              <rect x="22" y="275" width="96" height="22" rx="11" fill="#47704C" />
            </g>
            {/* Side chip */}
            <g transform="translate(50,60)">
              <rect x="0" y="0" width="90" height="60" rx="10" fill="#0F0E0C" />
              <rect x="10" y="12" width="30" height="5" rx="2" fill="#D85A30" />
              <rect x="10" y="24" width="60" height="8" rx="2" fill="#FBF8F3" />
              <rect x="10" y="38" width="40" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.4" />
            </g>
            <g transform="translate(360,220)">
              <rect x="0" y="0" width="100" height="70" rx="10" fill="#0F0E0C" />
              <rect x="10" y="12" width="50" height="6" rx="2" fill="#47704C" />
              <rect x="10" y="24" width="70" height="8" rx="2" fill="#FBF8F3" />
              <rect x="10" y="38" width="30" height="18" rx="9" fill="#D85A30" />
            </g>
          </svg>
        </div>
      );
    case 'kiln':
      return (
        <div className={`relative ${className} bg-[#EDE3D0]`}>
          <svg viewBox="0 0 500 400" className={common} preserveAspectRatio="xMidYMid slice">
            <g transform="translate(50,40)">
              <rect x="0" y="0" width="400" height="70" rx="10" fill="#FBF8F3" stroke="#1a1815" strokeOpacity="0.1" />
              <rect x="20" y="26" width="80" height="18" rx="4" fill="#0F0E0C" />
              <g transform="translate(220,32)">
                {['Shop', 'Journal', 'Studio', 'Cart'].map((t, i) => (
                  <text key={t} x={i * 46} y="6" fontFamily="Inter,sans-serif" fontSize="9" fill="#26231F">{t}</text>
                ))}
              </g>
              {/* product hero */}
              <rect x="0" y="90" width="240" height="220" rx="10" fill="#0F0E0C" />
              <g transform="translate(24,120)">
                <path d="M0 160 C 30 80 70 60 96 90 C 120 118 140 90 170 100 L 190 160 Z" fill="#D85A30" />
                <ellipse cx="96" cy="90" rx="30" ry="10" fill="#B8451E" />
              </g>
              <rect x="0" y="318" width="240" height="6" rx="2" fill="#0F0E0C" />
              {/* right column */}
              <rect x="260" y="90" width="140" height="105" rx="10" fill="#FBF8F3" stroke="#1a1815" strokeOpacity="0.1" />
              <rect x="278" y="110" width="80" height="8" rx="2" fill="#0F0E0C" />
              <rect x="278" y="126" width="60" height="6" rx="2" fill="#77716A" />
              <rect x="278" y="140" width="104" height="6" rx="2" fill="#77716A" />
              <rect x="278" y="150" width="94" height="6" rx="2" fill="#77716A" />
              <rect x="278" y="170" width="80" height="16" rx="8" fill="#47704C" />
              <rect x="260" y="205" width="140" height="105" rx="10" fill="#47704C" />
              <circle cx="290" cy="240" r="14" fill="#FBF8F3" fillOpacity="0.2" />
              <rect x="278" y="264" width="80" height="8" rx="2" fill="#FBF8F3" />
              <rect x="278" y="278" width="50" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.5" />
            </g>
          </svg>
        </div>
      );
    case 'atlas':
    default:
      return (
        <div className={`relative ${className} bg-[#0F0E0C]`}>
          <svg viewBox="0 0 500 400" className={common} preserveAspectRatio="xMidYMid slice">
            {/* faux map */}
            <g opacity="0.5" stroke="#47704C" strokeWidth="0.6" fill="none">
              {Array.from({ length: 10 }).map((_, i) => (
                <path key={i} d={`M0 ${40 + i * 40} C 120 ${20 + i * 40} 260 ${60 + i * 40} 500 ${30 + i * 40}`} />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <path key={`v${i}`} d={`M${i * 45} 0 C ${i * 45 + 20} 200 ${i * 45 - 20} 300 ${i * 45} 400`} />
              ))}
            </g>
            {/* Route */}
            <path d="M40 320 C 140 300 180 220 260 210 C 340 200 380 120 440 60" stroke="#D85A30" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="320" r="6" fill="#D85A30" />
            <circle cx="260" cy="210" r="6" fill="#FBF8F3" stroke="#D85A30" strokeWidth="2" />
            <circle cx="440" cy="60" r="8" fill="#D85A30" />
            {/* HUD */}
            <g transform="translate(30,30)">
              <rect x="0" y="0" width="160" height="72" rx="10" fill="#1A1815" stroke="#FBF8F3" strokeOpacity="0.1" />
              <rect x="14" y="14" width="60" height="6" rx="2" fill="#D85A30" />
              <rect x="14" y="26" width="120" height="12" rx="2" fill="#FBF8F3" />
              <rect x="14" y="46" width="80" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.4" />
              <rect x="14" y="56" width="60" height="6" rx="2" fill="#FBF8F3" fillOpacity="0.4" />
            </g>
            <g transform="translate(310,300)">
              <rect x="0" y="0" width="160" height="72" rx="10" fill="#1A1815" stroke="#FBF8F3" strokeOpacity="0.1" />
              <rect x="14" y="14" width="60" height="6" rx="2" fill="#47704C" />
              <rect x="14" y="26" width="90" height="14" rx="2" fill="#FBF8F3" />
              <rect x="14" y="46" width="132" height="6" rx="3" fill="#26231F" />
              <rect x="14" y="46" width="80" height="6" rx="3" fill="#D85A30" />
            </g>
          </svg>
        </div>
      );
  }
}
