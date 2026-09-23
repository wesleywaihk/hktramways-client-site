"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import {
  fetchAnnouncements,
  fetchServiceUpdates,
} from "@/hooks/useApiEndpoint/api";
import ServiceUpdatesEntry from "./ServiceUpdatesEntry";
import { devClassName } from "@/lib/devClassName";
import type {
  AnnouncementItemData,
  AnnouncementItemsResponse,
  ServiceUpdatesData,
  ServiceUpdatesResponse,
} from "@/types/api";

export interface ServiceUpdatesProps {
  locale: string;
  /** API endpoint (e.g. "/api/plan-your-rides") of the content type that holds the ServiceUpdates component. */
  endpoint: string;
  limit?: number;
}

interface ServiceUpdatesState {
  serviceUpdates: ServiceUpdatesData | null;
  items: AnnouncementItemData[];
}

export default function ServiceUpdates({
  locale,
  endpoint,
  limit = 3,
}: ServiceUpdatesProps) {
  const [state, setState] = useState<ServiceUpdatesState | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setState(undefined);

    (
      fetchServiceUpdates(
        locale,
        endpoint,
      ) as Promise<ServiceUpdatesResponse>
    )
      .then((serviceUpdatesRes) => {
        if (cancelled) return null;
        const serviceUpdates =
          serviceUpdatesRes.data?.[0]?.ServiceUpdates ?? null;
        const types = (serviceUpdates?.announcement_types ?? []).map(
          (announcementType) => announcementType.key,
        );

        return fetchAnnouncements({ type: types, limit }).then(
          (announcementsRes: AnnouncementItemsResponse) => {
            if (cancelled) return;
            setState({
              serviceUpdates,
              items: announcementsRes.data ?? [],
            });
          },
        );
      })
      .catch(() => {
        if (!cancelled) setState({ serviceUpdates: null, items: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [locale, endpoint, limit]);

  if (state === undefined) {
    return (
      <section
        className={`${devClassName("service-updates")}borderless`}
      >
        <Loading />
      </section>
    );
  }

  const { serviceUpdates, items } = state;

  if (!serviceUpdates || !items.length) return null;

  const { title, actionButton } = serviceUpdates;

  return (
    <section
      className={`${devClassName("service-updates")}borderless flex h-auto flex-col justify-center py-[90px] lg:py-[120px]`}
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
            <ServiceUpdatesEntry key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
