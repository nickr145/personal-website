import { useEffect, useRef, useState } from 'react';

// Helper for circular sun/moon motion
function getArcPosition(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

export function AnimatedSky() {
  const DAY_LENGTH = 40; // seconds for a full cycle (sunrise to sunrise)
  const [time, setTime] = useState(0); // 0 to 1
  const requestRef = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    function animate(ts: number) {
      if (startRef.current === undefined) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setTime((elapsed % DAY_LENGTH) / DAY_LENGTH);
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
      startRef.current = undefined; // reset for remounts
    };
  }, []);

  // Sun/moon arc: 200deg (from 160deg to -40deg)
  const arcStart = 160;
  const arcEnd = -40;
  const angle = arcStart + (arcEnd - arcStart) * time;
  const cx = 50, cy = 60, r = 40;
  const sunPos = getArcPosition(cx, cy, r, angle);
  const moonAngle = ((angle + 180) + 360) % 360; // normalized
  const moonPos = getArcPosition(cx, cy, r, moonAngle);

  // Sky color stops
  let skyGradient;
  if (time < 0.18) {
    skyGradient = ['#f9d29d', '#f6f1d3', '#a1c4fd']; // Sunrise
  } else if (time < 0.45) {
    skyGradient = ['#87ceeb', '#f6f1d3', '#a1c4fd']; // Day
  } else if (time < 0.6) {
    skyGradient = ['#f9d29d', '#f6f1d3', '#fdc094']; // Sunset
  } else {
    skyGradient = ['#232946', '#232946', '#181d2b']; // Night
  }

  // Stars for night
  const showStars = time > 0.6 || time < 0.18;
  const [starSeeds] = useState(() =>
    Array.from({ length: 30 }, () => [Math.random(), Math.random(), Math.random()])
  );
  // Only render stars in the upper sky region (y < 40), small and subtle
  const stars = starSeeds.map(([x, y, r], i) => (
    <circle
      key={i}
      cx={x * 100}
      cy={y * 35} // restrict to top half of sky
      r={r * 0.25 + 0.12}
      fill="#fff"
      opacity={0.85}
    />
  ));

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
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="100" height="70" fill="url(#sky)" />

  {/* Stars (only at night, only in sky) */}
  {showStars && stars}

      {/* Sun */}
      {time < 0.6 && (
        <circle cx={sunPos.x} cy={sunPos.y} r="5" fill="#ffe066" filter="url(#sunGlow)" />
      )}

      {/* Moon */}
      {time >= 0.6 && (
        <circle
          cx={moonPos.x}
          cy={moonPos.y}
          r="4.5"
          fill="#fffbe6"
          stroke="#e0e0e0"
          strokeWidth="0.5"
        />
      )}

      {/* Mountains */}
      <polyline
        points="60,60 70,40 80,55 90,35 100,60"
        fill="none"
        stroke="#aaa"
        strokeWidth="1.2"
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

      {/* Distributed Trees Across Landscape */}
      <g>
        {/* Leftmost tree */}
        <rect x="4" y="59" width="1.2" height="7.5" fill="#8d5524" />
        <ellipse cx="4.6" cy="58" rx="2.5" ry="2.1" fill="#388e3c" />
        <ellipse cx="3.2" cy="60" rx="1.1" ry="0.8" fill="#4caf50" />
        <ellipse cx="6" cy="60" rx="1.1" ry="0.8" fill="#4caf50" />

        {/* Large central tree */}
        <rect x="15" y="54" width="1.7" height="12" fill="#a0522d" />
        <ellipse cx="15.85" cy="53" rx="4.2" ry="3.5" fill="#388e3c" />
        <ellipse cx="12.5" cy="56.5" rx="2" ry="1.5" fill="#4caf50" />
        <ellipse cx="19.2" cy="56.5" rx="2.2" ry="1.7" fill="#4caf50" />

        {/* Mid-right tree */}
        <rect x="35" y="58" width="1.1" height="7" fill="#8d5524" />
        <ellipse cx="35.55" cy="57" rx="2.7" ry="2.2" fill="#388e3c" />
        <ellipse cx="33.7" cy="59" rx="1.2" ry="0.9" fill="#4caf50" />
        <ellipse cx="37.4" cy="59" rx="1.2" ry="0.9" fill="#4caf50" />

        {/* Rightmost tree */}
        <rect x="60" y="60" width="0.9" height="5.5" fill="#a0522d" />
        <ellipse cx="60.45" cy="59.5" rx="2.1" ry="1.7" fill="#388e3c" />
        <ellipse cx="59.1" cy="61" rx="0.9" ry="0.6" fill="#4caf50" />
        <ellipse cx="61.8" cy="61" rx="0.9" ry="0.6" fill="#4caf50" />

        {/* Far right tree */}
        <rect x="85" y="58" width="1.3" height="7.5" fill="#8d5524" />
        <ellipse cx="85.65" cy="57" rx="2.6" ry="2.2" fill="#388e3c" />
        <ellipse cx="83.7" cy="59.5" rx="1.2" ry="0.9" fill="#4caf50" />
        <ellipse cx="87.6" cy="59.5" rx="1.2" ry="0.9" fill="#4caf50" />
      </g>
    </svg>
  );
}
