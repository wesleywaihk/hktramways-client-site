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
  uprightArrow: UprightArrowIco,
};

export function getActionButtonStartIcon(
  startIcon: ActionButtonStartIcon | null | undefined,
  props?: SVGProps<SVGSVGElement>,
) {
  if (!startIcon) return undefined;
  const Icon = startIconComponents[startIcon];
  if (!Icon) return undefined;
  return <Icon className="shrink-0 w-5 h-5" aria-hidden="true" {...props} />;
}
