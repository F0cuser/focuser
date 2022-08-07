import { createSlice } from "@reduxjs/toolkit";
import { channels } from "../shared/constants";
const { ipcRenderer } = window.require("electron");

export const urlsReducer = createSlice({
  name: "urls",
  initialState: {
    urls: [] as string[],
  },
  reducers: {
    setUrls: (state, action) => {
      state.urls = action.payload.urls;
      ipcRenderer.invoke(channels.WRITE_URLS, { key: 'urls', value: state.urls, timerActive: action.payload.timerActive });
    },
    removeUrl: (state, action) => {
      state.urls = state.urls.filter((item) => item !== action.payload.url);
      ipcRenderer.invoke(channels.WRITE_URLS, { key: 'urls', value: state.urls, timerActive: action.payload.timerActive});
    },
    setUrlsFromSettings: (state, action) => {
      state.urls = action.payload;
    },
  },
});

export const { removeUrl, setUrls, setUrlsFromSettings } = urlsReducer.actions;
export default urlsReducer.reducer;
