"use client";

import { useEffect, useState } from "react";
import DownloadAppAreaUI from "@/components/DownloadAppArea/DownloadAppAreaUI";
import { fetchInteractiveRouteMap } from "@/hooks/useApiEndpoint/api";
import type { DownloadAppAreaData } from "@/types/api";

export interface InteractiveRouteMapProps {
  locale: string;
  className?: string;
  /** API endpoint of the content type holding the section; defaults to plan-your-ride. */
  endpoint?: string;
  /** Field name of the download-app-area shaped component on that content type. */
  field?: string;
}

export default function InteractiveRouteMap({
  locale,
  className = "",
  endpoint = "/api/plan-your-rides",
  field = "interactiveRouteMap",
}: InteractiveRouteMapProps) {
  const [data, setData] = useState<DownloadAppAreaData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchInteractiveRouteMap(locale, endpoint, field)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, endpoint, field]);

  const bgClass = data?.bgColor
    ? ""
    : "[&>div.content-box]:bg-green-fresh [&>div.content-box]:bg-cover [&>div.content-box]:lg:bg-[url('/InteractiveRouteMap/bg.png')]";

  return (
    <DownloadAppAreaUI
      data={data}
      compClassName={"interactive-route-map"}
      className={`py-[45px] lg:py-[60px] ${bgClass} ${className}`}
      titleClassName="text-green"
      descClassName="text-black"
      buttonColor="green"
      buttonVariant="solid"
    />
  );
}
