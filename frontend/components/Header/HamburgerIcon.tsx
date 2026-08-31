export interface HamburgerIconProps {
  open: boolean;
  className?: string;
}

const bar =
  "absolute left-0 w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ease-out";

export default function HamburgerIcon({ open, className }: HamburgerIconProps) {
  return (
    <span
      className={`relative block h-9 w-[22px] transform-gpu cursor-pointer transition-transform duration-300 ease-out hover:scale-90 lg:w-[26px] ${className ?? ""}`}
    >
      <span className={`${bar} top-[7px]`} />
      <span
        className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span className={`${bar} bottom-[7px]`} />
    </span>
  );
}
