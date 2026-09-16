import { useTranslations } from "next-intl";
import { STATIONS, type Station, type StationKey } from "@/consts/routes";
import { devClassName } from "@/lib/devClassName";
import FlagIcon from "@/components/icons/FlagIcon";
import StationDotIcon from "@/components/icons/StationDotIcon";

export interface RouteStationListProps {
  routeId: number | "all";
  stations: Station[];
  selectedStation?: StationKey | null;
  onSelectStation?: (station: StationKey) => void;
}

export default function RouteStationList({
  routeId,
  stations,
  selectedStation = null,
  onSelectStation,
}: RouteStationListProps) {
  const t = useTranslations("common");

  const codeClass =
    "font-sans text-[16px] leading-[163%] font-semibold tracking-[0.02em] text-right";

  return (
    <div className={`${devClassName("route-station-list")}flex flex-col pb-10`}>
      {stations.map((station, index) => {
        const stationInfo = STATIONS.find((s) => s.key === station.name);
        const isTerminus =
          index === 0 ||
          index === stations.length - 1 ||
          (routeId === "all" && stationInfo?.isTerminus === true);

        const isSelected = selectedStation === station.name;

        return (
          <div key={station.id} className="relative flex flex-col">
            {isTerminus ? (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.name)}
                aria-pressed={isSelected}
                className="bg-green z-10 flex cursor-pointer items-center gap-2 rounded-[14px] px-5 py-[17px] text-white"
              >
                <FlagIcon className="h-4 w-4 shrink-0" />
                <span className="text-[14px] font-semibold tracking-[0.02em]">
                  {t(station.name)}
                </span>
                <span className={`${codeClass} ml-auto`}>
                  {stationInfo?.code}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.name)}
                aria-pressed={isSelected}
                className="relative flex cursor-pointer items-center gap-2 px-5 py-[17px]"
              >
                <span className="border-green absolute top-0 left-[26.6px] h-full w-0 border-l-4 opacity-30" />
                <StationDotIcon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                <span className="text-green text-[14px] tracking-[0.02em]">
                  {t(station.name)}
                </span>
                <span className={`${codeClass} text-green ml-auto`}>
                  {stationInfo?.code}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
