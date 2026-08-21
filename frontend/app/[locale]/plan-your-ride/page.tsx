import { fetchPlanYourRide } from "@/hooks/useApiEndpoint/api";
import Hero from "./components/Hero/Hero";
import Schedule from "./components/Schedule/Schedule";
import TramRoute from "@/components/TramRoute/TramRoute";
import DownloadAppAreaUI from "@/components/DownloadAppArea/DownloadAppAreaUI";
import InteractiveRouteMap from "@/components/InteractiveRouteMap/InteractiveRouteMap";
import type { PlanYourRideResponse } from "@/types/api";

interface PlanYourRidePageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlanYourRidePage({
  params,
}: PlanYourRidePageProps) {
  const { locale } = await params;

  const planYourRideResult = await fetchPlanYourRide(locale).catch(
    () => null,
  );

  const planYourRide: PlanYourRideResponse | null = planYourRideResult;

  const heroData = planYourRide?.data?.[0];

  return (
    <div className="pageWrapper mt-0">
      {heroData && (
        <Hero
          title={heroData.title}
          desc={heroData.desc}
          actionButton={heroData.actionButton}
          bannerImage={heroData.bannerImage}
        />
      )}
      <TramRoute locale={locale} />
      <Schedule locale={locale} />
      <InteractiveRouteMap data={heroData?.interactiveRouteMap ?? null} />
      <DownloadAppAreaUI data={heroData?.downloadAppArea ?? null} />
      {/* <pre>{JSON.stringify({ planYourRide, tramRoute }, null, 2)}</pre> */}
    </div>
  );
}
