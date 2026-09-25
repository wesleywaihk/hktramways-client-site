/** Detail page URL for an announcement: /{locale}/news/{slug}. */
export function newsHref(locale: string, slug: string) {
  return `/${locale}/news/${encodeURIComponent(slug)}`;
}
