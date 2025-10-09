import { useEffect, useRef, useState } from 'react';
import Tree from './Tree';
import Mountain from './Mountain';

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

  // Sun/moon arcs and phase timing
  // We'll define phases as fractions of the cycle: dawn -> day -> dusk -> night
  const PHASES = {
    dawnEnd: 0.18, // end of dawn / start of day
    dayEnd: 0.45, // end of day / start of dusk
    duskEnd: 0.6, // end of dusk / start of night
  };

  // Pause fraction of cycle after set / before rise to hold sky at horizon for a moment
  const PAUSE_LENGTH = 0.06; // 6% of cycle (~2.4s with DAY_LENGTH=40s)

  // Arc: we want the sun to travel from left horizon (arcStart) down to right horizon (arcEnd)
  // Represented as degrees along an arc; use full 200deg sweep for sun path
  const arcStart = 200; // left-horizon-ish angle in degrees
  const arcEnd = -20; // right-horizon-ish
  const cx = 50, cy = 60, r = 40;

  // Compute sunAngle as continuous function mapped to [0..1] across sun-active window which ends at duskEnd
  // Sun active window: from start of cycle (time=0) until duskEnd
  const sunWindowStart = 0;
  const sunWindowEnd = PHASES.duskEnd;
  // Map time within sun window (clamped) to [0,1]
  let sunProgress = 0;
  if (time <= sunWindowEnd) {
    sunProgress = Math.max(0, Math.min(1, (time - sunWindowStart) / (sunWindowEnd - sunWindowStart)));
  } else {
    sunProgress = 1; // after sun window we keep sun below horizon (no progress)
  }
  const sunAngle = arcStart + (arcEnd - arcStart) * sunProgress;
  const sunPos = getArcPosition(cx, cy, r, sunAngle);
  // Fade parameters (fractions of cycle)
  const FADE_LENGTH = 0.06; // ~2.4s

  // Sun opacity: fade out approaching duskEnd, fade in after dawn start
  let sunOpacity = 0;
  // compute sun window in continuous terms
  const sunStartCont = sunWindowStart;
  const sunEndCont = sunWindowEnd;
  // use same FADE_LENGTH as moon for consistency
  if (time >= sunStartCont && time <= sunEndCont) {
    const edge = Math.min(time - sunStartCont, sunEndCont - time);
    const edgeFrac = Math.min(1, edge / FADE_LENGTH);
    sunOpacity = Math.max(0.02, edgeFrac);
  } else if (time < sunStartCont && time >= sunStartCont - FADE_LENGTH) {
    sunOpacity = (time - (sunStartCont - FADE_LENGTH)) / FADE_LENGTH;
  } else if (time > sunEndCont && time <= sunEndCont + FADE_LENGTH) {
    sunOpacity = 1 - (time - sunEndCont) / FADE_LENGTH;
  }
  sunOpacity = Math.max(0, Math.min(1, sunOpacity));

  // Moon should start after a brief pause at night start. We'll define a moon window that begins at nightStart + PAUSE_LENGTH
  // and ends at nextDawnEnd - PAUSE_LENGTH so there's a hold at both transitions.
  const nightStart = PHASES.duskEnd;
  const nextDawnEnd = PHASES.dawnEnd + 1.0; // wrap
  const moonWindowStart = nightStart + PAUSE_LENGTH;
  const moonWindowEnd = nextDawnEnd - PAUSE_LENGTH;
  let moonProgress = 0;
  // Compute moon position mapped to the moon window (so the moon completes its arc inside the visible moon window)
  // Handle wrap-around: moonWindowEnd may be > 1
  const computeMoonProgressForTime = (t: number) => {
    // normalize t into continuous scale where moonWindowStart < moonWindowEnd
    let tCont = t;
    if (t < moonWindowStart) tCont = t + 1;
    const windowStart = moonWindowStart;
    const windowEnd = moonWindowEnd; // > windowStart on continuous scale
    const raw = (tCont - windowStart) / (windowEnd - windowStart);
    return Math.max(0, Math.min(1, raw));
  };

  moonProgress = computeMoonProgressForTime(time);
  const moonAngle = arcStart + (arcEnd - arcStart) * moonProgress;
  const moonPos = getArcPosition(cx, cy, r, moonAngle);
  // helper to check membership in moon window (wrap-aware)
  const inMoonWindow = (t: number) => {
    if (moonWindowStart < moonWindowEnd) return t >= moonWindowStart && t <= moonWindowEnd;
    return t >= moonWindowStart || t <= (moonWindowEnd % 1);
  };

  // Compute moon opacity: ramp in before moonWindowStart and ramp out after moonWindowEnd (using continuous tCont)
  let moonOpacity = 0;
  // convert time into continuous scale anchored at nightStart for easier comparisons
  let tCont = time >= nightStart ? time : time + 1;
  const moonStartCont = moonWindowStart;
  const moonEndCont = moonWindowEnd; // already > moonStartCont
  if (tCont >= moonStartCont && tCont <= moonEndCont) {
    // inside main window -> full visibility
    // but allow small fade near edges
    const edge = Math.min(tCont - moonStartCont, moonEndCont - tCont);
    const edgeFrac = Math.min(1, edge / FADE_LENGTH);
    moonOpacity = Math.max(0.02, edgeFrac);
  } else if (tCont >= moonStartCont - FADE_LENGTH && tCont < moonStartCont) {
    // fading in
    moonOpacity = (tCont - (moonStartCont - FADE_LENGTH)) / FADE_LENGTH;
  } else if (tCont > moonEndCont && tCont <= moonEndCont + FADE_LENGTH) {
    // fading out
    moonOpacity = 1 - (tCont - moonEndCont) / FADE_LENGTH;
  }
  moonOpacity = Math.max(0, Math.min(1, moonOpacity));

  // Sky color palettes for key phases
  const SKY_PALETTES = {
    dawn: ['#f9d29d', '#f6f1d3', '#a1c4fd'],
    day: ['#87ceeb', '#f6f1d3', '#a1c4fd'],
    dusk: ['#f9d29d', '#f6f1d3', '#fdc094'],
    night: ['#232946', '#232946', '#181d2b'],
  } as const;

  // Interpolate between palettes based on time for gentle transitions.
  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  function interpColor(c1: string, c2: string, t: number) {
    // Simple hex color interpolation
    const p1 = parseInt(c1.replace('#', ''), 16);
    const p2 = parseInt(c2.replace('#', ''), 16);
    const r1 = (p1 >> 16) & 0xff;
    const g1 = (p1 >> 8) & 0xff;
    const b1 = p1 & 0xff;
    const r2 = (p2 >> 16) & 0xff;
    const g2 = (p2 >> 8) & 0xff;
    const b2 = p2 & 0xff;
    const r = Math.round(lerp(r1, r2, t));
    const g = Math.round(lerp(g1, g2, t));
    const b = Math.round(lerp(b1, b2, t));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }

  // Determine which two palettes to blend between and blend factor
  let skyGradient: string[];
  if (time < PHASES.dawnEnd) {
    // dawn -> early day blend
    const t = time / PHASES.dawnEnd; // 0..1
    skyGradient = [
      interpColor(SKY_PALETTES.dawn[0], SKY_PALETTES.day[0], t),
      interpColor(SKY_PALETTES.dawn[1], SKY_PALETTES.day[1], t),
      interpColor(SKY_PALETTES.dawn[2], SKY_PALETTES.day[2], t),
    ];
  } else if (time < PHASES.dayEnd) {
    // day (stable)
    skyGradient = SKY_PALETTES.day.slice();
  } else if (time < PHASES.duskEnd) {
    // day -> dusk blend
    const t = (time - PHASES.dayEnd) / (PHASES.duskEnd - PHASES.dayEnd);
    skyGradient = [
      interpColor(SKY_PALETTES.day[0], SKY_PALETTES.dusk[0], t),
      interpColor(SKY_PALETTES.day[1], SKY_PALETTES.dusk[1], t),
      interpColor(SKY_PALETTES.day[2], SKY_PALETTES.dusk[2], t),
    ];
  } else {
    // dusk -> night -> dawn blend (wrap). We'll compute a blended factor where 0 at duskEnd and 1 at next dawnEnd
    const segmentStart = PHASES.duskEnd;
    const segmentEnd = PHASES.dawnEnd + 1.0;
    let segT = (time >= segmentStart ? (time - segmentStart) : (time + 1 - segmentStart)) / (segmentEnd - segmentStart);
    segT = Math.max(0, Math.min(1, segT));
    // Blend dusk->night at first half, then night->dawn at second half for a smoother loop
    if (segT < 0.5) {
      const t = segT * 2; // 0..1 for dusk->night
      skyGradient = [
        interpColor(SKY_PALETTES.dusk[0], SKY_PALETTES.night[0], t),
        interpColor(SKY_PALETTES.dusk[1], SKY_PALETTES.night[1], t),
        interpColor(SKY_PALETTES.dusk[2], SKY_PALETTES.night[2], t),
      ];
    } else {
      const t = (segT - 0.5) * 2; // 0..1 for night->dawn
      skyGradient = [
        interpColor(SKY_PALETTES.night[0], SKY_PALETTES.dawn[0], t),
        interpColor(SKY_PALETTES.night[1], SKY_PALETTES.dawn[1], t),
        interpColor(SKY_PALETTES.night[2], SKY_PALETTES.dawn[2], t),
      ];
    }
  }

  // Stars for night
  // Star visibility ramps in/out smoothly across dusk and dawn, but respect PAUSE so stars appear after the pause
  const nightWindowStart = PHASES.duskEnd + PAUSE_LENGTH;
  const rampLen = 0.12; // fraction of cycle to ramp in/out
  let starFactor = 0;
  if (time >= nightWindowStart || time < (PHASES.dawnEnd)) {
    // if within night sensible region, compute distance to nearest edge to determine ramp
    // handle wrapped regions by normalizing into [0,1..]
    let tNorm = time;
    if (time < nightWindowStart) tNorm = time + 1;
    const startNorm = nightWindowStart;
    const endNorm = nextDawnEnd - PAUSE_LENGTH;
    const progress = Math.max(0, Math.min(1, (tNorm - startNorm) / (endNorm - startNorm)));
    // ramp from 0..1 over first rampLen portion and ramp down over last rampLen portion
    if (progress < rampLen) starFactor = progress / rampLen;
    else if (progress > 1 - rampLen) starFactor = (1 - progress) / rampLen;
    else starFactor = 1;
  }
  starFactor = Math.max(0, Math.min(1, starFactor));
  // More stars, color variation, and twinkling
  const STAR_COUNT = 60;
  const STAR_COLORS = ["#fff", "#ffe9b0", "#b0d0ff"];
  const [starSeeds] = useState(() =>
    Array.from({ length: STAR_COUNT }, () => [Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * STAR_COLORS.length)])
  );
  // Twinkling: animate opacity with time and a phase offset
  const stars = starSeeds.map(([x, y, r, colorIdx], i) => {
    // Twinkle: use time and index for phase
    const twinkle = 0.6 + 0.4 * Math.abs(Math.sin(time * 2 * Math.PI * 2 + i));
    return (
      <circle
        key={i}
        cx={x * 100}
        cy={y * 35}
        r={r * 0.22 + 0.10}
        fill={STAR_COLORS[colorIdx as number]}
        opacity={twinkle * starFactor}
        style={{ transition: 'opacity 0.3s' }}
      />
    );
  });

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

    {/* Stars (visible as a ramp in/out) */}
    {starFactor > 0 && stars}

      {/* Sun: render until duskEnd (sun fully sets) */}
      {time < PHASES.duskEnd && (
        <circle
          cx={sunPos.x}
          cy={sunPos.y}
          r="5"
          fill="#ffe066"
          filter="url(#sunGlow)"
          opacity={sunOpacity}
          style={{ transition: 'opacity 1s linear' }}
        />
      )}

      {/* Moon: render only when computed to be in the moon window (avoid showing default 0,0) */}
      {inMoonWindow(time) && (
        <circle
          cx={moonPos.x}
          cy={moonPos.y}
          r="4.5"
          fill="#fffbe6"
          stroke="#e0e0e0"
          strokeWidth="0.5"
          opacity={moonOpacity}
          style={{ transition: 'opacity 1s linear' }}
        />
      )}

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
