import { useMemo, useState } from "react";
import type { Direction } from "@/consts";
import {
  routesForDirection,
  allTramRoutes,
  stationByLocCode,
} from "./components/routes";

export function useInteractiveMap() {
  const [direction, setDirectionState] = useState<Direction>("east");
  const [selectedRoute, setSelectedRouteState] = useState<number | "all">(
    "all",
  );
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const setDirection = (next: Direction) => {
    setDirectionState(next);
    setSelectedStation(null);
  };

  const setSelectedRoute = (next: number | "all") => {
    setSelectedRouteState(next);
    setSelectedStation(null);
  };

  const stations = useMemo(() => {
    const locCodes =
      selectedRoute === "all"
        ? allTramRoutes[direction]
        : routesForDirection(direction).find((r) => r.id === selectedRoute)
            ?.stations;

    return (locCodes ?? []).map(stationByLocCode);
  }, [selectedRoute, direction]);

  return {
    direction,
    setDirection,
    selectedRoute,
    setSelectedRoute,
    selectedStation,
    setSelectedStation,
    stations,
  };
}
