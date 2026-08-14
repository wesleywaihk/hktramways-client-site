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
  return (
    <>
      <div className="md:hidden absolute m-0 bottom-5 left-5 right-5 w-auto">
        <button
          type="button"
          onClick={onOpen}
          className="w-full flex items-center justify-between gap-2 px-5 py-4 rounded-[21px] bg-white text-green shadow-md font-sans text-[13px] font-bold uppercase tracking-[0.02em] cursor-pointer"
        >
          <span className="grid grid-cols-[24px_1fr_20px_1fr] items-center gap-x-3 flex-1">
            <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-green text-white text-[11px] font-bold">
              {activeRoute.id}
            </span>
            <span className="text-center">{activeRoute.from}</span>
            <ExchangeArrow className="w-5 h-5 mx-auto text-green/40" />
            <span className="text-center">{activeRoute.to}</span>
          </span>
          <ChevronIcon className="w-4 h-4 shrink-0" />
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-[1010] bg-black/40 transition-opacity duration-300 ease-in-out ${
          sheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`md:hidden fixed left-0 right-0 bottom-0 z-[1011] rounded-t-[24px] bg-white px-5 pt-5 pb-8 max-h-[80dvh] overflow-y-auto transition-transform duration-500 ease-in-out ${
          sheetOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-sans text-[14px] font-semibold uppercase tracking-[0.02em] text-black">
            {selectLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-green cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
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
