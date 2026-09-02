import { forwardRef } from "react";
import LongArrowIco from "@/components/icons/LongArrowIco";
import { devClassName } from "@/lib/devClassName";

export type FloatingCircleBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

/** literal class strings so Tailwind's scanner picks them up (template strings wouldn't be) */
const VISIBLE_FROM_CLASSES: Record<FloatingCircleBreakpoint, string> = {
  sm: "sm:flex",
  md: "md:flex",
  lg: "lg:flex",
  xl: "xl:flex",
  "2xl": "2xl:flex",
};

export interface FloatingCircleProps {
  visible: boolean;
  content: React.ReactNode;
  className?: string;
  /** breakpoint the circle becomes visible from */
  visibleFrom?: FloatingCircleBreakpoint;
}

/** cursor-following circle used to preview hover text; pair with useFloatingCircle */
const FloatingCircle = forwardRef<HTMLDivElement, FloatingCircleProps>(
  function FloatingCircle(
    { visible, content, className, visibleFrom = "md" },
    ref,
  ) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={[
          devClassName("floating-circle"),
          `hidden ${VISIBLE_FROM_CLASSES[visibleFrom]}`,
          "text-green pointer-events-none absolute top-0 left-0 z-20 h-[150px] w-[150px] flex-col items-center justify-center gap-1 rounded-full bg-white transition-[opacity,transform] duration-150 ease-out will-change-transform",
          visible ? "opacity-100" : "opacity-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
        <LongArrowIco
          width={20}
          height={20}
          aria-hidden="true"
          className="mx-auto mt-2 block shrink-0 text-current"
        />
      </div>
    );
  },
);

export default FloatingCircle;
