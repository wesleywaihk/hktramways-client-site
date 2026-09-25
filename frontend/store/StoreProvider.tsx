"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./index";
import { loadAnnouncements } from "./announcementsSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Announcements are shared by NewsBar and LatestNews, so fetch them once on app start
  useEffect(() => {
    store.dispatch(loadAnnouncements());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
