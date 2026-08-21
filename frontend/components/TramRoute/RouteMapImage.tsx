import Image from "next/image";
import { ROUTES, routeImage } from "./routes";

export interface RouteMapImageProps {
  selectedId: number;
}

export default function RouteMapImage({ selectedId }: RouteMapImageProps) {
  return (
    <div className="relative mt-10 aspect-[1179/672] w-full md:mt-14 md:aspect-[4320/1170]">
      {ROUTES.map((route) => {
        const alt = `${route.from} - ${route.to}`;
        const active = route.id === selectedId;

        return (
          <div
            key={route.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={routeImage(route.id, false)}
              alt={alt}
              fill
              priority
              className="hidden object-cover md:block"
              sizes="100vw"
            />
            <Image
              src={routeImage(route.id, true)}
              alt={alt}
              fill
              priority
              className="block object-cover md:hidden"
              sizes="100vw"
            />
          </div>
        );
      })}
    </div>
  );
}
