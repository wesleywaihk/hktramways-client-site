import { cache } from "react";
import { API_URL } from "@/consts";
import { buildPopulate } from "@/lib/buildPopulate";
import { routing } from "@/i18n/routing";
import type {
  AboutUsResponse,
  AnnouncementData,
  AnnouncementsResponse,
  DownloadAppAreaData,
  Media,
  InteractiveMapResponse,
  TwoLinksCardData,
} from "@/types/api";

export async function fetchGlobal(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const populate = buildPopulate([
    "favicon",
    "seo",
    "mainNavExtLink.extLink1",
    "mainNavExtLink.extLink2",
    "footer.getInTouch",
  ]);
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
// `documentId` (preview mode) fetches that draft document instead of the
// latest published entry.
export async function fetchDownloadAppArea(
  locale: string,
  endpoint: string,
  documentId?: string | null,
): Promise<DownloadAppAreaData | null> {
  const populate = buildPopulate([
    "downloadAppArea.Image",
    "downloadAppArea.actionButton1",
    "downloadAppArea.actionButton2",
  ]);
  const url = documentId
    ? `${API_URL}${endpoint}/${documentId}?status=draft&locale=${locale}&${populate}`
    : `${API_URL}${endpoint}?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch download app area: ${res.status}`);
  if (documentId) {
    // The single-document (preview) endpoint returns `data` as an object, not an array.
    const json: {
      data: { downloadAppArea: DownloadAppAreaData | null } | null;
    } = await res.json();
    return json.data?.downloadAppArea ?? null;
  }
  const json: { data: { downloadAppArea: DownloadAppAreaData | null }[] } =
    await res.json();
  return json.data?.[0]?.downloadAppArea ?? null;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side Souvenior component, directly against NEXT_PUBLIC_API_URL.
export async function fetchSouvenior(
  locale: string,
  documentId?: string | null,
) {
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
export async function fetchArcCarousel(
  locale: string,
  documentId?: string | null,
) {
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

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side LatestNews component, directly against NEXT_PUBLIC_API_URL.
export async function fetchLatestNews(locale: string, endpoint: string) {
  const populate = buildPopulate([
    "latestNews.actionButton",
    "latestNews.announcement_types",
  ]);
  const url = `${API_URL}${endpoint}?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch latest news: ${res.status}`);

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

export const fetchAboutUs = cache(async function fetchAboutUs(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const populate = buildPopulate(["actionButton", "bannerImage", "seo"]);
  const url = `${API_URL}/api/about-uses?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, {
    cache: options?.cache ?? "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch about us: ${res.status}`);

  return res.json();
});

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side AboutDetails component, directly against NEXT_PUBLIC_API_URL.
export async function fetchAboutUsDetails(locale: string) {
  const populate = buildPopulate([
    "details.accordionItem.icon",
    "details.image1",
    "details.image2",
    "details.image3",
  ]);
  const url = `${API_URL}/api/about-uses?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch about us details: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side PanoramaImage component, directly against NEXT_PUBLIC_API_URL.
export async function fetchAboutUsPanoramaImages(
  locale: string,
): Promise<Media[] | null> {
  const populate = buildPopulate(["panoramaImages"]);
  const url = `${API_URL}/api/about-uses?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch panorama images: ${res.status}`);
  const json: AboutUsResponse = await res.json();
  return json.data?.[0]?.panoramaImages ?? null;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side TwoCardsLink component, directly against NEXT_PUBLIC_API_URL.
// `endpoint`/`field` point at any content type's two-links-card component
// (e.g. About Us `whiteCards`).
export async function fetchTwoLinksCard(
  locale: string,
  endpoint: string,
  field: string,
): Promise<TwoLinksCardData | null> {
  const populate = buildPopulate([
    `${field}.leftCard.image`,
    `${field}.leftCard.link`,
    `${field}.rightCard.image`,
    `${field}.rightCard.link`,
  ]);
  const url = `${API_URL}${endpoint}?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch two links card: ${res.status}`);
  const json: { data: Record<string, TwoLinksCardData | null>[] } =
    await res.json();
  return json.data?.[0]?.[field] ?? null;
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
// `endpoint`/`field` let other pages reuse it for their own download-app-area
// shaped section (e.g. About Us `storyOfHKT`).
export async function fetchInteractiveRouteMap(
  locale: string,
  endpoint: string = "/api/plan-your-rides",
  field: string = "interactiveRouteMap",
): Promise<DownloadAppAreaData | null> {
  const populate = buildPopulate([
    `${field}.Image`,
    `${field}.actionButton1`,
    `${field}.actionButton2`,
  ]);
  const url = `${API_URL}${endpoint}?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch interactive route map: ${res.status}`);
  const json: { data: Record<string, DownloadAppAreaData | null>[] } =
    await res.json();
  return json.data?.[0]?.[field] ?? null;
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

function buildAnnouncementTypeFilter(types?: string[]) {
  return types?.length
    ? types
        .map(
          (type, i) => `&filters[announcement_types][key][$in][${i}]=${type}`,
        )
        .join("")
    : "";
}

// Defaults to the latest 10 announcements; pass `limit` to override.
export const fetchAnnouncements = cache(
  async function fetchAnnouncements(options?: {
    cache?: RequestCache;
    type?: string[];
    limit?: number;
  }) {
    const populate = buildPopulate(["announcement_types", "actionButton"]);
    const filter = buildAnnouncementTypeFilter(options?.type);
    const pagination = `&pagination[page]=1&pagination[pageSize]=${options?.limit ?? 10}`;
    const url = `${API_URL}/api/announcements?sort=dateTime:desc&${populate}${filter}${pagination}`;
    if (process.env.NODE_ENV === "development")
      console.log("[endpoint fetched]", url);
    const res = await fetch(url, { cache: options?.cache ?? "no-store" });
    if (!res.ok)
      throw new Error(`Failed to fetch announcements: ${res.status}`);

    return res.json();
  },
);

const RECENT_ANNOUNCEMENT_DAYS = 300;

// Not wrapped in React's `cache` (server-only) — intended for client-side
// filter UIs, directly against NEXT_PUBLIC_API_URL.
// Filters by calendar `year` (HKT) and announcement type keys. Without a
// `year`, returns announcements from the last 300 days.
export async function fetchFilteredAnnouncements(options?: {
  year?: number | string | null;
  types?: string[];
  pageSize?: number;
}): Promise<AnnouncementsResponse> {
  const populate = buildPopulate(["announcement_types", "actionButton"]);
  const year = options?.year ? Number(options.year) : null;
  const dateFilter = year
    ? `&filters[dateTime][$gte]=${year}-01-01T00:00:00%2B08:00` +
      `&filters[dateTime][$lt]=${year + 1}-01-01T00:00:00%2B08:00`
    : `&filters[dateTime][$gte]=${new Date(
        Date.now() - RECENT_ANNOUNCEMENT_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString()}`;
  const typeFilter = buildAnnouncementTypeFilter(options?.types);
  // Strapi caps pageSize at its `maxLimit` (100 by default).
  const pagination = `&pagination[page]=1&pagination[pageSize]=${options?.pageSize ?? 100}`;
  const url = `${API_URL}/api/announcements?sort=dateTime:desc&${populate}${dateFilter}${typeFilter}${pagination}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch filtered announcements: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side news detail page, directly against NEXT_PUBLIC_API_URL.
// Slugs are localized, so the lookup is per locale.
export async function fetchAnnouncementBySlug(
  slug: string,
  locale: string,
): Promise<AnnouncementData | null> {
  const populate = buildPopulate([
    "announcement_types",
    "actionButton",
    "thumbnail",
    "banner.imageD",
    "banner.imageM",
  ]);
  const url = `${API_URL}/api/announcements?locale=${locale}&filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch announcement: ${res.status}`);
  const json: AnnouncementsResponse = await res.json();
  return json.data?.[0] ?? null;
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side PartyTram component, directly against NEXT_PUBLIC_API_URL.
export async function fetchPartyTram(locale: string) {
  const populate = buildPopulate([
    "item.carouselItem",
    "item.tramDetailsItem",
    "item.overlayImg",
  ]);
  const url = `${API_URL}/api/party-tram?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch party tram: ${res.status}`);

  return res.json();
}

// Not wrapped in React's `cache` (server-only) — this is called from the
// client-side interactive-map page, directly against NEXT_PUBLIC_API_URL.
export async function fetchInteractiveMap(
  locale: string,
): Promise<InteractiveMapResponse> {
  const populate = buildPopulate([
    "station.image",
    "station.attraction.icon",
    "station.bannerLink.image",
    "downlaodMap",
  ]);
  const url = `${API_URL}/api/interactive-maps?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Failed to fetch interactive map: ${res.status}`);

  return res.json();
}
