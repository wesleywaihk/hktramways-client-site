"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import { fetchTramRoute } from "@/hooks/useApiEndpoint/api";
import RouteOptionButton from "./RouteOptionButton";
import RouteMapImage from "./RouteMapImage";
import RouteMobilePicker from "./RouteMobilePicker";
import { ROUTES } from "./routes";
import type { TramRouteData, TramRouteResponse } from "@/types/api";

export interface TramRouteProps {
  locale: string;
}

export default function TramRoute({ locale }: TramRouteProps) {
  const t = useTranslations("common");
  const [selected, setSelected] = useState(ROUTES[0].id);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<TramRouteData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchTramRoute(locale)
      .then((res: TramRouteResponse) => {
        if (!cancelled) setData(res.data ?? null);
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
      <section className="borderless bg-earth-light">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const title = data?.title ?? t("tramRouteTitleFallback");
  const desc = data?.desc ?? "";
  const buttonLabel = data?.actionButton?.label ?? t("tramRouteButtonFallback");
  const buttonUrl = data?.actionButton?.link?.url ?? "#";
  const buttonUseArrow = data?.actionButton?.useArrow ?? false;
  const buttonStartIcon = data?.actionButton?.startIcon?.icon ?? "map";

  const activeRoute =
    ROUTES.find((route) => route.id === selected) ?? ROUTES[0];

  return (
    <section className="borderless bg-earth-light relative overflow-hidden pt-16 md:pt-20 lg:pt-24">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-5 md:flex-row md:items-start md:justify-between lg:gap-16 lg:px-6">
        <div className="flex max-w-[600px] flex-col items-center text-center md:items-start md:text-left">
          <h2 className="title-text text-green">{title}</h2>
          <p className="mt-4 text-[15px] leading-[163%] tracking-[0.02em] text-black md:mt-6 md:text-[16px]">
            {desc}
          </p>
          <Button
            href={buttonUrl}
            className="mt-6 md:mt-8"
            useArrow={buttonUseArrow}
            startIcon={buttonStartIcon}
          >
            {buttonLabel}
          </Button>
        </div>

        <div className="hidden shrink-0 flex-col items-start gap-3 md:flex">
          {ROUTES.map((route) => (
            <RouteOptionButton
              key={route.id}
              route={route}
              active={route.id === selected}
              onClick={() => setSelected(route.id)}
            />
          ))}
        </div>
      </div>

      <RouteMapImage selectedId={selected} />

      <RouteMobilePicker
        activeRoute={activeRoute}
        sheetOpen={sheetOpen}
        onOpen={() => setSheetOpen(true)}
        onClose={() => setSheetOpen(false)}
        onSelect={(id) => {
          setSelected(id);
          setSheetOpen(false);
        }}
        selectLabel={t("tramRouteSelectFallback")}
      />
    </section>
  );
}
