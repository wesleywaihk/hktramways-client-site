import type { SVGProps } from "react";
import MapIco from "@/components/icons/MapIco";
import CalendarIco from "@/components/icons/CalendarIco";
import BucketIco from "@/components/icons/BucketIco";
import UprightArrowIco from "@/components/icons/UprightArrowIco";
import type { ActionButtonStartIcon } from "@/types/api";

const startIconComponents: Record<
  ActionButtonStartIcon,
  (props: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  map: MapIco,
  calendar: CalendarIco,
  bucket: BucketIco,
  upRightArrow: UprightArrowIco,
};

export interface ActionButtonIconProps extends SVGProps<SVGSVGElement> {
  icon: ActionButtonStartIcon | null | undefined;
}

export default function ActionButtonIcon({
  icon,
  className,
  ...props
}: ActionButtonIconProps) {
  if (!icon) return null;
  const Icon = startIconComponents[icon];
  if (!Icon) return null;

  return (
    <Icon
      className={`shrink-0 w-5 h-5 ${className ?? ""}`}
      aria-hidden="true"
      {...props}
    />
  );
}
