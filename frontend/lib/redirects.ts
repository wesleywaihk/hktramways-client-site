import type { GlobalRedirect } from "@/types/api";

export interface RedirectEntry {
  to: string;
  permanent: boolean;
}

export type RedirectTable = Map<string, RedirectEntry>;

// `trailingSlash: true` means "/foo" and "/foo/" are the same page, so both
// the CMS `from` values and incoming pathnames are keyed without it.
export function normalizeRedirectPath(path: string): string {
  let pathname = path.trim();
  // Editors may paste a full URL — only its path is matched.
  if (/^https?:\/\//i.test(pathname)) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      return "";
    }
  }
  pathname = pathname.split(/[?#]/)[0];
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  try {
    pathname = decodeURI(pathname);
  } catch {
    // Keep the raw value if it isn't valid percent-encoding.
  }
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function buildRedirectTable(redirects: GlobalRedirect[]): RedirectTable {
  const table: RedirectTable = new Map();
  for (const { from, to, isPermanent } of redirects) {
    if (!from?.trim() || !to?.trim()) continue;
    const key = normalizeRedirectPath(from);
    // Skip self-redirects, which would loop forever.
    if (!key || key === normalizeRedirectPath(to)) continue;
    // First entry wins, matching the order editors see in the CMS.
    if (!table.has(key)) {
      table.set(key, { to: to.trim(), permanent: isPermanent !== false });
    }
  }
  return table;
}
