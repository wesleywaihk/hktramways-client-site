import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/Button/Button";
import type { TramRouteData } from "@/types/api";

export interface TramRouteProps {
  data?: TramRouteData | null;
}

export default function TramRoute({ data = undefined }: TramRouteProps) {
  const t = useTranslations("common");

  if (!data) return null;

  const title = data?.title ?? t("tramRouteTitleFallback");
  const desc = data?.desc ?? "";
  const buttonLabel = data?.actionButton?.label ?? t("tramRouteButtonFallback");
  const buttonUrl = data?.actionButton?.link?.url ?? "#";
  const buttonUseArrow = data?.actionButton?.useArrow ?? false;
  const buttonStartIcon = data?.actionButton?.startIcon?.icon ?? "map";

  return (
    <section className="borderless pageHeight relative bg-earth-light pt-16 md:pt-20 lg:pt-24">
      <div className="flex flex-col items-center text-center md:items-start md:text-left px-5 lg:px-6 max-w-[600px] mx-auto md:mx-0 md:ml-[8%]">
        <h2 className="text-green font-semibold uppercase text-[40px] md:text-[56px] leading-[107%] tracking-[0.02em]">
          {title}
        </h2>
        <p className="mt-4 md:mt-6 text-black text-[15px] md:text-[16px] leading-[163%] tracking-[0.02em]">
          {desc}
        </p>
        <Button
          href={buttonUrl}
          className="mt-6 md:mt-8 text-green"
          useArrow={buttonUseArrow}
          startIcon={buttonStartIcon}
        >
          {buttonLabel}
        </Button>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full aspect-[1360/390]">
        <Image
          src="/home/tramRoute/map.svg"
          alt={title}
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
