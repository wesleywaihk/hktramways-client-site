import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import { IMG_URL } from "@/consts";
import { devClassName } from "@/lib/devClassName";
import type { FaresData } from "@/types/api";

function mediaSrc(url: string) {
  return url.startsWith("http") ? url : `${IMG_URL}${url}`;
}

export default function FareAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaresData["fareItem"][number];
  open: boolean;
  onToggle: () => void;
}) {
  const iconSrc = item.icon?.url ? mediaSrc(item.icon.url) : null;

  return (
    <div
      className={`${devClassName("fare-accordion-item")}border-b border-white/30`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-[25px] py-5 text-left text-white"
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0 object-contain"
          />
        )}
        <span className="grow text-[18px] leading-[152.4%] font-semibold tracking-[0.02em]">
          {item.title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M3.5 6L8 10.5L12.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Collapse in={open}>
        <div className="pb-5 text-[14px] leading-[152%] font-normal text-white/90">
          <p>{item.desc}</p>
          {item.note && <p className="mt-2 text-white/70">{item.note}</p>}
        </div>
      </Collapse>
    </div>
  );
}
