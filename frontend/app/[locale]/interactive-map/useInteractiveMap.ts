import { useEffect, useMemo, useState } from "react";
import type { Direction } from "@/consts";
import { fetchInteractiveMap } from "@/hooks/useApiEndpoint/api";
import type { InteractiveMapData, InteractiveMapResponse } from "@/types/api";
import {
  routesForDirection,
  allTramRoutes,
  stationByLocCode,
} from "./components/routes";

export function useInteractiveMap(locale: string) {
  const [direction, setDirectionState] = useState<Direction>("east");
  const [selectedRoute, setSelectedRouteState] = useState<number | "all">(
    "all",
  );
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [interactiveMapData, setInteractiveMapData] = useState<
    InteractiveMapData | null | undefined
  >(undefined);

  useEffect(() => {
    let cancelled = false;

    fetchInteractiveMap(locale)
      .then((res: InteractiveMapResponse) => {
        if (!cancelled) setInteractiveMapData(res.data?.[0] ?? null);
      })
      .catch(() => {
        if (!cancelled) setInteractiveMapData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

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
    interactiveMapData,
  };
}
