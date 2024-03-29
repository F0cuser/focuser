import { createSlice } from "@reduxjs/toolkit";
import { channels } from "../shared/constants";
const { ipcRenderer } = window.require("electron");

const currentTime = new Date();


export const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        isActive: false,
        timer: {hours: currentTime.getHours(), minutes: currentTime.getMinutes(), seconds: currentTime.getSeconds()}
    },
    reducers: {
        toggleActive: (state, action) => {
            state.isActive = !state.isActive;
            if (state.isActive) ipcRenderer.invoke(channels.START_PAC);
            else {
                ipcRenderer.invoke(channels.STOP_PAC);
                if (action.payload.isFinished) {
                    ipcRenderer.invoke(channels.FINISH_TIMER);
                }
            }

        },

        setTimer: (state, action) => {
            state.timer = action.payload;
        }

    }
})

export const {toggleActive, setTimer} = timerReducer.actions;
export default timerReducer.reducer;