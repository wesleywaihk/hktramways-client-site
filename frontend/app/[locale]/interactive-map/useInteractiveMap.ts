import { useMemo, useState } from "react";
import type { Direction } from "@/consts";
import { ROUTES, STATIONS, type StationKey } from "@/consts/routes";

export function useInteractiveMap() {
  const [direction, setDirectionState] = useState<Direction>("east");
  const [selectedRoute, setSelectedRouteState] = useState<number | "all">(
    "all",
  );
  const [selectedStation, setSelectedStation] = useState<StationKey | null>(
    null,
  );

  const setDirection = (next: Direction) => {
    setDirectionState(next);
    setSelectedRouteState("all");
    setSelectedStation(null);
  };

  const setSelectedRoute = (next: number | "all") => {
    setSelectedRouteState(next);
    setSelectedStation(null);
  };

  const stations = useMemo(() => {
    const orderedStations =
      selectedRoute === "all"
        ? STATIONS.map((station, index) => ({
            id: index + 1,
            name: station.key,
          }))
        : ROUTES.find((r) => r.id === selectedRoute)?.stations;

    if (!orderedStations) return [];

    return direction === "west"
      ? [...orderedStations].reverse()
      : orderedStations;
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
