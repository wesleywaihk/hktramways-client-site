"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useDispatch } from "react-redux";
import { PREVIEW_SECRET } from "shared-resources/cons";
import { setPreview } from "@/store/previewSlice";
import type { AppDispatch } from "@/store";

const SLUG_ROUTES: Record<string, (locale: string) => string> = {
  landing: (locale) => `/${locale}`,
};

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const secret = searchParams.get("secret");
  const documentId = searchParams.get("documentId");
  const locale = searchParams.get("locale");
  const status = searchParams.get("status");
  const uid = searchParams.get("uid");

  if (secret !== PREVIEW_SECRET) {
    notFound();
  }

  useEffect(() => {
    dispatch(setPreview({ documentId, locale, status, uid }));

    const getRoute = uid ? SLUG_ROUTES[uid] : undefined;
    const destination = getRoute && locale ? getRoute(locale) : `/${locale}`;
    router.replace(destination);
  }, []);

  return null;
}
