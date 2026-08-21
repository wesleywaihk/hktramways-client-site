"use client";

import { useEffect, useState } from "react";
import DownloadAppAreaUI from "@/components/DownloadAppArea/DownloadAppAreaUI";
import { fetchDownloadAppArea } from "@/hooks/useApiEndpoint/api";
import type { DownloadAppAreaData, HomeDownloadAppAreaResponse } from "@/types/api";

export interface DownloadAppAreaProps {
  locale: string;
}

export default function DownloadAppArea({ locale }: DownloadAppAreaProps) {
  const [data, setData] = useState<DownloadAppAreaData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchDownloadAppArea(locale)
      .then((res: HomeDownloadAppAreaResponse) => {
        if (!cancelled) setData(res.data?.[0]?.downloadAppArea ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return <DownloadAppAreaUI data={data} />;
}
