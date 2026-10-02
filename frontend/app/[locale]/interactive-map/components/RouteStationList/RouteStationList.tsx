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
    "font-sans text-[15px] leading-[163%] font-semibold tracking-[0.02em] lg:text-[16px] text-center";

  const isTerminusAt = (index: number) =>
    index === 0 ||
    index === stations.length - 1 ||
    (routeId === "all" && stations[index]?.type === "TERMINUS");

  return (
    <div className={`${devClassName("route-station-list")}flex flex-col pb-5`}>
      {stations.map((station, index) => {
        const isTerminus = isTerminusAt(index);
        // Extra space next to a terminus button; the 7.5px/10px default sits between plain stations
        const padTop = isTerminusAt(index - 1)
          ? "pt-[15px] lg:pt-[20px]"
          : "pt-[7.5px] lg:pt-[10px]";
        const padBottom = isTerminusAt(index + 1)
          ? "pb-[15px] lg:pb-[20px]"
          : "pb-[7.5px] lg:pb-[10px]";

        const isSelected = selectedStation === station.locCode;
        const name = localeTxt(station.name, locale);

        return (
          <div key={station.locCode} className="relative flex flex-col">
            {isTerminus ? (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.locCode)}
                aria-pressed={isSelected}
                className="bg-green z-10 grid w-full cursor-pointer grid-cols-[18px_1fr_40px] items-center gap-2 rounded-[18px] px-5 py-[18px] text-white lg:rounded-[21px] lg:px-[22px] lg:py-[21px]"
              >
                <FlagIcon className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
                <span className="truncate text-left text-[15px] leading-[163%] font-semibold tracking-[0.02em] lg:text-[16px]">
                  {name}
                </span>
                <span className={codeClass}>{station.locCode}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectStation?.(station.locCode)}
                aria-pressed={isSelected}
                className={`relative grid w-full cursor-pointer grid-cols-[18px_1fr_40px] items-center gap-2 px-5 lg:px-[21px] ${padTop} ${padBottom}`}
              >
                <span className="border-green absolute top-0 left-[26.6px] h-full w-0 border-l-4 opacity-30 lg:left-[27.6px]" />
                <StationDotIcon className="relative z-10 h-[18px] w-[18px] shrink-0" />
                <span className="text-green truncate text-left text-[15px] leading-[163%] font-semibold tracking-[0.02em] lg:text-[16px]">
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
