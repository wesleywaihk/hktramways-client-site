import type { ReactElement } from "react";
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
  image: Media;
  className?: string;
}) {
  return (
    <div
      className={`aspect-square w-full overflow-hidden rounded-full ${className}`}
    >
      <ResponsiveImg
        loading="lazy"
        bannerImage={{
          id: image.id,
          altText: image.alternativeText ?? null,
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

  const {
    tramFleet,
    tramStops,
    devotedWorkforce,
    tramSystem,
    tramDepots,
    tramRoutes,
    image1,
    image2,
    image3,
  } = details;

  // Read top-to-bottom, alternating right/left columns. Stats and images are
  // optional in the CMS; missing ones are dropped before the column split so
  // the zigzag stays intact.
  const circles = [
    tramFleet != null && (
      <TramFleet
        key="fleet"
        value={tramFleet}
        label={t("aboutTramFleet")}
        className="order-2 lg:order-none"
      />
    ),
    image1 && (
      <ImageCircle
        key="image1"
        image={image1}
        className="order-3 lg:order-none"
      />
    ),
    tramStops != null && (
      <TramStops
        key="stops"
        value={tramStops}
        label={t("aboutTramStops")}
        className="order-4 lg:order-none"
      />
    ),
    devotedWorkforce != null && (
      <DevotedWorkforce
        key="workforce"
        value={devotedWorkforce}
        label={t("aboutDevotedWorkforce")}
        className="order-1 lg:order-none"
      />
    ),
    image2 && (
      <ImageCircle
        key="image2"
        image={image2}
        className="order-6 lg:order-none"
      />
    ),
    tramSystem != null && (
      <TramSystem
        key="system"
        value={tramSystem}
        unit={t("aboutKm")}
        label={t("aboutTramSystem")}
        className="order-5 lg:order-none"
      />
    ),
    tramDepots != null && (
      <TramDepots
        key="depots"
        value={tramDepots}
        label={t("aboutTramDepots")}
        className="order-7 lg:order-none"
      />
    ),
    image3 && (
      <ImageCircle key="image3" image={image3} className="hidden lg:block" />
    ),
    tramRoutes != null && (
      <TramRoutes
        key="routes"
        value={tramRoutes}
        label={t("aboutTramRoutes")}
        className="order-8 lg:order-none"
      />
    ),
  ].filter((circle): circle is ReactElement => Boolean(circle));

  if (!circles.length) return null;

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
