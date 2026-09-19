"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@/components/icons/CloseIcon";
import ChevronIcon from "@/components/icons/ChevronIcon";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import Button from "@/components/Button/Button";
import { devClassName } from "@/lib/devClassName";
import { useUserAgent } from "@/hooks/useUserAgent";
import { IMG_URL } from "@/consts";
import type { Direction } from "@/consts";
import type { AttractionData, StationItemData } from "@/types/api";
import { routesForDirection, stationByLocCode, localeTxt } from "../routes";

const GOOGLE_MAP_URL = "https://www.google.com/maps/dir/?api=1&destination=";

export interface StationPopupProps {
  locCode: string;
  direction: Direction;
  station?: StationItemData | null;
  loading?: boolean;
  scheduleAppLink?: string | null;
  onClose: () => void;
}

function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}

function attractionText(attraction: AttractionData): string {
  return attraction.text;
}

export default function StationPopup({
  locCode,
  direction,
  station: stationItem,
  loading = false,
  scheduleAppLink,
  onClose,
}: StationPopupProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);
  const { isAndroid } = useUserAgent();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const bannerLink = stationItem?.bannerLink;

  const station = stationByLocCode(locCode);
  const name = localeTxt(station.name, locale);
  const district = localeTxt(station.district, locale);

  const directionsUrl =
    station.latitude != null && station.longitude != null
      ? isAndroid
        ? `geo:${station.latitude},${station.longitude}?q=${station.latitude},${station.longitude}(${encodeURIComponent(name)})`
        : `${GOOGLE_MAP_URL}${station.latitude},${station.longitude}`
      : null;

  const routePills = routesForDirection(direction)
    .filter((route) => route.stations.includes(locCode))
    .map((route) => {
      const fromName = localeTxt(route.from, locale);
      const toName = route.to ? localeTxt(route.to, locale) : null;
      return {
        id: route.id,
        label: toName ? `${fromName} - ${toName}` : fromName,
      };
    });

  return (
    <div
      className={`${devClassName(
        "station-popup",
      )}relative order-2 -mx-5 -mt-5 flex h-[calc(100dvh-50.89vw-76px)] w-[calc(100%+40px)] flex-col overflow-hidden rounded-none bg-white shadow-[0_8px_24px_0_rgba(0,0,0,0.15)] transition-[opacity,transform] duration-300 ease-in-out lg:absolute lg:top-4 lg:right-[56px] lg:z-[200] lg:mx-0 lg:mt-0 lg:h-auto lg:max-h-[calc(100%-72px)] lg:w-[340px] lg:rounded-[16px] ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-2 opacity-0 lg:max-h-[calc(100dvh-176px)]"
      }`}
    >
      <div className="relative shrink-0 p-[15px] pb-0">
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
      </div>

      <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-[15px] pt-3">
        {routePills.length > 0 && (
          <div className="flex flex-col flex-wrap items-start gap-2">
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

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <CircularProgress size={32} className="text-green!" />
          </div>
        ) : (
          <>
            {stationItem?.image && (
              <div className="relative mt-5 aspect-[353/220] w-full overflow-hidden rounded-[12px] lg:aspect-[29/18] lg:rounded-[14px]">
                <ResponsiveImg
                  bannerImage={{
                    id: stationItem.image.id,
                    altText: name,
                    imageD: stationItem.image,
                    imageM: null,
                  }}
                />
              </div>
            )}

            {stationItem?.attraction && stationItem.attraction.length > 0 && (
              <ul className="mt-5 flex flex-col gap-3">
                {stationItem.attraction.map((attraction) => {
                  const icon = attraction.icon?.[0];
                  const text = attractionText(attraction);
                  const row = (
                    <div className="flex items-center gap-2">
                      {icon?.url && (
                        <Image
                          src={mediaSrc(icon.url)}
                          alt=""
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] shrink-0 object-contain"
                        />
                      )}
                      <span className="text-[14px] tracking-[0.02em]">
                        {text}
                      </span>
                      {attraction.link && (
                        <ChevronIcon
                          desktop
                          className="text-green ml-auto h-4 w-4 shrink-0"
                        />
                      )}
                    </div>
                  );

                  return (
                    <li key={attraction.id}>
                      {attraction.link ? (
                        <a
                          href={attraction.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block"
                        >
                          {row}
                        </a>
                      ) : (
                        row
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        <div className="grid shrink-0 grid-cols-2 items-center gap-[15px] pt-5">
          {directionsUrl && (
            <Button
              href={directionsUrl}
              target="_blank"
              rel="noopener"
              startIcon="direction"
              className="!min-h-0 w-full !gap-[10px] !rounded-[14px] !px-[12px] !py-[11.73px] lg:!py-[10px]"
            >
              {t("stationPopupDirections")}
            </Button>
          )}
          <Button
            href={scheduleAppLink ?? undefined}
            target="_blank"
            startIcon="clock"
            disabled={!scheduleAppLink}
            className="!min-h-0 w-full !gap-[10px] !rounded-[14px] !px-[12px] !py-[11.73px] lg:!py-[10px]"
          >
            {t("stationPopupNextTram")}
          </Button>
        </div>

        {bannerLink?.image && (
          <div className="mt-[15px] shrink-0">
            <a
              href={bannerLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[29/7] w-full overflow-hidden rounded-[14px]"
            >
              <Image
                src={mediaSrc(bannerLink.image.url)}
                alt=""
                fill
                className="object-cover"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
