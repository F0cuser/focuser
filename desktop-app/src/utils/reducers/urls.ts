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
      state.urls = action.payload;
      ipcRenderer.invoke(channels.WRITE_SETTINGS, [{ urls: action.payload }]);
    },
    removeUrl: (state, action) => {
      state.urls = state.urls.filter((item) => item !== action.payload);
      console.log(state.urls);
      ipcRenderer.invoke(channels.WRITE_SETTINGS, [{ urls: state.urls }]);
    },
    setUrlsFromSettings: (state, action) => {
      state.urls = action.payload;
    },
  },
});

export const { removeUrl, setUrls, setUrlsFromSettings } = urlsReducer.actions;
export default urlsReducer.reducer;
