// No top-level React import required for JSX in this setup
import Tree from './Tree';
import Mountain from './Mountain';
import Cloud from './Cloud';

export function AnimatedSky() {

  // Sun/moon arcs and phase timing
  // We'll define phases as fractions of the cycle: dawn -> day -> dusk -> night
  // No phases needed for static grey sky

  // Plain static sky; no sun/moon motion when using light-grey background

  // Moon should start after a brief pause at night start. We'll define a moon window that begins at nightStart + PAUSE_LENGTH
  // and ends at nextDawnEnd - PAUSE_LENGTH so there's a hold at both transitions.
  // No moon calculations needed for plain grey background

  // Static light grey sky (user requested no animated sky elements)
  const skyGradient = ['#e6e7e8', '#e6e7e8', '#e6e7e8'];

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      viewBox="0 0 100 70"
      preserveAspectRatio="none"
    >
      {/* Sky gradient + filters */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyGradient[0]} />
          <stop offset="70%" stopColor={skyGradient[1]} />
          <stop offset="100%" stopColor={skyGradient[2]} />
        </linearGradient>
        <filter id="sunGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Cartoon cloud gradient and lighter soft edge for puffiness */}
        <linearGradient id="cartoonCloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e6e6e8" />
          <stop offset="100%" stopColor="#bdbfc2" />
        </linearGradient>
        <linearGradient id="cartoonShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9cbd0" />
          <stop offset="100%" stopColor="#9ea1a6" />
        </linearGradient>
        <filter id="cloudBlur" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="70" fill="url(#sky)" />

    {/* Modular clouds using Cloud component */}
    <g transform="translate(0,-2)" opacity={0.98}>
      <Cloud x={14} y={18} scale={0.9} variant="large" />
      <Cloud x={66} y={18} scale={1.1} variant="large" />
      <Cloud x={10} y={18} scale={0.9} variant="large" />
      <Cloud x={70} y={18} scale={1.1} variant="large" />
      <Cloud x={14} y={8} scale={0.9} variant="large" />
      <Cloud x={66} y={8} scale={1.1} variant="large" />
      <Cloud x={10} y={8} scale={0.9} variant="large" />
      <Cloud x={70} y={8} scale={1.1} variant="large" />
      <Cloud x={40} y={19} scale={0.95} variant="mid" />
      <Cloud x={28} y={12} scale={0.9} variant="mid" />
      <Cloud x={80} y={12} scale={0.95} variant="mid" />
      <Cloud x={0} y={12} scale={0.95} variant="mid" />
      <Cloud x={30} y={9} scale={0.95} variant="mid" />
      <Cloud x={18} y={2} scale={0.9} variant="mid" />
      <Cloud x={70} y={2} scale={0.95} variant="mid" />
      <Cloud x={100} y={2} scale={0.95} variant="mid" />
    </g>

      {/* No sun or moon — plain grey background per user preference */}

      {/* Mountains with snow peaks using Mountain component */}
      <Mountain
        points="60,70 70,40 80,55 90,35 100,70"
        fill="#7b8794"
        stroke="#aaa"
        strokeWidth={1.2}
        snowCaps={[
          { points: "69,43 70,40 71,43 70,44", fill: "#fff", opacity: 0.9 },
          { points: "89,38 90,35 91,38 90,39", fill: "#fff", opacity: 0.9 },
          { points: "78,57 80,55 82,57 80,58", fill: "#fff", opacity: 0.9 },
        ]}
      />

      {/* Grass + Dirt */}
      <g>
        <path
          d="M0,65 Q2,63 4,66 Q6,62 8,65 Q10,64 12,66 Q14,63 16,65 Q18,64 20,66 Q22,63 24,65 Q26,64 28,66 Q30,63 32,65 Q34,64 36,66 Q38,63 40,65 Q42,64 44,66 Q46,63 48,65 Q50,64 52,66 Q54,63 56,65 Q58,64 60,66 Q62,63 64,65 Q66,64 68,66 Q70,63 72,65 Q74,64 76,66 Q78,63 80,65 Q82,64 84,66 Q86,63 88,65 Q90,64 92,66 Q94,63 96,65 Q98,64 100,65 L100,70 L0,70 Z"
          fill="#4caf50"
          stroke="#2e8b57"
          strokeWidth="1.2"
        />
        <path
          d="M0,67 Q5,65 10,68 Q15,66 20,69 Q25,67 30,70 Q35,68 40,70 Q45,69 50,70 Q55,68 60,70 Q65,69 70,70 Q75,68 80,70 Q85,69 90,70 Q95,68 100,70 L100,74 L0,74 Z"
          fill="#388e3c"
          opacity="0.7"
        />
        <rect x="0" y="70" width="100" height="6" fill="#a0522d" />
        <ellipse cx="8" cy="68" rx="2.2" ry="1.1" fill="#388e3c" opacity="0.85" />
        <ellipse cx="28" cy="69.5" rx="1.5" ry="0.8" fill="#388e3c" opacity="0.7" />
        <ellipse cx="60" cy="69" rx="2" ry="1" fill="#388e3c" opacity="0.8" />
        <ellipse cx="18" cy="72.5" rx="1.1" ry="0.5" fill="#b0a99f" opacity="0.8" />
        <ellipse cx="75" cy="73" rx="1.5" ry="0.7" fill="#b0a99f" opacity="0.7" />
      </g>

      {/* Rain layer: thin blue dash-like drops. Rendered after grass/dirt so they appear in front of mountains/bushes but behind trees. */}
      {(() => {
        // deterministic pseudo-random generator per index (no hooks)
        const rnd = (n: number) => Math.abs(Math.sin(n * 12.9898 + 78.233) * 43758.5453) % 1;
        const drops = Array.from({ length: 120 }).map((_, i) => {
          const r1 = rnd(i);
          const r2 = rnd(i + 101);
          const r3 = rnd(i + 202);
          const x = +(r1 * 100).toFixed(2); // 0..100 (viewBox coords)
          const startY = +(6 + r2 * 12).toFixed(2); // start around cloud area
          const len = 2 + r3 * 3; // length of dash in viewBox units
          const delay = +(r3 * 2.4).toFixed(2);
          const dur = +(0.9 + r1 * 1.6).toFixed(2);
          // wind: small leftward x offset over duration
          const windStrength = 6; // how many viewBox units to move left at max
          const windOffset = +(r2 * windStrength).toFixed(2);
          return { x, startY, len, delay, dur, windOffset };
        });

        const endY = 74; // fall past viewBox bottom

        return (
          <g pointerEvents="none" aria-hidden="true">
            {drops.map((d, idx) => (
              <line
                key={idx}
                x1={d.x}
                x2={d.x}
                y1={d.startY}
                y2={d.startY + d.len}
                stroke="#4da6ff"
                strokeWidth={0.18}
                strokeLinecap="round"
                opacity={0.85}
              >
                  <animate
                    attributeName="y1"
                    from={String(d.startY)}
                    to={String(endY)}
                    dur={`${d.dur}s`}
                    begin={`${d.delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y2"
                    from={String(d.startY + d.len)}
                    to={String(endY + d.len)}
                    dur={`${d.dur}s`}
                    begin={`${d.delay}s`}
                    repeatCount="indefinite"
                  />
                  {/* horizontal drift to the left (light wind) */}
                  <animate
                    attributeName="x1"
                    from={String(d.x)}
                    to={String(Math.max(0, d.x - d.windOffset))}
                    dur={`${d.dur}s`}
                    begin={`${d.delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from={String(d.x)}
                    to={String(Math.max(0, d.x - d.windOffset))}
                    dur={`${d.dur}s`}
                    begin={`${d.delay}s`}
                    repeatCount="indefinite"
                  />
                <animate attributeName="opacity" values="0.9;0.9;0" keyTimes="0;0.95;1" dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>
        );
      })()}

      {/* Distributed Trees Across Landscape using Tree component */}
      <g>
        {/* Leftmost tree */}
        <Tree x={5} y={61} scale={0.6} trunkColor="#8d5524" leafColor="#388e3c" />
        {/* Large central tree */}
        <Tree x={16} y={56} scale={1.1} trunkColor="#a0522d" leafColor="#388e3c" />
        {/* Mid-right tree */}
        <Tree x={36} y={60} scale={0.7} trunkColor="#8d5524" leafColor="#388e3c" />
        {/* Rightmost tree */}
        <Tree x={61} y={62} scale={0.5} trunkColor="#a0522d" leafColor="#388e3c" />
        {/* Far right tree */}
        <Tree x={86} y={60} scale={0.7} trunkColor="#8d5524" leafColor="#388e3c" />
      </g>
    </svg>
  );
}
