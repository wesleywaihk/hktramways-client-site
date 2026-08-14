import Button from "@/components/Button/Button";
import type { ActionButton as ActionButtonProps } from "@/types/api";

export interface SouveniorActionButtonProps extends ActionButtonProps {
  className?: string;
}

export default function ActionButton({
  label = "",
  link,
  startIcon,
  useArrow,
  className = "",
}: SouveniorActionButtonProps) {
  return (
    <Button
      href={link?.url ?? "#"}
      color="white"
      className={`!px-4 !py-2.5 text-[11px] md:!px-6.5 md:!py-[19px] md:text-[14px] ${className}`}
      useArrow={useArrow ?? false}
      startIcon={startIcon?.icon}
    >
      {label}
    </Button>
  );
}
