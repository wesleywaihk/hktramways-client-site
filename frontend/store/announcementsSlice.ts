import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAnnouncements } from "@/hooks/useApiEndpoint/api";
import type { AnnouncementData, AnnouncementsResponse } from "@/types/api";

export interface AnnouncementsState {
  items: AnnouncementData[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AnnouncementsState = {
  items: [],
  status: "idle",
};

/** Fetches every announcement (newest first) once per app session; later dispatches are skipped. */
export const loadAnnouncements = createAsyncThunk(
  "announcements/load",
  async () => {
    const res: AnnouncementsResponse = await fetchAnnouncements();
    return res.data ?? [];
  },
  {
    condition: (_, { getState }) =>
      (getState() as { announcements: AnnouncementsState }).announcements
        .status === "idle",
  },
);

export const announcementsSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAnnouncements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadAnnouncements.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default announcementsSlice.reducer;
