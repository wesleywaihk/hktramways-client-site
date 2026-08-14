import type { HomeNewsBarItem } from "@/types/api";
import { formatDate } from "@/lib/formatDate";

export default function NewsBarEntry({
  dateTime,
  type,
  text,
  hyperlink,
}: HomeNewsBarItem) {
  const url = hyperlink?.url ?? null;
  const openNewWindow = hyperlink?.openNewWindow ?? false;
  const noRefer = hyperlink?.noRefer ?? false;

  return (
    <div className="mr-10 flex items-center gap-4">
      <span className="text-green text-[14px] leading-none font-normal tracking-[0.02em] whitespace-nowrap uppercase lg:text-[15px] lg:font-semibold">
        {formatDate(dateTime)}
      </span>
      <span className="lg:bg-green inline-block rounded-[8px] bg-[#FDD021] px-2.5 py-1 text-[11px] leading-none font-semibold tracking-[0.02em] tracking-wide whitespace-nowrap text-white uppercase lg:rounded-[10px] lg:text-[12px]">
        {type}
      </span>
      {url ? (
        <a
          href={url}
          className="text-green cursor-pointer text-sm font-semibold tracking-[0.02em] whitespace-nowrap transition-colors duration-300 hover:underline lg:text-[15px] lg:text-black"
          target={openNewWindow ? "_blank" : "_self"}
          {...(openNewWindow && noRefer ? { rel: "nofollow noreferrer" } : {})}
        >
          {text}
        </a>
      ) : (
        <span className="text-green text-sm font-semibold tracking-[0.02em] whitespace-nowrap lg:text-[15px] lg:text-black">
          {text}
        </span>
      )}
    </div>
  );
}
