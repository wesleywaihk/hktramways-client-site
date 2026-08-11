import Image from "next/image";
import { ROUTES, routeImage } from "./routes";

export interface RouteMapImageProps {
  selectedId: number;
}

export default function RouteMapImage({ selectedId }: RouteMapImageProps) {
  return (
    <div className="mt-10 md:mt-14 relative w-full aspect-[1179/672] md:aspect-[4320/1170]">
      {ROUTES.map((route) => {
        const alt = `${route.from} - ${route.to}`;
        const active = route.id === selectedId;

        return (
          <div
            key={route.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={routeImage(route.id, false)}
              alt={alt}
              fill
              priority
              className="hidden md:block object-cover"
              sizes="100vw"
            />
            <Image
              src={routeImage(route.id, true)}
              alt={alt}
              fill
              priority
              className="block md:hidden object-cover"
              sizes="100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
