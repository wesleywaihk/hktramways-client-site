export interface RouteStop {
  id: number;
  from: string;
  to: string;
}

// Route stops and map images are static (not CMS-driven) — no field for
// them exists on the `page-home.tram-routes` Strapi component.
export const ROUTES: RouteStop[] = [
  { id: 1, from: "Western Market", to: "Shau Kei Wan" },
  { id: 2, from: "Happy Valley", to: "Shau Kei Wan" },
  { id: 3, from: "Shek Tong Tsui", to: "North Point" },
  { id: 4, from: "Shek Tong Tsui", to: "Causeway Bay" },
  { id: 5, from: "Kennedy Town", to: "Happy Valley" },
  { id: 6, from: "Kennedy Town", to: "Shau Kei Wan" },
];

export function routeImage(id: number, mobile: boolean) {
  return `/home/tramRoute/routes-map0${id}${mobile ? "_m" : ""}.jpg`;
}
