"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import RichText from "@/components/RichText/RichText";
import { fetchAboutUsDetails } from "@/hooks/useApiEndpoint/api";
import { devClassName } from "@/lib/devClassName";
import AboutDetailsAccordion from "./AboutDetailsAccordion";
import AboutDetailsStats from "./AboutDetailsStats/AboutDetailsStats";
import { useStickyColumn } from "./useStickyColumn";
import type { AboutUsDetailsData, AboutUsResponse } from "@/types/api";

// Desktop header is 100px tall; keep a little breathing room under it.
const STICKY_TOP = 120;
const STICKY_BOTTOM = 40;

export interface AboutDetailsProps {
  locale: string;
}

export default function AboutDetails({ locale }: AboutDetailsProps) {
  const [details, setDetails] = useState<AboutUsDetailsData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setDetails(undefined);

    (fetchAboutUsDetails(locale) as Promise<AboutUsResponse>)
      .then((res) => {
        if (!cancelled) setDetails(res.data?.[0]?.details ?? null);
      })
      .catch(() => {
        if (!cancelled) setDetails(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (details === undefined) {
    return (
      <section
        className={`${devClassName("about-details")}borderless bg-green flex min-h-dvh items-center`}
      >
        <Loading />
      </section>
    );
  }

  if (!details) return null;

  return <AboutDetailsContent details={details} />;
}

// Split out so the sticky refs attach on mount, once the columns exist.
function AboutDetailsContent({ details }: { details: AboutUsDetailsData }) {
  const leftRef = useStickyColumn<HTMLDivElement>(STICKY_TOP, STICKY_BOTTOM);
  const rightRef = useStickyColumn<HTMLDivElement>(STICKY_TOP, STICKY_BOTTOM);

  return (
    <section
      className={`${devClassName("about-details")}borderless bg-green min-h-dvh pt-[90px] pb-[60px] text-white lg:pt-[120px]`}
    >
      <div className="sectionContainer content-max-w flex-col gap-12 lg:max-w-[1270px] lg:flex-row lg:items-start lg:gap-[80px]">
        <div
          ref={leftRef}
          className="flex min-w-0 flex-1 flex-col gap-6 lg:sticky lg:gap-8"
        >
          <h2 className="title-text">{details.title}</h2>
          <RichText>{details.content}</RichText>
          <div className="mt-4 lg:mt-6">
            <AboutDetailsAccordion items={details.accordionItem ?? []} />
          </div>
        </div>

        <div
          ref={rightRef}
          className="w-full lg:sticky lg:w-[600px] lg:shrink-0"
        >
          <AboutDetailsStats details={details} />
        </div>
      </div>
    </section>
  );
}
