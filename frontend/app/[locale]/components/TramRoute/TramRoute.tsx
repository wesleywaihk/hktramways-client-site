import Image from "next/image";
import Button from "@/components/Button/Button";
import type { TramRouteData } from "@/types/api";

export interface TramRouteProps {
  data?: TramRouteData | null;
}

export default function TramRoute({ data }: TramRouteProps) {
  if (!data) return null;

  const title = data.title ?? "6 TRAM ROUTES";
  const desc = data.desc ?? "";
  const buttonLabel = data.mapButton?.label ?? "INTERACTIVE ROUTE MAP";
  const buttonUrl = data.mapButton?.link?.[0]?.url ?? "#";

  return (
    <section className="borderless pageHeight relative bg-earth-light pt-16 md:pt-20 lg:pt-24">
      <div className="flex flex-col items-center text-center md:items-start md:text-left px-5 lg:px-6 max-w-[600px] mx-auto md:mx-0 md:ml-[8%]">
        <h2 className="text-green font-semibold uppercase text-[40px] md:text-[56px] leading-[107%] tracking-[0.02em]">
          {title}
        </h2>
        <p className="mt-4 md:mt-6 text-black text-[15px] md:text-[16px] leading-[163%] tracking-[0.02em]">
          {desc}
        </p>
        <Button href={buttonUrl} className="mt-6 md:mt-8 text-green">
          <span className="inline-flex items-center gap-2">
            <Image
              src="/ico/map.svg"
              alt=""
              width={20}
              height={20}
              className="shrink-0 w-5 h-5"
              aria-hidden="true"
            />
            {buttonLabel}
          </span>
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
