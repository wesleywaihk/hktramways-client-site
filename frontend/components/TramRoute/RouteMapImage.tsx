"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ROUTES, routeImage } from "./routes";

export interface RouteMapImageProps {
  selectedId: number;
}

const TRANSITION_MS = 700;
const OVERLAP_MS = 600;

export default function RouteMapImage({ selectedId }: RouteMapImageProps) {
  const t = useTranslations("common");
  const [displayedId, setDisplayedId] = useState(selectedId);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (selectedId === displayedId) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start the fade-out immediately when the selection changes
    setVisible(false);
    const timer = setTimeout(() => {
      setDisplayedId(selectedId);
      setVisible(true);
    }, TRANSITION_MS - OVERLAP_MS);
    return () => clearTimeout(timer);
  }, [selectedId, displayedId]);

  return (
    <div className="relative mt-10 aspect-[1179/672] w-full lg:mt-14 lg:aspect-[4320/1170]">
      {ROUTES.map((route) => {
        const alt = `${t(route.from)} - ${t(route.to)}`;
        const active = route.id === displayedId;

        return (
          <div
            key={route.id}
            className={`absolute inset-0 z-10 transition-opacity ease-in-out ${
              active && visible
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            style={{ transitionDuration: `${TRANSITION_MS}ms` }}
            aria-hidden={!active}
          >
            <Image
              src={routeImage(route.id, false)}
              alt={alt}
              fill
              priority
              className="hidden object-cover lg:block"
              sizes="100vw"
            />
            <Image
              src={routeImage(route.id, true)}
              alt={alt}
              fill
              priority
              className="block object-cover lg:hidden"
              sizes="100vw"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/home/tramRoute/routes-map-bg.svg"
          alt=""
          fill
          priority
          className="hidden object-cover lg:block"
          sizes="100vw"
        />
        <Image
          src="/home/tramRoute/routes-map-bg_m.svg"
          alt=""
          fill
          priority
          className="block object-cover lg:hidden"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
