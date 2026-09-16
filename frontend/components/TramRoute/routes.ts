export type { StationKey, RouteStop } from "@/consts/routes";
export { ROUTES } from "@/consts/routes";

export function routeImage(id: number, mobile: boolean) {
  return `/home/tramRoute/routes-map0${id}${mobile ? "_m" : ""}.svg`;
}
