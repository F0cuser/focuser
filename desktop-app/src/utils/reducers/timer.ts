import { createSlice } from "@reduxjs/toolkit";

export const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        timer: {hours: 0, minutes: 0, seconds: 0} as {[key:string]: number}
    },
    reducers: {
        setTimer: (state, action) => {
            state.timer = action.payload
        },

    }
})

export const {setTimer} = timerReducer.actions;
export default timerReducer.reducer;