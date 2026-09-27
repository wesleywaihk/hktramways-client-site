import { NextResponse, type NextRequest } from "next/server";
import { fetchRedirects } from "@/hooks/useApiEndpoint/api";
import {
  buildRedirectTable,
  normalizeRedirectPath,
  type RedirectTable,
} from "@/lib/redirects";

// How long the CMS redirect table is reused before refetching.
const REDIRECT_TTL_MS = 60 * 1000;

let redirectTable: RedirectTable = new Map();
let fetchedAt = 0;
let pending: Promise<RedirectTable> | null = null;

async function getRedirectTable(): Promise<RedirectTable> {
  if (Date.now() - fetchedAt < REDIRECT_TTL_MS) return redirectTable;
  // Share one in-flight request between concurrent page hits.
  pending ??= fetchRedirects()
    .then((redirects) => {
      redirectTable = buildRedirectTable(redirects);
      return redirectTable;
    })
    .catch((error) => {
      // Keep serving the last good table rather than failing page requests.
      console.error("[proxy] failed to refresh redirects", error);
      return redirectTable;
    })
    .finally(() => {
      fetchedAt = Date.now();
      pending = null;
    });
  return pending;
}

export async function proxy(request: NextRequest) {
  const table = await getRedirectTable();
  const entry = table.get(normalizeRedirectPath(request.nextUrl.pathname));
  if (!entry) return NextResponse.next();

  const destination = new URL(entry.to, request.nextUrl.origin);
  // Match `trailingSlash: true` up front so Next doesn't add a second hop.
  if (
    destination.origin === request.nextUrl.origin &&
    !destination.pathname.endsWith("/") &&
    !/\.[^/]+$/.test(destination.pathname)
  ) {
    destination.pathname += "/";
  }
  // Carry the original query string over unless the target sets its own.
  if (!destination.search) destination.search = request.nextUrl.search;

  return NextResponse.redirect(destination, entry.permanent ? 301 : 302);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (assets).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
