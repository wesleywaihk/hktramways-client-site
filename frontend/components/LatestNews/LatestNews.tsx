"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@/components/Button/Button";
import LatestNewsEntry from "./LatestNewsEntry";
import { devClassName } from "@/lib/devClassName";
import {
  fetchAnnouncements,
  fetchLatestNews,
} from "@/hooks/useApiEndpoint/api";
import type {
  AnnouncementData,
  AnnouncementsResponse,
  LatestNewsData,
  LatestNewsResponse,
} from "@/types/api";

export interface LatestNewsProps {
  locale: string;
  /** API endpoint (e.g. "/api/plan-your-rides") of the content type that holds the CMS latestNews component. */
  endpoint: string;
  limit?: number;
  /** Show each entry's announcement type tags next to its date. */
  useAnnouncementType?: boolean;
}

export default function LatestNews({
  locale,
  endpoint,
  limit = 3,
  useAnnouncementType = false,
}: LatestNewsProps) {
  // undefined = still loading; null = page has no latestNews block
  const [latestNews, setLatestNews] = useState<
    LatestNewsData | null | undefined
  >(undefined);
  const [items, setItems] = useState<AnnouncementData[]>([]);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setLatestNews(undefined);

    setItems([]);

    (fetchLatestNews(locale, endpoint) as Promise<LatestNewsResponse>)
      .then(async (res) => {
        const news = res.data?.[0]?.latestNews ?? null;
        // Latest announcements matching any of the types picked on the page; no types picked = any announcement
        const announcements: AnnouncementsResponse | null = news
          ? await fetchAnnouncements({
              type: news.announcement_types.map((t) => t.key),
              limit,
            })
          : null;
        if (cancelled) return;
        setItems(announcements?.data ?? []);
        setLatestNews(news);
      })
      .catch(() => {
        if (!cancelled) setLatestNews(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, endpoint, limit]);

  if (latestNews === undefined) {
    return (
      <section
        className={`${devClassName("latest-news")}borderless flex justify-center py-[90px] lg:py-[120px]`}
        role="status"
        aria-label="Loading"
      >
        <CircularProgress size={50} className="text-green!" />
      </section>
    );
  }

  if (!latestNews) return null;

  if (!items.length) return null;

  const { title, actionButton } = latestNews;

  return (
    <section
      className={`${devClassName("latest-news")}borderless flex h-auto flex-col justify-center py-[90px] lg:py-[120px]`}
    >
      <div className="sectionContainer max-w-screen-xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex flex-col items-center gap-8 text-center lg:w-[476px] lg:shrink-0 lg:items-start lg:text-left">
          <h2 className="title-text text-green">{title}</h2>
          {actionButton && (
            <Button
              href={actionButton.link?.url ?? "#"}
              useArrow={actionButton.useArrow ?? false}
              startIcon={actionButton.startIcon?.icon}
            >
              {actionButton.label}
            </Button>
          )}
        </div>

        <div className="w-full lg:pt-4">
          {items.map((item) => (
            <LatestNewsEntry
              key={item.id}
              {...item}
              locale={locale}
              useAnnouncementType={useAnnouncementType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
