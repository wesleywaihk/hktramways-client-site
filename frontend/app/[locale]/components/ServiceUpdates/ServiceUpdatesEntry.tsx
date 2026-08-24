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
        <span className="text-green block text-[13px] leading-none font-semibold tracking-[0.02em] uppercase">
          {formatDate(dateTime)}
        </span>
        <p className="mt-3 text-[16px] leading-[135%] font-semibold text-black lg:text-[18px]">
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
        className="hover:text-green! hover:border-green! grid shrink-0 border-transparent! !bg-[#fdd021] text-white! hover:bg-white!"
      />
    </div>
  );
}
