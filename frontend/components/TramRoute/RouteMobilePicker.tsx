import { useTranslations } from "next-intl";
import ChevronIcon from "@/components/icons/ChevronIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ExchangeArrow from "./ExchangeArrow";
import RouteOptionButton from "./RouteOptionButton";
import { ROUTES } from "./routes";
import type { RouteStop } from "./routes";

export interface RouteMobilePickerProps {
  activeRoute: RouteStop;
  sheetOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectLabel: string;
}
const txtClass =
  "text-center font-sans text-[15px] leading-[130%] font-semibold tracking-[0.02em]"; //whitespace-nowrap  ?

export default function RouteMobilePicker({
  activeRoute,
  sheetOpen,
  onOpen,
  onClose,
  onSelect,
  selectLabel,
}: RouteMobilePickerProps) {
  const t = useTranslations("common");
  return (
    <>
      <div className="absolute right-5 bottom-5 left-5 z-20 m-0 w-auto lg:hidden">
        <button
          type="button"
          onClick={onOpen}
          className="text-green flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-[21px] bg-white p-4 font-sans text-[13px] font-bold tracking-[0.02em]"
        >
          <span className="grid flex-1 grid-cols-[24px_1fr_20px_1fr] items-center gap-2.5">
            <span className="bg-green flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-center font-sans text-[14px] leading-[100%] font-semibold tracking-[0.02em] text-white">
              {activeRoute.id}
            </span>
            <span className={txtClass}>{t(activeRoute.from)}</span>
            <ExchangeArrow className="text-green mx-auto h-5 w-5" />
            <span className={txtClass}>{t(activeRoute.to)}</span>
          </span>
          <ChevronIcon className="h-4 w-4 shrink-0" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out lg:hidden ${
          sheetOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`absolute right-5 bottom-5 left-5 z-[1011] max-h-[80dvh] overflow-y-auto rounded-[21px] bg-[var(--color-earth-light)] p-5 transition-transform duration-500 ease-in-out lg:hidden ${
          sheetOpen ? "translate-y-0" : "translate-y-[calc(100%+20px)]"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
      >
        <div className="mb-[30px] flex items-center justify-between">
          <span className="text-green font-sans text-[20px] leading-[110%] font-semibold tracking-[0.02em]">
            {selectLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="text-green cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
          >
            <CloseIcon className="h-[22px] w-[22px]" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {ROUTES.map((route) => (
            <RouteOptionButton
              key={route.id}
              route={route}
              active={route.id === activeRoute.id}
              onClick={() => onSelect(route.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
