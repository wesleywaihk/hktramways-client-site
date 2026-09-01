import { useTranslations } from "next-intl";
import ExchangeArrow from "./ExchangeArrow";
import type { RouteStop } from "./routes";

export interface RouteOptionButtonProps {
  route: RouteStop;
  active: boolean;
  onClick: () => void;
}

const gridClasses = `grid items-center p-[15px] lg:px-4 lg:py-3.5 w-full grid-cols-[24px_1fr_20px_1fr] w-full justify-between rounded-[21px] transition-colors duration-200 ease-out`;

const idClass =
  "flex h-6 w-6 items-center justify-center rounded-full text-center text-[12px] leading-[100%] font-semibold tracking-[0.02em] md:text-[14px] transition-colors duration-200 ease-out";
const txtClass =
  "text-center text-[14px] leading-[120%] font-semibold tracking-[0.02em] normal-case! md:text-[18px] md:leading-[178%]";

export default function RouteOptionButton({
  route,
  active,
  onClick,
}: RouteOptionButtonProps) {
  const t = useTranslations("common");

  if (active) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${gridClasses} bg-green text-white`}
      >
        <span className={`${idClass} text-green bg-white`}>{route.id}</span>
        <span className={txtClass}>{t(route.from)}</span>
        <ExchangeArrow className="mx-auto h-5 w-5 transition-colors duration-200 ease-out" />
        <span className={txtClass}>{t(route.to)}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${gridClasses} group text-green hover:bg-green cursor-pointer bg-transparent hover:text-white`}
    >
      <span
        className={`${idClass} bg-green group-hover:text-green text-white group-hover:bg-white`}
      >
        {route.id}
      </span>
      <span className={txtClass}>{t(route.from)}</span>
      <ExchangeArrow className="text-green mx-auto h-5 w-5 transition-colors duration-200 ease-out group-hover:text-white" />
      <span className={txtClass}>{t(route.to)}</span>
    </button>
  );
}
