import { configureStore } from "@reduxjs/toolkit";
import previewReducer from "./previewSlice";
import pageTitleReducer from "./pageTitleSlice";

export const store = configureStore({
  reducer: {
    preview: previewReducer,
    pageTitle: pageTitleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
