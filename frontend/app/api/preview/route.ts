import { draftMode } from "next/headers";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { PREVIEW_SECRET } from "shared-resources/consts";

const SLUG_ROUTES: Record<string, (locale: string) => string> = {
  home: (locale) => `/${locale}`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const documentId = searchParams.get("documentId");
  const locale = searchParams.get("locale");
  const status = searchParams.get("status");
  const uid = searchParams.get("uid");

  if (secret !== PREVIEW_SECRET || !documentId || !locale || !uid) {
    notFound();
  }

  const draft = await draftMode();
  draft.enable();

  const cookieStore = await cookies();
  cookieStore.set("preview-documentId", documentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  cookieStore.set("preview-status", status ?? "draft", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  const getRoute = SLUG_ROUTES[uid];
  const destination = getRoute ? getRoute(locale) : `/${locale}`;
  redirect(destination);
}
