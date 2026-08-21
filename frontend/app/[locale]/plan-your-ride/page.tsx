import { fetchPlanYourRide, fetchTramRoute } from "@/hooks/useApiEndpoint/api";
import Hero from "./components/Hero/Hero";
import Schedule from "./components/Schedule/Schedule";
import TramRoute from "../components/TramRoute/TramRoute";
import DownloadAppArea from "@/components/DownloadAppArea/DownloadAppArea";
import InteractiveRouteMap from "@/components/InteractiveRouteMap/InteractiveRouteMap";
import type { PlanYourRideResponse } from "@/types/api";

interface PlanYourRidePageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlanYourRidePage({
  params,
}: PlanYourRidePageProps) {
  const { locale } = await params;

  const [planYourRideResult, tramRouteResult] = await Promise.allSettled([
    fetchPlanYourRide(locale),
    fetchTramRoute(locale),
  ]);

  const planYourRide: PlanYourRideResponse | null =
    planYourRideResult.status === "fulfilled" ? planYourRideResult.value : null;
  const tramRoute =
    tramRouteResult.status === "fulfilled" ? tramRouteResult.value : null;

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
      <TramRoute data={tramRoute?.data} />
      <Schedule locale={locale} />
      <InteractiveRouteMap data={heroData?.interactiveRouteMap} />
      <DownloadAppArea data={heroData?.downloadAppArea} />
      {/* <pre>{JSON.stringify({ planYourRide, tramRoute }, null, 2)}</pre> */}
    </div>
  );
}
