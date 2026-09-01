import BtnIcon from "@/components/icons/BtnIcon";
import type { IconEnum } from "@/types/api";
import { TRANSFORM_CLASS } from "./SouveniorCard";

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
      className={`text-green grid h-[10vw] w-[10vw] place-items-center rounded-full bg-white shadow-md ${TRANSFORM_CLASS} md:h-15 md:w-15 ${className}`}
    >
      <BtnIcon
        icon={icon}
        className="h-[6vw]! w-[6vw]! md:h-[30px]! md:w-[30px]!"
      />
    </div>
  );
}
