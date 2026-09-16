import { useTranslations } from "next-intl";
import CloseIcon from "@/components/icons/CloseIcon";
import MapRouteOptionButton from "./MapRouteOptionButton";
import { ROUTES } from "@/consts/routes";
import type { Direction } from "@/consts";
import { devClassName } from "@/lib/devClassName";

export interface RouteSelectPanelProps {
  title: string;
  onClose: () => void;
  activeId: number | "all";
  onSelect: (id: number | "all") => void;
  allLabel?: string;
  direction?: Direction;
  className?: string;
}

export default function RouteSelectPanel({
  title,
  onClose,
  activeId,
  onSelect,
  allLabel,
  direction = "east",
  className = "",
}: RouteSelectPanelProps) {
  const t = useTranslations("common");

  return (
    <div
      className={`${devClassName("route-select-panel")}rounded-[21px] min-w-full bg-[var(--color-earth-light)] p-5 lg:shadow-[0_8px_24px_0_rgba(0,0,0,0.15)] ${className}`}
    >
      <div className="mb-[30px] flex items-center justify-between lg:hidden">
        <span className="text-green font-sans text-[20px] leading-[110%] font-semibold tracking-[0.02em]">
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="text-green cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
        >
          <CloseIcon className="h-[22px] w-[22px]" />
        </button>
      </div>
      <div className="flex flex-col gap-[2px]">
        {allLabel && (
          <button
            type="button"
            onClick={() => onSelect("all")}
            aria-pressed={activeId === "all"}
            className={`w-full cursor-pointer rounded-[21px] p-[15px] text-center text-[14px] font-semibold tracking-[0.02em] transition-colors duration-200 lg:rounded-[14px] lg:p-[8px] ${
              activeId === "all"
                ? "bg-green text-white"
                : "text-green hover:bg-green bg-transparent hover:text-white"
            }`}
          >
            {allLabel}
          </button>
        )}
        {ROUTES.map((route) => {
          const displayRoute =
            direction === "west"
              ? { ...route, from: route.to, to: route.from }
              : route;

          return (
            <MapRouteOptionButton
              key={route.id}
              route={displayRoute}
              active={route.id === activeId}
              onClick={() => onSelect(route.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
