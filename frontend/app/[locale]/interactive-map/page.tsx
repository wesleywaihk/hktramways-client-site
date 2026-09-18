"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import SetHeaderStyle from "@/components/Header/HeaderStyle/SetHeaderStyle";
import RouteToggle from "./components/RouteToggle/RouteToggle";
import RouteSelect from "./components/RouteSelect/RouteSelect";
import RouteStationList from "./components/RouteStationList/RouteStationList";
import StationPopup from "./components/StationPopup/StationPopup";
import { useInteractiveMap } from "./useInteractiveMap";

interface InteractiveMapPageProps {
  params: Promise<{ locale: string }>;
}

export default function InteractiveMapPage({
  params,
}: InteractiveMapPageProps) {
  const { locale } = use(params);
  const t = useTranslations("common");
  const {
    direction,
    setDirection,
    selectedRoute,
    setSelectedRoute,
    selectedStation,
    setSelectedStation,
    stations,
    interactiveMapData,
  } = useInteractiveMap(locale);

  return (
    <>
      <SetHeaderStyle style="white" />
      <section className="pageWrapper relative mt-0 flex h-auto flex-col items-stretch justify-center gap-5 lg:h-[calc(100dvh-100px)] lg:flex-row lg:gap-10">
        <div
          className={`relative order-2 h-[calc(100dvh-50.89vw-76px)] w-full flex-col gap-[15px] px-4 lg:order-1 lg:flex lg:h-full lg:w-[420px] lg:grow-0 lg:gap-5 lg:px-0 lg:pb-10 ${
            selectedStation ? "hidden" : "flex"
          }`}
        >
          <RouteToggle direction={direction} onChange={setDirection} />

          <RouteSelect
            direction={direction}
            value={selectedRoute}
            onChange={setSelectedRoute}
          />

          <div
            className={`thin-scrollbar mr-[-36px] max-h-[50vh] w-[calc(100%+36px)] pr-[28px] lg:mr-[-40px] lg:max-h-none lg:min-h-0 lg:w-[calc(100%+40px)] lg:flex-1 lg:overflow-y-auto lg:pr-2 lg:pr-[32px] ${
              selectedStation ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            <RouteStationList
              key={`${direction}-${selectedRoute}`}
              routeId={selectedRoute}
              stations={stations}
              selectedStation={selectedStation}
              onSelectStation={setSelectedStation}
            />
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-[100] h-5 bg-gradient-to-b from-[rgba(255,255,255,0)] to-[rgba(255,255,255,1)] lg:bottom-10" />
        </div>
        <div className="relative order-1 -mx-5 flex h-[50.89vw] w-[calc(100%+40px)] lg:order-2 lg:mx-0 lg:h-auto lg:w-[calc(100%-460px)] lg:w-full lg:grow lg:pb-10">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1XEfC8fEOSY5x1QmyraeklfG0FDvDCkM&ehbc=2E312F"
            title={t("interactiveMapTitle")}
            className="h-full w-full border-0 lg:rounded-[16px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {selectedStation && (
          <StationPopup
            key={selectedStation}
            locCode={selectedStation}
            direction={direction}
            loading={interactiveMapData === undefined}
            station={interactiveMapData?.station.find(
              (s) => s.locCode === selectedStation,
            )}
            scheduleAppLink={interactiveMapData?.ScheduleAppLink}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </section>
      <div className="bg-green h-[clamp(3.375rem,15.2671755725vw,4.5rem)] md:h-[clamp(4rem,5.5555555556vw,7.5rem)]" />
    </>
  );
}
