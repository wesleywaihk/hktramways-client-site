"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAnnouncementPage } from "@/hooks/useApiEndpoint/api";
import type { AnnouncementData } from "@/types/api";

const ITEMS_PER_PAGE = 12;
// Pages fetched per request; showing the last loaded page fetches the next batch
const PAGES_PER_BATCH = 5;
const BATCH_SIZE = ITEMS_PER_PAGE * PAGES_PER_BATCH;

export interface AnnouncementFilters {
  /** Announcement type keys; empty = any type. */
  types: string[];
  /** Calendar year (HKT); null = any year. */
  year: number | null;
}

/**
 * Paged announcement list, leaving out `excludeId` (the banner's item). Loads
 * BATCH_SIZE items up front, then the next batch when page 5, 10, … is shown.
 * Filters are applied by Strapi, so a filter change restarts from the first
 * batch.
 */
export function useAnnouncementList(
  locale: string,
  excludeId: number | null = null,
) {
  const [filters, setFilters] = useState<AnnouncementFilters>({
    types: [],
    year: null,
  });
  const [items, setItems] = useState<AnnouncementData[]>([]);
  const [batchesLoaded, setBatchesLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const loadedPages = batchesLoaded * PAGES_PER_BATCH;
  const nextBatch =
    batchesLoaded === 0 || (page >= loadedPages && items.length < total)
      ? batchesLoaded + 1
      : null;
  const loading = nextBatch !== null && !error;

  useEffect(() => {
    if (nextBatch === null) return;
    let cancelled = false;
    fetchAnnouncementPage({
      locale,
      page: nextBatch,
      pageSize: BATCH_SIZE,
      year: filters.year,
      types: filters.types,
      excludeId,
    })
      .then((res) => {
        if (cancelled) return;
        const data = res.data ?? [];
        setItems((prev) => (nextBatch === 1 ? data : [...prev, ...data]));
        setTotal(res.meta?.pagination?.total ?? 0);
        setBatchesLoaded(nextBatch);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err);
      });
    // A filter/locale change or leaving the trigger page drops this response
    return () => {
      cancelled = true;
    };
  }, [locale, excludeId, filters, nextBatch]);

  // Clears items too, so results from the old filters never show
  const resetList = useCallback(() => {
    setItems([]);
    setTotal(0);
    setBatchesLoaded(0);
    setPage(1);
    setError(null);
  }, []);

  // Restart when the query inputs change (state adjusted during render, not
  // in an effect)
  const queryKey = `${locale}|${excludeId}`;
  const [prevQueryKey, setPrevQueryKey] = useState(queryKey);
  if (prevQueryKey !== queryKey) {
    setPrevQueryKey(queryKey);
    resetList();
  }

  const setTypes = useCallback(
    (types: string[]) => {
      setFilters((prev) => ({ ...prev, types }));
      resetList();
    },
    [resetList],
  );

  const setYear = useCallback(
    (year: number | null) => {
      setFilters((prev) => ({ ...prev, year }));
      resetList();
    },
    [resetList],
  );

  const goToPage = useCallback(
    (next: number) => setPage(Math.min(Math.max(1, next), totalPages)),
    [totalPages],
  );

  const pageItems = useMemo(
    () => items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [items, page],
  );

  return {
    pageItems,
    page,
    totalPages,
    total,
    goToPage,
    filters,
    setTypes,
    setYear,
    /** Retry after an error, from the first batch. */
    reload: resetList,
    loading,
    error,
  };
}

export interface AnnouncementListProps {
  locale: string;
  /** Announcement to leave out, e.g. the latest one shown in the banner. */
  excludeId?: number | null;
}

export default function AnnouncementList({
  locale,
  excludeId = null,
}: AnnouncementListProps) {
  const list = useAnnouncementList(locale, excludeId);

  // Testing only — dumps the list state; no UI yet.
  return (
    <pre>
      {JSON.stringify(
        {
          page: list.page,
          totalPages: list.totalPages,
          total: list.total,
          filters: list.filters,
          loading: list.loading,
          error: list.error?.message ?? null,
          pageItems: list.pageItems,
        },
        null,
        2,
      )}
    </pre>
  );
}
