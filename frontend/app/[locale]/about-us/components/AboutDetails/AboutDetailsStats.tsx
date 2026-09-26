import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import { devClassName } from "@/lib/devClassName";
import DevotedWorkforce from "./DevotedWorkforce";
import TramDepots from "./TramDepots";
import TramFleet from "./TramFleet";
import TramRoutes from "./TramRoutes";
import TramStops from "./TramStops";
import TramSystem from "./TramSystem";
import type { AboutUsDetailsData, Media } from "@/types/api";

function ImageCircle({ image }: { image: Media | null }) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-full">
      <ResponsiveImg
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
    />,
    <ImageCircle key="image1" image={details.image1} />,
    <TramStops
      key="stops"
      value={details.tramStops}
      label={t("aboutTramStops")}
    />,
    <DevotedWorkforce
      key="workforce"
      value={details.devotedWorkforce}
      label={t("aboutDevotedWorkforce")}
    />,
    <ImageCircle key="image2" image={details.image2} />,
    <TramSystem
      key="system"
      value={details.tramSystem}
      unit={t("aboutKm")}
      label={t("aboutTramSystem")}
    />,
    <TramDepots
      key="depots"
      value={details.tramDepots}
      label={t("aboutTramDepots")}
    />,
    <ImageCircle key="image3" image={details.image3} />,
    <TramRoutes
      key="routes"
      value={details.tramRoutes}
      label={t("aboutTramRoutes")}
    />,
  ];

  const right = circles.filter((_, i) => i % 2 === 0);
  const left = circles.filter((_, i) => i % 2 === 1);

  return (
    <div
      className={`${devClassName("about-details-stats")}flex w-full gap-[11px] lg:gap-0`}
    >
      {/* Offset by half a circle so the two columns zigzag. */}
      <div className="flex flex-1 flex-col gap-[11px] lg:gap-10 lg:pt-[25%]">
        {left}
      </div>
      <div className="flex flex-1 flex-col gap-[11px] lg:gap-10">{right}</div>
    </div>
  );
}
