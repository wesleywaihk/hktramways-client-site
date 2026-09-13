import { devClassName } from "@/lib/devClassName";

export interface HamburgerIconProps {
  className?: string;
}

const Stroke = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute right-0 left-0 h-[0.125rem] w-full rounded-[clamp(0.1rem,0.1388888889vw,0.1875rem)] bg-current ${className}`}
  />
);

export default function HamburgerIcon({ className = "" }: HamburgerIconProps) {
  return (
    <div
      className={`${devClassName("hamburger-icon")}relative h-full w-full ${className}`}
    >
      <Stroke className="top-0" />
      <Stroke className="top-1/2 -translate-y-1/2 transform" />
      <Stroke className="bottom-0" />
    </div>
  );
}
