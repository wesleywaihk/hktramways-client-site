"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import { fetchFares } from "@/hooks/useApiEndpoint/api";
import FareGfx from "./FareGfx";
import FareAccordionItem from "./FareAccordionItem";
import { devClassName } from "@/lib/devClassName";
import type { FaresData, PlanYourRideResponse } from "@/types/api";

export interface FaresProps {
  locale: string;
}

export default function Fares({ locale }: FaresProps) {
  const t = useTranslations("common");
  const [fares, setFares] = useState<FaresData | null | undefined>(undefined);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when inputs change before the refetch resolves
    setFares(undefined);

    (fetchFares(locale) as Promise<PlanYourRideResponse>)
      .then((res) => {
        if (cancelled) return;
        setFares(res.data?.[0]?.Fares ?? null);
      })
      .catch(() => {
        if (!cancelled) setFares(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (fares === undefined) {
    return (
      <section className={`${devClassName("fares")}borderless`}>
        <Loading />
      </section>
    );
  }

  if (!fares) return null;

  const {
    Title,
    desc,
    fareItem,
    priceAdult,
    priceChild,
    priceSenior,
    monthlyTicketActionButton,
    actionButton,
  } = fares;

  return (
    <section
      className={`${devClassName("fares")}borderless bg-green flex h-auto flex-col justify-center pt-[45px] pb-[90px] lg:pt-[60px] lg:pb-[120px]`}
    >
      <div className="sectionContainer max-w-screen-xl flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="title-text text-white">{Title}</h2>
          {desc && (
            <p className="max-w-[582px] text-[16px] leading-[162.5%] font-normal tracking-[0.02em] text-white">
              {desc}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row lg:justify-between lg:gap-20">
          <div className="w-full lg:w-[50%]">
            {fareItem.map((item, index) => (
              <FareAccordionItem
                key={item.id}
                item={item}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-4 pt-[4.8px] lg:w-[50%] lg:pt-0">
            <FareGfx
              adult={{ label: t("footerAdult"), fare: `HK$${priceAdult}` }}
              child={{ label: t("footerChild"), fare: `HK$${priceChild}` }}
              senior={{
                label: t("faresSenior"),
                fare: `HK$${priceSenior}`,
              }}
            />
            {monthlyTicketActionButton && (
              <Button
                href={monthlyTicketActionButton.link?.url ?? "#"}
                color="white"
                useArrow={monthlyTicketActionButton.useArrow ?? true}
                startIcon={monthlyTicketActionButton.startIcon?.icon}
                // The label (the only child span without shrink-0) fills the
                // space between the icon and the arrow, so the arrow sits at
                // the right edge; its text is centred on mobile, left on desktop.
                className="border-yellow-light! bg-yellow-light! text-accent-brown! hover:bg-yellow! hover:border-yellow! hover:text-accent-brown! text-body mt-[-20px] w-full! justify-start! gap-0 py-[13px]! pr-[15px]! pl-[10px]! font-semibold normal-case! lg:gap-[10px] lg:py-[15px]! lg:pr-[18px]! lg:pl-[30px]! [&>span]:normal-case! [&>span:not(.shrink-0)]:grow [&>span:not(.shrink-0)]:text-center! [&>span:not(.shrink-0)]:text-[15px]! [&>span:not(.shrink-0)]:leading-[163%]! [&>span:not(.shrink-0)]:font-semibold! [&>span:not(.shrink-0)]:tracking-[0.02em]! lg:[&>span:not(.shrink-0)]:text-left! lg:[&>span:not(.shrink-0)]:text-[16px]!"
              >
                {monthlyTicketActionButton.label}
              </Button>
            )}
          </div>
        </div>

        {actionButton && (
          <div className="flex justify-center">
            <Button
              href={actionButton.link?.url ?? "#"}
              color="white"
              useArrow={actionButton.useArrow ?? false}
              startIcon={actionButton.startIcon?.icon}
              // Label (the only child span without shrink-0) stretches between
              // the icons: start icon on the left edge, arrow on the right,
              // text centred in between.
              className="h-[62px]! w-[400px]! normal-case! [&>span:not(.shrink-0)]:grow [&>span:not(.shrink-0)]:text-center!"
              size="big"
            >
              {actionButton.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
