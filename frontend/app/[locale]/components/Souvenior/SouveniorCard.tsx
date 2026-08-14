import Link from "next/link";
import Image from "next/image";
import SouveniorIcon from "./SouveniorIcon";
import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
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
    <div className="group relative flex w-[53vw] shrink-0 flex-col items-center md:w-[35vw] lg:w-[320px]">
      {href && (
        <Link
          href={href}
          target={item.link?.openNewWindow ? "_blank" : undefined}
          rel={item.link?.noRefer ? "noreferrer" : undefined}
          aria-label={item.name}
          className="absolute inset-0 z-30"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <div className="relative aspect-square w-full">
        <div className="absolute inset-0 transition-all duration-300 ease-out group-hover:inset-[3vw] md:group-hover:inset-[2vw] lg:group-hover:inset-[18px]">
          <ResponsiveImg
            bannerImage={{
              id: item.image?.id ?? 0,
              altText: item.name,
              imageD: item.image ?? null,
              imageM: null,
            }}
            sizes="(min-width: 1024px) 258px, (min-width: 768px) 31vw, 48vw"
            className="pointer-events-none rounded-[50%] bg-white/10 select-none"
          />
        </div>

        <div className="border-green-light pointer-events-none absolute inset-0 z-10 rounded-full border-0 transition-all duration-300 ease-out ring-inset group-hover:border-[3vw] md:group-hover:border-[2vw] lg:group-hover:border-[18px]" />

        <div className="pointer-events-none absolute -top-[34px] -left-[3px] z-20 md:-top-[28px] md:-left-[16px] lg:-top-[28px] lg:-left-[16px]">
          <Image
            src={`/home/souvenior/home-store-number${String(order).padStart(2, "0")}_m.svg`}
            alt=""
            width={59}
            height={53.6}
            className="h-auto w-[14vw] md:hidden"
            aria-hidden="true"
          />
          <Image
            src={`/home/souvenior/home-store-number${String(order).padStart(2, "0")}.svg`}
            alt=""
            width={84}
            height={87}
            className="hidden h-auto md:block md:w-[10vw] lg:w-[87px]"
            aria-hidden="true"
          />
        </div>

        <SouveniorIcon
          icon={item.icon?.icon}
          className="absolute right-5 bottom-5 z-10"
        />
      </div>

      <p className="mt-3 line-clamp-2 min-h-[2.9em] text-center font-sans text-[15px] leading-[163%] font-normal tracking-[0.02em] text-white md:mt-4 lg:text-[16px]">
        {item.name}
      </p>
      <p className="mt-1 flex items-baseline gap-1.5 text-[15px] font-semibold tracking-[0.02em] text-white md:text-[16px]">
        <span>HK${formatPrice(item.pirce)}</span>
        {item.preDiscountPrice != null && (
          <span className="text-[12px] font-normal text-white/50 line-through md:text-[13px]">
            HK${formatPrice(item.preDiscountPrice)}
          </span>
        )}
      </p>
    </div>
  );
}
