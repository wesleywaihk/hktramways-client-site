import { devClassName } from "@/lib/devClassName";
import "./PartyTram.scss";

export default function GroundLayer() {
  return (
    <div
      className={`${devClassName("ground-layer")}absolute inset-x-0 bottom-0 h-[26.2dvh] w-full bg-[url('/partyTram/partytram-bg-floor_m.jpg')] bg-[length:auto_100%] bg-repeat-x lg:h-[21.75dvh] lg:bg-[url('/partyTram/partytram-bg-floor.jpg')]`}
      aria-hidden="true"
    />
  );
}
