import ResponsiveImg, {
  ResponsiveImgProps,
} from "@/components/ResponsiveImg/ResponsiveImg";

export interface BannerProps extends Omit<ResponsiveImgProps, "className"> {
  className?: string;
}

export default function Banner({ className = "", ...rest }: BannerProps) {
  return (
    <section
      className={`bg-green relative h-dvh borderless lg:p-10 ${className}`}
    >
      <ResponsiveImg
        {...rest}
        isHero={true}
        className="rounded-none lg:rounded-[30px]"
      />
    </section>
  );
}
