"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import CloseIcon from "@/components/icons/CloseIcon";
import { devClassName } from "@/lib/devClassName";
import type { Direction } from "@/consts";
import { routesForDirection, stationByLocCode, stationName } from "../routes";

export interface StationPopupProps {
  locCode: string;
  direction: Direction;
  onClose: () => void;
}

function withoutTerminus(name: string): string {
  return name.replace(/\s*Terminus$/i, "");
}

export default function StationPopup({
  locCode,
  direction,
  onClose,
}: StationPopupProps) {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const station = stationByLocCode(locCode);
  const name = stationName(station, locale);
  const district = stationName(station.district, locale);

  const routePills = routesForDirection(direction)
    .filter((route) => route.stations.includes(locCode))
    .map((route) => {
      const fromName = withoutTerminus(
        stationName(stationByLocCode(route.from), locale),
      );
      const toName = route.to
        ? withoutTerminus(stationName(stationByLocCode(route.to), locale))
        : null;
      return {
        id: route.id,
        label: toName ? `${fromName} - ${toName}` : fromName,
      };
    });

  return (
    <div
      className={`${devClassName(
        "station-popup",
      )}fixed inset-x-0 top-[calc(max(33dvh,200px)+76px)] bottom-0 z-[200] h-auto rounded-none bg-white p-5 shadow-[0_8px_24px_0_rgba(0,0,0,0.15)] transition-[opacity,transform] duration-300 ease-in-out lg:absolute lg:inset-x-auto lg:top-4 lg:right-4 lg:bottom-auto lg:h-auto lg:w-[340px] lg:rounded-[16px] ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="text-green absolute top-4 right-4 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      >
        <CloseIcon className="h-[18px] w-[18px]" />
      </button>

      <h3 className="pr-6 font-sans text-[18px] leading-[130%] font-semibold tracking-[0.02em]">
        {name}
      </h3>
      <p className="text-green mt-1 text-[14px] tracking-[0.02em]">
        {district} &bull; {station.locCode}
      </p>

      {routePills.length > 0 && (
        <div className="mt-3 flex flex-col flex-wrap items-start gap-2">
          {routePills.map((pill) => (
            <span
              key={pill.id}
              className="bg-green inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white uppercase"
            >
              {pill.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
