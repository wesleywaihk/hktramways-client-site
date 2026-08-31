import Link from "next/link";
import BtnIcon from "@/components/icons/BtnIcon";
import ArrowIco from "@/components/icons/ArrowIco";
import type { IconEnum } from "@/types/api";
import "./Button.scss";

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
  "p-[15px] lg:px-[28px] lg:py-[19px] " +
  "rounded-[18px] lg:rounded-[21px] border-2 cursor-pointer " +
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
  onClick,
  className,
  useArrow = false,
  startIcon,
  variant = "outline",
  color = "green",
}: ButtonProps) {
  const classes = [
    buttonClasses,
    variantColorClasses[variant][color],
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
      <span className="translate-y-[1px] text-center font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] whitespace-nowrap uppercase">
        {children}
      </span>
      {useArrow && <Arrow />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`no-wrap flex flex-row ${classes}`}>
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
