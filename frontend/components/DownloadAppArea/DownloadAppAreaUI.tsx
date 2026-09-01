import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";
import Button, {
  type ButtonColor,
  type ButtonVariant,
} from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";
import type { DownloadAppAreaData } from "@/types/api";
import { asImage } from "@/lib/media";

export interface DownloadAppAreaUIProps {
  // `undefined` = still loading, `null` = loaded but nothing to show.
  data?: DownloadAppAreaData | null;
  className?: string;
  buttonColor?: ButtonColor;
  buttonVariant?: ButtonVariant;
}

export default function DownloadAppAreaUI({
  data,
  className = "",
  buttonColor = "white",
  buttonVariant = "outline",
}: DownloadAppAreaUIProps) {
  if (data === undefined) {
    return (
      <section className={`borderless bg-green ${className}`}>
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  const image = asImage(data.Image);
  const aspectRatio = image ? `${image.width} / ${image.height}` : undefined;

  return (
    <section
      className={`borderless sectionContainer bg-green flex h-auto flex-col justify-center ${className}`}
    >
      <div
        className="bg-green-light mx-auto w-full rounded-[21px] px-5 py-[60px] lg:rounded-[30px] lg:px-[50px] lg:py-20"
        style={data.bgColor ? { backgroundColor: data.bgColor } : undefined}
      >
        <div className="mx-auto flex max-w-[869px] flex-col items-center gap-y-5 lg:flex-row lg:gap-x-[60px]">
          <div
            className="w-[201px] shrink-0 lg:w-[238px]"
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

          <div className="mx-auto flex max-w-[500px] flex-col items-center text-center lg:mx-0 lg:max-w-full lg:items-start lg:text-left">
            <h2 className="text-[28px] leading-[120%] font-semibold tracking-[0.02em] text-white lg:text-[32px] lg:text-[40px]">
              {data.title}
            </h2>
            <p className="mt-4 text-[15px] leading-[163%] tracking-[0.02em] text-white/90 lg:text-[16px]">
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
      </div>
    </section>
  );
}
