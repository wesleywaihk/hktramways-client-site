import BtnIcon from "@/components/icons/BtnIcon";
import ArrowIco from "@/components/icons/ArrowIco";
import type { IconEnum } from "@/types/api";
import "./Button.scss";

export type IconButtonColor = "green" | "white";

export type IconButtonProps = {
  onClick?: () => void;
  ariaLabel: string;
  reverse?: boolean;
  useArrow?: boolean;
  icon?: IconEnum | null;
  color?: IconButtonColor;
  className?: string;
};

const colorClasses: Record<IconButtonColor, string> = {
  green: "bg-white text-green hover:bg-green hover:text-white",
  white: "bg-green text-white hover:bg-white hover:text-green",
};

export default function IconButton({
  onClick,
  ariaLabel,
  reverse = false,
  useArrow = false,
  icon,
  color = "green",
  className,
}: IconButtonProps) {
  const classes = [
    "group place-items-center cursor-pointer rounded-full border-2 border-transparent hover:border-white transition-colors duration-200 ease-out",
    colorClasses[color],
    reverse && "rotate-180",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes}
    >
      <span className="relative h-5 w-5 shrink-0 overflow-hidden">
        {useArrow ? (
          <ArrowIco
            className="absolute inset-0 m-auto group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
            aria-hidden="true"
          />
        ) : (
          <BtnIcon
            icon={icon}
            className="absolute inset-0 m-auto group-hover:[animation:btn-arrow-slide-in_0.5s_ease]"
          />
        )}
      </span>
    </button>
  );
}
