export interface ExchangeArrowProps {
  className?: string;
}

export default function ExchangeArrow({ className }: ExchangeArrowProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      <path
        d="M21.7 9.3L17.7 5.3C17.3 4.9 16.7 4.9 16.3 5.3C15.9 5.7 15.9 6.3 16.3 6.7L18.6 9H7.00002C6.40002 9 6.00002 9.4 6.00002 10C6.00002 10.6 6.40002 11 7.00002 11H21C21.4 11 21.8 10.8 21.9 10.4C22.1 10 22 9.6 21.7 9.3ZM17 13H3.00002C2.60002 13 2.20002 13.2 2.10002 13.6C1.90002 14 2.00002 14.4 2.30002 14.7L6.30002 18.7C6.70002 19.1 7.30002 19.1 7.70002 18.7C8.10002 18.3 8.10002 17.7 7.70002 17.3L5.40002 15H17C17.6 15 18 14.6 18 14C18 13.4 17.6 13 17 13Z"
        fill="currentColor"
      />
    </svg>
  );
}
