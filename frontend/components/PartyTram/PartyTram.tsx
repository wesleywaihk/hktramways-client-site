"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import { fetchPartyTram } from "@/hooks/useApiEndpoint/api";
import type { PartyTramData, PartyTramResponse } from "@/types/api";
import CloudLayer from "./CloudLayer";
import PartyTramCarousel from "./PartyTramCarousel";

export interface PartyTramProps {
  locale: string;
}

export default function PartyTram({ locale }: PartyTramProps) {
  const [data, setData] = useState<PartyTramData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchPartyTram(locale)
      .then((res: PartyTramResponse) => {
        if (!cancelled) setData(res.data ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (data === undefined) {
    return (
      <section className="borderless">
        <Loading />
      </section>
    );
  }

  if (!data || !data?.item) return null;

  return (
    <section className="borderless relative h-[100dvh] overflow-hidden bg-[url('/partyTram/partytram-bg_m.jpg')] bg-cover bg-bottom lg:aspect-auto lg:bg-[url('/partyTram/partytram-bg.jpg')]">
      <CloudLayer />
      <PartyTramCarousel data={data} />
    </section>
  );
}
