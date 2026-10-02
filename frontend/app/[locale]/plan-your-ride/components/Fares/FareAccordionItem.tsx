import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import ChevronIcon from "@/components/icons/ChevronIcon";
import RichText from "@/components/RichText/RichText";
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
      className={`${devClassName("fare-accordion-item")}border-b-[2px] border-white/10 first:border-t-[2px]`}
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
            width={24}
            height={24}
            className="h-5 w-5 shrink-0 object-contain lg:h-6 lg:w-6"
          />
        )}
        <span className="grow text-[18px] leading-[152.4%] font-semibold tracking-[0.02em]">
          {item.title}
        </span>
        <ChevronIcon active={open} className="h-5 w-5 shrink-0 lg:h-6 lg:w-6" />
      </button>
      <Collapse in={open}>
        <div className="pb-5 text-[14px] leading-[152%] font-normal text-white">
          <RichText>{item.desc}</RichText>
          {item.note && <p className="mt-2 text-white/60">{item.note}</p>}
        </div>
      </Collapse>
    </div>
  );
}
