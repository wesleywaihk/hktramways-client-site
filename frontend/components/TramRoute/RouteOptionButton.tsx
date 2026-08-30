import { useTranslations } from "next-intl";
import ExchangeArrow from "./ExchangeArrow";
import type { RouteStop } from "./routes";

export interface RouteOptionButtonProps {
  route: RouteStop;
  active: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

export default function RouteOptionButton({
  route,
  active,
  onClick,
  fullWidth = false,
}: RouteOptionButtonProps) {
  const t = useTranslations("common");
  const gridClasses =
    `grid items-center gap-x-3 px-4 py-3.5 ${
      fullWidth
        ? "w-full grid-cols-[24px_1fr_20px_1fr]"
        : "w-fit grid-cols-[24px_150px_20px_150px]"
    } ` +
    "font-sans text-[13px] lg:text-[14px] font-bold uppercase tracking-[0.02em] cursor-pointer";

  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${gridClasses} bg-green w-full justify-between rounded-[21px] text-white shadow-md transition-colors duration-200 ease-out`}
      >
        <span className="text-green flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[12px] font-bold transition-colors duration-200 ease-out">
          {route.id}
        </span>
        <span className="text-center">{t(route.from)}</span>
        <ExchangeArrow className="mx-auto h-5 w-5 transition-colors duration-200 ease-out" />
        <span className="text-center">{t(route.to)}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${gridClasses} group text-green hover:bg-green w-full justify-between rounded-[21px] bg-transparent transition-colors duration-200 ease-out hover:text-white hover:shadow-md`}
    >
      <span className="bg-green group-hover:text-green flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white transition-colors duration-200 ease-out group-hover:bg-white">
        {route.id}
      </span>
      <span>{t(route.from)}</span>
      <ExchangeArrow className="text-green/40 mx-auto h-5 w-5 transition-colors duration-200 ease-out group-hover:text-white" />
      <span>{t(route.to)}</span>
    </button>
  );
}
