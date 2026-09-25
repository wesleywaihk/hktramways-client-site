"use client";

import { useEffect, useState } from "react";
import DownloadAppAreaUI, {
  type DownloadAppAreaUIProps,
} from "@/components/DownloadAppArea/DownloadAppAreaUI";
import { fetchDownloadAppArea } from "@/hooks/useApiEndpoint/api";
import type { DownloadAppAreaData } from "@/types/api";

export interface DownloadAppAreaProps extends Omit<
  DownloadAppAreaUIProps,
  "data"
> {
  locale: string;
  /** API endpoint (e.g. "/api/plan-your-rides") of the content type that holds the CMS downloadAppArea component. */
  endpoint: string;
  /** Preview mode document id; fetches that draft instead of the latest published entry. */
  documentId?: string | null;
}

export default function DownloadAppArea({
  locale,
  endpoint,
  documentId,
  className,
  buttonColor,
  buttonVariant,
}: DownloadAppAreaProps) {
  const [data, setData] = useState<DownloadAppAreaData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setData(undefined);

    fetchDownloadAppArea(locale, endpoint, documentId)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, endpoint, documentId]);

  return (
    <DownloadAppAreaUI
      data={data}
      className={className}
      buttonColor={buttonColor}
      buttonVariant={buttonVariant}
    />
  );
}
