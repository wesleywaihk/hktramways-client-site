export interface HamburgerIconProps {
  open: boolean;
  className?: string;
}

export default function HamburgerIcon({
  open,
  className = "",
}: HamburgerIconProps) {
  return (
    <svg
      width="22"
      height="36"
      viewBox="0 0 22 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="1"
        y1="9"
        x2="21"
        y2="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="17"
        x2="21"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="25"
        x2="21"
        y2="25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
