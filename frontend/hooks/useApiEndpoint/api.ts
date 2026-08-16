import { cache } from "react";
import { API_URL } from "@/consts";
import { buildPopulate } from "@/lib/buildPopulate";

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
  const populate = buildPopulate([
    "bannerImage",
    "newsBar",
    "arcCarousel",
    "arcCarousel.item.carouselItem",
    "arcCarousel.actionButton",
    "tramRoute",
    "tramRoute.actionButton",
    "tramoramicTour",
    "tramoramicTour.tramoramicTourItem1",
    "tramoramicTour.tramoramicTourItem2",
    "tramoramicTour.tramoramicTourItem3",
    "tramoramicTour.action1",
    "tramoramicTour.action2",
    "souvenior",
    "souvenior.actionButton",
    "souvenior.item",
    "downloadAppArea.Image",
    "downloadAppArea.actionButton1",
    "downloadAppArea.actionButton2",
  ]);
  const url = previewMode
    ? `${API_URL}/api/homes/${documentId}?status=draft&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch home: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return previewMode ? { data: json.data ? [json.data] : [] } : json;
});

export const fetchPartyTram = cache(async function fetchPartyTram(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const populate = buildPopulate(["item.carouselItem", "item.tramDetailsItem"]);
  const url = `${API_URL}/api/party-tram?locale=${locale}&${populate}`;
  if (process.env.NODE_ENV === "development")
    console.log("[endpoint fetched]", url);
  const res = await fetch(url, {
    cache: options?.cache ?? "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch party tram: ${res.status}`);

  return res.json();
});
