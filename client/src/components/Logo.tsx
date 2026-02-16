/**
 * Greater Guitars logo — "greater than" chevron mark
 * Updated for Zine Shop aesthetic — newsprint/orange on dark, ink on light.
 */

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  style?: React.CSSProperties;
  variant?: "light" | "dark"; // light = for dark backgrounds, dark = for light backgrounds
}

export default function Logo({ size = 80, showText = true, className = "", style, variant = "light" }: LogoProps) {
  const primary = variant === "light" ? "#f2efe8" : "#1a1a18";
  const accent = "#ff5e1a";
  const muted = variant === "light" ? "rgba(242, 239, 232, 0.4)" : "rgba(26, 26, 24, 0.3)";

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
      <circle cx="100" cy="100" r="94" stroke={muted} strokeWidth="2.5" fill="none" />

      {/* Outer chevron */}
      <polyline
        points="55,40 145,100 55,160"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner chevron */}
      <polyline
        points="72,55 148,100 72,145"
        stroke={primary}
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
          fill={primary}
          fontFamily='"DM Mono", monospace'
          fontSize="20"
          fontWeight="400"
          letterSpacing="4"
        >
          GUITARS
        </text>
      )}
    </svg>
  );
}
