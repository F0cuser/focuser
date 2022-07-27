import { createSlice } from "@reduxjs/toolkit";

export const modalReducer = createSlice({
    name: 'modal',
    initialState: {
        openModal: null
    },
    reducers: {
        openModal: (state, action) => {
            state.openModal = action.payload
        },
        closeModal: (state) => {
            state.openModal = null
        }
    }
})

export const {openModal, closeModal} = modalReducer.actions;
export default modalReducer.reducer;