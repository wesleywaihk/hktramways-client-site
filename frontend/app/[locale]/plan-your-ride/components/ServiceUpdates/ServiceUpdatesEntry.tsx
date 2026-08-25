import IconButton from "@/components/Button/IconButton";
import type { AnnouncementItemData } from "@/types/api";
import { formatDate } from "@/lib/formatDate";

export default function ServiceUpdatesEntry({
  dateTime,
  text,
  link,
}: AnnouncementItemData) {
  const url = link?.url ?? null;
  const openNewWindow = link?.openNewWindow ?? false;
  const noRefer = link?.noRefer ?? false;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/10 py-6 first:pt-0 last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <span className="text-green block text-[15px] leading-none font-semibold tracking-[0.02em] lg:text-[16px]">
          {formatDate(dateTime)}
        </span>
        <p className="mt-3 text-[18px] leading-[135%] font-semibold tracking-[0.02em] text-[#222] lg:text-[21px]">
          {text}
        </p>
      </div>
      <IconButton
        ariaLabel={text}
        useArrow
        shape="square"
        href={url ?? undefined}
        target={openNewWindow ? "_blank" : undefined}
        rel={openNewWindow && noRefer ? "nofollow noreferrer" : undefined}
        className="hover:text-green! hover:border-green! grid shrink-0 border-transparent! !bg-[#fdd021] text-white! hover:bg-white! lg:h-[60px] lg:w-[60px] lg:rounded-[21px]"
      />
    </div>
  );
}
