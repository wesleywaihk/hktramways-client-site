import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import { devClassName } from "@/lib/devClassName";
import DevotedWorkforce from "./svg/DevotedWorkforce";
import TramDepots from "./svg/TramDepots";
import TramFleet from "./svg/TramFleet";
import TramRoutes from "./svg/TramRoutes";
import TramStops from "./svg/TramStops";
import TramSystem from "./svg/TramSystem";
import type { AboutUsDetailsData, Media } from "@/types/api";

function ImageCircle({
  image,
  className = "",
}: {
  image: Media | null;
  className?: string;
}) {
  return (
    <div
      className={`aspect-square w-full overflow-hidden rounded-full ${className}`}
    >
      <ResponsiveImg
        loading="lazy"
        bannerImage={{
          id: image?.id ?? 0,
          altText: image?.alternativeText ?? null,
          imageD: image,
          imageM: null,
        }}
        sizes="(min-width: 1024px) 290px, 45vw"
      />
    </div>
  );
}

export default function AboutDetailsStats({
  details,
}: {
  details: AboutUsDetailsData;
}) {
  const t = useTranslations("common");

  // Read top-to-bottom, alternating right/left columns.
  const circles: ReactNode[] = [
    <TramFleet
      key="fleet"
      value={details.tramFleet}
      label={t("aboutTramFleet")}
      className="order-2 lg:order-none"
    />,
    <ImageCircle
      key="image1"
      image={details.image1}
      className="order-3 lg:order-none"
    />,
    <TramStops
      key="stops"
      value={details.tramStops}
      label={t("aboutTramStops")}
      className="order-4 lg:order-none"
    />,
    <DevotedWorkforce
      key="workforce"
      value={details.devotedWorkforce}
      label={t("aboutDevotedWorkforce")}
      className="order-1 lg:order-none"
    />,
    <ImageCircle
      key="image2"
      image={details.image2}
      className="order-6 lg:order-none"
    />,
    <TramSystem
      key="system"
      value={details.tramSystem}
      unit={t("aboutKm")}
      label={t("aboutTramSystem")}
      className="order-5 lg:order-none"
    />,
    <TramDepots
      key="depots"
      value={details.tramDepots}
      label={t("aboutTramDepots")}
      className="order-7 lg:order-none"
    />,
    <ImageCircle
      key="image3"
      image={details.image3}
      className="hidden lg:block"
    />,
    <TramRoutes
      key="routes"
      value={details.tramRoutes}
      label={t("aboutTramRoutes")}
      className="order-8 lg:order-none"
    />,
  ];

  const right = circles.filter((_, i) => i % 2 === 0);
  const left = circles.filter((_, i) => i % 2 === 1);

  return (
    <div
      className={`${devClassName("about-details-stats")}flex w-full gap-[11px] lg:gap-0`}
    >
      <div className="grid w-full grid-cols-2 gap-[11px] lg:hidden">
        {circles}
      </div>
      {/* Offset by half a circle so the two columns zigzag. */}
      <div className="hidden flex-1 flex-col gap-10 pt-[25%] lg:flex">
        {left}
      </div>
      <div className="hidden flex-1 flex-col gap-10 lg:flex">{right}</div>
    </div>
  );
}
