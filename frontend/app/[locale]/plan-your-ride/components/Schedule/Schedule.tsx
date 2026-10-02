"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import BlocksText from "@/components/BlocksText/BlocksText";
import Loading from "@/components/Loading/Loading";
import LongArrowIco from "@/components/icons/LongArrowIco";
import { fetchSchedule } from "@/hooks/useApiEndpoint/api";
import { devClassName } from "@/lib/devClassName";
import DirectionToggle from "./DirectionToggle";
import { EASTBOUND_ROUTES, WESTBOUND_ROUTES } from "./routes";
import type {
  PlanYourRideScheduleResponse,
  ScheduleData,
  ScheduleDay,
} from "@/types/api";
import "./Schedule.scss";

export interface ScheduleProps {
  locale: string;
}

type Direction = "west" | "east";

function formatTime(value: string) {
  return value?.slice(0, 5) ?? "--:--";
}

export default function Schedule({ locale }: ScheduleProps) {
  const t = useTranslations("common");
  const [direction, setDirection] = useState<Direction>("west");
  const [data, setData] = useState<ScheduleData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchSchedule(locale)
      .then((res: PlanYourRideScheduleResponse) => {
        if (!cancelled) setData(res.data?.[0]?.schedule ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (data === undefined) {
    return (
      <section
        className={`${devClassName("schedule")}sectionContainer borderless bg-green`}
      >
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const routes = direction === "west" ? WESTBOUND_ROUTES : EASTBOUND_ROUTES;
  const fromStations = [...new Set(routes.map((route) => route.from))];
  const toStations = [
    ...new Map(
      routes.map((route) => [`${route.to}${route.note ? "*" : ""}`, route]),
    ).values(),
  ];
  const routeData = (direction === "west"
    ? data.ScheduleWestBound
    : data.seheduleEastBound) as unknown as Record<string, ScheduleDay>;

  return (
    <section
      className={`${devClassName("schedule")}borderless sectionContainer bg-green pt-[90px] pb-[45px] lg:pt-[120px] lg:pb-[60px]`}
    >
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="title-text text-center text-white">
            {t("scheduleTitle")}
          </h2>
        </div>

        <DirectionToggle
          direction={direction}
          onChange={setDirection}
          westLabel={t("scheduleWestbound")}
          eastLabel={t("scheduleEastbound")}
          westLabelShort={t("routeToggleWestbound")}
          eastLabelShort={t("routeToggleEastbound")}
        />

        <div className="w-full">
          <div className="schedule-header text-yellow-light pb-[15px] text-[21px] leading-[152%] font-semibold tracking-[0.02em]">
            <span className="schedule-header-route">
              {t("scheduleColumnRoute")}
            </span>
            <span className="schedule-header-mf">
              {t("scheduleColumnMonFri")}
            </span>
            <span className="schedule-header-sat">
              {t("scheduleColumnSat")}
            </span>
            <span className="schedule-header-sun">
              {t("scheduleColumnSunPh")}
            </span>
          </div>

          <div className="not:first:border-t-[2px] divide-y-2 divide-white/15 border-b-[2px]! border-white/10">
            {routes.map((route) => {
              const day: ScheduleDay = routeData[route.key];

              return (
                <div key={route.key} className="schedule-row py-5 text-white">
                  <div className="schedule-cell-route text-yellow-light flex items-center justify-center gap-3 pb-2 text-[18px] leading-[152%] font-semibold tracking-[0.02em] lg:justify-start lg:gap-6 lg:text-[21px] lg:text-white">
                    {/* Every origin (and destination) label is stacked
                        invisibly in the same cell so it sizes to the widest
                        one: every row's route is then the same width, keeping
                        the arrows aligned across rows in any locale, also
                        when centred on mobile. */}
                    <span className="grid">
                      {fromStations.map((station) => (
                        <span
                          key={station}
                          aria-hidden="true"
                          className="invisible col-start-1 row-start-1"
                        >
                          {t(station)}
                        </span>
                      ))}
                      <span className="col-start-1 row-start-1">
                        {t(route.from)}
                      </span>
                    </span>
                    <LongArrowIco
                      width={24}
                      height={24}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span className="grid">
                      {toStations.map((station) => (
                        <span
                          key={`${station.to}${station.note ? "*" : ""}`}
                          aria-hidden="true"
                          className="invisible col-start-1 row-start-1"
                        >
                          {t(station.to)}
                          {station.note && <sup>*</sup>}
                        </span>
                      ))}
                      <span className="col-start-1 row-start-1">
                        {t(route.to)}
                        {route.note && <sup>*</sup>}
                      </span>
                    </span>
                  </div>

                  <div className="schedule-cell-header text-center text-[15px] leading-[163%] font-semibold tracking-[0.02em] text-white">
                    <span className="schedule-cell-header-mf underline">
                      {t("scheduleColumnMonFri")}
                    </span>
                    <span className="schedule-cell-header-sat underline">
                      {t("scheduleColumnSat")}
                    </span>
                    <span className="schedule-cell-header-sun underline">
                      {t("scheduleColumnSunPh")}
                    </span>
                  </div>

                  <span className="schedule-cell-label-first text-[15px] leading-[163%] font-semibold tracking-[0.02em] text-white lg:text-[16px]">
                    {t("scheduleFirstTram")}
                  </span>
                  <span className="schedule-cell-mf-first">
                    {formatTime(day.first.monToFri)}
                  </span>
                  <span className="schedule-cell-sat-first">
                    {formatTime(day.first.sat)}
                  </span>
                  <span className="schedule-cell-sun-first">
                    {formatTime(day.first.sun)}
                  </span>

                  <span className="schedule-cell-label-last text-[15px] leading-[163%] font-semibold tracking-[0.02em] text-white lg:text-[16px]">
                    {t("scheduleLastTram")}
                  </span>
                  <span className="schedule-cell-mf-last">
                    {formatTime(day.last.monToFri)}
                  </span>
                  <span className="schedule-cell-sat-last">
                    {formatTime(day.last.sat)}
                  </span>
                  <span className="schedule-cell-sun-last">
                    {formatTime(day.last.sun)}
                  </span>
                </div>
              );
            })}
          </div>
          <BlocksText className="mt-[15px] text-[13px] leading-[145%] font-normal tracking-[0.02em] text-white">
            {data.remark}
          </BlocksText>
        </div>
      </div>
    </section>
  );
}
