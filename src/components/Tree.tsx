import React from "react";

interface TreeProps {
  x: number;
  y: number;
  scale?: number;
  trunkColor?: string;
  leafColor?: string;
}

/**
 * Tree SVG component for use in AnimatedSky or other backgrounds.
 * x, y: position in SVG coordinates
 * scale: size multiplier (default 1)
 * trunkColor: color of the trunk (default brown)
 * leafColor: color of the leaves (default green)
 */
const Tree: React.FC<TreeProps> = ({
  x,
  y,
  scale = 1,
  trunkColor = "#8B5A2B",
  leafColor = "#228B22",
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale*0.5})`}>
    {/* Trunk */}
    <rect x="-5" y="0" width="10" height="30" rx="2" fill={trunkColor} />
    {/* Leaves (simple 3-ellipse cluster) */}
    <ellipse cx="0" cy="-5" rx="18" ry="14" fill={leafColor} />
    <ellipse cx="-10" cy="5" rx="10" ry="8" fill={leafColor} />
    <ellipse cx="10" cy="5" rx="10" ry="8" fill={leafColor} />
  </g>
);

export default Tree;
