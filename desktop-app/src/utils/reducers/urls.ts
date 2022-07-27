import { createSlice } from "@reduxjs/toolkit";

export const urlsReducer = createSlice({
    name: 'urls',
    initialState: {
        urls: [] as string[]
    },
    reducers: {
        addUrl: (state, action) => {
            state.urls.push(action.payload)
        },
        removeUrl: (state, action) => {
            state.urls = state.urls.filter(item => item !== action.payload);
        }
    }
})

export const {addUrl, removeUrl} = urlsReducer.actions;
export default urlsReducer.reducer;