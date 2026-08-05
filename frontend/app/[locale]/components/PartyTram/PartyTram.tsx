import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";

export default function PartyTram() {
  return (
    <section className="borderless h-auto aspect-[750/1334]  lg:h-[100dvh] lg:aspect-auto relative">
      <ResponsiveImg
        url=""
        bannerImage={{
          id: 0,
          altText: "",
          imageD: {
            id: 0,
            url: "/home/partyTram/tempD.jpg",
            width: 1920,
            height: 1080,
            alternativeText: null,
            formats: null,
          },
          imageM: {
            id: 0,
            url: "/home/partyTram/tempM.jpg",
            width: 750,
            height: 1334,
            alternativeText: null,
            formats: null,
          },
        }}
        useMultiImg={false}
        // className="!aspect-[750/1334] lg:!aspect-auto"
      />
    </section>
  );
}
