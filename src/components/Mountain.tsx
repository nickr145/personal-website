import React from "react";

interface MountainProps {
  points: string; // SVG points string
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  snowCaps?: Array<{
    points: string;
    fill?: string;
    opacity?: number;
  }>;
}

/**
 * Mountain SVG component for use in AnimatedSky or other backgrounds.
 * points: SVG polygon points for the mountain shape
 * fill: main mountain color
 * stroke: outline color
 * snowCaps: array of snow cap polygons (optional)
 */
const Mountain: React.FC<MountainProps> = ({
  points,
  fill = "#7b8794",
  stroke = "#aaa",
  strokeWidth = 1.2,
  snowCaps = [],
}) => (
  <g>
    <polygon points={points} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    {snowCaps.map((cap, i) => (
      <polygon
        key={i}
        points={cap.points}
        fill={cap.fill || "#fff"}
        opacity={cap.opacity ?? 0.9}
      />
    ))}
  </g>
);

export default Mountain;
