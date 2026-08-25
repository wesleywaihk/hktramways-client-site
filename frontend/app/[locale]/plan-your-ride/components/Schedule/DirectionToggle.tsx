type Direction = "west" | "east";

interface DirectionToggleProps {
  direction: Direction;
  onChange: (direction: Direction) => void;
  westLabel: string;
  eastLabel: string;
}

const ArrowIcon = ({ flip }: { flip?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 21 20"
    fill="none"
    className={`shrink-0 ${flip ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path
      d="M4.37272 19.5933L18.3727 12.5933C19.8727 11.8933 20.4727 10.0933 19.6727 8.5933C19.3727 7.9933 18.8727 7.5933 18.3727 7.2933L4.37272 0.293297C2.87272 -0.406703 1.07272 0.193297 0.37272 1.5933C-0.02728 2.3933 -0.0272782 3.2933 0.272721 4.1933L2.67272 9.5933C2.77272 9.8933 2.77272 10.1933 2.67272 10.3933L0.272721 15.7933C-0.42728 17.2933 0.27272 19.0933 1.77272 19.7933C2.67272 19.9933 3.57272 19.9933 4.37272 19.5933ZM2.37272 17.5933C2.07272 17.2933 1.97272 16.8933 2.17272 16.4933L4.57272 11.0933C4.87272 10.2933 4.87272 9.3933 4.57272 8.6933L2.17272 3.3933C1.97272 2.8933 2.17272 2.2933 2.67272 2.0933C2.97272 1.9933 3.27272 1.9933 3.47272 2.0933L17.4727 9.0933C17.9727 9.3933 18.1727 9.9933 17.8727 10.3933C17.7727 10.5933 17.6727 10.6933 17.4727 10.7933L3.47272 17.7933C3.17272 17.9933 2.67272 17.8933 2.37272 17.5933Z"
      fill="currentColor"
    />
  </svg>
);

export default function DirectionToggle({
  direction,
  onChange,
  westLabel,
  eastLabel,
}: DirectionToggleProps) {
  return (
    <div className="flex rounded-[30px] bg-black/15 p-[10px]">
      <button
        type="button"
        onClick={() => onChange("west")}
        className={`flex cursor-pointer items-center gap-[15px] rounded-[21px] px-[25px] py-[15px] text-[13px] font-semibold uppercase transition-colors duration-200 ${
          direction === "west"
            ? "text-green bg-yellow"
            : "hover:text-yellow text-white"
        }`}
      >
        <ArrowIcon flip />
        {westLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("east")}
        className={`flex cursor-pointer items-center gap-[15px] rounded-[21px] px-[25px] py-[15px] text-[13px] font-semibold uppercase transition-colors duration-200 ${
          direction === "east"
            ? "text-green bg-yellow"
            : "hover:text-yellow text-white"
        }`}
      >
        {eastLabel}
        <ArrowIcon />
      </button>
    </div>
  );
}
