"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import { fetchFares } from "@/hooks/useApiEndpoint/api";
import FareGfx from "./FareGfx";
import FareAccordionItem from "./FareAccordionItem";
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
      <section className="borderless">
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
    <section className="borderless bg-green flex h-auto flex-col justify-center pt-[45px] pb-[90px] lg:pt-[60px] lg:pb-[120px]">
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

          <div className="flex w-full flex-col items-center gap-4 lg:w-[50%]">
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
                className="border-yellow! bg-yellow! text-accent-brown! hover:bg-yellow! hover:text-accent-brown! text-body mt-[-20px] w-full! gap-0 py-[13px] pr-[15px] pl-[10px] text-center font-semibold normal-case! lg:gap-[10px] lg:py-[15px] lg:pr-[18px] lg:pl-[30px]"
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
              className="h-[62px]! w-[400px]! normal-case!"
            >
              {actionButton.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
