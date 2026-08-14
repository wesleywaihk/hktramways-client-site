import { forwardRef } from "react";
import ArrowIco from "@/components/icons/ArrowIco";

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
          `hidden ${VISIBLE_FROM_CLASSES[visibleFrom]}`,
          "absolute left-0 top-0 flex-col items-center justify-center gap-1 w-[150px] h-[150px] rounded-full bg-white text-green pointer-events-none z-20 will-change-transform transition-[opacity,transform] duration-150 ease-out",
          visible ? "opacity-100" : "opacity-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
        <ArrowIco
          width={20}
          height={20}
          aria-hidden="true"
          className="shrink-0 mx-auto block text-current"
        />
      </div>
    );
  },
);

export default FloatingCircle;
