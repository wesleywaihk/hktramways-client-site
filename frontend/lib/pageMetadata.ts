import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { fetchGlobal } from "@/hooks/useApiEndpoint/api";

/** Preview mode document id, read from the draft-mode cookie set by the CMS preview link. */
export async function getPreviewDocumentId() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (await cookies()).get("preview-documentId")?.value ?? null;
}

/** Builds `{ title }` metadata as "<pageTitle> | <site metaTitle>", falling back gracefully if either is missing. */
export async function generatePageMetadata(
  locale: string,
  pageTitle?: string | null,
): Promise<Metadata> {
  try {
    const globalRes = await fetchGlobal(locale, { cache: "force-cache" });
    const metaTitle = globalRes.data?.seo?.[0]?.metaTitle;

    return {
      title: pageTitle && metaTitle ? `${pageTitle} | ${metaTitle}` : metaTitle,
    };
  } catch {
    return {};
  }
}
