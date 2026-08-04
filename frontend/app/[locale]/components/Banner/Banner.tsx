import ResponsiveImg, {
  ResponsiveImgProps,
} from "@/components/ResponsiveImg/ResponsiveImg";

export interface BannerProps extends Omit<ResponsiveImgProps, "className"> {
  className?: string;
  isFullScreen?: boolean;
}

export default function Banner({
  className = "",
  isFullScreen = false,
  ...rest
}: BannerProps) {
  {
  }
  return (
    <section
      // isFullScreen false: news bar is rendered, so header + banner + newsBar = 100dvh
      // isFullScreen true: no news bar, so header + banner = 100dvh
      className={`bg-green relative borderless lg:p-10 lg:pt-0 ${!isFullScreen ? "h-[calc(100dvh-52px)] lg:h-[calc(100dvh-100px)]" : "h-[100dvh] lg:h-[calc(100dvh-160px)]"} ${className}`}
    >
      <ResponsiveImg
        {...rest}
        isHero={true}
        className="rounded-none lg:rounded-[30px]"
      />
    </section>
  );
}
