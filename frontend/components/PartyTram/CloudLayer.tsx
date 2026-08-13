import "./PartyTram.scss";

/** seconds for the cloud layer to complete one full drift cycle */
const CLOUD_DRIFT_DURATION_S = 40;

const Cloud = () => (
  <div
    className="w-1/2 h-full bg-[url('/partyTram/partytram-bg-cloud_m.png')] lg:bg-[url('/partyTram/partytram-bg-cloud.png')]
          bg-repeat-x bg-bottom bg-[length:auto_100%]"
  />
);
export default function CloudLayer() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 flex w-auto h-[66.5dvh] aspect-[2892/436] lg:h-[78.5dvh] lg:aspect-[6168/1156] [animation:cloud-drift_linear_infinite] top-0"
      style={{ animationDuration: `${CLOUD_DRIFT_DURATION_S}s` }}
      aria-hidden="true"
    >
      <Cloud />
      <Cloud />
    </div>
  );
}
