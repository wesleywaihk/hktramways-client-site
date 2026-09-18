import { useTranslations } from "next-intl";
import { devClassName } from "@/lib/devClassName";
import type { Direction } from "@/consts";

const BUTTON_CLASSES =
  "flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[10px] p-[15px] lg:p-[6px] transition-colors duration-200";

const TXT_1_CLASS =
  "text-[18px] leading-[152%] font-semibold tracking-[0.02em] lg:text-[15px]";

const TXT_2_CLASS =
  "text-[12px] leading-[110%] tracking-[0.02em] lg:text-[10px]";

interface RouteToggleProps {
  direction: Direction;
  onChange: (direction: Direction) => void;
}

export default function RouteToggle({ direction, onChange }: RouteToggleProps) {
  const t = useTranslations("common");

  return (
    <div
      className={`${devClassName("route-toggle")}flex w-full rounded-[18px] border-2 border-[#CCCCCC]/40 bg-white p-[8px] lg:h-[62px]`}
    >
      <button
        type="button"
        onClick={() => onChange("west")}
        className={`${BUTTON_CLASSES} ${
          direction === "west" ? "bg-green text-white" : "text-green bg-white"
        }`}
      >
        <span className={TXT_1_CLASS}>{t("routeToggleWestbound")}</span>
        <span
          className={`${TXT_2_CLASS} ${direction === "east" ? "text-black" : ""}`}
        >
          {t("routeToggleWestboundSub")}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onChange("east")}
        className={`${BUTTON_CLASSES} ${
          direction === "east" ? "bg-green text-white" : "text-green bg-white"
        }`}
      >
        <span className={TXT_1_CLASS}>{t("routeToggleEastbound")}</span>
        <span
          className={`${TXT_2_CLASS} ${direction === "west" ? "text-black" : ""}`}
        >
          {t("routeToggleEastboundSub")}
        </span>
      </button>
    </div>
  );
}
