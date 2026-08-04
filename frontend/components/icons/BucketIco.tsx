import type { SVGProps } from "react";

export default function BucketIco(props: SVGProps<SVGSVGElement>) {
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
        d="M3.33333 7.5H16.6667L15.4132 16.0225C15.3072 16.7439 14.6795 17.2778 13.9333 17.2778H6.06667C5.32054 17.2778 4.69285 16.7439 4.58681 16.0225L3.33333 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 4.16663C7.5 3.24615 8.24619 2.49996 9.16667 2.49996H10.8333C11.7538 2.49996 12.5 3.24615 12.5 4.16663V7.49996H7.5V4.16663Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
