import Link from "next/link";
import BtnIcon from "@/components/icons/BtnIcon";
import ArrowIco from "@/components/icons/ArrowIco";
import { devClassName } from "@/lib/devClassName";
import type { IconEnum } from "@/types/api";
import "./Button.scss";

export type ButtonVariant = "outline" | "solid" | "solid-light";
export type ButtonColor = "green" | "white";

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  useArrow?: boolean;
  startIcon?: IconEnum | null;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
};

const variantColorClasses: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  outline: {
    green:
      "border-green text-green bg-transparent hover:bg-green hover:text-white",
    white:
      "border-white text-white bg-transparent hover:bg-white hover:text-green",
  },
  solid: {
    green: "border-green bg-green text-white hover:bg-white hover:text-green",
    white: "border-white bg-white text-green hover:bg-green hover:text-white",
  },
  "solid-light": {
    green:
      "border-green bg-green text-white hover:bg-green-light hover:text-white",
    white:
      "border-white bg-white text-green hover:bg-green-light hover:text-white",
  },
};

const buttonClasses =
  "group inline-flex items-center justify-center gap-[10px] lg:gap-[14px] " +
  "px-5 py-3  lg:px-8 lg:py-4 min-h-[50px] lg:min-h-[60px] " +
  "rounded-[18px] lg:rounded-[21px] border-[2px] cursor-pointer " +
  "transition-colors duration-200 ease-out";

const Arrow = () => (
  <span className="relative h-5 w-5 shrink-0 overflow-hidden">
    <ArrowIco
      className="absolute inset-0 h-5 w-5 group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
      aria-hidden="true"
    />
  </span>
);

export default function Button({
  children,
  href,
  target,
  rel,
  onClick,
  className,
  useArrow = false,
  startIcon,
  variant = "outline",
  color = "green",
  disabled = false,
}: ButtonProps) {
  const classes = [
    buttonClasses,
    variantColorClasses[variant][color],
    disabled && "pointer-events-none cursor-not-allowed opacity-40",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {startIcon && (
        <span className="inline-flex shrink-0 transition-transform group-hover:scale-[115%]">
          <BtnIcon icon={startIcon} />
        </span>
      )}
      <span className="text-center font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] whitespace-nowrap uppercase lg:translate-y-[1px]">
        {children}
      </span>
      {useArrow && <Arrow />}
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={`${devClassName("button")}no-wrap flex flex-row ${classes}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${devClassName("button")}${classes}`}
    >
      {content}
    </button>
  );
}
