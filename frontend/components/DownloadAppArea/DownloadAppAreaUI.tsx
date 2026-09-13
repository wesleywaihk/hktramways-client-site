import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import Button, {
  type ButtonColor,
  type ButtonVariant,
} from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import type { DownloadAppAreaData } from "@/types/api";
import { devClassName } from "@/lib/devClassName";
import { asImage } from "@/lib/media";

export interface DownloadAppAreaUIProps {
  // `undefined` = still loading, `null` = loaded but nothing to show.
  data?: DownloadAppAreaData | null;
  compClassName?: string;
  className?: string;
  buttonColor?: ButtonColor;
  buttonVariant?: ButtonVariant;
}

export default function DownloadAppAreaUI({
  data,
  compClassName = "download-app-area",
  className = "",
  buttonColor = "white",
  buttonVariant = "outline",
}: DownloadAppAreaUIProps) {
  if (data === undefined) {
    return (
      <section
        className={`${devClassName(compClassName)}borderless bg-green ${className}`}
      >
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const image = asImage(data.Image);
  const aspectRatio = image ? `${image.width} / ${image.height}` : undefined;

  return (
    <section
      className={`${devClassName(compClassName)}borderless sectionContainer bg-green flex h-auto ${className}`}
    >
      <div
        className="content-box bg-green-light mx-auto mb-[clamp(4rem,5.5555555556vw,7.5rem)] flex w-full flex-col items-center justify-center rounded-[clamp(1.5rem,2.0833333333vw,2.8125rem)] p-[clamp(4rem,5.5555555556vw,7.5rem)] text-white lg:flex-row lg:gap-[clamp(3rem,4.1666666667vw,5.625rem)]"
        style={data.bgColor ? { backgroundColor: data.bgColor } : undefined}
      >
        <div
          className="mb-[clamp(1.125rem,5.0890585242vw,1.5rem)] w-[clamp(11.25rem,50.8905852417vw,15rem)] shrink-0 lg:mb-0 lg:w-[clamp(11.9rem,16.5277777778vw,22.3125rem)]"

          style={{ aspectRatio }}
        >
          <ResponsiveImg
            bannerImage={{
              id: image?.id ?? 0,
              altText: image?.alternativeText ?? data.title,
              imageD: image,
              imageM: null,
            }}
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 220px"
          />
        </div>

        <div className="mx-auto flex w-full flex-col items-center text-center lg:mx-0 lg:w-[50%]! lg:items-start lg:text-left">
          <h2 className="title-2-text text-white">{data.title}</h2>
          <p className="mt-[clamp(0.75rem,1.0416666667vw,1.40625rem)] text-white/90">
            {data.desc}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-[15px] lg:mt-8 lg:justify-start lg:gap-5">
            {data.actionButton1 && (
              <Button
                href={data.actionButton1.link?.url ?? "#"}
                color={buttonColor}
                variant={buttonVariant}
                useArrow={data.actionButton1.useArrow ?? false}
                startIcon={data.actionButton1.startIcon?.icon}
              >
                {data.actionButton1.label}
              </Button>
            )}
            {data.actionButton2 && (
              <Button
                href={data.actionButton2.link?.url ?? "#"}
                color={buttonColor}
                variant={buttonVariant}
                useArrow={data.actionButton2.useArrow ?? false}
                startIcon={data.actionButton2.startIcon?.icon}
              >
                {data.actionButton2.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
