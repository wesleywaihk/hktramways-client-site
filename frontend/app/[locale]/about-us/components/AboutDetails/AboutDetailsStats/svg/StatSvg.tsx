import type { ReactNode } from "react";

const LABEL_LINE_HEIGHT = 22;
// Per design, each extra label line lifts the whole graphic by this much so it
// stays visually centered in the circle.
const EXTRA_LINE_LIFT = 6;

export interface StatSvgProps {
  value: number;
  /** A string for a one-line label, or an array for one line per entry. */
  label: string | string[];
  /** Small suffix after the number on the same baseline, e.g. "km". */
  unit?: string;
  /**
   * Icon paths, drawn in the 300×300 viewBox for the one-line layout
   * (icon spanning y 62–112, above the number).
   */
  children: ReactNode;
  className?: string;
}

/** Circular stat graphic: icon, number and label, all centered. */
export default function StatSvg({
  value,
  label,
  unit,
  children,
  className = "",
}: StatSvgProps) {
  const lines = Array.isArray(label) ? label : [label];
  const lift = (lines.length - 1) * EXTRA_LINE_LIFT;

  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${value}${unit ? ` ${unit}` : ""} ${lines.join(" ")}`}
      className={`text-green aspect-square h-auto w-full ${className}`}
    >
      <circle cx="150" cy="150" r="150" fill="var(--color-earth-light)" />

      <g
        fill="currentColor"
        transform={lift ? `translate(0 ${-lift})` : undefined}
      >
        <g>{children}</g>

        {/* Number and unit are one text run, so they center together. */}
        <text
          x="150"
          y="192"
          textAnchor="middle"
          fontSize="80"
          fontWeight="600"
        >
          {String(value).padStart(2, "0")}
          {unit && (
            <tspan dx="4" fontSize="20" fontWeight="500">
              {unit}
            </tspan>
          )}
        </text>
        <text textAnchor="middle" fontSize="20" fontWeight="500">
          {lines.map((line, i) => (
            <tspan key={i} x="150" y={225 + i * LABEL_LINE_HEIGHT}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    </svg>
  );
}
