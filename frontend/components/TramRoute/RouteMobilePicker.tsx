import { useTranslations } from "next-intl";
import ChevronIcon from "@/components/Header/ChevronIcon";
import CloseIcon from "@/components/Header/CloseIcon";
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
      <div className="absolute right-5 bottom-5 left-5 m-0 w-auto md:hidden">
        <button
          type="button"
          onClick={onOpen}
          className="text-green flex w-full cursor-pointer items-center justify-between gap-2 rounded-[21px] bg-white px-5 py-4 font-sans text-[13px] font-bold tracking-[0.02em] uppercase shadow-md"
        >
          <span className="grid flex-1 grid-cols-[24px_1fr_20px_1fr] items-center gap-x-3">
            <span className="bg-green flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white">
              {activeRoute.id}
            </span>
            <span className="text-center">{t(activeRoute.from)}</span>
            <ExchangeArrow className="text-green/40 mx-auto h-5 w-5" />
            <span className="text-center">{t(activeRoute.to)}</span>
          </span>
          <ChevronIcon className="h-4 w-4 shrink-0" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out md:hidden ${
          sheetOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 bottom-0 left-0 z-[1011] max-h-[80dvh] overflow-y-auto rounded-t-[24px] bg-white px-5 pt-5 pb-8 transition-transform duration-500 ease-in-out md:hidden ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="font-sans text-[14px] font-semibold tracking-[0.02em] text-black uppercase">
            {selectLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="text-green cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {ROUTES.map((route) => (
            <RouteOptionButton
              key={route.id}
              route={route}
              active={route.id === activeRoute.id}
              onClick={() => onSelect(route.id)}
              fullWidth
            />
          ))}
        </div>
      </div>
    </>
  );
}
