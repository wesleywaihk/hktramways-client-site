import Button from "@/components/Button/Button";
import { devClassName } from "@/lib/devClassName";
import type { ActionButton as ActionButtonProps } from "@/types/api";

export interface PageTitleProps {
  title: string;
  desc?: string | null;
  actionButton?: ActionButtonProps | null;
  /** Extra classes for the green container, e.g. its height. */
  className?: string;
}

export default function PageTitle({
  title,
  desc,
  actionButton,
  className = "",
}: PageTitleProps) {
  return (
    <div
      className={`${devClassName("page-title")}sectionContainer bg-green flex items-center lg:px-10 ${className}`}
    >
      <div className="mx-auto flex max-w-screen-lg grow flex-col items-center justify-center gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-center text-[clamp(50px,21.37px+7.63vw,80px)] leading-[103%] font-semibold tracking-[0.02em] text-white uppercase md:leading-[100%] lg:text-left">
            {title}
          </h1>
          {desc && (
            <p className="text-center text-[18px] leading-[152%] font-normal tracking-[0.02em] text-white md:text-[21px] lg:text-left">
              {desc}
            </p>
          )}
        </div>
        {actionButton && (
          <Button
            href={actionButton.link?.url ?? "#"}
            color="white"
            useArrow={actionButton.useArrow ?? false}
            startIcon={actionButton.startIcon?.icon}
            className="shrink-0 self-center lg:self-auto"
          >
            {actionButton.label}
          </Button>
        )}
      </div>
    </div>
  );
}
