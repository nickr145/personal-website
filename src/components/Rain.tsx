type Intensity = 'light' | 'medium' | 'heavy';

type Props = {
  intensity?: Intensity;
  windDirection?: 'left' | 'right' | 'none';
  windStrength?: number; // in viewBox units
};

import { useContext } from 'preact/hooks';
import MotionContext from '../contexts/MotionContext';

export default function Rain({ intensity = 'medium', windDirection = 'left', windStrength = 6 }: Props) {
  const ctx = useContext(MotionContext as any) as { reduceMotion: boolean } | null;
  const reduceMotion = ctx ? ctx.reduceMotion : (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);
  // drop counts per intensity
  const counts: Record<Intensity, number> = { light: 60, medium: 120, heavy: 220 };
  const dropCount = counts[intensity];

  // deterministic pseudo-random generator (pure, repeatable)
  const rnd = (n: number) => Math.abs(Math.sin(n * 12.9898 + 78.233) * 43758.5453) % 1;

  const drops = Array.from({ length: dropCount }).map((_, i) => {
    const r1 = rnd(i);
    const r2 = rnd(i + 101);
    const r3 = rnd(i + 202);
    const x = +(r1 * 100).toFixed(2);
    const startY = +(6 + r2 * 12).toFixed(2);
    const len = 2 + r3 * 3;
    const delay = +(r3 * 2.4).toFixed(2);
    const dur = +(0.9 + r1 * 1.6).toFixed(2);
    const windOffset = +(r2 * windStrength).toFixed(2);
    return { x, startY, len, delay, dur, windOffset };
  });

  const endY = 74;

  // compute target X based on wind direction
  const targetX = (x: number, offset: number) => {
    if (windDirection === 'left') return Math.max(0, x - offset);
    if (windDirection === 'right') return Math.min(100, x + offset);
    return x;
  };

  if (reduceMotion) {
    // Render non-animated, faint static drops for reduced-motion users
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
            strokeWidth={0.14}
            strokeLinecap="round"
            opacity={0.5}
          />
        ))}
      </g>
    );
  }

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
          <animate attributeName="y1" from={String(d.startY)} to={String(endY)} dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
          <animate attributeName="y2" from={String(d.startY + d.len)} to={String(endY + d.len)} dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.9;0" keyTimes="0;0.95;1" dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
          <animate attributeName="x1" from={String(d.x)} to={String(targetX(d.x, d.windOffset))} dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
          <animate attributeName="x2" from={String(d.x)} to={String(targetX(d.x, d.windOffset))} dur={`${d.dur}s`} begin={`${d.delay}s`} repeatCount="indefinite" />
        </line>
      ))}
    </g>
  );
}
