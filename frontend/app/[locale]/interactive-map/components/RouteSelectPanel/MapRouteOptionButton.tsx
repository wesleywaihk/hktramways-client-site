import { useTranslations } from "next-intl";
import { devClassName } from "@/lib/devClassName";
import type { RouteStop } from "@/consts/routes";

export interface MapRouteOptionButtonProps {
  route: RouteStop;
  active: boolean;
  onClick: () => void;
}

const gridClasses = `grid items-center w-full grid-cols-[1fr_20px_1fr] justify-between rounded-[21px] lg:rounded-[14px] p-[15px] gap-[7px] lg:p-[8px] lg:gap-[4px] transition-colors duration-200 ease-[cubic-bezier(0.65,0.05,0.36,1)]`;

const txtClass =
  "text-center text-[14px] leading-[120%] font-semibold tracking-[0.02em] normal-case! md:text-[18px] md:leading-[178%] lg:text-[14px] lg:leading-[120%] min-[393px]:whitespace-nowrap";

export default function MapRouteOptionButton({
  route,
  active,
  onClick,
}: MapRouteOptionButtonProps) {
  const t = useTranslations("common");

  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${devClassName("map-route-option-button")}${gridClasses} bg-green text-white`}
      >
        <span className={txtClass}>{t(route.from)}</span>
        <span className={txtClass}>→</span>
        <span className={txtClass}>{t(route.to)}</span>
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
      <span className={txtClass}>{t(route.from)}</span>
      <span className={txtClass}>→</span>
      <span className={txtClass}>{t(route.to)}</span>
    </button>
  );
}
