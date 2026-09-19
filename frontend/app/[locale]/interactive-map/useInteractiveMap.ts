import { useEffect, useMemo, useState } from "react";
import type { Direction } from "@/consts";
import { fetchInteractiveMap } from "@/hooks/useApiEndpoint/api";
import type { InteractiveMapData, InteractiveMapResponse } from "@/types/api";
import {
  routesForDirection,
  allTramRoutes,
  stationByLocCode,
} from "./components/routes";

const DEFAULT_ROUTE_CENTER = { lat: 22.288, lng: 114.1773 };
const DEFAULT_ROUTE_ZOOM = 14;

export function useInteractiveMap(locale: string) {
  const [direction, setDirectionState] = useState<Direction>("west");
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

  const routeView = useMemo(() => {
    if (selectedRoute === "all") {
      return { center: allTramRoutes.center, zoom: allTramRoutes.zoom };
    }
    const route = routesForDirection(direction).find(
      (r) => r.id === selectedRoute,
    );
    return route
      ? { center: route.center, zoom: route.zoom }
      : { center: DEFAULT_ROUTE_CENTER, zoom: DEFAULT_ROUTE_ZOOM };
  }, [selectedRoute, direction]);

  return {
    direction,
    setDirection,
    selectedRoute,
    setSelectedRoute,
    selectedStation,
    setSelectedStation,
    stations,
    routeView,
    interactiveMapData,
  };
}
