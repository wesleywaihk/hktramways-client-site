"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";

/** Announcements loaded once by StoreProvider; `loading` stays true until that fetch settles. */
export function useAnnouncements() {
  const { items, status } = useSelector(
    (state: RootState) => state.announcements,
  );

  return { items, loading: status === "idle" || status === "loading" };
}
