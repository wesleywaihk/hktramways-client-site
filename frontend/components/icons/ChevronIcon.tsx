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
  const rotation = desktop ? 0 : active ? 90 : -90;

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`gpu-transform transition-transform duration-300 ease-out ${className ?? ""}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M8.99166 20.2583C8.55833 19.825 8.55833 19.175 8.99166 18.7417L14.7333 13L8.99166 7.25834C8.55833 6.825 8.55833 6.17501 8.99166 5.74167C9.425 5.30834 10.075 5.30834 10.5083 5.74167L17.0083 12.2417C17.4417 12.675 17.4417 13.325 17.0083 13.7583L10.5083 20.2583C10.075 20.6917 9.425 20.6917 8.99166 20.2583Z"
        fill="currentColor"
      />
    </svg>
  );
}
