import type { SVGProps } from "react";
import MapIco from "@/components/icons/MapIco";
import CalendarIco from "@/components/icons/CalendarIco";
import BusketIco from "@/components/icons/BusketIco";
import UprightArrowIco from "@/components/icons/UprightArrowIco";
import FaqIco from "@/components/icons/FaqIco";
import SpeakerIco from "@/components/icons/SpeakerIco";
import type { IconEnum } from "@/types/api";

const IconComponents: Record<
  IconEnum,
  (props: SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  map: MapIco,
  calendar: CalendarIco,
  busket: BusketIco,
  upRightArrow: UprightArrowIco,
  faq: FaqIco,
  speaker: SpeakerIco,
};

export interface BtnIconProps extends SVGProps<SVGSVGElement> {
  icon: IconEnum | null | undefined;
}

export default function BtnIcon({ icon, className, ...props }: BtnIconProps) {
  if (!icon) return null;
  const Icon = IconComponents[icon];
  if (!Icon) return null;

  return (
    <Icon
      className={`h-5 w-5 shrink-0 ${className ?? ""}`}
      aria-hidden="true"
      {...props}
    />
  );
}
