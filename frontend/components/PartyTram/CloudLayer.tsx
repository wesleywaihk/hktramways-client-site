import "./PartyTram.scss";

/** seconds for the cloud layer to complete one full drift cycle */
const CLOUD_DRIFT_DURATION_S = 40;

const Cloud = () => (
  <div className="h-full w-1/2 bg-[url('/partyTram/partytram-bg-cloud_m.png')] bg-[length:auto_100%] bg-bottom bg-repeat-x lg:bg-[url('/partyTram/partytram-bg-cloud.png')]" />
);
export default function CloudLayer() {
  return (
    <div
      className="absolute inset-x-0 top-0 bottom-0 flex aspect-[2892/436] h-[66.5dvh] w-auto [animation:cloud-drift_linear_infinite] lg:aspect-[6168/1156] lg:h-[78.5dvh]"
      style={{ animationDuration: `${CLOUD_DRIFT_DURATION_S}s` }}
      aria-hidden="true"
    >
      <Cloud />
      <Cloud />
    </div>
  );
}
