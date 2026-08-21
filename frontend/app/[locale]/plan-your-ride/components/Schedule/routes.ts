import type { ScheduleEastBound, ScheduleWestBound } from "@/types/api";

export type StationKey =
  | "stationShauKeiWan"
  | "stationWesternMarket"
  | "stationHappyValley"
  | "stationNorthPoint"
  | "stationShekTongTsui"
  | "stationCausewayBay"
  | "stationKennedyTown";

export interface ScheduleRoute {
  key: keyof ScheduleWestBound | keyof ScheduleEastBound;
  from: StationKey;
  to: StationKey;
  note?: boolean;
}

// Route stops are static (not CMS-driven) — the backend only stores the
// schedule times, keyed by these same field names. Mirrors the precedent in
// @/components/TramRoute/routes.ts. `from`/`to` are i18n message keys,
// translated by the consuming component.
export const WESTBOUND_ROUTES: ScheduleRoute[] = [
  {
    key: "shauKeiWan_westernMarket",
    from: "stationShauKeiWan",
    to: "stationWesternMarket",
  },
  {
    key: "shauKeiWan_happyValley",
    from: "stationShauKeiWan",
    to: "stationHappyValley",
  },
  {
    key: "northPoint_shekTongTsui",
    from: "stationNorthPoint",
    to: "stationShekTongTsui",
  },
  {
    key: "causewayBay_shekTongTsui",
    from: "stationCausewayBay",
    to: "stationShekTongTsui",
  },
  {
    key: "happyValley_kennedyTown",
    from: "stationHappyValley",
    to: "stationKennedyTown",
  },
  {
    key: "shauKeiWan_kennedyTown",
    from: "stationShauKeiWan",
    to: "stationKennedyTown",
    note: true,
  },
];

export const EASTBOUND_ROUTES: ScheduleRoute[] = [
  {
    key: "westernMarket_shauKeiWan",
    from: "stationWesternMarket",
    to: "stationShauKeiWan",
  },
  {
    key: "happyValley_shauKeiWan",
    from: "stationHappyValley",
    to: "stationShauKeiWan",
  },
  {
    key: "shekTongTsui_northPoint",
    from: "stationShekTongTsui",
    to: "stationNorthPoint",
  },
  {
    key: "shekTongTsui_causewayBay",
    from: "stationShekTongTsui",
    to: "stationCausewayBay",
  },
  {
    key: "kennedyTown_happyValley",
    from: "stationKennedyTown",
    to: "stationHappyValley",
  },
  {
    key: "kennedyTown_shauKeiWan",
    from: "stationKennedyTown",
    to: "stationShauKeiWan",
    note: true,
  },
];
