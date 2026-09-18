import { useLocale } from "next-intl";
import { type StationInfo, localeTxt } from "../routes";
import { devClassName } from "@/lib/devClassName";
import FlagIcon from "@/components/icons/FlagIcon";
import StationDotIcon from "@/components/icons/StationDotIcon";

export interface RouteStationListProps {
  routeId: number | "all";
  stations: StationInfo[];
  selectedStation?: string | null;
  onSelectStation?: (station: string) => void;
}

export default function RouteStationList({
  routeId,
  stations,
  selectedStation = null,
  onSelectStation,
}: RouteStationListProps) {
  const locale = useLocale();

  const codeClass =
    "font-sans text-[16px] leading-[163%] font-semibold tracking-[0.02em] text-center";

  return (
    <div className={`${devClassName("route-station-list")}flex flex-col pb-5`}>
      {stations.map((station, index) => {
        const isTerminus =
          index === 0 ||
          index === stations.length - 1 ||
          (routeId === "all" && station.type === "TERMINUS");

        const isSelected = selectedStation === station.locCode;
        const name = localeTxt(station.name, locale);

        return (
          <div key={station.locCode} className="relative flex flex-col">
            {isTerminus ? (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.locCode)}
                aria-pressed={isSelected}
                className="bg-green z-10 grid w-full cursor-pointer grid-cols-[18px_1fr_40px] items-center gap-2 rounded-[14px] px-5 py-[17px] text-white"
              >
                <FlagIcon className="h-4 w-4 shrink-0" />
                <span className="truncate text-left text-[14px] font-semibold tracking-[0.02em]">
                  {name}
                </span>
                <span className={codeClass}>{station.locCode}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.locCode)}
                aria-pressed={isSelected}
                className="relative grid w-full cursor-pointer grid-cols-[18px_1fr_40px] items-center gap-2 px-5 py-[17px]"
              >
                <span className="border-green absolute top-0 left-[26.6px] h-full w-0 border-l-4 opacity-30" />
                <StationDotIcon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                <span className="text-green truncate text-left text-[14px] tracking-[0.02em]">
                  {name}
                </span>
                <span className={`${codeClass} text-green`}>
                  {station.locCode}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
