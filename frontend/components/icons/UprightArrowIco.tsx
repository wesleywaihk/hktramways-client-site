import type { SVGProps } from "react";

export default function UprightArrowIco(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.83333 14.1666L14.1667 5.83329M14.1667 5.83329H5.83333M14.1667 5.83329V14.1666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
