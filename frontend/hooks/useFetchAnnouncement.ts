"use client";

import { useEffect, useState } from "react";
import { fetchAnnouncementBySlug } from "@/hooks/useApiEndpoint/api";
import type { AnnouncementData } from "@/types/api";

/** Fetches one announcement by slug on mount; `item` is null when not found. */
export function useFetchAnnouncement(slug: string, locale: string) {
  const [item, setItem] = useState<AnnouncementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAnnouncementBySlug(slug, locale)
      .then((res) => {
        if (!cancelled) setItem(res);
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
  }, [slug, locale]);

  return { item, loading, error };
}
