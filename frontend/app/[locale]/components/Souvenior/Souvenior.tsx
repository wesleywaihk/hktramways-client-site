"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import { fetchSouvenior } from "@/hooks/useApiEndpoint/api";
import SouveniorCard from "./SouveniorCard";
import ActionButton from "./ActionButton";
import { useSouveniorDragScroll } from "./useSouveniorDragScroll";
import type { HomeSouveniorResponse, SouveniorData } from "@/types/api";

export interface SouveniorProps {
  locale: string;
  documentId?: string | null;
}

export default function Souvenior({ locale, documentId }: SouveniorProps) {
  const [data, setData] = useState<SouveniorData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchSouvenior(locale, documentId)
      .then((res: HomeSouveniorResponse) => {
        if (!cancelled) setData(res.data?.[0]?.souvenior ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, documentId]);

  const {
    containerRef,
    rowRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onClickCapture,
  } = useSouveniorDragScroll(data);

  if (data === undefined) {
    return (
      <section className="borderless bg-green">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const title = data.title;

  const items = data.item.slice(0, 5) ?? [];
  if (!items.length) return null;

  return (
    <section className="borderless bg-green flex h-auto flex-col justify-center py-[90px] lg:py-[120px]">
      <div className="sectionContainer content-max-w items-center justify-between gap-4">
        <h2 className="title-text mx-0 grow px-0 text-center text-white lg:text-left">
          {title}
        </h2>
        {data.actionButton && (
          <ActionButton
            {...data.actionButton}
            className="hidden! px-[28px]! py-[19px]! lg:inline-flex! lg:shrink-0"
          />
        )}
      </div>

      <div
        ref={containerRef}
        className="pageBorder mt-10 cursor-grab touch-pan-y overflow-hidden pt-[34px] select-none active:cursor-grabbing md:mt-14 md:pt-[28px] lg:pt-[28px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onClickCapture={onClickCapture}
      >
        <div ref={rowRef} className="flex w-max gap-[30px] lg:gap-[43px]">
          {items.map((item, index) => (
            <SouveniorCard key={item.id} item={item} order={index + 1} />
          ))}
        </div>
      </div>

      <div className="sectionContainer content-max-w mt-10 block items-center justify-center lg:hidden">
        {data.actionButton && (
          <ActionButton {...data.actionButton} className="!px-6 !py-[14px]" />
        )}
      </div>
    </section>
  );
}
