export interface HamburgerIconProps {
  open: boolean;
  className?: string;
}

const bar =
  "absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out transform-gpu will-change-transform ";

export default function HamburgerIcon({ open, className }: HamburgerIconProps) {
  return (
    <span
      className={`relative block w-[22px] h-9 cursor-pointer ${className ?? ""}`}
    >
      <span
        className={`${bar} ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[7px]"
        }`}
      />
      <span
        className={`${bar} top-1/2 -translate-y-1/2 will-change-opacity ${
          open ? "opacity-0 scale-x-0" : "opacity-100"
        }`}
      />
      <span
        className={`${bar} ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-[7px]"
        }`}
      />
    </span>
  );
}
