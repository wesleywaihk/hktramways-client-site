"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import {
  fetchAnnouncements,
  fetchServiceUpdates,
} from "@/hooks/useApiEndpoint/api";
import ServiceUpdatesEntry from "./ServiceUpdatesEntry";
import type {
  AnnouncementItemData,
  AnnouncementItemsResponse,
  PlanYourRideResponse,
  ServiceUpdatesData,
} from "@/types/api";

export interface ServiceUpdatesProps {
  locale: string;
  type?: string;
  limit?: number;
}

interface ServiceUpdatesState {
  serviceUpdates: ServiceUpdatesData | null;
  items: AnnouncementItemData[];
}

export default function ServiceUpdates({
  locale,
  type = "news",
  limit = 3,
}: ServiceUpdatesProps) {
  const [state, setState] = useState<ServiceUpdatesState | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setState(undefined);

    Promise.all([
      fetchServiceUpdates(locale) as Promise<PlanYourRideResponse>,
      fetchAnnouncements({ type, limit }) as Promise<AnnouncementItemsResponse>,
    ])
      .then(([serviceUpdatesRes, announcementsRes]) => {
        if (cancelled) return;
        setState({
          serviceUpdates: serviceUpdatesRes.data?.[0]?.ServiceUpdates ?? null,
          items: announcementsRes.data ?? [],
        });
      })
      .catch(() => {
        if (!cancelled) setState({ serviceUpdates: null, items: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [locale, type, limit]);

  if (state === undefined) {
    return (
      <section className="borderless">
        <Loading />
      </section>
    );
  }

  const { serviceUpdates, items } = state;

  if (!serviceUpdates || !items.length) return null;

  const { title, actionButton } = serviceUpdates;

  return (
    <section className="borderless flex h-auto flex-col justify-center py-[90px] lg:py-[120px]">
      <div className="sectionContainer max-w-screen-xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="flex flex-col items-center gap-8 text-center lg:w-[340px] lg:shrink-0 lg:items-start lg:text-left">
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
            <ServiceUpdatesEntry key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
