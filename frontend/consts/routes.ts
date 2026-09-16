export type StationKey =
  | "stationShauKeiWan"
  | "stationWesternMarket"
  | "stationHappyValley"
  | "stationNorthPoint"
  | "stationShekTongTsui"
  | "stationCausewayBay"
  | "stationKennedyTown"
  | "stationCentral"
  | "stationAdmiralty"
  | "stationWanChai"
  | "stationTinHau"
  | "stationQuarryBay"
  | "stationSaiWanHo"
  | "stationWhittyStreet";

export interface Station {
  id: number;
  name: StationKey;
}

export interface RouteStop {
  id: number;
  from: StationKey;
  to: StationKey;
  stations: Station[];
}

// All stations in line order, west to east, with the Happy Valley spur
// inserted between Wan Chai and Causeway Bay.
export const STATIONS: {
  key: StationKey;
  isTerminus: boolean;
  code: string;
}[] = [
  { key: "stationKennedyTown", isTerminus: true, code: "SKT" },
  { key: "stationShekTongTsui", isTerminus: true, code: "STT" },
  { key: "stationWhittyStreet", isTerminus: false, code: "SWS" },
  { key: "stationWesternMarket", isTerminus: true, code: "SWM" },
  { key: "stationCentral", isTerminus: false, code: "SCT" },
  { key: "stationAdmiralty", isTerminus: false, code: "SAD" },
  { key: "stationWanChai", isTerminus: false, code: "SWC" },
  { key: "stationHappyValley", isTerminus: true, code: "SHV" },
  { key: "stationCausewayBay", isTerminus: true, code: "SCB" },
  { key: "stationTinHau", isTerminus: false, code: "STH" },
  { key: "stationNorthPoint", isTerminus: true, code: "SNP" },
  { key: "stationQuarryBay", isTerminus: false, code: "SQB" },
  { key: "stationSaiWanHo", isTerminus: false, code: "SWH" },
  { key: "stationShauKeiWan", isTerminus: true, code: "SKW" },
];

function routeStations(keys: StationKey[]): Station[] {
  return keys.map((name) => {
    const id = STATIONS.findIndex((station) => station.key === name);
    if (id === -1) {
      throw new Error(`Unknown station: ${name}`);
    }
    return { id: id + 1, name };
  });
}

// Route stops are static (not CMS-driven) — no field for them exists on the
// `page-home.tram-routes` Strapi component. `from`/`to` are i18n message
// keys, translated by the consuming component.
export const ROUTES: RouteStop[] = [
  {
    id: 1,
    from: "stationWesternMarket",
    to: "stationShauKeiWan",
    stations: routeStations([
      "stationWesternMarket",
      "stationCentral",
      "stationAdmiralty",
      "stationWanChai",
      "stationCausewayBay",
      "stationTinHau",
      "stationNorthPoint",
      "stationQuarryBay",
      "stationSaiWanHo",
      "stationShauKeiWan",
    ]),
  },
  {
    id: 2,
    from: "stationHappyValley",
    to: "stationShauKeiWan",
    stations: routeStations([
      "stationHappyValley",
      "stationCausewayBay",
      "stationTinHau",
      "stationNorthPoint",
      "stationQuarryBay",
      "stationSaiWanHo",
      "stationShauKeiWan",
    ]),
  },
  {
    id: 3,
    from: "stationShekTongTsui",
    to: "stationNorthPoint",
    stations: routeStations([
      "stationShekTongTsui",
      "stationWhittyStreet",
      "stationWesternMarket",
      "stationCentral",
      "stationAdmiralty",
      "stationWanChai",
      "stationCausewayBay",
      "stationTinHau",
      "stationNorthPoint",
    ]),
  },
  {
    id: 4,
    from: "stationShekTongTsui",
    to: "stationCausewayBay",
    stations: routeStations([
      "stationShekTongTsui",
      "stationWhittyStreet",
      "stationWesternMarket",
      "stationCentral",
      "stationAdmiralty",
      "stationWanChai",
      "stationCausewayBay",
    ]),
  },
  {
    id: 5,
    from: "stationKennedyTown",
    to: "stationHappyValley",
    stations: routeStations([
      "stationKennedyTown",
      "stationShekTongTsui",
      "stationWhittyStreet",
      "stationWesternMarket",
      "stationCentral",
      "stationAdmiralty",
      "stationWanChai",
      "stationHappyValley",
    ]),
  },
  {
    id: 6,
    from: "stationKennedyTown",
    to: "stationShauKeiWan",
    stations: routeStations([
      "stationKennedyTown",
      "stationShekTongTsui",
      "stationWhittyStreet",
      "stationWesternMarket",
      "stationCentral",
      "stationAdmiralty",
      "stationWanChai",
      "stationCausewayBay",
      "stationTinHau",
      "stationNorthPoint",
      "stationQuarryBay",
      "stationSaiWanHo",
      "stationShauKeiWan",
    ]),
  },
];
