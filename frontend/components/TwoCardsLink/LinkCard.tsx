import Image from "next/image";
import IconButton from "@/components/Button/IconButton";
import { devClassName } from "@/lib/devClassName";
import { mediaSrc } from "@/lib/media";
import type { LinkCardData } from "@/types/api";

export default function LinkCard({
  card,
  className = "",
  buttonClassName = "",
}: {
  card: LinkCardData;
  className?: string;
  buttonClassName?: string;
}) {
  const href = card.link?.url ?? undefined;
  const openNewWindow = !!card.link?.openNewWindow;

  return (
    <div
      className={`${devClassName("link-card")}relative flex flex-1 items-center gap-4 rounded-[20px] py-6 pr-16 pl-5 lg:gap-6 lg:rounded-[24px] lg:py-10 lg:pr-24 lg:pl-8 ${className}`}
    >
      {card.image?.url && (
        <Image
          src={mediaSrc(card.image.url)}
          alt={card.image.alternativeText ?? ""}
          width={card.image.width}
          height={card.image.height}
          className="h-auto w-[70px] shrink-0 object-contain lg:w-[100px]"
        />
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <h3 className="text-green text-[22px] leading-[1.2] font-semibold tracking-[0.02em] lg:text-[28px]">
          {card.title}
        </h3>
        <p className="text-black">{card.desc}</p>
      </div>

      {href && (
        <IconButton
          ariaLabel={card.title}
          // External-style ↗ for links that open in a new window, → otherwise.
          useArrow={!openNewWindow}
          icon={openNewWindow ? "upRightArrow" : undefined}
          shape="square"
          href={href}
          target={openNewWindow ? "_blank" : undefined}
          rel={card.link?.noRefer ? "noreferrer" : undefined}
          className={`hover:text-green! hover:border-green! absolute! right-4 bottom-4 grid shrink-0 rounded-full border-transparent! text-white! hover:bg-white! lg:right-5 lg:bottom-5 lg:h-[50px] lg:w-[50px] lg:rounded-[18px] ${buttonClassName}`}
        />
      )}
    </div>
  );
}
