type CloudVariant = 'large' | 'mid' | 'small' | 'cluster';

type Puff = { cx: number; cy: number; r: number; highlight?: boolean };

const SHAPES: Record<CloudVariant, Puff[]> = {
  large: [
    { cx: 0, cy: 0, r: 8 },
    { cx: 12, cy: 1, r: 10 },
    { cx: 26, cy: -0.5, r: 7 },
    { cx: 34, cy: 1, r: 6 },
    { cx: 10, cy: -2, r: 3, highlight: true },
  ],
  mid: [
    { cx: 0, cy: 0, r: 9 },
    { cx: 16, cy: 0.6, r: 7 },
    { cx: 30, cy: 0, r: 8 },
  ],
  small: [
    { cx: 0, cy: 0, r: 4 },
    { cx: 12, cy: 0.6, r: 5 },
    { cx: 24, cy: 0, r: 4.2 },
  ],
  cluster: [
    { cx: 0, cy: 0, r: 5 },
    { cx: 8, cy: 1, r: 6 },
    { cx: 18, cy: 0.6, r: 4 },
  ],
};

type Props = {
  x: number; // absolute SVG coords (0..100)
  y: number;
  scale?: number;
  variant?: CloudVariant;
  stroke?: string;
  strokeWidth?: number;
  blur?: boolean;
  opacity?: number;
};

export default function Cloud({
  x,
  y,
  scale = 1,
  variant = 'large',
  stroke = '#2b2c2e',
  strokeWidth = 0.7,
  blur = true,
  opacity = 1,
}: Props) {
  const puffs = SHAPES[variant];

  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
      <g filter={blur ? 'url(#cloudBlur)' : undefined} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <g fill="url(#cartoonCloud)">
          {puffs.map((p, i) => (
            <g key={i}>
              <circle cx={p.cx} cy={p.cy} r={p.r} />
              {p.highlight ? <circle cx={p.cx} cy={p.cy - p.r * 0.4} r={Math.max(1, p.r * 0.45)} fill="#ffffff" opacity={0.85} /> : null}
            </g>
          ))}
        </g>
      </g>
    </g>
  );
}
