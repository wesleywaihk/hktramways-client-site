import { API_URL } from "@/consts";
import { buildPopulate } from "@/lib/buildPopulate";

export async function fetchGlobal(
  locale: string,
  options?: { cache?: RequestCache },
) {
  const res = await fetch(`${API_URL}/api/global?populate=*&locale=${locale}`, {
    cache: options?.cache ?? "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch global: ${res.status}`);

  return res.json();
}

export async function fetchHome(
  documentId: string,
  previewMode: boolean,
  locale: string,
) {
  const populate = buildPopulate(["bannerImage"]);
  const url = previewMode
    ? `${API_URL}/api/homes/${documentId}?status=draft&${populate}`
    : `${API_URL}/api/homes?locale=${locale}&${populate}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch home: ${res.status}`);
  const json = await res.json();
  // The single-document (preview) endpoint returns `data` as an object, not an array.
  return previewMode ? { data: json.data ? [json.data] : [] } : json;
}
