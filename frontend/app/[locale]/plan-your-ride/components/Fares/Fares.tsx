"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import { IMG_URL } from "@/consts";
import { fetchFares } from "@/hooks/useApiEndpoint/api";
import FareGfx from "./FareGfx";
import type { FaresData, PlanYourRideResponse } from "@/types/api";

export interface FaresProps {
  locale: string;
}

function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}

function FareAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaresData["fareItem"][number];
  open: boolean;
  onToggle: () => void;
}) {
  const iconSrc = item.icon?.url ? mediaSrc(item.icon.url) : null;

  return (
    <div className="border-b border-white/30">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 py-5 text-left text-white"
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0 object-contain"
          />
        )}
        <span className="grow text-[16px] font-semibold tracking-[0.02em]">
          {item.title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3.5 6L8 10.5L12.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Collapse in={open}>
        <div className="pb-5 text-[14px] leading-[152%] font-normal text-white/90">
          <p>{item.desc}</p>
          {item.note && (
            <p className="mt-2 text-white/70 italic">{item.note}</p>
          )}
        </div>
      </Collapse>
    </div>
  );
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
    <section className="borderless bg-green flex h-auto flex-col justify-center py-[90px] lg:py-[120px]">
      <div className="sectionContainer max-w-screen-xl flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="title-text text-white">{Title}</h2>
          {desc && (
            <p className="max-w-screen-sm text-[16px] leading-[152%] font-normal text-white/90">
              {desc}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
          <div className="w-full lg:max-w-[420px]">
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

          <div className="flex w-full flex-col items-center gap-4 lg:w-auto">
            <FareGfx
              adult={{ label: t("footerAdult"), fare: `HK$${priceAdult}` }}
              child={{ label: t("footerChild"), fare: `HK$${priceChild}` }}
              senior={{
                label: t("footerSeniorCitizen"),
                fare: `HK$${priceSenior}`,
              }}
            />
            {monthlyTicketActionButton && (
              <Button
                href={monthlyTicketActionButton.link?.url ?? "#"}
                color="white"
                useArrow={monthlyTicketActionButton.useArrow ?? true}
                startIcon={monthlyTicketActionButton.startIcon?.icon}
                className="!border-yellow !bg-yellow !text-green hover:!bg-yellow hover:!text-green !w-full !justify-between !rounded-[18px] !px-6 !py-4 !text-[14px] !normal-case"
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
            >
              {actionButton.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
