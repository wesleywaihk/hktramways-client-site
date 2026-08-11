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
        className={`${gridClasses} rounded-[21px] bg-green text-white shadow-md transition-colors duration-200 ease-out`}
      >
        <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-white text-green text-[12px] font-bold transition-colors duration-200 ease-out">
          {route.id}
        </span>
        <span className="text-center">{route.from}</span>
        <ExchangeArrow className="w-5 h-5 mx-auto transition-colors duration-200 ease-out" />
        <span className="text-center">{route.to}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${gridClasses} group rounded-[21px] bg-transparent text-green transition-colors duration-200 ease-out hover:bg-green hover:text-white hover:shadow-md`}
    >
      <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-green text-white text-[11px] font-bold transition-colors duration-200 ease-out group-hover:bg-white group-hover:text-green">
        {route.id}
      </span>
      <span>{route.from}</span>
      <ExchangeArrow className="w-5 h-5 mx-auto text-green/40 transition-colors duration-200 ease-out group-hover:text-white" />
      <span>{route.to}</span>
    </button>
  );
}
