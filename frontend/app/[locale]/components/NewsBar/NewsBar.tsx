import Image from "next/image";
import type { HomeNewsBarItem } from "@/types/api";
import NewsBarEntry from "./NewsBarEntry";

export interface NewsBarProps {
  items: HomeNewsBarItem[];
}

export default function NewsBar({ items }: NewsBarProps) {
  if (!items?.length) return null;

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
          {[...items, ...items].map((item, index) => (
            <NewsBarEntry key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
