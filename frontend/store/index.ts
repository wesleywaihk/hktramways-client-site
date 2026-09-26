import { configureStore } from "@reduxjs/toolkit";
import pageTitleReducer from "./pageTitleSlice";

export const store = configureStore({
  reducer: {
    pageTitle: pageTitleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
