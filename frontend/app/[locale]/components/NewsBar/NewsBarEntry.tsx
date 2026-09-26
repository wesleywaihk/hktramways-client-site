import Link from "next/link";
import type { AnnouncementData } from "@/types/api";
import { devClassName } from "@/lib/devClassName";
import { formatDate } from "@/lib/formatDate";
import { getLocalizedLabel } from "@/lib/getLocalizedLabel";
import { newsHref } from "@/lib/newsHref";

export interface NewsBarEntryProps extends AnnouncementData {
  locale: string;
}

export default function NewsBarEntry({
  dateTime,
  announcement_types,
  title,
  slug,
  locale,
}: NewsBarEntryProps) {
  const type = announcement_types[0]
    ? getLocalizedLabel(announcement_types[0], locale)
    : "";

  return (
    <div
      className={`${devClassName("news-bar-entry")}mr-10 flex items-center gap-4`}
    >
      <span className="text-green text-[14px] leading-none font-normal tracking-[0.02em] whitespace-nowrap uppercase lg:text-[15px] lg:font-semibold">
        {formatDate(dateTime)}
      </span>
      {type ? (
        <span className="lg:bg-green inline-block rounded-[8px] bg-[#FDD021] px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[0.02em] tracking-wide whitespace-nowrap text-white uppercase lg:rounded-[10px] lg:text-[12px]">
          {type}
        </span>
      ) : null}
      {slug ? (
        <Link
          href={newsHref(locale, slug)}
          className="text-green lg:hover:text-green cursor-pointer text-sm font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-300 lg:text-[15px] lg:text-black"
        >
          {title}
        </Link>
      ) : (
        <span className="text-green text-sm font-semibold tracking-[0.02em] whitespace-nowrap lg:text-[15px] lg:text-black">
          {title}
        </span>
      )}
    </div>
  );
}
