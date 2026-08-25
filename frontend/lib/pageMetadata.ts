import { cache } from "react";
import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { fetchGlobal } from "@/hooks/useApiEndpoint/api";
import { IMG_URL } from "@/consts";

/** Preview mode document id, read from the draft-mode cookie set by the CMS preview link. */
export async function getPreviewDocumentId() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (await cookies()).get("preview-documentId")?.value ?? null;
}

/** Memoized per-request so layout and page `generateMetadata`/render calls share one fetch instead of issuing duplicates. */
export const getGlobalData = cache((locale: string) =>
  fetchGlobal(locale, { cache: "force-cache" }),
);

/** Site-wide fallback metadata (title, description, keywords, favicon) shared by every page. */
export async function generateGlobalMetadata(
  locale: string,
): Promise<Metadata> {
  try {
    const globalRes = await getGlobalData(locale);
    const seo = globalRes.data?.seo;
    const favicon = globalRes.data?.favicon;

    return {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      keywords: seo?.keywords,
      icons: {
        icon: favicon?.url
          ? /^https?:\/\//.test(favicon.url)
            ? favicon.url
            : `${IMG_URL}${favicon.url}`
          : "/favicon.ico",
      },
    };
  } catch {
    return { icons: { icon: "/favicon.ico" } };
  }
}

/** Builds `{ title }` metadata as "<pageTitle> | <site metaTitle>", falling back gracefully if either is missing. */
export async function generatePageMetadata(
  locale: string,
  pageTitle?: string | null,
): Promise<Metadata> {
  try {
    const globalRes = await getGlobalData(locale);
    const metaTitle = globalRes.data?.seo?.metaTitle;

    return {
      title: pageTitle && metaTitle ? `${pageTitle} | ${metaTitle}` : metaTitle,
    };
  } catch {
    return {};
  }
}

/** Fetches a page's entry, extracts its title via `getTitle`, and delegates to `generatePageMetadata`; swallows fetch errors into `{}`. */
export async function generateEntityPageMetadata<T>(
  locale: string,
  fetchEntity: (locale: string) => Promise<{ data?: T[] }>,
  getTitle: (entity: T) => string | null | undefined,
): Promise<Metadata> {
  try {
    const res = await fetchEntity(locale);
    const entity = res.data?.[0] ?? null;
    return generatePageMetadata(locale, entity ? getTitle(entity) : null);
  } catch {
    return {};
  }
}
