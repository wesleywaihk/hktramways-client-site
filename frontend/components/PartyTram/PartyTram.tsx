import type { PartyTramData } from "@/types/api";
import CloudLayer from "./CloudLayer";

export interface PartyTramProps {
  data?: PartyTramData | null;
}

export default function PartyTram({ data }: PartyTramProps) {
  return (
    <section
      className="borderless h-auto aspect-[750/1334]  lg:h-[100dvh] lg:aspect-auto relative
        bg-[url('/partyTram/partytram-bg_m.jpg')] lg:bg-[url('/partyTram/partytram-bg.jpg')]
        bg-cover bg-bottom overflow-hidden"
    >
      <CloudLayer />
    </section>
  );
}
