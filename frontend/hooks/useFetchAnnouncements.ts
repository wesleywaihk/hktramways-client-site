"use client";

import { useEffect, useState } from "react";
import { fetchFilteredAnnouncements } from "@/hooks/useApiEndpoint/api";
import type { AnnouncementData } from "@/types/api";

/** Fetches announcements once on mount, with no year/type filter. */
export function useFetchAnnouncements() {
  const [items, setItems] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchFilteredAnnouncements()
      .then((res) => {
        if (!cancelled) setItems(res.data ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
