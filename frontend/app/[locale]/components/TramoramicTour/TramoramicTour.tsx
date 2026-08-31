"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import { fetchTramoramicTour } from "@/hooks/useApiEndpoint/api";
import CardContainer from "./CardContainer";
import type {
  HomeTramoramicTourResponse,
  TramoramicTourData,
} from "@/types/api";
import { asImage } from "@/lib/media";
import useSlideShow from "./useSlideShow";

export interface TramoramicTourProps {
  locale: string;
  documentId?: string | null;
}

export default function TramoramicTour({
  locale,
  documentId,
}: TramoramicTourProps) {
  const t = useTranslations("common");
  const { activeSlide, nextSlide } = useSlideShow();
  const [data, setData] = useState<TramoramicTourData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to the loading state when `locale` changes before the refetch resolves
    setData(undefined);

    fetchTramoramicTour(locale, documentId)
      .then((res: HomeTramoramicTourResponse) => {
        if (!cancelled) setData(res.data?.[0]?.tramoramicTour ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });

    return () => {
      cancelled = true;
    };
  }, [locale, documentId]);

  if (data === undefined) {
    return (
      <section className="borderless bg-red-dark">
        <Loading />
      </section>
    );
  }

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
    <section className="borderless bg-red-dark relative flex h-auto overflow-hidden pt-20 pb-20 lg:h-[100dvh] lg:py-24">
      <div className="content-max-w pageBorder mx-auto flex w-full flex-col items-center gap-12 lg:flex-row lg:gap-8 lg:gap-16">
        <div className="relative mx-auto mt-[12vmin] mb-[6vmin] min-h-[600px] w-[1px] overflow-visible lg:mx-0 lg:my-0 lg:min-h-0 lg:w-[min(42vw,612px)]">
          {/* min-h-[84.5vmin]*/}
          <CardContainer
            rootClass={
              activeSlide === 0 ? "z-0" : activeSlide === 1 ? "z-10" : "z-20"
            }
            animate={activeSlide === 2 && nextSlide === 0}
            image={image3}
            hashTag={data?.tramoramicTourItem3?.hashTag}
            cardClassName="translate-x-[0] -translate-y-[58%] lg:translate-x-[2.77vw] lg:-translate-y-[60%]"
          />
          <CardContainer
            rootClass={` ${activeSlide === 0 ? "z-10" : activeSlide === 1 ? "z-20" : "z-0"}`}
            animate={activeSlide === 1 && nextSlide === 2}
            image={image2}
            hashTag={data?.tramoramicTourItem2?.hashTag}
            cardClassName="-translate-x-[6vw] -translate-y-[42%] lg:translate-x-0"
          />
          <CardContainer
            rootClass={
              activeSlide === 0 ? "z-20" : activeSlide === 1 ? "z-0" : "z-10"
            }
            animate={activeSlide === 0 && nextSlide === 1}
            image={image1}
            hashTag={data?.tramoramicTourItem1?.hashTag}
            cardClassName="translate-x-[6vw] -translate-y-1/2 lg:translate-x-[6.38vw]"
          />
        </div>

        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center text-center lg:mr-0 lg:w-[35vw] lg:max-w-[428px] lg:items-start lg:text-left">
          <h2 className="text-gold title-text">
            {title1}
            <br />
            <span className="text-white">{title2}</span>
          </h2>
          <p className="text-body mt-4 text-white lg:mt-6">{desc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 lg:mt-8 lg:justify-start">
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
