import Link from "next/link";
import type { AnnouncementItemData } from "@/types/api";
import { formatDate } from "@/lib/formatDate";

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      {url ? (
        <Link
          href={url}
          target={openNewWindow ? "_blank" : "_self"}
          {...(openNewWindow && noRefer ? { rel: "nofollow noreferrer" } : {})}
          className="bg-yellow text-green flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] transition-transform hover:scale-105 lg:h-12 lg:w-12 lg:rounded-[12px]"
        >
          <Arrow />
        </Link>
      ) : (
        <span className="bg-yellow text-green flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] lg:h-12 lg:w-12 lg:rounded-[12px]">
          <Arrow />
        </span>
      )}
    </div>
  );
}
