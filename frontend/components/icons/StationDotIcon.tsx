import { devClassName } from "@/lib/devClassName";

export interface StationDotIconProps {
  className?: string;
}

export default function StationDotIcon({ className }: StationDotIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${devClassName("station-dot-icon")}${className ?? ""}`}
    >
      <circle cx="9" cy="9" r="8" fill="#007549" stroke="white" strokeWidth="2" />
      <circle cx="9" cy="9" r="3" fill="white" />
    </svg>
  );
}
