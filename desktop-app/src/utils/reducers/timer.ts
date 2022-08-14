import { createSlice } from "@reduxjs/toolkit";
import { channels } from "../shared/constants";
const { ipcRenderer } = window.require("electron");


export const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        isActive: false,
        timer: {hours: 0, minutes: 0, seconds: 0}
    },
    reducers: {
        toggleActive: (state) => {
            state.isActive = !state.isActive;
            if (state.isActive) ipcRenderer.invoke(channels.START_PAC);
            else ipcRenderer.invoke(channels.STOP_PAC);

        },

        setTimer: (state, action) => {
            state.timer = action.payload;
        }

    }
})

export const {toggleActive, setTimer} = timerReducer.actions;
export default timerReducer.reducer;