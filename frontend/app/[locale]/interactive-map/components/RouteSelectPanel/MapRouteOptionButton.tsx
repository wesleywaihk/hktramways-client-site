import { useLocale, useTranslations } from "next-intl";
import { devClassName } from "@/lib/devClassName";
import { stationName, type RouteStop } from "../routes";

export interface MapRouteOptionButtonProps {
  route: RouteStop;
  active: boolean;
  onClick: () => void;
}

const btnClasses = `text-left w-full p-[15px] lg:p-[12px] transition-colors duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)] `;

const txtClass =
  "text-right text-[14px] leading-[120%] font-semibold tracking-[0.02em] normal-case! md:text-[18px] md:leading-[178%] lg:text-[14px] lg:leading-[120%] min-[393px]:whitespace-nowrap";

export default function MapRouteOptionButton({
  route,
  active,
  onClick,
}: MapRouteOptionButtonProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const fromName = stationName(route.from, locale);
  const toName = route.to ? stationName(route.to, locale) : null;

  const content = (
    <span className={txtClass}>
      {fromName}
      {toName ? (
        <>
          <span className="mx-1.5">→</span>
          {toName}
        </>
      ) : (
        ""
      )}
    </span>
  );

  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${devClassName("map-route-option-button")}${btnClasses} text-black`}
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
      className={`${devClassName("map-route-option-button")}${btnClasses} group text-green cursor-pointer bg-transparent hover:text-black`}
    >
      {content}
    </button>
  );
}
