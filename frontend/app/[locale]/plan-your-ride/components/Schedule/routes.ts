import type { ScheduleEastBound, ScheduleWestBound } from "@/types/api";

export interface ScheduleRoute {
  key: keyof ScheduleWestBound | keyof ScheduleEastBound;
  from: string;
  to: string;
  note?: boolean;
}

// Route stops are static (not CMS-driven) — the backend only stores the
// schedule times, keyed by these same field names. Mirrors the precedent in
// ../../../components/TramRoute/routes.ts.
export const WESTBOUND_ROUTES: ScheduleRoute[] = [
  { key: "shauKeiWan_westernMarket", from: "Shau Kei Wan", to: "Western Market" },
  { key: "shauKeiWan_happyValley", from: "Shau Kei Wan", to: "Happy Valley" },
  { key: "northPoint_shekTongTsui", from: "North Point", to: "Shek Tong Tsui" },
  { key: "causewayBay_shekTongTsui", from: "Causeway Bay", to: "Shek Tong Tsui" },
  { key: "happyValley_kennedyTown", from: "Happy Valley", to: "Kennedy Town" },
  {
    key: "shauKeiWan_kennedyTown",
    from: "Shau Kei Wan",
    to: "Kennedy Town",
    note: true,
  },
];

export const EASTBOUND_ROUTES: ScheduleRoute[] = [
  { key: "westernMarket_shauKeiWan", from: "Western Market", to: "Shau Kei Wan" },
  { key: "happyValley_shauKeiWan", from: "Happy Valley", to: "Shau Kei Wan" },
  { key: "shekTongTsui_northPoint", from: "Shek Tong Tsui", to: "North Point" },
  { key: "shekTongTsui_causewayBay", from: "Shek Tong Tsui", to: "Causeway Bay" },
  { key: "kennedyTown_happyValley", from: "Kennedy Town", to: "Happy Valley" },
  {
    key: "kennedyTown_shauKeiWan",
    from: "Kennedy Town",
    to: "Shau Kei Wan",
    note: true,
  },
];
