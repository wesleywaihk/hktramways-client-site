import { useTranslations } from "next-intl";
import CloseIcon from "@/components/icons/CloseIcon";
import MapRouteOptionButton from "./MapRouteOptionButton";
import { routesForDirection } from "../routes";
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
      className={`${devClassName("route-select-panel")}rounded-[21px] bg-[var(--color-earth-light)] p-5 lg:shadow-[0_8px_24px_0_rgba(0,0,0,0.15)] ${className}`}
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
            className={`w-full cursor-pointer rounded-[21px] p-[15px] text-center text-left text-[14px] font-semibold tracking-[0.02em] transition-colors duration-200 lg:rounded-[14px] lg:py-[12px] ${
              activeId === "all"
                ? "bg-green text-white"
                : "text-green hover:bg-green bg-transparent hover:text-white"
            }`}
          >
            {allLabel}
          </button>
        )}
        {routesForDirection(direction).map((route) => (
          <MapRouteOptionButton
            key={route.id}
            route={route}
            active={route.id === activeId}
            onClick={() => onSelect(route.id)}
          />
        ))}
      </div>
    </div>
  );
}
