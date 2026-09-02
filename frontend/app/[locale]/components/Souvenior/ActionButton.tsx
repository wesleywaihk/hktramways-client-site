import Button from "@/components/Button/Button";
import { devClassName } from "@/lib/devClassName";
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
      className={`${devClassName("action-button")}${className}`}
      useArrow={useArrow ?? false}
      startIcon={startIcon?.icon}
    >
      {label}
    </Button>
  );
}
