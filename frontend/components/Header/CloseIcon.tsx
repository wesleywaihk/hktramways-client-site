export interface CloseIconProps {
  className?: string;
}

export default function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M5 5L21 21M21 5L5 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
