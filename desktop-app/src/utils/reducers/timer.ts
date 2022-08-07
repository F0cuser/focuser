import { createSlice } from "@reduxjs/toolkit";
import { channels } from "../shared/constants";
const { ipcRenderer } = window.require("electron");


export const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        isActive: false
    },
    reducers: {
        toggleActive: (state) => {
            state.isActive = !state.isActive;
            if (state.isActive) ipcRenderer.invoke(channels.START_PAC);
            else ipcRenderer.invoke(channels.STOP_PAC);

        },

    }
})

export const {toggleActive} = timerReducer.actions;
export default timerReducer.reducer;