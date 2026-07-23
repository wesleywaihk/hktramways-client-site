import type { HomeNewsBarItem } from "@/types/api";
import { formatDate } from "@/lib/formatDate";

export default function NewsBarEntry({
  dateTime,
  type,
  text,
  url,
  isExternal,
}: HomeNewsBarItem) {
  return (
    <div className="flex items-center gap-4 mr-10">
      <span className="text-green uppercase leading-none tracking-[0.02em] whitespace-nowrap font-normal text-[14px] lg:font-semibold lg:text-[15px]">
        {formatDate(dateTime)}
      </span>
      <span className="inline-block leading-none tracking-[0.02em] whitespace-nowrap font-semibold text-[11px] text-white bg-[#FDD021] rounded-[8px] px-2.5 py-1 lg:text-[12px] lg:bg-green lg:rounded-[10px] uppercase tracking-wide">
        {type}
      </span>
      {url ? (
        <a
          href={url}
          className="text-black font-semibold text-sm lg:text-[15px] tracking-[0.02em] whitespace-nowrap cursor-pointer hover:underline transition-colors duration-300 text-green lg:text-black"
          {...(isExternal ? { rel: "nofollow noreferrer" } : {})}
          target={isExternal ? "_blank" : "_self"}
        >
          {text}
        </a>
      ) : (
        <span className="text-black font-semibold text-sm lg:text-[15px] tracking-[0.02em] whitespace-nowrap text-green lg:text-black">
          {text}
        </span>
      )}
    </div>
  );
}
