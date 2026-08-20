import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import Button, {
  type ButtonColor,
  type ButtonVariant,
} from "@/components/Button/Button";
import type { DownloadAppAreaData } from "@/types/api";
import { asImage } from "@/lib/media";

export interface DownloadAppAreaProps {
  data?: DownloadAppAreaData | null;
  className?: string;
  buttonColor?: ButtonColor;
  buttonVariant?: ButtonVariant;
}

export default function DownloadAppArea({
  data = undefined,
  className = "",
  buttonColor = "white",
  buttonVariant = "outline",
}: DownloadAppAreaProps) {
  if (!data) return null;

  const image = asImage(data.Image);
  const aspectRatio = image ? `${image.width} / ${image.height}` : undefined;

  return (
    <section
      className={`borderless sectionContainer bg-green flex h-auto flex-col justify-center ${className}`}
    >
      <div className="bg-green-light mx-auto w-full rounded-[21px] px-5 py-15 lg:rounded-[30px] lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-8 md:flex-row md:gap-10 lg:gap-16">
          <div
            className="w-[220px] shrink-0 md:w-[260px] lg:w-[300px]"
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

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="text-[28px] leading-[120%] font-semibold tracking-[0.02em] text-white md:text-[32px] lg:text-[40px]">
              {data.title}
            </h2>
            <p className="mt-4 text-[15px] leading-[163%] tracking-[0.02em] text-white/90 md:text-[16px]">
              {data.desc}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-8 md:justify-start">
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
      </div>
    </section>
  );
}
