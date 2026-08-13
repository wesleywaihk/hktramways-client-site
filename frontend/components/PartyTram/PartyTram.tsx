import type { PartyTramData } from "@/types/api";
import CloudLayer from "./CloudLayer";
import PartyTramCarousel from "./PartyTramCarousel";

export interface PartyTramProps {
  data?: PartyTramData | null;
}

export default function PartyTram({ data }: PartyTramProps) {
  if (!data || !data?.item) return null;
  return (
    <section
      className="borderless h-[100dvh] lg:aspect-auto relative
        bg-[url('/partyTram/partytram-bg_m.jpg')] lg:bg-[url('/partyTram/partytram-bg.jpg')]
        bg-cover bg-bottom overflow-hidden"
    >
      <CloudLayer />
      <PartyTramCarousel data={data} />
    </section>
  );
}
