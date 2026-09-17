export type StationKey =
  | "stationShauKeiWan"
  | "stationWesternMarket"
  | "stationHappyValley"
  | "stationNorthPoint"
  | "stationShekTongTsui"
  | "stationCausewayBay"
  | "stationKennedyTown";

export interface RouteStop {
  id: number;
  from: StationKey;
  to: StationKey;
}

// Route stops and map images are static (not CMS-driven) — no field for
// them exists on the `page-home.tram-routes` Strapi component. `from`/`to`
// are i18n message keys, translated by the consuming component.
export const ROUTES: RouteStop[] = [
  { id: 1, from: "stationWesternMarket", to: "stationShauKeiWan" },
  { id: 2, from: "stationHappyValley", to: "stationShauKeiWan" },
  { id: 3, from: "stationShekTongTsui", to: "stationNorthPoint" },
  { id: 4, from: "stationShekTongTsui", to: "stationCausewayBay" },
  { id: 5, from: "stationKennedyTown", to: "stationHappyValley" },
  { id: 6, from: "stationKennedyTown", to: "stationShauKeiWan" },
];

export function routeImage(id: number, mobile: boolean) {
  return `/home/tramRoute/routes-map0${id}${mobile ? "_m" : ""}.svg`;
}
