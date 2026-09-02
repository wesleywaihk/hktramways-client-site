import BtnIcon from "@/components/icons/BtnIcon";
import { devClassName } from "@/lib/devClassName";
import type { IconEnum } from "@/types/api";

interface SouveniorIconProps {
  icon?: IconEnum | null;
  className?: string;
}

export default function SouveniorIcon({
  icon,
  className = "",
}: SouveniorIconProps) {
  if (!icon) return null;
  return (
    <div
      className={`${devClassName("souvenior-icon")}text-green grid h-[10vw] w-[10vw] place-items-center rounded-full bg-white shadow-md md:h-15 md:w-15 lg:h-[60px] lg:w-[60px] ${className}`}
    >
      <BtnIcon
        icon={icon}
        className="h-[5.5vw]! w-[5.5vw]! md:h-[24.93px]! md:w-[24.93px]!"
      />
    </div>
  );
}
