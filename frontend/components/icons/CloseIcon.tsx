import { devClassName } from "@/lib/devClassName";

export interface CloseIconProps {
  className?: string;
}

export default function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${devClassName("close-icon")}${className ?? ""}`}
    >
      <line
        x1="2.41421"
        y1="1"
        x2="27"
        y2="25.5858"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="35.7696"
        y2="-1"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 27 1)"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
