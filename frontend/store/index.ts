import { configureStore } from "@reduxjs/toolkit";
import pageTitleReducer from "./pageTitleSlice";
import announcementsReducer from "./announcementsSlice";

export const store = configureStore({
  reducer: {
    pageTitle: pageTitleReducer,
    announcements: announcementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
