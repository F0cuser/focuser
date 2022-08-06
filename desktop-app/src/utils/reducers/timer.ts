import { createSlice } from "@reduxjs/toolkit";

export const timerReducer = createSlice({
    name: 'timer',
    initialState: {
        isActive: false
    },
    reducers: {
        toggleActive: (state) => {
            state.isActive = !state.isActive
        },

    }
})

export const {toggleActive} = timerReducer.actions;
export default timerReducer.reducer;