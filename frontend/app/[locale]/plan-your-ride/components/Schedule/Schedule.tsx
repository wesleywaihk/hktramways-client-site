"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading/Loading";
import { fetchSchedule } from "@/hooks/useApiEndpoint/api";
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
  const [data, setData] = useState<ScheduleData | null | undefined>(
    undefined,
  );

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
      <section className="sectionContainer bg-green">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const routes = direction === "west" ? WESTBOUND_ROUTES : EASTBOUND_ROUTES;
  const routeData = (
    direction === "west" ? data.ScheduleWestBound : data.seheduleEastBound
  ) as unknown as Record<string, ScheduleDay>;

  return (
    <section className="sectionContainer bg-green py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-8 px-5 lg:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[13px] tracking-[0.2em] text-white/60 uppercase">
            {t("scheduleEyebrow")}
          </span>
          <h2 className="title-text text-white">{t("scheduleTitle")}</h2>
        </div>

        <div className="bg-green-light/40 flex rounded-full p-1">
          <button
            type="button"
            onClick={() => setDirection("west")}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold uppercase transition-colors duration-200 ${
              direction === "west"
                ? "bg-[#F4E76E] text-green"
                : "text-white hover:text-[#F4E76E]"
            }`}
          >
            {direction === "east" && <span aria-hidden="true">‹</span>}
            {t("scheduleWestbound")}
            {direction === "west" && <span aria-hidden="true">›</span>}
          </button>
          <button
            type="button"
            onClick={() => setDirection("east")}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold uppercase transition-colors duration-200 ${
              direction === "east"
                ? "bg-[#F4E76E] text-green"
                : "text-white hover:text-[#F4E76E]"
            }`}
          >
            {t("scheduleEastbound")}
          </button>
        </div>

        <div className="w-full">
          <div className="schedule-header text-[13px] font-semibold tracking-[0.05em] text-[#F4E76E] uppercase">
            <span className="schedule-cell-route">
              {t("scheduleColumnRoute")}
            </span>
            <span className="schedule-cell-mf-first">
              {t("scheduleColumnMonFri")}
            </span>
            <span className="schedule-cell-sat-first">
              {t("scheduleColumnSat")}
            </span>
            <span className="schedule-cell-sun-first">
              {t("scheduleColumnSunPh")}
            </span>
          </div>

          <div className="divide-y divide-white/15 border-t border-white/15">
            {routes.map((route) => {
              const day: ScheduleDay = routeData[route.key];

              return (
                <div key={route.key} className="schedule-row py-5 text-white">
                  <div className="schedule-cell-route flex items-center gap-2 pb-2 font-semibold">
                    <span>{route.from}</span>
                    <RouteArrow />
                    <span>
                      {route.to}
                      {route.note && <sup>*</sup>}
                    </span>
                  </div>

                  <div className="schedule-cell-header text-[11px] font-semibold tracking-[0.05em] text-white/50 uppercase">
                    <span className="schedule-cell-header-mf">
                      {t("scheduleColumnMonFri")}
                    </span>
                    <span className="schedule-cell-header-sat">
                      {t("scheduleColumnSat")}
                    </span>
                    <span className="schedule-cell-header-sun">
                      {t("scheduleColumnSunPh")}
                    </span>
                  </div>

                  <span className="schedule-cell-label-first text-[13px] text-white/70">
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

                  <span className="schedule-cell-label-last text-[13px] text-white/70">
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

          <p className="mt-4 text-[11px] whitespace-pre-line text-white/50">
            {t("scheduleFootnote")}
          </p>
        </div>
      </div>
    </section>
  );
}
