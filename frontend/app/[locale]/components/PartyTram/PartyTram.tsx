import ResponsiveImg from "@/components/ResponsiveImg/ResponsiveImg";

export default function PartyTram() {
  return (
    <section className="borderless h-auto pageHeight-md pageHeight-lg relative">
      <ResponsiveImg
        url=""
        bannerImage={{
          id: 0,
          altText: "",
          bannerD: {
            id: 0,
            url: "/home/partyTram/tempD.jpg",
            width: 1920,
            height: 1080,
            alternativeText: null,
            formats: null,
          },
          bannerM: {
            id: 0,
            url: "/home/partyTram/tempM.jpg",
            width: 750,
            height: 1334,
            alternativeText: null,
            formats: null,
          },
        }}
        useMultiImg={false}
        mobileHeight="auto"
        className="w-full h-full"
      />
    </section>
  );
}
