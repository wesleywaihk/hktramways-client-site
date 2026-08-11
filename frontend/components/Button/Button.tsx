import Link from "next/link";
import BtnIcon from "@/components/icons/BtnIcon";
import type { IconEnum } from "@/types/api";

export type ButtonVariant = "outline" | "solid" | "solid-light";
export type ButtonColor = "green" | "white";

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  useArrow?: boolean;
  startIcon?: IconEnum | null;
  variant?: ButtonVariant;
  color?: ButtonColor;
};

const variantColorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  outline: {
    green: "border-green text-green bg-transparent hover:bg-green hover:text-white",
    white: "border-white text-white bg-transparent hover:bg-white hover:text-green",
  },
  solid: {
    green: "border-green bg-green text-white hover:bg-white hover:text-green",
    white: "border-white bg-white text-green hover:bg-green hover:text-white",
  },
  "solid-light": {
    green: "border-green bg-green text-white hover:bg-green-light hover:text-white",
    white: "border-white bg-white text-green hover:bg-green-light hover:text-white",
  },
};

const buttonClasses =
  "group inline-flex items-center justify-center gap-2.5 lg:gap-3.5 " +
  "px-5 py-3.5 lg:px-6.5 lg:py-[19px] " +
  "rounded-[18px] lg:rounded-[21px] border-2 cursor-pointer " +
  "font-sans text-[14px] leading-[157%] font-semibold uppercase tracking-[0.02em] whitespace-nowrap " +
  "transition-colors duration-200 ease-out";

const Arrow = () => (
  <span className="relative shrink-0 translate-y-[1px] w-4 h-4 overflow-hidden">
    <svg
      className="absolute inset-0 group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
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
  </span>
);

export default function Button({
  children,
  href,
  onClick,
  className,
  useArrow = false,
  startIcon,
  variant = "outline",
  color = "green",
}: ButtonProps) {
  const classes = [buttonClasses, variantColorClasses[variant][color], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {startIcon && (
        <span className="inline-flex shrink-0 transition-transform group-hover:scale-[115%]">
          <BtnIcon icon={startIcon} />
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
