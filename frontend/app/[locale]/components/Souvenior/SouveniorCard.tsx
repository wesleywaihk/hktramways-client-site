import Link from "next/link";
import SouveniorIcon from "./SouveniorIcon";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import RankCrownIco from "@/components/icons/RankCrownIco";
import type { SouveniorItem } from "@/types/api";

function formatPrice(price: number) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export interface SouveniorCardProps {
  item: SouveniorItem;
  order: number;
}

export default function SouveniorCard({ item, order }: SouveniorCardProps) {
  const href = item.link?.url ?? undefined;

  return (
    <div className="group relative flex flex-col items-center shrink-0 w-[53vw] md:w-[35vw] lg:w-[320px]">
      {href && (
        <Link
          href={href}
          target={item.link?.openNewWindow ? "_blank" : undefined}
          rel={item.link?.noRefer ? "noreferrer" : undefined}
          aria-label={item.name}
          className="absolute inset-0 z-30"
        />
      )}
      <div className="relative w-full aspect-square">
        <ResponsiveImg
          bannerImage={{
            id: item.image?.id ?? 0,
            altText: item.name,
            imageD: item.image ?? null,
            imageM: null,
          }}
          sizes="(min-width: 1024px) 258px, (min-width: 768px) 31vw, 48vw"
          className="rounded-[50%] bg-white/10 select-none pointer-events-none"
        />

        <div className="absolute inset-0 rounded-full border-[20px] border-transparent group-hover:border-green-light transition-colors pointer-events-none z-10 ring-inset" />

        <div className="absolute z-20 top-0 left-2 pointer-events-none">
          {item.rank && (
            <RankCrownIco
              rank={item.rank}
              className="absolute z-10 left-[5vw] -top-[5vw] md:-left-[15px] md:-top-[18px]  w-[4.7vw] h-auto -rotate-[10deg] md:w-[23px] md:h-[22px] md:-rotate-[30deg]"
            />
          )}
          <span
            className="font-sans font-semibold text-[10vw] md:text-[44px] lg:text-[62px] leading-none uppercase tracking-[0.05em] text-transparent"
            style={{ WebkitTextStroke: "1px white" }}
          >
            {String(order).padStart(2, "0")}
          </span>
        </div>

        <SouveniorIcon
          icon={item.icon?.icon}
          className="absolute z-10 bottom-5 right-5"
        />
      </div>

      <p className="mt-3 md:mt-4 font-sans font-normal text-white text-center text-[15px] lg:text-[16px] leading-[163%] tracking-[0.02em] line-clamp-2 min-h-[2.9em]">
        {item.name}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5 text-white text-[15px] md:text-[16px] font-semibold tracking-[0.02em]">
        <span>HK${formatPrice(item.pirce)}</span>
        {item.preDiscountPrice != null && (
          <span className="text-white/50 font-normal text-[12px] md:text-[13px] line-through">
            HK${formatPrice(item.preDiscountPrice)}
          </span>
        )}
      </p>
    </div>
  );
}
