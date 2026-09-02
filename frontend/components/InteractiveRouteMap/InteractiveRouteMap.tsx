"use client";

import { useEffect, useState } from "react";
import DownloadAppAreaUI from "@/components/DownloadAppArea/DownloadAppAreaUI";
import { fetchInteractiveRouteMap } from "@/hooks/useApiEndpoint/api";
import type {
  DownloadAppAreaData,
  PlanYourRideInteractiveRouteMapResponse,
} from "@/types/api";

export interface InteractiveRouteMapProps {
  locale: string;
  className?: string;
}

export default function InteractiveRouteMap({
  locale,
  className = "",
}: InteractiveRouteMapProps) {
  const [data, setData] = useState<DownloadAppAreaData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchInteractiveRouteMap(locale)
      .then((res: PlanYourRideInteractiveRouteMapResponse) => {
        if (!cancelled) setData(res.data?.[0]?.interactiveRouteMap ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const bgClass = data?.bgColor
    ? ""
    : "[&>div]:bg-green-fresh [&>div]:bg-cover [&>div]:lg:bg-[url('/partyTram/InteractiveRouteMap/bg.png')]";

  return (
    <DownloadAppAreaUI
      data={data}
      className={`[&>div>div>div>h2]:text-green [&>div>div>div>p]:text-green py-[45px] lg:py-[60px] ${bgClass} ${className}`}
      buttonColor="green"
      buttonVariant="solid"
    />
  );
}
