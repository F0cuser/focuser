import { createSlice } from "@reduxjs/toolkit";
import settingsStore from "../settingsInterface";

export const urlsReducer = createSlice({
  name: "urls",
  initialState: {
    urls: settingsStore.get("urls") as unknown as string[],
  },
  reducers: {
    addUrl: (state, action) => {
      state.urls.push(action.payload);
      settingsStore.set("urls", state.urls);
    },
    removeUrl: (state, action) => {
      state.urls = state.urls.filter((item) => item !== action.payload);
      settingsStore.set("urls", state.urls);
    },
  },
});

export const { addUrl, removeUrl } = urlsReducer.actions;
export default urlsReducer.reducer;
