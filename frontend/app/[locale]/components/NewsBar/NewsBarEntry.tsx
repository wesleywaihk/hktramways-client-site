import type { AnnouncementItemData } from "@/types/api";
import { devClassName } from "@/lib/devClassName";
import { formatDate } from "@/lib/formatDate";
import { getLocalizedLabel } from "@/lib/getLocalizedLabel";

export interface NewsBarEntryProps extends AnnouncementItemData {
  locale: string;
}

export default function NewsBarEntry({
  dateTime,
  announcement_types,
  title,
  actionButton,
  locale,
}: NewsBarEntryProps) {
  const type = announcement_types[0]
    ? getLocalizedLabel(announcement_types[0], locale)
    : "";
  const link = actionButton[0]?.link ?? null;
  const url = link?.url ?? null;
  const openNewWindow = link?.openNewWindow ?? false;
  const noRefer = link?.noRefer ?? false;

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
      {url ? (
        <a
          href={url}
          className="text-green lg:hover:text-green cursor-pointer text-sm font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-300 lg:text-[15px] lg:text-black"
          target={openNewWindow ? "_blank" : "_self"}
          {...(openNewWindow && noRefer ? { rel: "nofollow noreferrer" } : {})}
        >
          {title}
        </a>
      ) : (
        <span className="text-green text-sm font-semibold tracking-[0.02em] whitespace-nowrap lg:text-[15px] lg:text-black">
          {title}
        </span>
      )}
    </div>
  );
}
