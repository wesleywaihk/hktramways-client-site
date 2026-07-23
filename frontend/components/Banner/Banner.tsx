import ResponsiveImg, {
  ResponsiveImgProps,
} from "@/components/ResponsiveImg/ResponsiveImg";

export interface BannerProps extends Omit<ResponsiveImgProps, "className"> {
  className?: string;
  imgClassName?: ResponsiveImgProps["className"];
}

export default function Banner({
  className = "",
  imgClassName = "",
  ...rest
}: BannerProps) {
  return (
    <section
      className={`bg-green relative h-dvh borderless lg:p-10 ${className}`}
    >
      <ResponsiveImg
        {...rest}
        className={`w-full h-full object-cover rounded-none lg:rounded-[30px] overflow-hidden ${imgClassName}`}
      />
    </section>
  );
}
