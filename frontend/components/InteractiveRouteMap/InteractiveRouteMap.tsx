import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
import type { DownloadAppAreaData } from "@/types/api";

export interface InteractiveRouteMapProps {
  data?: DownloadAppAreaData | null;
  className?: string;
}

export default function InteractiveRouteMap({
  data = undefined,
  className = "",
}: InteractiveRouteMapProps) {
  return (
    <DownloadAppArea
      data={data}
      className={`[&>div]:bg-green-fresh [&>div>div>div>h2]:text-green [&>div>div>div>p]:text-green py-[45px] lg:py-[60px] [&>div]:bg-cover [&>div]:lg:bg-[url('/partyTram/InteractiveRouteMap/bg.png')] ${className}`}
      buttonColor="green"
      buttonVariant="solid"
    />
  );
}
