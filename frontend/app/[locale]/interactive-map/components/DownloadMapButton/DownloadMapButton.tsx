import BtnIcon from "@/components/icons/BtnIcon";
import { devClassName } from "@/lib/devClassName";

export interface DownloadMapButtonProps {
  href: string;
  download?: string;
  label: string;
  className?: string;
}

export default function DownloadMapButton({
  href,
  download,
  label,
  className,
}: DownloadMapButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      download={download}
      aria-label={label}
      className={`${devClassName(
        "download-map-button",
      )}group border-green bg-green hover:bg-green-light inline-flex h-[50px] w-[50px] shrink-0 cursor-pointer items-center justify-center gap-[10px] rounded-[18px] border-[2px] px-0 text-white transition-colors duration-200 ease-out lg:h-[60px] lg:w-auto lg:gap-[14px] lg:rounded-[21px] lg:px-8 lg:py-4 ${className ?? ""}`}
    >
      <span className="hidden font-sans text-[14px] leading-[157%] font-semibold tracking-[0.02em] whitespace-nowrap uppercase lg:inline lg:translate-y-[1px]">
        {label}
      </span>
      <span className="inline-flex shrink-0 transition-transform group-hover:scale-[115%]">
        <BtnIcon icon="download" />
      </span>
    </a>
  );
}
