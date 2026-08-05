import ActionButtonIcon from "@/components/icons/actionButtonIcon";
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
      className={`grid place-items-center w-[10vw] h-[10vw] md:w-15 md:h-15 rounded-full bg-white text-green shadow-md ${className}`}
    >
      <ActionButtonIcon
        icon={icon}
        className="w-[6vw]! h-[6vw]! md:w-[30px]! md:h-[30px]!"
      />
    </div>
  );
}
