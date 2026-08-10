export interface ChevronIconProps {
  /** flips to point up when the submenu is expanded (mobile accordion) */
  active?: boolean;
  /** desktop: always points right, ignoring `active` */
  desktop?: boolean;
  className?: string;
}

export default function ChevronIcon({
  active,
  desktop,
  className,
}: ChevronIconProps) {
  const rotation = desktop ? "rotate-[-90deg]" : active ? "rotate-180" : "";

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-200 ease-out ${rotation} ${className ?? ""}`}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
