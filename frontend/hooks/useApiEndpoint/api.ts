import { API_URL } from "@/consts";

export async function fetchGlobal(locale: string) {
  const res = await fetch(`${API_URL}/api/global?populate=*&locale=${locale}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch global: ${res.status}`);

  return res.json();
}

export async function fetchLanding(
  documentId: string,
  previewMode: boolean,
  locale: string,
) {
  const url = previewMode
    ? `${API_URL}/api/landings/${documentId}?status=draft&populate=banner`
    : `${API_URL}/api/landings?populate=banner&locale=${locale}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch landing: ${res.status}`);
  return res.json();
}
