import Link from "next/link";
import ActionButtonIcon from "@/components/icons/actionButtonIcon";
import type { IconEnum } from "@/types/api";

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  useArrow?: boolean;
  startIcon?: IconEnum | null;
};

const buttonClasses =
  "group inline-flex items-center justify-center gap-2.5 lg:gap-3.5 " +
  "px-5 py-3.5 lg:px-6.5 lg:py-[19px] " +
  "rounded-[18px] lg:rounded-[21px] border-2 border-current bg-transparent cursor-pointer " +
  "font-sans text-[14px] leading-[157%] font-semibold uppercase tracking-[0.02em] whitespace-nowrap " +
  "hover:opacity-80 transition-opacity";

const Arrow = () => (
  <svg
    className="shrink-0 transition-transform translate-y-[1px] group-hover:translate-x-1"
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

export default function Button({
  children,
  href,
  onClick,
  className,
  useArrow = false,
  startIcon,
}: ButtonProps) {
  const classes = [buttonClasses, className].filter(Boolean).join(" ");

  const content = (
    <>
      {startIcon && (
        <span className="inline-flex shrink-0 transition-transform group-hover:scale-[115%]">
          <ActionButtonIcon icon={startIcon} />
        </span>
      )}
      <span className="translate-y-[1px]">{children}</span>
      {useArrow && <Arrow />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`flex flex-row no-wrap ${classes}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
