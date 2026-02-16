/**
 * Greater Guitars logo — "greater than" chevron mark
 *
 * Recreated as SVG from the original raster logo on greaterguitars.com.
 * Double-lined chevron (>) pointing right with "GUITARS" text, inside a circle.
 * Rendered in antique gold on transparent for dark backgrounds.
 */

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Logo({ size = 80, showText = true, className = "", style }: LogoProps) {
  const gold = "rgba(200, 170, 90, 0.9)";
  const goldMuted = "rgba(200, 170, 90, 0.5)";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={style}
    >
      {/* Circle border */}
      <circle cx="100" cy="100" r="94" stroke={goldMuted} strokeWidth="2.5" fill="none" />

      {/* Outer chevron */}
      <polyline
        points="55,40 145,100 55,160"
        stroke={gold}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner chevron — slightly offset inward */}
      <polyline
        points="72,55 148,100 72,145"
        stroke={gold}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* "GUITARS" text */}
      {showText && (
        <text
          x="100"
          y="178"
          textAnchor="middle"
          fill={gold}
          fontFamily='"Inter", sans-serif'
          fontSize="22"
          fontWeight="600"
          letterSpacing="3"
        >
          GUITARS
        </text>
      )}
    </svg>
  );
}
