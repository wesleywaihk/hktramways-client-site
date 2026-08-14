import type { PartyTramData } from "@/types/api";
import CloudLayer from "./CloudLayer";
import PartyTramCarousel from "./PartyTramCarousel";

export interface PartyTramProps {
  data?: PartyTramData | null;
}

export default function PartyTram({ data }: PartyTramProps) {
  if (!data || !data?.item) return null;
  return (
    <section className="borderless relative h-[100dvh] overflow-hidden bg-[url('/partyTram/partytram-bg_m.jpg')] bg-cover bg-bottom lg:aspect-auto lg:bg-[url('/partyTram/partytram-bg.jpg')]">
      <CloudLayer />
      <PartyTramCarousel data={data} />
    </section>
  );
}
