import { createSlice } from "@reduxjs/toolkit";

const INIT = {
    viewWidth: 0
}

export const viewSlice = createSlice({
    name: 'viewSlcie',
    initialState: INIT,
    reducers: {
        setViewWidth: (state, action) => {
            const {payload} = action;
            return {...state, viewWidth: payload}
        }
    }
})

export const {setViewWidth} = viewSlice.actions

export default viewSlice.reducer