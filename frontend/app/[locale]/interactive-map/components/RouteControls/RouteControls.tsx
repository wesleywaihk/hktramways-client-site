import type { Direction } from "@/consts";
import { devClassName } from "@/lib/devClassName";
import RouteToggle from "../RouteToggle/RouteToggle";
import RouteSelect from "../RouteSelect/RouteSelect";

type RouteId = number | "all";

export interface RouteControlsProps {
  direction: Direction;
  onDirectionChange: (direction: Direction) => void;
  selectedRoute: RouteId;
  onRouteChange: (route: RouteId) => void;
  className?: string;
}

/** Direction toggle + route dropdown shown above the station list. */
export default function RouteControls({
  direction,
  onDirectionChange,
  selectedRoute,
  onRouteChange,
  className = "",
}: RouteControlsProps) {
  return (
    <div
      className={`${devClassName("route-controls")}flex-col gap-[15px] lg:gap-5 ${className}`}
    >
      <RouteToggle direction={direction} onChange={onDirectionChange} />
      <RouteSelect
        direction={direction}
        value={selectedRoute}
        onChange={onRouteChange}
      />
    </div>
  );
}
