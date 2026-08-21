"use client";

import { useEffect, useState } from "react";
import DownloadAppAreaUI, {
  type DownloadAppAreaUIProps,
} from "@/components/DownloadAppArea/DownloadAppAreaUI";
import {
  fetchHomeDownloadAppArea,
  fetchPlanYourRideDownloadAppArea,
} from "@/hooks/useApiEndpoint/api";
import type { DownloadAppAreaData } from "@/types/api";

// Keyed by source rather than accepting a fetch function directly: page.tsx
// files are Server Components, and functions can't be passed as props
// across the server/client boundary (only serializable values can).
const FETCHERS = {
  home: fetchHomeDownloadAppArea,
  planYourRide: fetchPlanYourRideDownloadAppArea,
} as const;

export interface DownloadAppAreaProps
  extends Omit<DownloadAppAreaUIProps, "data"> {
  locale: string;
  source: keyof typeof FETCHERS;
}

export default function DownloadAppArea({
  locale,
  source,
  className,
  buttonColor,
  buttonVariant,
}: DownloadAppAreaProps) {
  const [data, setData] = useState<DownloadAppAreaData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale`/`source` changes before the refetch resolves
    setData(undefined);

    FETCHERS[source](locale)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, source]);

  return (
    <DownloadAppAreaUI
      data={data}
      className={className}
      buttonColor={buttonColor}
      buttonVariant={buttonVariant}
    />
  );
}
