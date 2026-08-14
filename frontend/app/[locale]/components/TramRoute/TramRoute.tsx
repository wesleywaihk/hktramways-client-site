"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import RouteOptionButton from "./RouteOptionButton";
import RouteMapImage from "./RouteMapImage";
import RouteMobilePicker from "./RouteMobilePicker";
import { ROUTES } from "./routes";
import type { TramRouteData } from "@/types/api";

export interface TramRouteProps {
  data?: TramRouteData | null;
}

export default function TramRoute({ data = undefined }: TramRouteProps) {
  const t = useTranslations("common");
  const [selected, setSelected] = useState(ROUTES[0].id);
  const [sheetOpen, setSheetOpen] = useState(false);

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
    <section className="borderless relative bg-earth-light pt-16 md:pt-20 lg:pt-24 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 lg:gap-16 px-5 lg:px-6 max-w-[1360px] mx-auto">
        <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-[600px]">
          <h2 className="title-text text-green">{title}</h2>
          <p className="mt-4 md:mt-6 text-black text-[15px] md:text-[16px] leading-[163%] tracking-[0.02em]">
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

        <div className="hidden md:flex flex-col items-start gap-3 shrink-0">
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
