import BtnIcon from "@/components/icons/BtnIcon";
import ArrowIco from "@/components/icons/ArrowIco";
import type { IconEnum } from "@/types/api";

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
  green: "bg-white text-green",
  white: "bg-green text-white",
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
    "group place-items-center cursor-pointer rounded-full",
    colorClasses[color],
    reverse && "rotate-180",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className={classes}>
      <span className="relative shrink-0 w-5 h-5 overflow-hidden">
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
