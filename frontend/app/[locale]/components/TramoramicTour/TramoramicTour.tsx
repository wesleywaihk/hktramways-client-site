"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import CardContainer from "./CardContainer";
import type { TramoramicTourData } from "@/types/api";
import { asImage } from "@/lib/media";
import useSlideShow from "./useSlideShow";

export interface TramoramicTourProps {
  data?: TramoramicTourData | null;
}

export default function TramoramicTour({
  data = undefined,
}: TramoramicTourProps) {
  const t = useTranslations("common");
  const { activeSlide, nextSlide } = useSlideShow();

  if (!data) return null;

  const title1 = data?.title1 ?? "";
  const title2 = data?.title2 ?? "";
  const desc = data?.desc ?? "";

  const image1 = asImage(data?.tramoramicTourItem1?.image);
  const image2 = asImage(data?.tramoramicTourItem2?.image);
  const image3 = asImage(data?.tramoramicTourItem3?.image);

  const action1Label =
    data?.action1?.label ?? t("tramoramicTourAction1Fallback");
  const action1Url = data?.action1?.link?.url ?? "#";
  const action1UseArrow = data?.action1?.useArrow ?? true;
  const action1StartIcon = data?.action1?.startIcon?.icon;

  const action2Label =
    data?.action2?.label ?? t("tramoramicTourAction2Fallback");
  const action2Url = data?.action2?.link?.url ?? "#";
  const action2UseArrow = data?.action2?.useArrow ?? false;
  const action2StartIcon = data?.action2?.startIcon?.icon ?? "calendar";

  return (
    <section className="borderless h-auto md:h-[100dvh] relative bg-red-dark py-20 lg:py-24 flex overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16 px-5 lg:px-6 max-w-[1200px] mx-auto">
        <div className="relative w-[87vmin] md:w-full min-h-[84.5vmin] md:min-h-0 md:flex-1 mt-[12vmin] mb-[6vmin] md:my-0">
          <CardContainer
            zIndexClass={
              activeSlide === 0 ? "z-0" : activeSlide === 1 ? "z-10" : "z-20"
            }
            animate={activeSlide === 2 && nextSlide === 0}
            image={image3}
            hashTag={data?.tramoramicTourItem3?.hashTag}
            cardClassName="-translate-x-[8%] -translate-y-[58%] md:-translate-x-[11%] md:-translate-y-[60%] shadow-lg"
          />
          <CardContainer
            zIndexClass={
              activeSlide === 0 ? "z-10" : activeSlide === 1 ? "z-20" : "z-0"
            }
            animate={activeSlide === 1 && nextSlide === 2}
            image={image2}
            hashTag={data?.tramoramicTourItem2?.hashTag}
            cardClassName="-translate-x-[13%] -translate-y-[42%] md:-translate-x-[18%] md:-translate-y-[42%] shadow-lg"
          />
          <CardContainer
            zIndexClass={
              activeSlide === 0 ? "z-20" : activeSlide === 1 ? "z-0" : "z-10"
            }
            animate={activeSlide === 0 && nextSlide === 1}
            image={image1}
            hashTag={data?.tramoramicTourItem1?.hashTag}
            cardClassName="-translate-y-1/2 shadow-xl"
          />
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-1">
          <h2 className="text-gold font-semibold uppercase text-[40px] md:text-[44px] lg:text-[56px] leading-[107%] tracking-[0.02em]">
            {title1}
            <br />
            <span className="text-white">{title2}</span>
          </h2>
          <p className="mt-4 md:mt-6 text-white text-[15px] md:text-[16px] leading-[163%] tracking-[0.02em]">
            {desc}
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Button
              href={action1Url}
              color="white"
              className="hover:!text-red-dark"
              useArrow={action1UseArrow}
              startIcon={action1StartIcon}
            >
              {action1Label}
            </Button>
            <Button
              href={action2Url}
              color="white"
              className="hover:!text-red-dark"
              useArrow={action2UseArrow}
              startIcon={action2StartIcon}
            >
              {action2Label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
