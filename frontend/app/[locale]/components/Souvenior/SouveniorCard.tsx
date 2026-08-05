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
    <div className="group relative flex flex-col items-center shrink-0 w-[53vw] md:w-[35vw] lg:w-[320px]">
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
      <div className="relative w-full aspect-square">
        <div className="absolute inset-0 transition-all duration-300 ease-out group-hover:inset-[3vw] md:group-hover:inset-[2vw] lg:group-hover:inset-[18px]">
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
        </div>

        <div className="absolute inset-0 rounded-full border-0 border-green-light group-hover:border-[3vw] md:group-hover:border-[2vw] lg:group-hover:border-[18px] transition-all duration-300 ease-out pointer-events-none z-10 ring-inset" />

        <div className="absolute z-20 -top-[34px] -left-[3px] md:-top-[28px] md:-left-[16px] lg:-top-[28px] lg:-left-[16px] pointer-events-none">
          <Image
            src={`/home/souvenior/home-store-number${String(order).padStart(2, "0")}_m.svg`}
            alt=""
            width={59}
            height={53.6}
            className="md:hidden w-[14vw] h-auto"
            aria-hidden="true"
          />
          <Image
            src={`/home/souvenior/home-store-number${String(order).padStart(2, "0")}.svg`}
            alt=""
            width={84}
            height={87}
            className="hidden md:block md:w-[10vw] lg:w-[87px] h-auto"
            aria-hidden="true"
          />
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
