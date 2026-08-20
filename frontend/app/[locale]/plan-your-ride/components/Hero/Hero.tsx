import Banner from "@/components/Banner/Banner";
import Button from "@/components/Button/Button";
import type {
  ActionButton as ActionButtonProps,
  ResponsiveImage,
} from "@/types/api";

export interface HeroProps {
  title: string;
  desc?: string | null;
  actionButton?: ActionButtonProps | null;
  bannerImage?: ResponsiveImage[] | null;
}

export default function Hero({
  title,
  desc,
  actionButton,
  bannerImage,
}: HeroProps) {
  return (
    <section className="borderless flex h-[calc(100dvh-76px)] flex-col lg:h-[calc(100dvh-100px)]">
      <div className="sectionContainer bg-green flex h-[calc(calc(100dvh-76px)*0.57)] items-center lg:h-[calc(calc(100dvh-100px)*0.34)] lg:px-10">
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
              className="self-cd\enter shrink-0 lg:self-auto"
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
      <Banner
        bannerImage={bannerImage}
        className="h-[calc(calc(100dvh-76px)*0.43)] lg:h-[calc(calc(100dvh-100px)*0.66)]"
      />
    </section>
  );
}
