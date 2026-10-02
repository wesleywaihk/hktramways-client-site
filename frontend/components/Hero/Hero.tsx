import Banner from "@/components/Banner/Banner";
import PageTitle from "@/components/PageTitle/PageTitle";
import { devClassName } from "@/lib/devClassName";
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
    <section
      className={`${devClassName("hero")}borderless flex h-[calc(100dvh-76px)] flex-col lg:h-[calc(100dvh-100px)]`}
    >
      <PageTitle
        title={title}
        desc={desc}
        actionButton={actionButton}
        className="h-[calc(calc(100dvh-76px)*0.57)] lg:h-[calc(calc(100dvh-100px)*0.34)]"
      />
      <Banner
        bannerImage={bannerImage}
        className="h-[calc((100dvh-76px)*0.43)] w-[calc(100%+20px)] lg:h-[calc((100dvh-100px)*0.66)] lg:w-[calc(100%+40px)]"
        useBorder={false}
        scrollDistanceM={100}
      />
    </section>
  );
}
