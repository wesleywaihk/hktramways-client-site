import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import PolaroidCard from "./PolaroidCard";
import type { TramoramicTourData } from "@/types/api";

export interface TramoramicTourProps {
  data?: TramoramicTourData | null;
}

export default function TramoramicTour({
  data = undefined,
}: TramoramicTourProps) {
  const t = useTranslations("common");

  if (!data) return null;

  const hashTagTxt = data?.hashTagTxt ?? "";
  const title1 = data?.title1 ?? "";
  const title2 = data?.title2 ?? "";
  const desc = data?.desc ?? "";

  const mainImage = data?.mianImage ?? null;
  const supportImage1 = data?.supportImage1 ?? null;
  const supportImage2 = data?.supportImage2 ?? null;

  const action1Label =
    data?.action1?.label ?? t("tramoramicTourAction1Fallback");
  const action1Url = data?.action1?.link?.[0]?.url ?? "#";
  const action1UseArrow = data?.action1?.useArrow ?? true;
  const action1StartIcon = data?.action1?.startIcon;

  const action2Label =
    data?.action2?.label ?? t("tramoramicTourAction2Fallback");
  const action2Url = data?.action2?.link?.[0]?.url ?? "#";
  const action2UseArrow = data?.action2?.useArrow ?? false;
  const action2StartIcon = data?.action2?.startIcon ?? "calendar";

  return (
    <section className="borderless h-auto pageHeight-md pageHeight-lg relative bg-red-dark py-20 lg:py-24 flex">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 lg:gap-16 px-5 lg:px-6 max-w-[1200px] mx-auto">
        <div className="relative w-[87vmin] md:w-full min-h-[84.5vmin] md:min-h-0 md:flex-1 mt-[12vmin] mb-[6vmin] md:my-0">
          {supportImage2 && (
            <PolaroidCard
              image={supportImage2}
              className="z-0 -translate-x-[8%] -translate-y-[58%] md:-translate-x-[11%] md:-translate-y-[60%] shadow-lg"
            />
          )}
          {supportImage1 && (
            <PolaroidCard
              image={supportImage1}
              className="z-10 -translate-x-[13%] -translate-y-[42%] md:-translate-x-[18%] md:-translate-y-[42%] shadow-lg"
            />
          )}
          <PolaroidCard
            image={mainImage}
            className="z-20 -translate-y-1/2 -translate-y-1/2 shadow-xl"
          >
            {hashTagTxt && (
              <p className="absolute bottom-[5vmin] md:bottom-[2.9vmin] lg:bottom-[40px] left-0 right-0 px-[40px] text-center text-gold font-sans font-semibold whitespace-nowrap [font-size:clamp(0.875rem,6cqw,32px)] leading-[1.25em] tracking-[0.02em]">
                {hashTagTxt}
              </p>
            )}
          </PolaroidCard>
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
              className="text-white"
              useArrow={action1UseArrow}
              startIcon={action1StartIcon}
            >
              {action1Label}
            </Button>
            <Button
              href={action2Url}
              className="text-white"
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
