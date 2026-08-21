"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading/Loading";
import { fetchSchedule } from "@/hooks/useApiEndpoint/api";
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

const RouteArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="shrink-0"
    aria-hidden="true"
  >
    <path
      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      <section className="sectionContainer borderless bg-green">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const routes = direction === "west" ? WESTBOUND_ROUTES : EASTBOUND_ROUTES;
  const routeData = (direction === "west"
    ? data.ScheduleWestBound
    : data.seheduleEastBound) as unknown as Record<string, ScheduleDay>;

  return (
    <section className="borderless sectionContainer bg-green pt-[90px] pb-[45px] lg:pt-[120px] lg:pb-[60px]">
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
        />

        <div className="w-full">
          <div className="schedule-header text-yellow text-[21px] leading-[152%] font-semibold tracking-[0.02em]">
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

          <div className="divide-y divide-white/15 border-t border-b border-white/15">
            {routes.map((route) => {
              const day: ScheduleDay = routeData[route.key];

              return (
                <div key={route.key} className="schedule-row py-5 text-white">
                  <div className="schedule-cell-route text-yellow flex items-center gap-2 pb-2 text-[18px] leading-[152%] font-semibold tracking-[0.02em] lg:text-[21px] lg:text-white">
                    <span>{t(route.from)}</span>
                    <RouteArrow />
                    <span>
                      {t(route.to)}
                      {route.note && <sup>*</sup>}
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

          <p className="mt-4 text-[13px] leading-[145%] tracking-[0.02em] whitespace-pre-line text-white">
            {t("scheduleFootnote")}
          </p>
        </div>
      </div>
    </section>
  );
}
