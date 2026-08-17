import { fetchPlanYourRide, fetchTramRoute } from "@/hooks/useApiEndpoint/api";
import Loading from "@/components/Loading/Loading";

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

  const planYourRide =
    planYourRideResult.status === "fulfilled" ? planYourRideResult.value : null;
  const tramRoute =
    tramRouteResult.status === "fulfilled" ? tramRouteResult.value : null;

  return <pre>{JSON.stringify({ planYourRide, tramRoute }, null, 2)}</pre>;
}
