import "./PartyTram.scss";

/** seconds for the cloud layer to complete one full drift cycle */
const CLOUD_DRIFT_DURATION_S = 40;

const Cloud = () => (
  <div
    className="w-1/2 h-[66.5dvh] lg:h-[78.5dvh] bg-[url('/partyTram/partytram-bg-cloud_m.png')] lg:bg-[url('/partyTram/partytram-bg-cloud.png')]
          bg-repeat-x bg-bottom bg-[length:auto_100%]"
  />
);
export default function CloudLayer() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 flex w-[200%] h-full [animation:cloud-drift_linear_infinite]"
      style={{ animationDuration: `${CLOUD_DRIFT_DURATION_S}s` }}
      aria-hidden="true"
    >
      <Cloud />
      <Cloud />
    </div>
  );
}
