import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PreviewState {
  previewMode: boolean;
  documentId: string | null;
  locale: string | null;
  status: string | null;
  uid: string | null;
}

const initialState: PreviewState = {
  previewMode: false,
  documentId: null,
  locale: null,
  status: null,
  uid: null,
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreview(_, action: PayloadAction<Omit<PreviewState, "previewMode">>) {
      return { previewMode: true, ...action.payload };
    },
    clearPreview() {
      return initialState;
    },
  },
});

export const { setPreview, clearPreview } = previewSlice.actions;
export default previewSlice.reducer;
