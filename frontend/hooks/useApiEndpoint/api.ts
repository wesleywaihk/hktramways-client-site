import { cache } from "react";
import { API_URL } from "@/consts";
import { buildPopulate } from "@/lib/buildPopulate";
import { routing } from "@/i18n/routing";
import type { DownloadAppAreaData } from "@/types/api";

export async function fetchGlobal(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const populate = buildPopulate(["favicon", "seo", "footer.getInTouch"]);
  const url = `${API_URL}/api/global?${populate}&locale=${locale}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, {
    cache: options?.cache ?? "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch global: ${res.status}`);

  return res.json();
}

export const fetchHome = cache(async function fetchHome(
  documentId: string,
  previewMode: boolean,
  locale: string,
) {
  const populate = buildPopulate(["bannerImage", "seo"]);
  const url = previewMode
    ? `${API_URL}/api/homes/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch home: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return previewMode ? { data: json.data ? [json.data] : [] } : json;
});

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side DownloadAppArea component, directly against NEXT_PUBLIC_API_URL.
export async function fetchHomeDownloadAppArea(
  locale: string,
  documentId?: string | null,
): Promise<DownloadAppAreaData | null> {
  const populate = buildPopulate([
    "downloadAppArea.Image",
    "downloadAppArea.actionButton1",
    "downloadAppArea.actionButton2",
  ]);
  const url = documentId
    ? `${API_URL}/api/homes/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch download app area: ${res.status}`);
  if (documentId) {
    const json: { data: { downloadAppArea: DownloadAppAreaData | null } | null } =
      await res.json();
    return json.data?.downloadAppArea ?? null;
  }
  const json: { data: { downloadAppArea: DownloadAppAreaData | null }[] } =
    await res.json();
  return json.data?.[0]?.downloadAppArea ?? null;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side DownloadAppArea component, directly against NEXT_PUBLIC_API_URL.
export async function fetchPlanYourRideDownloadAppArea(
  locale: string,
): Promise<DownloadAppAreaData | null> {
  const populate = buildPopulate([
    "downloadAppArea.Image",
    "downloadAppArea.actionButton1",
    "downloadAppArea.actionButton2",
  ]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch download app area: ${res.status}`);
  const json: { data: { downloadAppArea: DownloadAppAreaData | null }[] } =
    await res.json();
  return json.data?.[0]?.downloadAppArea ?? null;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side Souvenior component, directly against NEXT_PUBLIC_API_URL.
export async function fetchSouvenior(locale: string, documentId?: string | null) {
  const populate = buildPopulate([
    "souvenior",
    "souvenior.actionButton",
    "souvenior.item",
  ]);
  const url = documentId
    ? `${API_URL}/api/homes/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch souvenior: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return documentId ? { data: json.data ? [json.data] : [] } : json;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side ArcCarousel component, directly against NEXT_PUBLIC_API_URL.
export async function fetchArcCarousel(locale: string, documentId?: string | null) {
  const populate = buildPopulate([
    "arcCarousel",
    "arcCarousel.item.carouselItem",
    "arcCarousel.actionButton",
  ]);
  const url = documentId
    ? `${API_URL}/api/homes/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch arc carousel: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return documentId ? { data: json.data ? [json.data] : [] } : json;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side TramoramicTour component, directly against NEXT_PUBLIC_API_URL.
export async function fetchTramoramicTour(
  locale: string,
  documentId?: string | null,
) {
  const populate = buildPopulate([
    "tramoramicTour",
    "tramoramicTour.tramoramicTourItem1",
    "tramoramicTour.tramoramicTourItem2",
    "tramoramicTour.tramoramicTourItem3",
    "tramoramicTour.action1",
    "tramoramicTour.action2",
  ]);
  const url = documentId
    ? `${API_URL}/api/homes/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch tramoramic tour: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return documentId ? { data: json.data ? [json.data] : [] } : json;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side TramRoute component, directly against NEXT_PUBLIC_API_URL.
export async function fetchTramRoute(locale: string) {
  const populate = buildPopulate(["actionButton"]);
  const fetchLocale = async (loc: string) => {
    const url = `${API_URL}/api/tram-route?locale=${loc}&${populate}`;
    if (process.env.NODE_ENV === "development")
      console.log("[endpoint fetched]", url);
    return fetch(url, { cache: "no-store" });
  };

  let res = await fetchLocale(locale);
  // Translation may not exist yet for this locale — fall back to the
  // default locale rather than hiding the section entirely.
  if (res.status === 404 && locale !== routing.defaultLocale) {
    res = await fetchLocale(routing.defaultLocale);
  }
  if (!res.ok) throw new Error(`Failed to fetch tram route: ${res.status}`);

  return res.json();
}

export const fetchPlanYourRide = cache(async function fetchPlanYourRide(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const populate = buildPopulate(["actionButton", "bannerImage", "seo"]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, {
    cache: options?.cache ?? "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch plan your ride: ${res.status}`);

  return res.json();
});

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side ServiceUpdates component, directly against NEXT_PUBLIC_API_URL.
export async function fetchServiceUpdates(locale: string) {
  const populate = buildPopulate(["ServiceUpdates.actionButton"]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch service updates: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side Fares component, directly against NEXT_PUBLIC_API_URL.
export async function fetchFares(locale: string) {
  const populate = buildPopulate([
    "Fares.fareItem.icon",
    "Fares.monthlyTicketActionButton",
    "Fares.actionButton",
  ]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch fares: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side InteractiveRouteMap component, directly against NEXT_PUBLIC_API_URL.
export async function fetchInteractiveRouteMap(locale: string) {
  const populate = buildPopulate([
    "interactiveRouteMap.Image",
    "interactiveRouteMap.actionButton1",
    "interactiveRouteMap.actionButton2",
  ]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch interactive route map: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from a
// client component, directly against NEXT_PUBLIC_API_URL.
export async function fetchSchedule(locale: string) {
  const populate = buildPopulate([
    "schedule.ScheduleWestBound.shauKeiWan_westernMarket.first",
    "schedule.ScheduleWestBound.shauKeiWan_westernMarket.last",
    "schedule.ScheduleWestBound.shauKeiWan_happyValley.first",
    "schedule.ScheduleWestBound.shauKeiWan_happyValley.last",
    "schedule.ScheduleWestBound.northPoint_shekTongTsui.first",
    "schedule.ScheduleWestBound.northPoint_shekTongTsui.last",
    "schedule.ScheduleWestBound.causewayBay_shekTongTsui.first",
    "schedule.ScheduleWestBound.causewayBay_shekTongTsui.last",
    "schedule.ScheduleWestBound.happyValley_kennedyTown.first",
    "schedule.ScheduleWestBound.happyValley_kennedyTown.last",
    "schedule.ScheduleWestBound.shauKeiWan_kennedyTown.first",
    "schedule.ScheduleWestBound.shauKeiWan_kennedyTown.last",
    "schedule.seheduleEastBound.westernMarket_shauKeiWan.first",
    "schedule.seheduleEastBound.westernMarket_shauKeiWan.last",
    "schedule.seheduleEastBound.happyValley_shauKeiWan.first",
    "schedule.seheduleEastBound.happyValley_shauKeiWan.last",
    "schedule.seheduleEastBound.shekTongTsui_northPoint.first",
    "schedule.seheduleEastBound.shekTongTsui_northPoint.last",
    "schedule.seheduleEastBound.shekTongTsui_causewayBay.first",
    "schedule.seheduleEastBound.shekTongTsui_causewayBay.last",
    "schedule.seheduleEastBound.kennedyTown_happyValley.first",
    "schedule.seheduleEastBound.kennedyTown_happyValley.last",
    "schedule.seheduleEastBound.kennedyTown_shauKeiWan.first",
    "schedule.seheduleEastBound.kennedyTown_shauKeiWan.last",
  ]);
  const url = `${API_URL}/api/plan-your-rides?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch schedule: ${res.status}`);

  return res.json();
}

export const fetchAnnouncements = cache(
  async function fetchAnnouncements(options?: {
    cache?: RequestCache;
    type?: string;
    limit?: number;
  }) {
    const populate = buildPopulate(["announcementType", "link"]);
    const filter = options?.type
      ? `&filters[announcementType][key][$eq]=${options.type}`
      : "";
    const pagination = options?.limit
      ? `&pagination[page]=1&pagination[pageSize]=${options.limit}`
      : "";
    const url = `${API_URL}/api/announceme-items?sort=dateTime:desc&${populate}${filter}${pagination}`;
    if (process.env.NODE_ENV === "development")
      console.log("[endpoint fetched]", url);
    const res = await fetch(url, { cache: options?.cache ?? "no-store" });
    if (!res.ok)
      throw new Error(`Failed to fetch announcements: ${res.status}`);

    return res.json();
  },
);

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side PartyTram component, directly against NEXT_PUBLIC_API_URL.
export async function fetchPartyTram(locale: string) {
  const populate = buildPopulate(["item.carouselItem", "item.tramDetailsItem"]);
  const url = `${API_URL}/api/party-tram?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch party tram: ${res.status}`);

  return res.json();
}
