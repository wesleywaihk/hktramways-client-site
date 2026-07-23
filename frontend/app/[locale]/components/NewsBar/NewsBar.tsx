import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { HomeNewsBarItem } from "@/types/api";
import NewsBarEntry from "./NewsBarEntry";

export interface NewsBarProps {
  items: HomeNewsBarItem[];
  locale: string;
}

export default async function NewsBar({ items, locale }: NewsBarProps) {
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <section className="borderless h-[52px] lg:h-[60px] bg-white relative overflow-visible pl-[53px] lg:pl-[92px] flex">
      <Image
        src="/home/newsBar/dingDingCat.svg"
        alt=""
        width={108}
        height={85}
        className="absolute left-[10px] lg:left-[20px] bottom-0 z-10 w-[85px] h-[67px] lg:w-[108px] lg:h-[85px]"
        aria-hidden="true"
      />
      <div className="flex grow items-center overflow-hidden">
        <div className="flex items-center animate-marquee">
          {items.length
            ? [...items, ...items].map((item, index) => (
                <NewsBarEntry key={index} {...item} />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <span
                  key={index}
                  className="font-semibold text-sm lg:text-[15px] tracking-[0.02em] whitespace-nowrap text-green lg:text-black mr-10"
                >
                  {t("newsBarFallback")}
                </span>
              ))}
        </div>
      </div>
    </section>
  );
}
