import { useLocale, useTranslations } from "next-intl";
import { devClassName } from "@/lib/devClassName";
import { stationByLocCode, stationName, type RouteStop } from "../routes";

export interface MapRouteOptionButtonProps {
  route: RouteStop;
  active: boolean;
  onClick: () => void;
}

const gridClasses = `text-left w-full rounded-[21px] lg:rounded-[14px] p-[15px] lg:py-[12px] transition-colors duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)]`;

const txtClass =
  "text-right text-[14px] leading-[120%] font-semibold tracking-[0.02em] normal-case! md:text-[18px] md:leading-[178%] lg:text-[14px] lg:leading-[120%] min-[393px]:whitespace-nowrap";

export default function MapRouteOptionButton({
  route,
  active,
  onClick,
}: MapRouteOptionButtonProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const fromName = stationName(stationByLocCode(route.from), locale);
  const toName = route.to
    ? stationName(stationByLocCode(route.to), locale)
    : null;

  const content = toName ? (
    <>
      <span className={txtClass}>
        {fromName} → {toName}
      </span>
    </>
  ) : (
    <span className={`${txtClass}`}>
      {fromName} ({t("routeCirculationLine")})
    </span>
  );

  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${devClassName("map-route-option-button")}${gridClasses} bg-green text-white`}
      >
        {content}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${devClassName("map-route-option-button")}${gridClasses} group text-green hover:bg-green cursor-pointer bg-transparent hover:text-white`}
    >
      {content}
    </button>
  );
}
