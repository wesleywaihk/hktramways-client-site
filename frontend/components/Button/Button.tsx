import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const buttonClasses =
  "inline-flex items-center justify-center gap-2.5 lg:gap-3.5 " +
  "px-5 py-3.5 lg:px-7 lg:py-[19px] " +
  "rounded-[18px] lg:rounded-[21px] border-2 border-current bg-transparent cursor-pointer " +
  "font-sans text-[14px] leading-[157%] font-semibold uppercase tracking-[0.02em] whitespace-nowrap " +
  "hover:opacity-80 transition-opacity";

function Arrow() {
  return (
    <svg
      className="shrink-0"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button({ children, href, onClick, className }: ButtonProps) {
  const classes = [buttonClasses, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        <Arrow />
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
}
