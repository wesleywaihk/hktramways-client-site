import Link from "next/link";
import BtnIcon from "@/components/icons/BtnIcon";
import ArrowIco from "@/components/icons/ArrowIco";
import { devClassName } from "@/lib/devClassName";
import type { IconEnum } from "@/types/api";
import "./Button.scss";

export type IconButtonColor = "green" | "white";
export type IconButtonShape = "circle" | "square";

export type IconButtonProps = {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel: string;
  reverse?: boolean;
  useArrow?: boolean;
  icon?: IconEnum | null;
  color?: IconButtonColor;
  shape?: IconButtonShape;
  className?: string;
};

const colorClasses: Record<IconButtonColor, string> = {
  green: "bg-white text-green hover:bg-green hover:text-white",
  white: "bg-green text-white hover:bg-white hover:text-green",
};

const shapeClasses: Record<IconButtonShape, string> = {
  circle: "rounded-full",
  square: "h-10 w-10 rounded-[14px] lg:h-11 lg:w-11 lg:rounded-[16px]",
};

export default function IconButton({
  href,
  target,
  rel,
  onClick,
  ariaLabel,
  reverse = false,
  useArrow = false,
  icon,
  color = "green",
  shape = "circle",
  className,
}: IconButtonProps) {
  const classes = [
    devClassName("icon-button"),
    "group place-items-center cursor-pointer border-2 border-transparent hover:border-white transition-colors duration-200 ease-out",
    shapeClasses[shape],
    colorClasses[color],
    reverse && "rotate-180",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="relative h-5 w-5 shrink-0 overflow-hidden">
      {useArrow ? (
        <ArrowIco
          className="absolute inset-0 m-auto h-5 w-5 group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
          aria-hidden="true"
        />
      ) : (
        <BtnIcon
          icon={icon}
          className="absolute inset-0 m-auto group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
        />
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
