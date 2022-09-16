import { createSlice } from "@reduxjs/toolkit";
import { channels } from "../shared/constants";
const { ipcRenderer } = window.require("electron");

export const settingsReducer = createSlice({
  name: "settings",
  initialState: {
    settings: { runOnStartup: false } as {[key: string]: any},
  },
  reducers: {
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
      ipcRenderer.invoke(channels.WRITE_SETTINGS, { ...state.settings });
    },
    getSettingsFromFile: (state, action) => {
			for (const key in action.payload) {
				state.settings[key] = action.payload[key]
			}
    },
  },
});

export const { updateSettings, getSettingsFromFile } = settingsReducer.actions;
export default settingsReducer.reducer;
